'use client'

import { CheckCircle2, AlertCircle, XCircle, Globe, FileText, TrendingUp } from 'lucide-react'

interface ComplianceResultsProps {
  results: any
}

export default function ComplianceResults({ results }: ComplianceResultsProps) {
  if (!results) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-serif italic text-white mb-2">Analysis Results</h1>
        <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No analysis results yet. Upload and analyze documents first.</p>
        </div>
      </div>
    )
  }

  const { jurisdiction, jurisdictionName, analysis, documentCount } = results
  
  if (!analysis) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-serif italic text-white mb-2">Analysis Results</h1>
        <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500/40 mx-auto mb-4" />
          <p className="text-white/40">Analysis failed. Please try again.</p>
        </div>
      </div>
    )
  }

  const { compliant, score, gaps, summary } = analysis

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-white/40 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Compliance Analysis</h1>
        <p className="text-white/40">Results for {documentCount} document(s)</p>
      </div>

      {/* Overall Score */}
      <div className="glass-card rounded-2xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-deriv-red/60" />
            <div>
              <h2 className="text-2xl font-bold text-white">{jurisdictionName}</h2>
              <p className="text-sm text-white/40">{jurisdiction}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white mb-1">{score}%</div>
            <p className="text-sm text-white/40">Compliance Score</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
          {compliant ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-deriv-green" />
              <div>
                <p className="text-white font-medium">Compliant</p>
                <p className="text-xs text-white/40">All requirements met</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-white font-medium">Action Required</p>
                <p className="text-xs text-white/40">{gaps.length} gap(s) identified</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-bold text-white mb-3">Executive Summary</h3>
        <p className="text-white/60 leading-relaxed">{summary}</p>
      </div>

      {/* Gaps */}
      {gaps && gaps.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Compliance Gaps</h3>
          {gaps.map((gap: any, index: number) => (
            <div
              key={index}
              className={`glass-card rounded-xl p-6 border ${getSeverityColor(gap.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {gap.severity === 'critical' && <XCircle className="w-6 h-6" />}
                  {gap.severity === 'high' && <AlertCircle className="w-6 h-6" />}
                  {gap.severity === 'medium' && <AlertCircle className="w-6 h-6" />}
                  {gap.severity === 'low' && <AlertCircle className="w-6 h-6" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border">
                      {gap.severity}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border">
                      {gap.status}
                    </span>
                  </div>
                  <h4 className="text-white font-bold mb-2">{gap.requirement}</h4>
                  <p className="text-sm text-white/60 mb-3">{gap.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-bold text-white mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          {gaps.slice(0, 3).map((gap: any, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-deriv-red/60" />
              <p className="text-sm text-white/80">{gap.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
