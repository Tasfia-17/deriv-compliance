'use client'

import { useState } from 'react'
import { 
  ShieldCheck, Upload, FileText, CheckCircle2, AlertCircle, 
  MessageSquare, BarChart3, Users, Settings, Home, Folder,
  Plus, Search, Filter, Clock, Globe, Activity
} from 'lucide-react'
import DocumentUpload from './DocumentUpload'
import ComplianceResults from './ComplianceResults'
import ChatAssistant from './ChatAssistant'

type View = 'overview' | 'documents' | 'upload' | 'results' | 'chat' | 'analytics'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('overview')
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([])
  const [complianceResults, setComplianceResults] = useState<any>(null)

  const handleDocumentUploaded = (doc: any) => {
    setUploadedDocs(prev => [...prev, doc])
    setCurrentView('documents')
  }

  const handleAnalysisComplete = (results: any) => {
    setComplianceResults(results)
    setCurrentView('results')
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 bg-white/5 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/10">
            <ShieldCheck className="w-6 h-6 text-deriv-red" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-xl text-white/90">Deriv</span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-black">Compliance</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'documents', icon: Folder, label: 'Documents' },
            { id: 'upload', icon: Upload, label: 'Upload KYC' },
            { id: 'results', icon: BarChart3, label: 'Analysis' },
            { id: 'chat', icon: MessageSquare, label: 'AI Assistant' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id
                  ? 'bg-deriv-red/10 border border-deriv-red/20 text-deriv-red'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <div className="glass-card rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-deriv-green" />
              <span className="text-xs font-bold text-white">System Status</span>
            </div>
            <p className="text-[10px] text-white/40">All systems operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {currentView === 'overview' && <OverviewView docs={uploadedDocs} />}
        {currentView === 'documents' && <DocumentsView docs={uploadedDocs} onAnalyze={handleAnalysisComplete} />}
        {currentView === 'upload' && <DocumentUpload onUploadComplete={handleDocumentUploaded} />}
        {currentView === 'results' && <ComplianceResults results={complianceResults} />}
        {currentView === 'chat' && <ChatAssistant />}
      </main>
    </div>
  )
}

function OverviewView({ docs }: { docs: any[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Compliance Overview</h1>
        <p className="text-white/40">Monitor KYC verification across all jurisdictions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-deriv-red/60" />
            <span className="text-2xl font-bold text-white">{docs.length}</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Documents Uploaded</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-8 h-8 text-deriv-green/60" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Compliant Traders</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-500/60" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Pending Review</h3>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/5">
        <h2 className="text-xl font-bold text-white mb-6">Jurisdiction Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['MFSA (Malta)', 'DIFC (UAE)', 'BVI', 'Vanuatu', 'Labuan'].map((jurisdiction) => (
            <div key={jurisdiction} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <Globe className="w-4 h-4 text-deriv-red/60" />
              <span className="text-xs text-white/80">{jurisdiction}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DocumentsView({ docs, onAnalyze }: { docs: any[], onAnalyze: (results: any) => void }) {
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
          <p className="text-white/40">{docs.length} KYC documents uploaded</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={selectedDocs.length === 0 || analyzing}
          className="px-6 py-3 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red font-medium hover:bg-deriv-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? 'Analyzing...' : `Analyze Selected (${selectedDocs.length})`}
        </button>
      </div>

      {docs.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
          <Upload className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No documents yet</h3>
          <p className="text-white/40 mb-6">Upload KYC documents to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {docs.map((doc) => (
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
                <FileText className="w-8 h-8 text-deriv-red/60" />
                <div className="flex-grow">
                  <h3 className="text-white font-medium">{doc.name}</h3>
                  <p className="text-xs text-white/40">{doc.type} • {doc.size}</p>
                </div>
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
