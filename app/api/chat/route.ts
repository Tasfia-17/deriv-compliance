import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a compliance expert assistant for Deriv, a global trading platform. You specialize in KYC (Know Your Customer) requirements across 5 jurisdictions:

1. MFSA (Malta Financial Services Authority)
2. DIFC (Dubai International Financial Centre)
3. BVI (British Virgin Islands)
4. Vanuatu Financial Services Commission
5. Labuan Financial Services Authority

Your role is to:
- Explain KYC and compliance requirements clearly
- Guide users through document verification processes
- Identify compliance gaps and provide remediation steps
- Stay updated on regulatory changes
- Provide jurisdiction-specific guidance

Be concise, professional, and actionable. Always cite specific regulations when relevant.`

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const apiKey = process.env.CEREBRAS_API_KEY
    
    // Try Cerebras first, fallback to mock responses
    if (apiKey) {
      try {
        // Build conversation history
        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-10).map((msg: any) => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content: message }
        ]

        const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama3.1-70b',
            messages,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 0.9
          })
        })

        if (response.ok) {
          const data = await response.json()
          const assistantMessage = data.choices[0].message.content
          return NextResponse.json({ response: assistantMessage })
        }
      } catch (apiError) {
        console.error('Cerebras API error:', apiError)
        // Fall through to mock response
      }
    }

    // Fallback mock responses
    const mockResponse = getMockResponse(message.toLowerCase())
    return NextResponse.json({ response: mockResponse })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Chat failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function getMockResponse(message: string): string {
  if (message.includes('mfsa') || message.includes('malta')) {
    return `**MFSA (Malta Financial Services Authority) KYC Requirements:**

1. **Identity Verification**
   - Valid government-issued photo ID (passport or national ID)
   - Must be current and not expired

2. **Proof of Address**
   - Utility bill, bank statement, or government document
   - Must be dated within the last 3 months
   - Must show full name and residential address

3. **Source of Funds Declaration**
   - Written statement explaining the origin of trading funds
   - Supporting documentation required

4. **Tax Identification**
   - Valid Tax Identification Number (TIN)
   - Required for all traders

5. **Enhanced Due Diligence**
   - For high-risk clients or large transactions
   - Additional documentation may be required

All documents must be clear, legible, and in English or officially translated.`
  }

  if (message.includes('difc') || message.includes('dubai')) {
    return `**DIFC (Dubai International Financial Centre) Requirements:**

1. **Identity Documents**
   - Emirates ID (for UAE residents)
   - Valid passport (for non-residents)

2. **Proof of Address**
   - UAE utility bill (DEWA, Etisalat, Du)
   - Bank statement from UAE bank
   - Must be within 3 months

3. **Visa Documentation**
   - UAE residence visa (if applicable)

4. **Financial Documentation**
   - Bank reference letter
   - Source of wealth documentation

DIFC has stricter requirements for high-net-worth individuals.`
  }

  if (message.includes('source of funds') || message.includes('sof')) {
    return `**Source of Funds (SOF) Verification:**

**Acceptable Sources:**
1. Employment Income - Salary slips, employment contract
2. Business Income - Business registration, financial statements
3. Savings/Investments - Bank statements, portfolio statements
4. Inheritance/Gift - Probate documents, gift deed
5. Property Sale - Sale agreement, bank transfer proof

**Required Documentation:**
- Supporting documents for declared source
- Bank statements showing fund accumulation
- Tax returns (if applicable)

Always request supporting documentation for any declared source.`
  }

  if (message.includes('document') || message.includes('upload')) {
    return `**Document Requirements:**

**Accepted Document Types:**
- Passport or National ID
- Utility bills (electricity, water, gas)
- Bank statements
- Tax documents
- Employment letters
- Proof of address documents

**Document Standards:**
- Must be clear and legible
- No older than 3 months (for proof of address)
- Must show full name and address
- Official stamps/signatures required

Upload documents in PDF, JPG, or PNG format.`
  }

  // Default response
  return `I'm your Deriv Compliance Assistant. I can help you with:

• **KYC Requirements** - MFSA, DIFC, BVI, Vanuatu, Labuan
• **Document Verification** - What documents are needed
• **Compliance Gaps** - How to fix missing requirements
• **Source of Funds** - How to prove fund origins
• **Regulatory Updates** - Latest compliance changes

What specific compliance question can I help you with?`
}
