'use client'

import { useState } from 'react'
import LandingScreen from '@/components/LandingScreen'
import MainApp from '@/components/MainApp'

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing')

  return (
    <>
      {currentView === 'landing' && (
        <LandingScreen onGetStarted={() => setCurrentView('app')} />
      )}
      {currentView === 'app' && (
        <MainApp />
      )}
    </>
  )
}
