# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tasfia-17/deriv-compliance&env=CEREBRAS_API_KEY&envDescription=Cerebras%20API%20key%20for%20AI%20features&project-name=deriv-compliance&repository-name=deriv-compliance)

### Option 2: Manual Deploy

1. **Fork/Clone the repository**
```bash
git clone https://github.com/Tasfia-17/deriv-compliance.git
cd deriv-compliance
```

2. **Install Vercel CLI**
```bash
npm i -g vercel
```

3. **Login to Vercel**
```bash
vercel login
```

4. **Deploy**
```bash
vercel
```

5. **Add Environment Variables** (in Vercel Dashboard)
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `CEREBRAS_API_KEY`: `csk-d864dvjcyj6v68fnpv8429fcpenktwmrwjd3885tnc9j36vh`
     - `BLOB_READ_WRITE_TOKEN`: (optional, for document upload)

6. **Redeploy**
```bash
vercel --prod
```

### Option 3: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select GitHub repository: `Tasfia-17/deriv-compliance`
4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   - `CEREBRAS_API_KEY`: `csk-d864dvjcyj6v68fnpv8429fcpenktwmrwjd3885tnc9j36vh`
6. Click "Deploy"

## Environment Variables

### Required
- `CEREBRAS_API_KEY`: AI inference (already included in vercel.json)

### Optional
- `BLOB_READ_WRITE_TOKEN`: Document storage (create in Vercel dashboard)

## Post-Deployment

1. **Test the deployment**
   - Visit your Vercel URL
   - Click "Launch Platform"
   - Create a workspace
   - Test AI features

2. **Custom Domain** (Optional)
   - Go to Vercel project settings
   - Add custom domain
   - Update DNS records

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Check build logs in Vercel dashboard

### API Errors
- Verify CEREBRAS_API_KEY is set
- Check API rate limits
- Review function logs

### 404 Errors
- Ensure output directory is `.next`
- Check Next.js version compatibility
- Verify all routes are properly configured

## Live Demo

Once deployed, your app will be available at:
- `https://your-project.vercel.app`
- Or your custom domain

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally first (`npm run build && npm start`)
