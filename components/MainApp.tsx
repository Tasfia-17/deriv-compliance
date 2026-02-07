'use client'

import { useState } from 'react'
import { ShieldCheck, Plus, Building2, Folder, BarChart3, MessageSquare, Users, FileText, Settings } from 'lucide-react'
import OrganizationDashboard from './OrganizationDashboard'
import WorkspaceView from './WorkspaceView'
import CreateWorkspaceModal from './CreateWorkspaceModal'

type View = 'org_overview' | 'workspace'

interface Workspace {
  id: string
  name: string
  description: string
  createdAt: string
}

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>('org_overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)

  const handleCreateWorkspace = (name: string, description: string) => {
    const newWorkspace: Workspace = {
      id: `ws-${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString()
    }
    setWorkspaces(prev => [...prev, newWorkspace])
    setSelectedWorkspace(newWorkspace)
    setCurrentView('workspace')
    setShowCreateModal(false)
  }

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    setCurrentView('workspace')
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
          <button
            onClick={() => setCurrentView('org_overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'org_overview'
                ? 'bg-deriv-red/10 border border-deriv-red/20 text-deriv-red'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-medium">Organization</span>
          </button>

          <div className="pt-4 pb-2">
            <div className="flex items-center justify-between px-4 mb-2">
              <span className="text-xs uppercase tracking-wider text-white/30 font-bold">Workspaces</span>
              <button
                onClick={() => setShowCreateModal(true)}
                className="p-1 hover:bg-white/5 rounded transition-all"
              >
                <Plus className="w-4 h-4 text-white/40 hover:text-deriv-red" />
              </button>
            </div>
            
            {workspaces.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-xs text-white/30">No workspaces yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-2 text-xs text-deriv-red hover:underline"
                >
                  Create one
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => handleSelectWorkspace(workspace)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      selectedWorkspace?.id === workspace.id && currentView === 'workspace'
                        ? 'bg-white/5 text-white'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Folder className="w-4 h-4" />
                    <span className="text-sm truncate">{workspace.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {currentView === 'org_overview' && (
          <OrganizationDashboard 
            workspaces={workspaces}
            onCreateWorkspace={() => setShowCreateModal(true)}
            onSelectWorkspace={handleSelectWorkspace}
          />
        )}
        {currentView === 'workspace' && selectedWorkspace && (
          <WorkspaceView workspace={selectedWorkspace} />
        )}
      </main>

      {/* Create Workspace Modal */}
      {showCreateModal && (
        <CreateWorkspaceModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateWorkspace}
        />
      )}
    </div>
  )
}
