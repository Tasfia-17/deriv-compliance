'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, CheckCircle2, X } from 'lucide-react'

interface DocumentUploadProps {
  onUploadComplete: (doc: any) => void
}

export default function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      onUploadComplete({
        id: data.id,
        name: selectedFile.name,
        type: selectedFile.type,
        size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
        uploadedAt: new Date().toLocaleString(),
        url: data.url
      })

      setSelectedFile(null)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-serif italic text-white mb-2">Upload KYC Documents</h1>
        <p className="text-white/40">Upload trader documents for compliance verification</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/5">
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            dragActive
              ? 'border-deriv-red/50 bg-deriv-red/5'
              : 'border-white/10 hover:border-white/20'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {selectedFile ? selectedFile.name : 'Drop KYC documents here'}
          </h3>
          <p className="text-white/40 mb-6">
            or click to browse • PDF, DOCX, JPG, PNG supported
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all cursor-pointer"
          >
            Browse Files
          </label>
        </div>

        {selectedFile && (
          <div className="mt-6 flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-deriv-red/60" />
              <div>
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-xs text-white/40">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-2 bg-deriv-red/10 border border-deriv-red/20 rounded-lg text-deriv-red font-medium hover:bg-deriv-red/20 transition-all disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-bold text-white mb-4">Supported Document Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Passport',
            'National ID',
            'Utility Bill',
            'Bank Statement',
            'Proof of Address',
            'Tax Document',
            'Employment Letter',
            'Source of Funds'
          ].map((docType) => (
            <div key={docType} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-deriv-green/60" />
              <span className="text-xs text-white/80">{docType}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
