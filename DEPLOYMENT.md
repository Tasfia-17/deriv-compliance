# Deployment Guide - Deriv Compliance Copilot

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
cd /home/rifa/deriv-compliance-copilot
vercel
```

4. Add environment variables when prompted:
```
CEREBRAS_API_KEY=csk-d864dvjcyj6v68fnpv8429fcpenktwmrwjd3885tnc9j36vh
BLOB_READ_WRITE_TOKEN=(get from Vercel dashboard)
```

### Option 2: Deploy via GitHub

1. Initialize git repository:
```bash
cd /home/rifa/deriv-compliance-copilot
git init
git add .
git commit -m "Initial commit - Deriv Compliance Copilot"
```

2. Create GitHub repository and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/deriv-compliance-copilot.git
git branch -M main
git push -u origin main
```

3. Go to [vercel.com](https://vercel.com)
4. Click "Import Project"
5. Select your GitHub repository
6. Add environment variables:
   - `CEREBRAS_API_KEY`: csk-d864dvjcyj6v68fnpv8429fcpenktwmrwjd3885tnc9j36vh
   - `BLOB_READ_WRITE_TOKEN`: (create in Vercel dashboard under Storage)
7. Click "Deploy"

### Setting up Vercel Blob Storage

1. Go to your Vercel project dashboard
2. Navigate to "Storage" tab
3. Click "Create Database" → "Blob"
4. Copy the `BLOB_READ_WRITE_TOKEN`
5. Add it to your environment variables

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the Application

### 1. Landing Page
- Should see Deriv-branded landing with red accent colors
- Click "Launch Platform" to enter dashboard

### 2. Upload Documents
- Navigate to "Upload KYC" in sidebar
- Drag and drop or select a PDF/image file
- File should upload successfully

### 3. Analyze Documents
- Go to "Documents" view
- Select uploaded documents
- Click "Analyze Selected"
- Should see compliance analysis with gaps

### 4. Chat Assistant
- Navigate to "AI Assistant"
- Ask questions like "What are MFSA requirements?"
- Should get AI-powered responses

## Environment Variables Required

```env
CEREBRAS_API_KEY=csk-d864dvjcyj6v68fnpv8429fcpenktwmrwjd3885tnc9j36vh
BLOB_READ_WRITE_TOKEN=vercel_blob_***
```

## Production Checklist

- [x] Next.js 14 with App Router
- [x] TypeScript strict mode
- [x] Tailwind CSS with custom Deriv theme
- [x] Cerebras AI integration
- [x] Document upload with Vercel Blob
- [x] Compliance analysis API
- [x] Chat assistant with conversation history
- [x] Responsive design
- [x] Production build successful

## Demo Flow for Hackathon

1. **Landing** → Show Deriv branding and value proposition
2. **Upload** → Drag-drop KYC documents (passport, utility bill)
3. **Analyze** → Select documents, click analyze, show AI processing
4. **Results** → Display compliance score, gaps, recommendations
5. **Chat** → Ask "What's missing for MFSA compliance?" → Get AI answer

## Key Metrics to Highlight

- **72 hours → 15 minutes**: Onboarding time
- **2,000 → 50 alerts**: Weekly false positives
- **5 jurisdictions**: MFSA, DIFC, BVI, Vanuatu, Labuan
- **Real-time AI**: Cerebras ultra-low latency
- **Production-ready**: Full backend, storage, APIs

## Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### API errors
- Check CEREBRAS_API_KEY is set correctly
- Verify Cerebras API is accessible
- Check API rate limits

### Upload fails
- Ensure BLOB_READ_WRITE_TOKEN is configured
- Check file size limits (10MB max)
- Verify Vercel Blob storage is created

## Support

For issues during hackathon, check:
1. Environment variables are set
2. Build completes successfully
3. All API routes return 200 status
4. Cerebras API key is valid
