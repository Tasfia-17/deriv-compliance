// Demo data for testing without actual uploads

export const DEMO_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'passport_john_doe.pdf',
    type: 'application/pdf',
    size: '2.4 MB',
    uploadedAt: new Date().toLocaleString(),
    content: `
      PASSPORT
      Republic of Malta
      
      Surname: DOE
      Given Names: JOHN MICHAEL
      Nationality: MALTESE
      Date of Birth: 15/03/1985
      Sex: M
      Place of Birth: VALLETTA
      Date of Issue: 01/01/2020
      Date of Expiry: 01/01/2030
      Passport No: MT1234567
      
      Authority: PASSPORT OFFICE MALTA
    `
  },
  {
    id: 'doc-2',
    name: 'utility_bill_jan_2026.pdf',
    type: 'application/pdf',
    size: '1.8 MB',
    uploadedAt: new Date().toLocaleString(),
    content: `
      ENEMALTA CORPORATION
      Electricity Bill
      
      Account Holder: John Michael Doe
      Service Address: 
      123 Republic Street
      Valletta VLT 1234
      Malta
      
      Billing Period: 01/01/2026 - 31/01/2026
      Bill Date: 05/02/2026
      Due Date: 20/02/2026
      
      Account Number: MT-ELEC-789456
      Total Amount Due: €85.50
    `
  },
  {
    id: 'doc-3',
    name: 'bank_statement_dec_2025.pdf',
    type: 'application/pdf',
    size: '3.1 MB',
    uploadedAt: new Date().toLocaleString(),
    content: `
      BANK OF VALLETTA PLC
      Account Statement
      
      Account Holder: John Michael Doe
      Account Number: MT98VALL12345000000012345678
      Statement Period: 01/12/2025 - 31/12/2025
      
      Opening Balance: €15,240.00
      Closing Balance: €18,650.00
      
      Recent Transactions:
      05/12/2025 - Salary Credit - €3,500.00
      10/12/2025 - Rent Payment - €850.00
      15/12/2025 - Utilities - €120.00
      20/12/2025 - Groceries - €320.00
      
      Bank Address: 58 Zachary Street, Valletta VLT 1130, Malta
    `
  }
]

export const DEMO_COMPLIANCE_RESULT = {
  jurisdiction: 'MFSA',
  jurisdictionName: 'Malta Financial Services Authority',
  documentCount: 3,
  analysis: {
    compliant: false,
    score: 75,
    gaps: [
      {
        requirement: 'Source of Funds Declaration',
        status: 'missing',
        severity: 'critical',
        recommendation: 'Trader must provide a signed declaration explaining the source of funds for trading activities. This can be employment income, savings, investments, or other legitimate sources.'
      },
      {
        requirement: 'Tax Identification Number (TIN)',
        status: 'missing',
        severity: 'high',
        recommendation: 'MFSA requires a valid Tax Identification Number for all traders. Request the trader\'s Maltese TIN or foreign tax ID if applicable.'
      },
      {
        requirement: 'Employment Verification',
        status: 'incomplete',
        severity: 'medium',
        recommendation: 'While bank statement shows salary credits, formal employment verification (employment letter or contract) is recommended for complete compliance.'
      }
    ],
    summary: 'The trader has provided valid identification (passport) and proof of address (utility bill dated within 3 months). Bank statement confirms financial activity and residential address. However, critical gaps remain: missing source of funds declaration and tax identification number. These must be obtained before account activation to meet MFSA Article 9.4 requirements.'
  },
  analyzedAt: new Date().toISOString()
}

export const DEMO_CHAT_RESPONSES: Record<string, string> = {
  'mfsa': `MFSA (Malta Financial Services Authority) KYC requirements include:

1. **Identity Verification**
   - Valid government-issued photo ID (passport or national ID card)
   - Must be current and not expired

2. **Proof of Address**
   - Utility bill, bank statement, or government document
   - Must be dated within the last 3 months
   - Must show full name and residential address

3. **Source of Funds Declaration**
   - Written statement explaining the origin of trading funds
   - Supporting documentation (employment letter, bank statements, etc.)

4. **Tax Identification**
   - Valid Tax Identification Number (TIN)
   - Required for all traders regardless of jurisdiction

5. **Enhanced Due Diligence (if applicable)**
   - For high-risk clients or large transactions
   - Additional documentation may be required

All documents must be clear, legible, and in English or officially translated.`,

  'difc': `DIFC (Dubai International Financial Centre) compliance requirements:

1. **Identity Documents**
   - Emirates ID (for UAE residents)
   - Valid passport (for non-residents)
   - Must include photo and signature

2. **Proof of Address**
   - UAE utility bill (DEWA, Etisalat, Du)
   - Bank statement from UAE bank
   - Tenancy contract (Ejari registered)
   - Must be within 3 months

3. **Visa Documentation**
   - UAE residence visa (if applicable)
   - Entry stamp or visa page from passport

4. **Financial Documentation**
   - Bank reference letter
   - Source of wealth documentation
   - Salary certificate (if employed)

5. **Additional Requirements**
   - Completed KYC questionnaire
   - Risk assessment form
   - Beneficial ownership declaration (for entities)

DIFC has stricter requirements for high-net-worth individuals and corporate accounts.`,

  'source of funds': `Source of Funds (SOF) verification is critical for AML compliance:

**What is Source of Funds?**
Documentation proving where the money used for trading comes from.

**Acceptable Sources:**
1. **Employment Income**
   - Salary slips (last 3 months)
   - Employment contract
   - Tax returns

2. **Business Income**
   - Business registration documents
   - Financial statements
   - Tax filings

3. **Savings/Investments**
   - Bank statements showing accumulated savings
   - Investment portfolio statements
   - Dividend statements

4. **Inheritance/Gift**
   - Probate documents
   - Gift deed
   - Lawyer's letter

5. **Property Sale**
   - Sale agreement
   - Bank transfer proof
   - Property documents

**Red Flags:**
- Vague explanations
- Inconsistent information
- Large unexplained deposits
- Third-party funding

Always request supporting documentation for any declared source.`,

  'document expiry': `Document expiry rules across jurisdictions:

**Identity Documents:**
- **Passport**: Must be valid (not expired)
- **National ID**: Must be current
- **Grace Period**: Some jurisdictions allow 6-month grace before expiry

**Proof of Address:**
- **Standard**: Within 3 months of issue date
- **MFSA**: 3 months
- **DIFC**: 3 months
- **BVI**: 3 months
- **Vanuatu**: 6 months (more lenient)
- **Labuan**: 3 months

**Bank Statements:**
- Must be within 3 months
- Should show at least 3 months of transaction history
- Must be official (not screenshots)

**Employment Documents:**
- Employment letters: Within 6 months
- Salary slips: Last 3 consecutive months
- Tax returns: Most recent fiscal year

**Best Practice:**
- Set up automated expiry alerts
- Request document renewal 30 days before expiry
- Maintain document version history
- Flag accounts with expiring documents

**Compliance Tip:**
Always verify the issue date, not just the expiry date. A utility bill dated 4 months ago is non-compliant even if the account is still active.`
}
