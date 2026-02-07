'use client'

import { FileText, CheckCircle2, AlertCircle, Upload, BarChart3 } from 'lucide-react'

type SubView = 'overview' | 'documents' | 'upload' | 'analysis' | 'chat' | 'document_detail' | 'issue_detail'

interface Props {
  workspace: any
  documents: any[]
  onNavigate: (view: SubView) => void
}

export default function WorkspaceOverview({ workspace, documents, onNavigate }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Workspace Overview</h1>
        <p className="text-white/40">Monitor compliance status and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-deriv-red/60" />
            <span className="text-2xl font-bold text-white">{documents.length}</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Documents</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-8 h-8 text-deriv-green/60" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Compliant</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-500/60" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Issues</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('upload')}
            className="glass-card rounded-xl p-6 border border-white/5 hover:border-deriv-red/20 transition-all text-left group"
          >
            <Upload className="w-8 h-8 text-deriv-red/60 mb-4 group-hover:text-deriv-red transition-all" />
            <h3 className="text-lg font-bold text-white mb-2">Upload Documents</h3>
            <p className="text-sm text-white/40">Add KYC documents for analysis</p>
          </button>

          <button
            onClick={() => onNavigate('analysis')}
            className="glass-card rounded-xl p-6 border border-white/5 hover:border-deriv-red/20 transition-all text-left group"
          >
            <BarChart3 className="w-8 h-8 text-deriv-red/60 mb-4 group-hover:text-deriv-red transition-all" />
            <h3 className="text-lg font-bold text-white mb-2">Run Analysis</h3>
            <p className="text-sm text-white/40">Check compliance status</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      {documents.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Recent Documents</h2>
          <div className="space-y-3">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc.id} className="glass-card rounded-xl p-4 border border-white/5 flex items-center gap-4">
                <FileText className="w-6 h-6 text-deriv-red/60" />
                <div className="flex-grow">
                  <h4 className="text-white font-medium">{doc.name}</h4>
                  <p className="text-xs text-white/40">{doc.uploadedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
