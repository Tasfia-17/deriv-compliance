'use client'

import { Plus, Folder, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

interface Workspace {
  id: string
  name: string
  description: string
  createdAt: string
}

interface Props {
  workspaces: Workspace[]
  onCreateWorkspace: () => void
  onSelectWorkspace: (workspace: Workspace) => void
}

export default function OrganizationDashboard({ workspaces, onCreateWorkspace, onSelectWorkspace }: Props) {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Organization Overview</h1>
        <p className="text-white/40">Manage compliance across all workspaces</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <Folder className="w-8 h-8 text-deriv-red/60" />
            <span className="text-2xl font-bold text-white">{workspaces.length}</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Workspaces</h3>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-blue-500/60" />
            <span className="text-2xl font-bold text-white">0</span>
          </div>
          <h3 className="text-sm font-medium text-white/60">Total Documents</h3>
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

      {/* Workspaces */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Workspaces</h2>
          <button
            onClick={onCreateWorkspace}
            className="flex items-center gap-2 px-4 py-2 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red hover:bg-deriv-red/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Workspace</span>
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
            <Folder className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No workspaces yet</h3>
            <p className="text-white/40 mb-6">Create your first workspace to start managing compliance</p>
            <button
              onClick={onCreateWorkspace}
              className="px-6 py-3 bg-deriv-red/10 border border-deriv-red/20 rounded-xl text-deriv-red hover:bg-deriv-red/20 transition-all"
            >
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => onSelectWorkspace(workspace)}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-deriv-red/20 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-deriv-red/10 rounded-xl flex items-center justify-center group-hover:bg-deriv-red/20 transition-all">
                    <Folder className="w-6 h-6 text-deriv-red" />
                  </div>
                  <Clock className="w-4 h-4 text-white/40" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{workspace.name}</h3>
                <p className="text-sm text-white/40 mb-4 line-clamp-2">{workspace.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span>0 documents</span>
                  <span>•</span>
                  <span>0 issues</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
