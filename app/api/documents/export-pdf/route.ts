import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, filename } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text content required' }, { status: 400 })
    }

    // Generate simple PDF content
    const pdfContent = generateSimplePDF(text, filename || 'document.pdf')
    
    return new NextResponse(pdfContent.toString('binary'), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || 'corrected_document.pdf'}"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'PDF generation failed' },
      { status: 500 }
    )
  }
}

function generateSimplePDF(text: string, filename: string): Buffer {
  // Simple PDF generation
  const lines = text.split('\n')
  const pdfLines: string[] = []
  
  pdfLines.push('%PDF-1.4')
  pdfLines.push('1 0 obj')
  pdfLines.push('<<')
  pdfLines.push('/Type /Catalog')
  pdfLines.push('/Pages 2 0 R')
  pdfLines.push('>>')
  pdfLines.push('endobj')
  pdfLines.push('2 0 obj')
  pdfLines.push('<<')
  pdfLines.push('/Type /Pages')
  pdfLines.push('/Kids [3 0 R]')
  pdfLines.push('/Count 1')
  pdfLines.push('>>')
  pdfLines.push('endobj')
  pdfLines.push('3 0 obj')
  pdfLines.push('<<')
  pdfLines.push('/Type /Page')
  pdfLines.push('/Parent 2 0 R')
  pdfLines.push('/Resources <<')
  pdfLines.push('/Font <<')
  pdfLines.push('/F1 4 0 R')
  pdfLines.push('>>')
  pdfLines.push('>>')
  pdfLines.push('/MediaBox [0 0 612 792]')
  pdfLines.push('/Contents 5 0 R')
  pdfLines.push('>>')
  pdfLines.push('endobj')
  pdfLines.push('4 0 obj')
  pdfLines.push('<<')
  pdfLines.push('/Type /Font')
  pdfLines.push('/Subtype /Type1')
  pdfLines.push('/BaseFont /Helvetica')
  pdfLines.push('>>')
  pdfLines.push('endobj')
  
  // Content stream
  let contentStream = 'BT\n/F1 11 Tf\n50 750 Td\n'
  let yPos = 750
  
  for (const line of lines.slice(0, 50)) { // Limit to 50 lines
    const cleanLine = line.replace(/[()\\]/g, ' ').substring(0, 80)
    contentStream += `(${cleanLine}) Tj\n0 -15 Td\n`
    yPos -= 15
    if (yPos < 50) break
  }
  
  contentStream += 'ET'
  
  const contentLength = contentStream.length
  
  pdfLines.push('5 0 obj')
  pdfLines.push('<<')
  pdfLines.push(`/Length ${contentLength}`)
  pdfLines.push('>>')
  pdfLines.push('stream')
  pdfLines.push(contentStream)
  pdfLines.push('endstream')
  pdfLines.push('endobj')
  
  pdfLines.push('xref')
  pdfLines.push('0 6')
  pdfLines.push('0000000000 65535 f')
  pdfLines.push('0000000009 00000 n')
  pdfLines.push('0000000058 00000 n')
  pdfLines.push('0000000115 00000 n')
  pdfLines.push('0000000317 00000 n')
  pdfLines.push('0000000396 00000 n')
  pdfLines.push('trailer')
  pdfLines.push('<<')
  pdfLines.push('/Size 6')
  pdfLines.push('/Root 1 0 R')
  pdfLines.push('>>')
  pdfLines.push('startxref')
  pdfLines.push(`${pdfLines.join('\n').length - 100}`)
  pdfLines.push('%%EOF')
  
  return Buffer.from(pdfLines.join('\n'))
}
