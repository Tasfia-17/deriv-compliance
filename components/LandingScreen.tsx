'use client'

import { ShieldCheck, Zap, LayoutGrid, Activity, Sparkles, Cpu, Database, LockKeyhole } from 'lucide-react'

interface LandingScreenProps {
  onGetStarted: () => void
}

export default function LandingScreen({ onGetStarted }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-deriv-red/5 rounded-full blur-[140px] animate-glow pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/5 rounded-full blur-[120px] animate-glow pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

      {/* Header */}
      <header className="p-8 flex justify-between items-center relative z-20 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white/5 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,68,79,0.1)]">
            <ShieldCheck className="w-6 h-6 text-deriv-red" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-2xl tracking-tight text-white/90 leading-none">Deriv Compliance</span>
            <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-black mt-1">AI Copilot</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hidden md:block">Powered by AI</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 text-center max-w-6xl mx-auto py-20">
        
        {/* Central Intelligence Stage */}
        <div className="relative mb-20 animate-fade-in group" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-deriv-red/20 rounded-full blur-[100px] animate-pulse scale-90 opacity-40 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Orbital Rings */}
            <div className="absolute inset-0 border border-white/[0.03] rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-4 border border-deriv-red/5 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute inset-12 border border-white/[0.08] rounded-full animate-[spin_40s_linear_infinite]" />
            
            {/* Core Container */}
            <div className="w-40 h-40 rounded-[56px] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transform rotate-6 group-hover:rotate-0 transition-all duration-700">
               <div className="absolute inset-0 bg-gradient-to-tr from-deriv-red/10 via-transparent to-white/5 opacity-50" />
               <ShieldCheck className="w-20 h-20 text-deriv-red drop-shadow-[0_0_15px_rgba(255,68,79,0.4)]" strokeWidth={1} />
            </div>

            {/* Orbiting Nodes */}
            <div className="absolute -top-4 right-10 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center animate-float shadow-xl">
               <Cpu className="w-6 h-6 text-white/40" />
            </div>
            <div className="absolute bottom-10 -left-6 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center animate-float-slow shadow-xl">
               <Database className="w-7 h-7 text-deriv-red/40" />
            </div>
            <div className="absolute top-1/2 -right-12 w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center animate-float shadow-xl">
               <LockKeyhole className="w-5 h-5 text-white/30" />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-8 mb-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-deriv-red/20 bg-deriv-red/5 text-deriv-red text-[9px] font-black uppercase tracking-[0.3em] animate-fade-in shadow-inner" style={{ animationDelay: '400ms' }}>
             <Sparkles className="w-3 h-3" />
             AI-Powered KYC Automation
          </div>
          
          <h1 className="font-serif italic text-6xl md:text-9xl text-white leading-[0.95] tracking-tight animate-fade-in" style={{ animationDelay: '600ms' }}>
            Compliance <br />
            <span className="text-deriv-red">in Minutes.</span>
          </h1>
          
          <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '800ms' }}>
            Automate KYC verification across 5 jurisdictions. Turn 2,000 weekly alerts into 50 high-confidence cases. 72-hour onboarding becomes 15 minutes.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20 animate-fade-in" style={{ animationDelay: '1000ms' }}>
          {[
            { icon: Zap, title: "Instant Analysis", desc: "Real-time document verification" },
            { icon: LayoutGrid, title: "Multi-Jurisdiction", desc: "MFSA, DIFC, BVI, Vanuatu, Labuan" },
            { icon: Activity, title: "Behavioral Intelligence", desc: "Detect profile drift patterns" }
          ].map((feat, i) => (
            <div key={i} className="glass-card rounded-[32px] p-8 border border-white/5 hover:border-deriv-red/20 transition-all flex flex-col items-center group cursor-default bg-white/[0.01]">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-deriv-red/10 group-hover:border-deriv-red/20 transition-all">
                 <feat.icon className="w-7 h-7 text-deriv-red/60 group-hover:text-deriv-red group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 tracking-wide">{feat.title}</h3>
              <p className="text-[11px] text-white/30 uppercase tracking-[0.1em] font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-8 animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <button 
            onClick={onGetStarted}
            className="group relative px-16 py-6 rounded-[40px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
             <div className="absolute inset-0 bg-white/5 backdrop-blur-[40px]" />
             <div className="absolute inset-0 bg-noise opacity-[0.08]" />
             <div className="absolute inset-0 border border-white/10 group-hover:border-deriv-red/50 transition-colors rounded-[40px]" />
             <div className="absolute inset-0 bg-gradient-to-br from-deriv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[40px]" />
             
             <span className="relative text-white font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3">
               Launch Platform
               <Sparkles className="w-4 h-4" />
             </span>
          </button>
          
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium">
            Enterprise-Grade • 5 Jurisdictions • Real-Time AI
          </p>
        </div>
      </main>
    </div>
  )
}
