'use client'

import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Props {
  issue: any
  onBack: () => void
}

export default function IssueDetail({ issue, onBack }: Props) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Analysis</span>
      </button>

      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Issue Details</h1>
        <p className="text-white/40">Compliance gap information and remediation</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/5">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold uppercase text-yellow-500">
                {issue.severity || 'Medium'}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase text-white/60">
                {issue.status || 'Open'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{issue.requirement || 'Compliance Issue'}</h2>
            <p className="text-white/60">{issue.recommendation || 'Recommendation details will appear here.'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Remediation Steps</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-deriv-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-deriv-red">{step}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Step {step}</h4>
                    <p className="text-sm text-white/60">Remediation step description goes here.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Related Documents</h3>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <p className="text-white/60 text-sm">
                Documents related to this issue will be listed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
