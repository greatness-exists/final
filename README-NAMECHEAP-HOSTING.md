# Quick Namecheap cPanel Deployment

## Quick Start

1. **Build:** `npm run build`
2. **Upload:** Upload all files from `dist/` folder to cPanel's `public_html/`
3. **Include:** Make sure `.htaccess` file is in `public_html/`
4. **Visit:** https://www.ko-sa.com

## What Changed for cPanel Compatibility

### Files Added:
- `.htaccess` - Handles React routing, HTTPS redirect, caching, and security headers
- `DEPLOYMENT-GUIDE.md` - Complete deployment instructions

### Files Removed:
- `vercel.json` - No longer needed (Vercel-specific)

### Configuration Changes:
- `vite.config.ts` - Set `base: "/"` for standard hosting
- Added Tailwind plugin to fix CSS build errors

## Important Notes

✅ **This is a static site** - All files are pre-built and served by Apache
✅ **Client-side routing** - Handled by `.htaccess` file
✅ **HTTPS** - Automatically redirected via `.htaccess`
✅ **Caching** - Optimized for performance (1 year for assets, 1 hour for HTML)

## Build Output Structure

```
dist/
├── index.html          → Main HTML file
├── logo.png           → Logo and favicon
├── assets/            → All JS, CSS, images, fonts
│   ├── index-*.js    
│   ├── index-*.css   
│   └── [other assets]
└── [other files]
```

Upload everything inside `dist/` to your cPanel `public_html/` directory.

## cPanel File Structure

```
public_html/
├── .htaccess          ← Upload from project root
├── index.html         ← From dist/
├── logo.png          ← From dist/
└── assets/           ← From dist/
    └── ...
```

## Testing Checklist

- [ ] Homepage loads
- [ ] All navigation links work
- [ ] Page refresh doesn't cause 404
- [ ] Images display correctly
- [ ] Forms submit properly
- [ ] Mobile responsive
- [ ] HTTPS works (green padlock)

## Need Help?

See `DEPLOYMENT-GUIDE.md` for detailed step-by-step instructions.
