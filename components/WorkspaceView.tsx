'use client'

import { useState } from 'react'
import { Home, Folder, Upload, BarChart3, MessageSquare, Users, AlertCircle } from 'lucide-react'
import WorkspaceOverview from './workspace/WorkspaceOverview'
import WorkspaceDocuments from './workspace/WorkspaceDocuments'
import WorkspaceUpload from './workspace/WorkspaceUpload'
import WorkspaceAnalysis from './workspace/WorkspaceAnalysis'
import WorkspaceChat from './workspace/WorkspaceChat'
import DocumentDetail from './workspace/DocumentDetail'
import IssueDetail from './workspace/IssueDetail'

interface Workspace {
  id: string
  name: string
  description: string
  createdAt: string
}

interface Props {
  workspace: Workspace
}

type SubView = 'overview' | 'documents' | 'upload' | 'analysis' | 'chat' | 'document_detail' | 'issue_detail'

export default function WorkspaceView({ workspace }: Props) {
  const [currentSubView, setCurrentSubView] = useState<SubView>('overview')
  const [documents, setDocuments] = useState<any[]>([])
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [selectedIssue, setSelectedIssue] = useState<any>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleDocumentUploaded = (doc: any) => {
    setDocuments(prev => [...prev, doc])
    setCurrentSubView('documents')
  }

  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc)
    setCurrentSubView('document_detail')
  }

  const handleViewIssue = (issue: any) => {
    setSelectedIssue(issue)
    setCurrentSubView('issue_detail')
  }

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results)
    setCurrentSubView('analysis')
  }

  return (
    <div className="flex h-screen">
      {/* Workspace Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-1">{workspace.name}</h2>
          <p className="text-xs text-white/40">{workspace.description}</p>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'documents', icon: Folder, label: 'Documents', badge: documents.length },
            { id: 'upload', icon: Upload, label: 'Upload' },
            { id: 'analysis', icon: BarChart3, label: 'Analysis' },
            { id: 'chat', icon: MessageSquare, label: 'AI Assistant' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSubView(item.id as SubView)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                currentSubView === item.id
                  ? 'bg-deriv-red/10 border border-deriv-red/20 text-deriv-red'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8">
        {currentSubView === 'overview' && (
          <WorkspaceOverview 
            workspace={workspace}
            documents={documents}
            onNavigate={setCurrentSubView}
          />
        )}
        {currentSubView === 'documents' && (
          <WorkspaceDocuments
            documents={documents}
            onViewDocument={handleViewDocument}
            onAnalyze={handleAnalysisComplete}
          />
        )}
        {currentSubView === 'upload' && (
          <WorkspaceUpload onUploadComplete={handleDocumentUploaded} />
        )}
        {currentSubView === 'analysis' && (
          <WorkspaceAnalysis 
            results={analysisResults}
            onViewIssue={handleViewIssue}
          />
        )}
        {currentSubView === 'chat' && (
          <WorkspaceChat />
        )}
        {currentSubView === 'document_detail' && selectedDocument && (
          <DocumentDetail 
            document={selectedDocument}
            onBack={() => setCurrentSubView('documents')}
          />
        )}
        {currentSubView === 'issue_detail' && selectedIssue && (
          <IssueDetail
            issue={selectedIssue}
            onBack={() => setCurrentSubView('analysis')}
          />
        )}
      </main>
    </div>
  )
}
