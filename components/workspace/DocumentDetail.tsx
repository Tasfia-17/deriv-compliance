'use client'

import { useState } from 'react'
import { ArrowLeft, FileText, Download, Edit3, RefreshCcw, Sparkles } from 'lucide-react'

interface Props {
  document: any
  onBack: () => void
}

type Tab = 'preview' | 'issues' | 'correction'

export default function DocumentDetail({ document, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('preview')
  const [correctedText, setCorrectedText] = useState('')
  const [generating, setGenerating] = useState(false)
  const [exporting, setExporting] = useState(false)

  const mockIssues = [
    {
      requirement: 'Source of Funds Declaration',
      severity: 'critical',
      recommendation: 'Add a signed declaration explaining the source of trading funds'
    },
    {
      requirement: 'Tax Identification Number',
      severity: 'high',
      recommendation: 'Include valid Tax Identification Number (TIN)'
    }
  ]

  // Mock document content for preview
  const mockDocumentContent = `
REPUBLIC OF MALTA
PASSPORT

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

---

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
Total Amount Due: EUR 85.50

---

BANK OF VALLETTA PLC
Account Statement

Account Holder: John Michael Doe
Account Number: MT98VALL12345000000012345678
Statement Period: 01/12/2025 - 31/12/2025

Opening Balance: EUR 15,240.00

Recent Transactions:
05/12/2025  Salary Credit              EUR 3,500.00
10/12/2025  Rent Payment               EUR -850.00
15/12/2025  Utilities Payment          EUR -95.00

Closing Balance: EUR 17,155.00

Bank Address: 58 Zachary Street, Valletta VLT 1130, Malta
  `.trim()

  const handleGenerateCorrection = async () => {
    setGenerating(true)
    console.log('Starting correction generation...')
    console.log('Document:', document)
    
    try {
      const requestBody = {
        documentId: document?.id || 'doc-' + Date.now(),
        issues: mockIssues
      }
      
      console.log('Calling API with:', requestBody)
      
      const response = await fetch('/api/documents/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error:', errorText)
        throw new Error(`API request failed: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Received data:', data)
      
      if (data.correctedText) {
        console.log('Setting corrected text, length:', data.correctedText.length)
        setCorrectedText(data.correctedText)
        setActiveTab('correction')
        console.log('Switched to correction tab')
      } else {
        console.error('No correctedText in response:', data)
        alert('Failed to generate correction: No content received')
      }
    } catch (error) {
      console.error('Generation failed:', error)
      alert(`Failed to generate correction: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setGenerating(false)
      console.log('Generation complete')
    }
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const response = await fetch('/api/documents/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: correctedText || 'Sample document content',
          filename: `corrected_${document.name}`
        })
      })
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `corrected_${document.name}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  const handleDownload = () => {
    if (document.url) {
      window.open(document.url, '_blank')
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Documents</span>
      </button>

      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Document Details</h1>
        <p className="text-white/40">{document.name}</p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download Original</span>
        </button>
        <button
          onClick={handleGenerateCorrection}
          disabled={generating}
          className="px-4 py-2 bg-deriv-red/10 border border-deriv-red/20 rounded-lg text-deriv-red hover:bg-deriv-red/20 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {generating ? (
            <>
              <RefreshCcw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Generate Correction</span>
            </>
          )}
        </button>
        {correctedText && (
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="px-4 py-2 bg-deriv-green/10 border border-deriv-green/20 rounded-lg text-deriv-green hover:bg-deriv-green/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? (
              <>
                <RefreshCcw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="text-sm">Export as PDF</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: 'preview', label: 'Preview' },
          { id: 'issues', label: 'Issues' },
          { id: 'correction', label: 'Correction' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'text-deriv-red border-b-2 border-deriv-red'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-card rounded-2xl p-8 border border-white/5">
        {activeTab === 'preview' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Document Preview</h3>
            <div className="bg-white rounded-xl p-8 border border-gray-200 min-h-[600px] shadow-lg">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-6 text-gray-800 text-sm leading-relaxed">
                  <pre className="whitespace-pre-wrap font-sans">{mockDocumentContent}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Compliance Issues</h3>
            <div className="space-y-4">
              {mockIssues.map((issue, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      issue.severity === 'critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      issue.severity === 'high' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {issue.severity}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-bold mb-2">{issue.requirement}</h4>
                      <p className="text-sm text-white/60">{issue.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'correction' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Corrected Document</h3>
              {correctedText && (
                <button
                  onClick={handleGenerateCorrection}
                  disabled={generating}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Regenerate
                </button>
              )}
            </div>
            {correctedText ? (
              <div className="bg-white rounded-xl p-8 border border-gray-200 min-h-[600px] shadow-lg">
                <div className="max-w-3xl mx-auto">
                  <div className="space-y-6 text-gray-800 text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap font-sans">{correctedText}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-12 border border-white/10 text-center">
                <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 mb-4">No corrected version generated yet</p>
                <button
                  onClick={handleGenerateCorrection}
                  disabled={generating}
                  className="px-6 py-3 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red hover:bg-deriv-red/20 transition-all disabled:opacity-50"
                >
                  {generating ? 'Generating...' : 'Generate Corrected Version'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
