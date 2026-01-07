# Namecheap cPanel Deployment Guide

This guide will help you deploy your KO-SA Beach Resort website from Vercel to Namecheap's Stellar Plus cPanel hosting.

## Prerequisites

- Namecheap Stellar Plus hosting account
- Domain: www.ko-sa.com (already configured)
- cPanel access credentials
- FTP/SFTP client (FileZilla recommended) or cPanel File Manager

## Step 1: Build Your Project for Production

On your local machine, build the production-ready static files:

```bash
# Install dependencies if not already installed
npm install

# Build the project
npm run build
```

This will create a `dist` folder containing all static files ready for deployment.

## Step 2: Prepare Your cPanel

1. **Log in to cPanel**
   - Go to your Namecheap account
   - Navigate to cPanel for your Stellar Plus hosting
   - URL typically: `https://your-server.namecheaphosting.com:2083`

2. **Verify Domain Settings**
   - Go to "Domains" section
   - Ensure www.ko-sa.com points to your hosting account
   - The document root should be `/public_html` or `/public_html/www.ko-sa.com`

## Step 3: Upload Files to cPanel

### Option A: Using cPanel File Manager (Easier)

1. **Access File Manager**
   - In cPanel, click "File Manager"
   - Navigate to `public_html` directory

2. **Clean Existing Files** (if any)
   - Select all files in `public_html`
   - Click "Delete" to remove old files
   - **Important:** Keep `.htaccess` if you want to preserve any custom settings

3. **Upload Your Build**
   - Click "Upload" button
   - Navigate to your local `dist` folder
   - Select ALL files and folders inside `dist` (not the dist folder itself)
   - Upload them to `public_html`
   
   Or use the "Compress & Upload" method:
   - Compress your `dist` folder into a ZIP file on your computer
   - Upload the ZIP file to `public_html`
   - Right-click the ZIP and select "Extract"
   - Move all extracted files from the `dist` subfolder to `public_html`
   - Delete the ZIP file and empty `dist` folder

4. **Upload .htaccess**
   - The `.htaccess` file in your project root should be uploaded to `public_html`
   - This file handles client-side routing for your React app

### Option B: Using FTP/SFTP (More Control)

1. **Get FTP Credentials**
   - In cPanel, go to "FTP Accounts"
   - Note your main FTP account credentials (usually your cPanel login)
   - FTP Host: `ftp.ko-sa.com` or your server's IP
   - Port: 21 (FTP) or 22 (SFTP)

2. **Connect via FTP Client**
   - Open FileZilla (or your preferred FTP client)
   - Enter FTP credentials
   - Connect to server

3. **Upload Files**
   - Navigate to `public_html` on the remote server
   - Delete existing files (if any)
   - Upload ALL contents from your local `dist` folder
   - Upload the `.htaccess` file from your project root

## Step 4: Verify File Structure

After upload, your `public_html` should look like this:

```
public_html/
├── .htaccess
├── index.html
├── logo.png
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [other static files]
```

## Step 5: Configure DNS (If Not Already Done)

1. **In Namecheap Domain Dashboard**
   - Go to "Domain List" → Select ko-sa.com
   - Click "Manage"
   - Go to "Advanced DNS" tab

2. **Set DNS Records**
   ```
   Type    Host    Value                           TTL
   A       @       [Your cPanel Server IP]        Automatic
   A       www     [Your cPanel Server IP]        Automatic
   CNAME   www     ko-sa.com                      Automatic
   ```

3. **Get Server IP**
   - In cPanel, look for "Server Information" or contact Namecheap support

## Step 6: Remove from Vercel

1. **Log in to Vercel Dashboard**
   - Go to https://vercel.com
   - Navigate to your KO-SA project

2. **Remove Domain**
   - Go to "Settings" → "Domains"
   - Remove www.ko-sa.com and ko-sa.com from Vercel
   - This prevents conflicts

3. **Delete or Archive Project** (Optional)
   - In project settings → "General"
   - You can delete the project or just keep it archived

## Step 7: Test Your Deployment

1. **Clear Browser Cache**
   - Press `Ctrl + Shift + R` (Windows/Linux)
   - Press `Cmd + Shift + R` (Mac)

2. **Visit Your Site**
   - Go to https://www.ko-sa.com
   - Test navigation between pages
   - Verify all images and assets load correctly
   - Test responsive design on mobile

3. **Check Routing**
   - Navigate to different pages (About, Rooms, Contact, etc.)
   - Refresh the page on non-home routes
   - Ensure no 404 errors occur

## Troubleshooting

### Issue: 404 Errors on Page Refresh
**Solution:** Verify `.htaccess` is uploaded and mod_rewrite is enabled in cPanel

### Issue: Styles Not Loading
**Solution:** 
- Check if all files from `dist/assets` are uploaded
- Clear browser cache
- Verify file permissions (should be 644 for files, 755 for directories)

### Issue: Images Not Displaying
**Solution:**
- Check `public_html/assets` folder exists with all images
- Verify image paths in your code use relative URLs
- Check file permissions

### Issue: Site Not Loading
**Solution:**
- Verify domain DNS is pointing to correct IP
- Wait 24-48 hours for DNS propagation
- Check cPanel error logs: "Errors" → "Error Log"

### Issue: HTTPS Not Working
**Solution:**
- In cPanel, install free SSL certificate
- Go to "Security" → "SSL/TLS Status"
- Click "Run AutoSSL" for your domain

## Performance Optimization

1. **Enable SSL Certificate**
   - In cPanel: "Security" → "SSL/TLS Status"
   - Install Let's Encrypt free SSL

2. **Enable Caching** (Already in .htaccess)
   - Browser caching is configured
   - Consider CloudFlare for additional CDN

3. **Compress Files**
   - Gzip compression is enabled in .htaccess
   - Reduces bandwidth usage

## Maintenance

### To Update Your Site:

1. Make changes to your code locally
2. Run `npm run build`
3. Upload new files from `dist` to `public_html`
4. Clear browser cache to see changes

### Backup Your Site:

- Use cPanel "Backup Wizard" regularly
- Download backups to your local machine
- Keep source code in Git repository (already on GitHub)

## Support Resources

- **Namecheap Support:** https://www.namecheap.com/support/
- **cPanel Documentation:** https://docs.cpanel.net/
- **Live Chat:** Available in Namecheap dashboard

## Environment Variables (If Needed)

If your app uses environment variables (API keys, etc.):

1. They must be prefixed with `VITE_` in your `.env` file
2. Rebuild your project after adding them: `npm run build`
3. The values are baked into the build (don't expose secrets)

For sensitive operations, use serverless functions or separate backend API.

---

**Your site should now be live on Namecheap cPanel hosting!**

Visit: https://www.ko-sa.com
