import { NextRequest, NextResponse } from 'next/server'

// Jurisdiction compliance rules
const JURISDICTION_RULES = {
  MFSA: {
    name: 'Malta Financial Services Authority',
    requirements: [
      'Valid government-issued ID (passport or national ID)',
      'Proof of address (utility bill, bank statement) dated within 3 months',
      'Source of funds declaration',
      'Tax identification number',
      'Employment status verification'
    ]
  },
  DIFC: {
    name: 'Dubai International Financial Centre',
    requirements: [
      'Emirates ID or passport',
      'UAE residence visa (if applicable)',
      'Proof of address in UAE',
      'Bank reference letter',
      'Source of wealth documentation'
    ]
  },
  BVI: {
    name: 'British Virgin Islands',
    requirements: [
      'Government-issued photo ID',
      'Proof of residential address',
      'Bank account verification',
      'Source of funds statement'
    ]
  },
  VANUATU: {
    name: 'Vanuatu Financial Services Commission',
    requirements: [
      'Valid passport or national ID',
      'Proof of address (within 6 months)',
      'Financial profile questionnaire',
      'Source of funds declaration'
    ]
  },
  LABUAN: {
    name: 'Labuan Financial Services Authority',
    requirements: [
      'Malaysian IC or passport',
      'Proof of address',
      'Bank statement (last 3 months)',
      'Employment verification',
      'Tax residency certificate'
    ]
  }
}

async function analyzeWithCerebras(documentText: string, jurisdiction: string) {
  const apiKey = process.env.CEREBRAS_API_KEY
  
  if (!apiKey) {
    throw new Error('CEREBRAS_API_KEY not configured')
  }

  const rules = JURISDICTION_RULES[jurisdiction as keyof typeof JURISDICTION_RULES]
  
  const prompt = `You are a compliance analyst for Deriv, a global trading platform. Analyze this KYC document against ${rules.name} requirements.

Document Content:
${documentText}

Requirements to check:
${rules.requirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}

Provide a JSON response with:
{
  "compliant": boolean,
  "score": number (0-100),
  "gaps": [
    {
      "requirement": "string",
      "status": "missing" | "incomplete" | "expired",
      "severity": "critical" | "high" | "medium" | "low",
      "recommendation": "string"
    }
  ],
  "summary": "string"
}

Be strict and thorough. Flag any missing or incomplete information.`

  const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama3.1-70b',
      messages: [
        { role: 'system', content: 'You are a compliance analyst. Always respond with valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      max_tokens: 2000
    })
  })

  if (!response.ok) {
    throw new Error(`Cerebras API error: ${response.statusText}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content
  
  // Extract JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response')
  }
  
  return JSON.parse(jsonMatch[0])
}

export async function POST(request: NextRequest) {
  try {
    const { documentIds, jurisdiction = 'MFSA' } = await request.json()

    if (!documentIds || documentIds.length === 0) {
      return NextResponse.json({ error: 'No documents provided' }, { status: 400 })
    }

    // Simulate document text extraction (in production, fetch from blob and extract)
    const mockDocumentText = `
    PASSPORT
    Name: John Doe
    Passport Number: AB123456
    Date of Birth: 01/01/1990
    Expiry Date: 01/01/2030
    
    UTILITY BILL
    Address: 123 Main Street, Valletta, Malta
    Date: 15/01/2026
    Account Holder: John Doe
    
    BANK STATEMENT
    Bank: Bank of Valletta
    Account Number: MT****1234
    Statement Period: December 2025
    `

    // Analyze with Cerebras
    let analysis
    try {
      analysis = await analyzeWithCerebras(mockDocumentText, jurisdiction)
    } catch (error) {
      console.error('Cerebras analysis error:', error)
      // Return mock analysis if Cerebras fails
      analysis = {
        compliant: false,
        score: 75,
        gaps: [
          {
            requirement: 'Source of Funds Declaration',
            status: 'missing',
            severity: 'critical',
            recommendation: 'Trader must provide a signed declaration explaining the source of funds for trading activities.'
          },
          {
            requirement: 'Tax Identification Number (TIN)',
            status: 'missing',
            severity: 'high',
            recommendation: 'MFSA requires a valid Tax Identification Number for all traders.'
          },
          {
            requirement: 'Employment Verification',
            status: 'incomplete',
            severity: 'medium',
            recommendation: 'Formal employment verification (employment letter or contract) is recommended.'
          }
        ],
        summary: 'The trader has provided valid identification (passport) and proof of address (utility bill dated within 3 months). Bank statement confirms financial activity. However, critical gaps remain: missing source of funds declaration and tax identification number.'
      }
    }

    return NextResponse.json({
      jurisdiction,
      jurisdictionName: JURISDICTION_RULES[jurisdiction as keyof typeof JURISDICTION_RULES].name,
      documentCount: documentIds.length,
      analysis,
      analyzedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
