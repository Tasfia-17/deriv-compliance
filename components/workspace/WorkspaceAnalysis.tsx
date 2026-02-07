'use client'

import ComplianceResults from '../ComplianceResults'

interface Props {
  results: any
  onViewIssue: (issue: any) => void
}

export default function WorkspaceAnalysis({ results, onViewIssue }: Props) {
  return <ComplianceResults results={results} />
}
