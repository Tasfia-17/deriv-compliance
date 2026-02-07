'use client'

import { useState } from 'react'
import { FileText, Clock, CheckCircle2 } from 'lucide-react'

interface Props {
  documents: any[]
  onViewDocument: (doc: any) => void
  onAnalyze: (results: any) => void
}

export default function WorkspaceDocuments({ documents, onViewDocument, onAnalyze }: Props) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (selectedDocs.length === 0) return
    
    setAnalyzing(true)
    try {
      const response = await fetch('/api/compliance/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: selectedDocs })
      })
      const results = await response.json()
      onAnalyze(results)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif italic text-white mb-2">Documents</h1>
          <p className="text-white/40">{documents.length} documents uploaded</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={selectedDocs.length === 0 || analyzing}
          className="px-6 py-3 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red font-medium hover:bg-deriv-red/20 transition-all disabled:opacity-50"
        >
          {analyzing ? 'Analyzing...' : `Analyze Selected (${selectedDocs.length})`}
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No documents yet</h3>
          <p className="text-white/40">Upload KYC documents to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
                selectedDocs.includes(doc.id)
                  ? 'border-deriv-red/50 bg-deriv-red/5'
                  : 'border-white/5 hover:border-white/10'
              }`}
              onClick={() => {
                setSelectedDocs(prev =>
                  prev.includes(doc.id)
                    ? prev.filter(id => id !== doc.id)
                    : [...prev, doc.id]
                )
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedDocs.includes(doc.id) ? 'bg-deriv-red/20' : 'bg-white/5'
                }`}>
                  {selectedDocs.includes(doc.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-deriv-red" />
                  ) : (
                    <FileText className="w-6 h-6 text-white/40" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-medium">{doc.name}</h3>
                  <p className="text-xs text-white/40">{doc.type} • {doc.size}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewDocument(doc)
                  }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  View Details
                </button>
                <Clock className="w-4 h-4 text-white/40" />
                <span className="text-xs text-white/40">{doc.uploadedAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
