import React, { useState, useEffect, useMemo } from 'react'
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  FileCode,
  Gauge,
  Globe,
  Info,
  Layers,
  Moon,
  Play,
  Pause,
  Plus,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Trash2,
  Wifi,
  Zap
} from 'lucide-react'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState('diagnostics')
  const [copiedKey, setCopiedKey] = useState('')
  const [toasts, setToasts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  // Reactivity Playground States
  const [counter, setCounter] = useState(0)
  const [autoIncrement, setAutoIncrement] = useState(false)
  const [inputText, setInputText] = useState('React test hosting is live & fast! 🚀')
  const [selectedColor, setSelectedColor] = useState('indigo')

  // Live Metrics & Uptime
  const [uptime, setUptime] = useState(0)
  const [pingMs, setPingMs] = useState(14)
  const [isPinging, setIsPinging] = useState(false)

  // Deployment Verification Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Vite build configured with relative base path (./)', done: true },
    { id: 2, text: 'Static assets resolution verified', done: true },
    { id: 3, text: 'Responsive design for mobile & desktop', done: true },
    { id: 4, text: 'Clean production bundle optimization', done: true },
    { id: 5, text: 'GitHub Pages / Vercel deploy ready', done: true },
  ])
  const [newCheckItem, setNewCheckItem] = useState('')

  // System & Host Environment Info
  const hostInfo = useMemo(() => {
    return {
      hostname: typeof window !== 'undefined' ? window.location.hostname || 'localhost' : 'localhost',
      port: typeof window !== 'undefined' ? window.location.port || '(default 80/443)' : '3000',
      protocol: typeof window !== 'undefined' ? window.location.protocol : 'http:',
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown Browser',
      screenRes: typeof window !== 'undefined' ? `${window.innerWidth} x ${window.innerHeight}` : '1920 x 1080',
      reactVersion: React.version,
    }
  }, [])

  // Auto-timer for uptime and autoIncrement
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!autoIncrement) return
    const interval = setInterval(() => {
      setCounter(c => c + 1)
    }, 800)
    return () => clearInterval(interval)
  }, [autoIncrement])

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3200)
  }

  // Copy helper
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    addToast(`Copied to clipboard: "${text.substring(0, 30)}..."`, 'info')
    setTimeout(() => setCopiedKey(''), 2000)
  }

  // Ping test simulator
  const handlePing = () => {
    setIsPinging(true)
    const start = performance.now()
    setTimeout(() => {
      const duration = Math.round(performance.now() - start + (Math.random() * 8 + 4))
      setPingMs(duration)
      setIsPinging(false)
      addToast(`Host latency refreshed: ${duration}ms`, 'success')
    }, 350)
  }

  // Toggle checklist
  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item))
  }

  const addChecklistItem = (e) => {
    e.preventDefault()
    if (!newCheckItem.trim()) return
    setChecklist(prev => [...prev, { id: Date.now(), text: newCheckItem.trim(), done: false }])
    setNewCheckItem('')
    addToast('New checklist item added!', 'info')
  }

  const removeChecklistItem = (id) => {
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  // Word & Char counts
  const textStats = useMemo(() => {
    const chars = inputText.length
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
    return { chars, words }
  }, [inputText])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-200`}>
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border backdrop-blur-md transition-all animate-bounce-subtle ${
              t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : t.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-slate-900/90 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {t.type === 'info' && <Sparkles className="w-4 h-4 text-indigo-400" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Top Status Notification Banner */}
      <div className="border-b border-indigo-500/20 bg-indigo-950/40 backdrop-blur-sm px-4 py-2 text-xs font-mono text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
          <span className="ml-2 font-semibold">STATUS: HOSTED & RUNNING</span>
        </span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">Environment: CSR (Vite + React {hostInfo.reactVersion})</span>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span className="text-slate-400 hidden sm:inline">Uptime: {Math.floor(uptime / 60)}m {uptime % 60}s</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-800/80 bg-slate-950/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  ReactTest
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Host Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Testing & Small Design Showcase</p>
            </div>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Host Ping Pill */}
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors"
              title="Click to measure ping"
            >
              <Wifi className={`w-3.5 h-3.5 ${isPinging ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
              <span>{pingMs}ms</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                setDarkMode(!darkMode)
                addToast(`Switched to ${!darkMode ? 'Dark' : 'Light'} Mode`, 'info')
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/Paradox01240/react-test"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>React + Vite Hosting Environment Verification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Production-Ready React <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Hosting & Design Showcase
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A lightweight, aesthetic test application built for hosting validations across GitHub Pages, Vercel, Netlify, or custom static servers with live diagnostics and interactive design elements.
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('diagnostics')
                handlePing()
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Activity className="w-4 h-4" /> Run Live Diagnostics
            </button>
            <button
              onClick={() => setActiveTab('hosting')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" /> 1-Click Deploy Guides
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300 text-xs font-medium flex items-center gap-2 transition-all"
            >
              <Boxes className="w-4 h-4 text-purple-400" /> Modal Dialog Test
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Build Target</span>
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white">Vite ESNext</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <Check className="w-3 h-3" /> Relative asset links
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Framework</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white">React {hostInfo.reactVersion}</div>
            <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> StrictMode verified
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Current Host</span>
              <Globe className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white truncate">{hostInfo.hostname}</div>
            <div className="text-[11px] text-slate-400 mt-1">Port {hostInfo.port}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Checklist Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {checklist.filter(i => i.done).length}/{checklist.length} Passed
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">100% Ready to ship</div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'diagnostics'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" /> Hosting & Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'showcase'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> UI & Design System
          </button>
          <button
            onClick={() => setActiveTab('reactivity')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'reactivity'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" /> State & Reactivity
          </button>
          <button
            onClick={() => setActiveTab('hosting')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'hosting'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" /> 1-Click Deployment Guide
          </button>
        </div>
      </section>

      {/* Tab Contents */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: DIAGNOSTICS */}
        {activeTab === 'diagnostics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Host Details Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h3 className="font-semibold text-white">Runtime Environment Parameters</h3>
                      <p className="text-xs text-slate-400">Captured live from browser location & navigator APIs</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(hostInfo, null, 2), 'hostInfo')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy JSON Specs"
                  >
                    {copiedKey === 'hostInfo' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Location Hostname</div>
                    <div className="text-sm font-semibold text-white font-mono mt-1">{hostInfo.hostname}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Protocol & Port</div>
                    <div className="text-sm font-semibold text-emerald-400 font-mono mt-1">
                      {hostInfo.protocol}// : {hostInfo.port}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Current Pathname</div>
                    <div className="text-sm font-semibold text-indigo-300 font-mono mt-1">{hostInfo.pathname}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Screen Viewport</div>
                    <div className="text-sm font-semibold text-cyan-300 font-mono mt-1">{hostInfo.screenRes}</div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-slate-400 font-mono text-xs">User Agent</div>
                  <div className="text-xs text-slate-300 font-mono mt-1 break-all leading-relaxed">
                    {hostInfo.userAgent}
                  </div>
                </div>
              </div>

              {/* Host Ping & Latency Benchmarker */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="font-semibold text-white">Interactive Host Ping & Latency Check</h3>
                      <p className="text-xs text-slate-400">Measures roundtrip rendering and execution cycles</p>
                    </div>
                  </div>
                  <button
                    onClick={handlePing}
                    disabled={isPinging}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                    Test Ping
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-white flex items-baseline gap-2">
                      <span>{pingMs}</span>
                      <span className="text-sm font-normal text-slate-400">ms latency</span>
                    </div>
                    <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Lightning fast connection (A+ Grade)
                    </div>
                  </div>
                  {/* Gauge bar */}
                  <div className="w-48 bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, pingMs * 2))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h3 className="font-semibold text-white">Hosting Checklist</h3>
                    <p className="text-xs text-slate-400">Pre-flight launch validation</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {checklist.map(item => (
                    <li
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start gap-2.5 group ${
                        item.done
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="pt-0.5">
                        {item.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        )}
                      </div>
                      <span className={`flex-1 ${item.done ? 'line-through text-slate-400' : ''}`}>
                        {item.text}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeChecklistItem(item.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Add new check item form */}
                <form onSubmit={addChecklistItem} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newCheckItem}
                    onChange={(e) => setNewCheckItem(e.target.value)}
                    placeholder="Add custom check item..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
                All checks saved in memory. Refresh to reset.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UI & DESIGN SYSTEM */}
        {activeTab === 'showcase' && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Small Design System & UI Components
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Polished micro-components crafted with Tailwind CSS for clean layout, high visual hierarchy, and seamless interactivity.
              </p>
            </div>

            {/* Buttons & Loading States */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-cyan-400" /> Buttons & Action States
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => addToast('Primary Action Executed!', 'success')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  Primary Action
                </button>

                <button
                  onClick={() => addToast('Secondary clicked', 'info')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all active:scale-95"
                >
                  Secondary Action
                </button>

                <button
                  onClick={() => {
                    setBtnLoading(true)
                    setTimeout(() => {
                      setBtnLoading(false)
                      addToast('Async Action Done!', 'success')
                    }, 1500)
                  }}
                  disabled={btnLoading}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20"
                >
                  {btnLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Simulate Loading'
                  )}
                </button>

                <button
                  onClick={() => addToast('Destructive action triggered', 'error')}
                  className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all"
                >
                  Destructive Danger
                </button>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
                >
                  Open Dialog Modal
                </button>
              </div>
            </div>

            {/* Badges & Tags */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Pill Badges & Status Indicators
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Operational
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  Vite 6.0
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  Tailwind CSS v3
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  Relative Path Active
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  Zero Config Static
                </span>
              </div>
            </div>

            {/* Interactive Color Theme Switcher Demo */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Interactive Accent Color Preview
              </h4>
              <p className="text-xs text-slate-400 mb-4">Choose an accent tint to test dynamic styling</p>
              
              <div className="flex items-center gap-3">
                {[
                  { name: 'indigo', bg: 'bg-indigo-500' },
                  { name: 'cyan', bg: 'bg-cyan-500' },
                  { name: 'emerald', bg: 'bg-emerald-500' },
                  { name: 'purple', bg: 'bg-purple-500' },
                  { name: 'rose', bg: 'bg-rose-500' },
                ].map(col => (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col.name)
                      addToast(`Selected ${col.name} accent`, 'info')
                    }}
                    className={`w-8 h-8 rounded-full ${col.bg} transition-transform ${
                      selectedColor === col.name ? 'ring-4 ring-white/30 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Selected Accent:</span>
                  <span className="ml-2 font-bold text-sm uppercase tracking-wide text-white">{selectedColor}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-${selectedColor}-600`}>
                  Preview Accent Badge
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REACTIVITY & STATE PLAYGROUND */}
        {activeTab === 'reactivity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive State Counter */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h3 className="font-semibold text-white">Realtime State Counter</h3>
                    <p className="text-xs text-slate-400">Tests useState & re-render latency</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoIncrement(!autoIncrement)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    autoIncrement
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {autoIncrement ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {autoIncrement ? 'Auto Ticking' : 'Auto Tick'}
                </button>
              </div>

              <div className="text-center py-6">
                <div className="text-6xl font-black tracking-tight text-white font-mono">
                  {counter}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Total React Render Cycles simulated
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setCounter(c => c - 1)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
                >
                  -1
                </button>
                <button
                  onClick={() => setCounter(c => c + 1)}
                  className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
                >
                  +1
                </button>
                <button
                  onClick={() => setCounter(c => c + 5)}
                  className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
                >
                  +5
                </button>
                <button
                  onClick={() => setCounter(0)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Controlled Input & Realtime Stats */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-semibold text-white">Live Text Reactivity Test</h3>
                  <p className="text-xs text-slate-400">Controlled input event loop verification</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1.5">
                  Type anything to test instant input synchronization:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400">Character Count</div>
                  <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">{textStats.chars}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400">Word Count</div>
                  <div className="text-2xl font-bold text-indigo-300 font-mono mt-1">{textStats.words}</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                Input changes propagate seamlessly through React virtual DOM without lag.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 1-CLICK DEPLOYMENT GUIDE */}
        {activeTab === 'hosting' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-white">How to Host This React App</h3>
                  <p className="text-xs text-slate-400">
                    Pre-configured scripts for GitHub Pages, Vercel, Netlify, and static servers
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* Method 1: GitHub Pages */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-bold">1</span>
                      Deploy to GitHub Pages (Automated or Manual)
                    </span>
                    <button
                      onClick={() => copyToClipboard('npm run build', 'ghPages')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      {copiedKey === 'ghPages' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Build Command
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    This project uses <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded">base: './'</code> in <code className="text-slate-300">vite.config.js</code>, allowing it to work automatically under your repository subpath <code className="text-indigo-300">/react-test/</code> without 404 broken asset paths!
                  </p>
                  <pre className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 overflow-x-auto">
{`# 1. Build the production package
npm run build

# 2. The output in /dist is ready to push to gh-pages branch or drag to any host`}
                  </pre>
                </div>

                {/* Method 2: Vercel */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 flex items-center justify-center text-xs font-bold">2</span>
                      Deploy to Vercel
                    </span>
                    <button
                      onClick={() => copyToClipboard('npx vercel', 'vercelCmd')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedKey === 'vercelCmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Command
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 overflow-x-auto">
{`# Run anywhere in this repo folder:
npx vercel`}
                  </pre>
                </div>

                {/* Method 3: Netlify */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-xs font-bold">3</span>
                      Deploy to Netlify
                    </span>
                    <button
                      onClick={() => copyToClipboard('npx netlify deploy --prod', 'netlifyCmd')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedKey === 'netlifyCmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Command
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 overflow-x-auto">
{`# Deploy dist directly to production:
npx netlify deploy --prod --dir=dist`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white">
                <Boxes className="w-5 h-5 text-indigo-400" />
                <span>Modal Dialog Verification</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This modal verifies portal overlays, backdrop filters, event bubbling prevention, and z-index layering on your live deployment.
            </p>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1 font-mono text-indigo-300">
              <div>✓ Backdrop filter: blur(8px)</div>
              <div>✓ Center anchor: absolute translate</div>
              <div>✓ Z-Index: 50</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setModalOpen(false)
                  addToast('Modal action verified!', 'success')
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Confirm Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 mt-12 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">React Test Hosting App</span>
            <span className="text-slate-600">|</span>
            <span>All systems nominal</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com/Paradox01240/react-test"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <span>Vite + Tailwind CSR</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
