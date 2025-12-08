# Leadership Loom - Deployment Guide

This guide will help you deploy your Leadership Loom application to a hosting provider.

## Prerequisites

Before deploying, make sure you have:
- ✅ Run the Supabase database migrations
- ✅ Your Supabase project URL and anon key
- ✅ Committed your code to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?** Easy setup, automatic deployments, excellent performance, free tier

#### Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your project:**
   - Click "Add New Project"
   - Select your `leadership-loom-v2` repository
   - Click "Import"

4. **Configure the project:**
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables:**
   In the Environment Variables section, add:
   ```
   VITE_SUPABASE_URL=https://kotbpmjfscvurpbwjgko.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

6. **Click "Deploy"**

7. **Update Supabase redirect URLs:**
   - Go to your Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL (e.g., `https://your-app.vercel.app`) to:
     - Site URL
     - Redirect URLs (add `/update-password` path)
   - Example: `https://your-app.vercel.app/update-password`

#### That's it! Your site is live! 🎉

Every time you push to GitHub, Vercel will automatically redeploy.

---

### Option 2: Netlify

#### Steps:

1. **Push to GitHub** (if not already done)

2. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

3. **Create new site:**
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your `leadership-loom-v2` repository

4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" → "New variable"

5. **Add environment variables:**
   ```
   VITE_SUPABASE_URL=https://kotbpmjfscvurpbwjgko.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

6. **Deploy site**

7. **Update Supabase redirect URLs** (same as Vercel step 7)

---

### Option 3: Cloudflare Pages

#### Steps:

1. **Push to GitHub** (if not already done)

2. **Sign up/Login to Cloudflare:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)

3. **Create new project:**
   - Click "Create a project"
   - Connect to Git provider (GitHub)
   - Select your repository

4. **Configure build:**
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`

5. **Add environment variables:**
   - Go to Settings → Environment variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

6. **Save and Deploy**

7. **Update Supabase redirect URLs** (same as Vercel step 7)

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test user signup flow
- [ ] Test user signin flow
- [ ] Test password reset flow
- [ ] Test sign out functionality
- [ ] Verify dashboard loads correctly
- [ ] Test creating a new assessment
- [ ] Check that all environment variables are working
- [ ] Update Supabase redirect URLs to include your production domain

## Custom Domain (Optional)

All three platforms support custom domains:

### Vercel:
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

### Cloudflare Pages:
1. Go to Custom domains
2. Add your domain (already on Cloudflare? It's instant!)

---

## Environment Variables Reference

Make sure these are set in your hosting provider:

```bash
# Required
VITE_SUPABASE_URL=https://kotbpmjfscvurpbwjgko.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Note: NEVER commit your .env file to Git!
```

---

## Troubleshooting

### Issue: "404 Page Not Found" on refresh
**Solution:** The `vercel.json` or `netlify.toml` files handle this. Make sure they're committed to your repo.

### Issue: "Missing environment variables"
**Solution:** Double-check that you've added the environment variables in your hosting provider's dashboard, not just locally.

### Issue: Authentication not working
**Solution:** Make sure you've updated the redirect URLs in Supabase to include your production domain.

### Issue: Build fails
**Solution:**
- Check that all dependencies are in `package.json`
- Ensure the build command is `npm run build`
- Check build logs for specific errors

---

## Support

If you run into issues:
1. Check the build logs in your hosting provider's dashboard
2. Verify all environment variables are set correctly
3. Ensure Supabase migrations have been run
4. Check that Supabase redirect URLs include your production domain

---

## Cost

**All three options have generous free tiers that are perfect for this application:**

- **Vercel Free:** Unlimited sites, 100GB bandwidth/month, automatic HTTPS
- **Netlify Free:** 100GB bandwidth/month, 300 build minutes/month
- **Cloudflare Pages Free:** Unlimited bandwidth, 500 builds/month

For a small to medium-sized team using Leadership Loom, the free tier should be more than sufficient!
