import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { componentTaggerPlugin } from "./src/visual-edits/component-tagger-plugin.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

function getImageFiles(directory: string, basePath = ''): any[] {
  const files: any[] = [];
  if (!fs.existsSync(directory)) return files;
  
  const items = fs.readdirSync(directory);
  for (const item of items) {
    if (item === '.' || item === '..' || item === 'admin') continue;
    
    const fullPath = path.join(directory, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase().slice(1);
      if (allowedExtensions.includes(ext)) {
        files.push({
          filename: relativePath,
          name: item,
          size: stat.size,
          modified: stat.mtimeMs,
          extension: ext
        });
      }
    }
  }
  return files;
}

const devApiPlugin = (): Plugin => ({
  name: "dev-api-plugin",
  configureServer(server) {
    server.middlewares.use('/admin/api/list-files.php', (_req, res) => {
      const publicRoot = path.resolve(__dirname, 'public');
      const rootFiles = getImageFiles(publicRoot);
      const roomFiles = getImageFiles(path.join(publicRoot, 'Rooms'), 'Rooms');
      const allFiles = [...rootFiles, ...roomFiles].sort((a, b) => a.filename.localeCompare(b.filename));
      
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, files: allFiles, count: allFiles.length }));
    });

    server.middlewares.use('/admin/api/list.php', (req, res) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const type = url.searchParams.get('type') || 'gallery';
      const sanitizedType = type.replace(/[^a-zA-Z0-9_]/g, '');
      const dataFile = path.resolve(__dirname, `public/admin/data/${sanitizedType}.json`);
      
      res.setHeader('Content-Type', 'application/json');
      if (!fs.existsSync(dataFile)) {
        res.end(JSON.stringify([]));
        return;
      }
      
      try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        res.end(JSON.stringify(Array.isArray(data) ? data : []));
      } catch {
        res.end(JSON.stringify([]));
      }
    });

    server.middlewares.use('/admin/api/save.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }
      
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => {
        try {
          const { action, type, data, id, updates } = JSON.parse(body);
          const sanitizedType = type.replace(/[^a-zA-Z0-9_]/g, '');
          const dataFile = path.resolve(__dirname, `public/admin/data/${sanitizedType}.json`);
          
          let existing: any[] = [];
          if (fs.existsSync(dataFile)) {
            existing = JSON.parse(fs.readFileSync(dataFile, 'utf-8')) || [];
          }
          
          res.setHeader('Content-Type', 'application/json');
          
          if (action === 'add') {
            const newItem = {
              ...data,
              id: `${type}_${Date.now()}`,
              created_at: new Date().toISOString()
            };
            existing.push(newItem);
            fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
            res.end(JSON.stringify({ success: true, item: newItem }));
          } else if (action === 'update') {
            const index = existing.findIndex((item: any) => item.id === id);
            if (index !== -1) {
              existing[index] = { ...existing[index], ...updates };
              fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
              res.end(JSON.stringify({ success: true, data: existing[index] }));
            } else {
              res.end(JSON.stringify({ success: false, error: 'Item not found' }));
            }
          } else {
            res.end(JSON.stringify({ success: false, error: 'Invalid action' }));
          }
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: 'Server error' }));
        }
      });
    });

    server.middlewares.use('/admin/api/delete.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }
      
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => {
        try {
          const { type, id } = JSON.parse(body);
          const sanitizedType = type.replace(/[^a-zA-Z0-9_]/g, '');
          const dataFile = path.resolve(__dirname, `public/admin/data/${sanitizedType}.json`);
          
          res.setHeader('Content-Type', 'application/json');
          
          if (!fs.existsSync(dataFile)) {
            res.end(JSON.stringify({ success: false, error: 'Data file not found' }));
            return;
          }
          
          let existing = JSON.parse(fs.readFileSync(dataFile, 'utf-8')) || [];
          existing = existing.filter((item: any) => item.id !== id);
          fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
          res.end(JSON.stringify({ success: true }));
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: 'Server error' }));
        }
      });
    });

    server.middlewares.use('/admin/api/delete-image.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }
      
      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', () => {
        try {
          const { filename } = JSON.parse(body);
          const publicRoot = path.resolve(__dirname, 'public');
          const fullPath = path.join(publicRoot, filename);
          
          res.setHeader('Content-Type', 'application/json');
          
          if (filename.includes('..')) {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: 'Invalid filename' }));
            return;
          }
          
          if (!fs.existsSync(fullPath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
          }
          
          fs.unlinkSync(fullPath);
          res.end(JSON.stringify({ success: true, deleted: filename }));
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: 'Failed to delete file' }));
        }
      });
    });

    server.middlewares.use('/admin/api/upload.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          const contentType = req.headers['content-type'] || '';
          const boundary = contentType.split('boundary=')[1];
          
          if (!boundary) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'No boundary found' }));
            return;
          }
          
          const parts = buffer.toString('binary').split(`--${boundary}`);
          let fileData: Buffer | null = null;
          let filename = '';
          let type = '';
          let category = 'general';
          let description = '';
          
          for (const part of parts) {
            if (part.includes('Content-Disposition')) {
              const nameMatch = part.match(/name="([^"]+)"/);
              const filenameMatch = part.match(/filename="([^"]+)"/);
              
              if (nameMatch) {
                const name = nameMatch[1];
                const contentStart = part.indexOf('\r\n\r\n') + 4;
                const contentEnd = part.lastIndexOf('\r\n');
                const content = part.substring(contentStart, contentEnd);
                
                if (filenameMatch && name === 'file') {
                  filename = filenameMatch[1];
                  const binaryContent = part.substring(contentStart, contentEnd);
                  fileData = Buffer.from(binaryContent, 'binary');
                } else if (name === 'type') {
                  type = content;
                } else if (name === 'category') {
                  category = content;
                } else if (name === 'description') {
                  description = content;
                }
              }
            }
          }
          
          res.setHeader('Content-Type', 'application/json');
          
          if (!fileData || !filename) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'No file uploaded' }));
            return;
          }
          
          const ext = path.extname(filename).toLowerCase();
          const newFilename = `img_${Date.now()}${ext}`;
          
          // Save to public root for immediate visibility
          const publicDir = path.resolve(__dirname, 'public');
          const targetPath = path.join(publicDir, newFilename);
          fs.writeFileSync(targetPath, fileData);
          
            // URL is relative to public root
            const relativeUrl = newFilename; // Removed leading slash for portability
          
          if (type === 'gallery') {
            const dataFile = path.resolve(__dirname, 'public/admin/data/gallery.json');
            let data: any[] = [];
            if (fs.existsSync(dataFile)) {
              data = JSON.parse(fs.readFileSync(dataFile, 'utf-8')) || [];
            }
            
            const newItem = {
              id: `gal_${Date.now()}`,
              image_url: relativeUrl,
              category: category,
              description: description,
              order_index: data.length,
              created_at: new Date().toISOString()
            };
            
            data.push(newItem);
            fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
            res.end(JSON.stringify({ success: true, url: relativeUrl, item: newItem }));
          } else {
            res.end(JSON.stringify({ success: true, url: relativeUrl }));
          }
        } catch (e) {
          console.error('Upload error:', e);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Failed to upload file' }));
        }
      });
    });

    server.middlewares.use('/admin/api/replace.php', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          const contentType = req.headers['content-type'] || '';
          const boundary = contentType.split('boundary=')[1];
          
          res.setHeader('Content-Type', 'application/json');
          
          if (!boundary) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'No boundary found' }));
            return;
          }
          
          const parts = buffer.toString('binary').split(`--${boundary}`);
          let fileData: Buffer | null = null;
          let target = '';
          
          for (const part of parts) {
            if (part.includes('Content-Disposition')) {
              const nameMatch = part.match(/name="([^"]+)"/);
              const filenameMatch = part.match(/filename="([^"]+)"/);
              
              if (nameMatch) {
                const name = nameMatch[1];
                const contentStart = part.indexOf('\r\n\r\n') + 4;
                const contentEnd = part.lastIndexOf('\r\n');
                const content = part.substring(contentStart, contentEnd);
                
                if (filenameMatch && name === 'replacement') {
                  const binaryContent = part.substring(contentStart, contentEnd);
                  fileData = Buffer.from(binaryContent, 'binary');
                } else if (name === 'target') {
                  target = content;
                }
              }
            }
          }
          
          if (!fileData || !target) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing target or replacement file' }));
            return;
          }
          
          if (target.includes('..')) {
            res.statusCode = 403;
            res.end(JSON.stringify({ error: 'Invalid target path' }));
            return;
          }
          
          const publicRoot = path.resolve(__dirname, 'public');
          const fullPath = path.join(publicRoot, target);
          
          if (!fs.existsSync(fullPath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Target file not found' }));
            return;
          }
          
          fs.writeFileSync(fullPath, fileData);
          res.end(JSON.stringify({ success: true, replaced: target }));
        } catch (e) {
          console.error('Replace error:', e);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Failed to replace file' }));
        }
      });
    });
  }
});

const logErrorsPlugin = (): Plugin => ({
  name: "log-errors-plugin",
  transformIndexHtml() {
    return [
      {
        tag: "script",
        injectTo: "head",
        children: `(() => {
            try {
              const logOverlay = () => {
                const el = document.querySelector('vite-error-overlay');
                if (!el) return;
                const root = (el.shadowRoot || el);
                let text = '';
                try { text = root.textContent || ''; } catch (_) {}
                if (text && text.trim()) {
                  const msg = text.trim();
                  console.error('[Vite Overlay]', msg);
                  try {
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({
                        type: 'ERROR_CAPTURED',
                        error: {
                          message: msg,
                          stack: undefined,
                          filename: undefined,
                          lineno: undefined,
                          colno: undefined,
                          source: 'vite.overlay',
                        },
                        timestamp: Date.now(),
                      }, '*');
                    }
                  } catch (_) {}
                }
              };

              const obs = new MutationObserver(() => logOverlay());
              obs.observe(document.documentElement, { childList: true, subtree: true });

              window.addEventListener('DOMContentLoaded', logOverlay);
              logOverlay();
            } catch (e) {
              console.warn('[Vite Overlay logger failed]', e);
            }
          })();`
      }
    ];
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    tailwindcss(),
    devApiPlugin(),
    logErrorsPlugin(),
    componentTaggerPlugin(),
  ],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
