'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Mail, MapPin, GraduationCap, Award, BookOpen, Users,
  ExternalLink, ChevronDown, ChevronUp, Search,
  FileText, Briefcase, Menu, X, ArrowUp,
  Globe, School, BookMarked, Sparkles, Moon, Sun,
  Calendar, Copy, Check, Clock, Filter, Download,
  Quote, Hash, Command, Library, Microscope, Zap,
  Heart, ArrowRight, Braces, ArrowUpDown, SortAsc, SortDesc,
  TrendingUp, BarChart3, Tag, HomeIcon, Camera, Rss
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { publicAsset } from '@/lib/base-path'
import {
  professorInfo, journalPapers, conferencePapers, patents,
  researchTopics, phdStudents, masterStudents,
  type Publication, type ResearchTopic, type Student
} from '@/lib/data'

// ============ Page Types ============
type PageName = 'home' | 'publications' | 'research' | 'team'

// ============ Animation Variants ============
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
}

// ============ Animated Counter Hook ============
function useAnimatedCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    let rafId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [started, target, duration])

  return { count, ref }
}

// ============ Animated Stat Card ============
function AnimatedStatCard({ stat }: { stat: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string } }) {
  const { count, ref } = useAnimatedCounter(stat.value)
  return (
    <div ref={ref} className={`stat-card bg-gradient-to-br ${stat.color} rounded-xl p-3.5 border border-border/40 text-center cursor-default`}>
      <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1.5" />
      <div className="text-2xl font-bold tracking-tight">{count}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
    </div>
  )
}

// ============ Toast Notification ============
function Toast({ message, visible, onClose }: { message: string; visible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl bg-foreground text-background shadow-xl flex items-center gap-2 text-sm font-medium"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============ Section Divider ============
function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="section-divider">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path
          d={flip ? "M0,20 C360,40 720,0 1080,20 C1260,30 1380,15 1440,20 L1440,0 L0,0 Z" : "M0,20 C360,0 720,40 1080,20 C1260,10 1380,25 1440,20 L1440,40 L0,40 Z"}
          fill="currentColor"
          className="text-muted/30"
        />
      </svg>
    </div>
  )
}

// ============ BibTeX Generator ============
function generateBibTeX(pub: Publication, index: number): string {
  const id = pub.title.split(' ').slice(0, 2).join('').replace(/[^a-zA-Z]/g, '') + pub.year.replace(/[^0-9]/g, '')
  const year = pub.year.match(/\d{4}/)?.[0] || '2024'
  const type = pub.venue.toLowerCase().includes('conference') || pub.venue.toLowerCase().includes('icassp') || pub.venue.toLowerCase().includes('icc') || pub.venue.toLowerCase().includes('globecom') || pub.venue.toLowerCase().includes('wcnc') || pub.venue.toLowerCase().includes('pimrc') || pub.venue.toLowerCase().includes('spawc') || pub.venue.toLowerCase().includes('asilomar') || pub.venue.toLowerCase().includes('iswcs') || pub.venue.toLowerCase().includes('iccc')
    ? 'inproceedings'
    : 'article'
  const entryType = type === 'inproceedings' ? '@inproceedings' : '@article'
  const lines = [
    `${entryType}{${id},`,
    `  author = {${pub.authors}},`,
    `  title = {${pub.title}},`,
    type === 'inproceedings'
      ? `  booktitle = {${pub.venue}},`
      : `  journal = {${pub.venue}},`,
    `  year = {${year}}`,
  ]
  if (pub.link) lines.push(`  url = {${pub.link}}`)
  lines.push('}')
  return lines.join('\n')
}

// ============ Publication Stats ============
function getYearDistribution(pubs: Publication[]): { year: string; count: number }[] {
  const yearMap = new Map<string, number>()
  pubs.forEach(p => {
    const y = p.year.match(/\d{4}/)?.[0] || 'Other'
    yearMap.set(y, (yearMap.get(y) || 0) + 1)
  })
  return Array.from(yearMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year))
}

// ============ Scroll Progress Bar ============
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setProgress(currentProgress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-[oklch(0.45_0.12_260)] to-[oklch(0.50_0.15_220)]"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

// ============ Section Wrapper ============
function SectionWrapper({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight gradient-text leading-tight">
        {children}
      </h2>
      <div className="decorative-line w-20 mt-3 mb-2" />
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}

// ============ Page Hero Banner ============
const pageInfoMap: Record<Exclude<PageName, 'home'>, { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }> = {
  publications: { title: 'Publications', subtitle: 'Selected publications in top-tier journals and conferences', icon: BookOpen },
  research: { title: 'Research', subtitle: 'Exploring the frontiers of wireless communications and signal processing', icon: Microscope },
  team: { title: 'Team', subtitle: 'Meet the talented researchers in our group and explore our lab life', icon: Users },
}

function PageHero({ page }: { page: Exclude<PageName, 'home'> }) {
  const info = pageInfoMap[page]
  return (
    <div className="page-hero-gradient relative overflow-hidden pt-16 md:pt-20">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl" />
        <div className="hero-orb-2 absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" />
        <div className="hero-orb-3 absolute top-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-accent/4 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-sm">
            <info.icon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {info.title}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed md:ml-16"
        >
          {info.subtitle}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="decorative-line w-20 mt-4 md:ml-16"
        />
      </div>
    </div>
  )
}

// ============ Publication Summary Stats Bar ============
function PubStatsBar() {
  const allPubs = useMemo(() => [...journalPapers, ...conferencePapers], [])
  const yearDist = useMemo(() => getYearDistribution(allPubs), [allPubs])
  const maxCount = useMemo(() => Math.max(...yearDist.map(d => d.count)), [yearDist])
  const yearRange = useMemo(() => {
    const years = yearDist.map(d => d.year).filter(y => y !== 'Other')
    if (years.length === 0) return '—'
    return `${years[0]} — ${years[years.length - 1]}`
  }, [yearDist])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-6"
    >
      <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 min-w-0">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">{allPubs.length}</div>
                <div className="text-[10px] text-muted-foreground">Total Pubs</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">{yearRange}</div>
                <div className="text-[10px] text-muted-foreground">Year Range</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">{yearDist.length}</div>
                <div className="text-[10px] text-muted-foreground">Active Years</div>
              </div>
            </div>
          </div>

          {/* Sparkline */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-0.5 h-8" aria-label="Publications by year mini chart">
              {yearDist.map((d) => (
                <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full" title={`${d.year}: ${d.count}`}>
                  <div
                    className="sparkline-bar w-full rounded-t-sm bg-gradient-to-t from-primary/40 to-primary/20 min-h-[2px]"
                    style={{ height: `${(d.count / maxCount) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[0]?.year}</span>
              <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[yearDist.length - 1]?.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ Home Sub-Nav ============
function HomeSubNav() {
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'teaching']
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 160) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const items = [
    { id: 'about', label: 'About' },
    { id: 'teaching', label: 'Teaching' },
  ]

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 py-1.5" aria-label="Page sections">
          {items.map((item, i) => (
            <span key={item.id} className="flex items-center">
              {i > 0 && <span className="text-muted-foreground/30 mx-1 text-[10px]">·</span>}
              <button
                onClick={() => scrollToSection(item.id)}
                className={`home-subnav-item px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}

// ============ Navigation (Page-Based) ============
function Navigation({ currentPage, darkMode, toggleDarkMode, onNavigate }: { currentPage: PageName; darkMode: boolean; toggleDarkMode: () => void; onNavigate: (page: PageName) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: { id: PageName; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'team', label: 'Team', icon: Users },
  ]

  const handleNav = (page: PageName) => {
    onNavigate(page)
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">Y</span>
            </div>
            <span className="font-semibold text-sm md:text-base tracking-tight group-hover:text-primary/80 transition-colors">
              Haifan Yin
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  currentPage === item.id
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <div className="w-px h-5 bg-border mx-2" />
            <a
              href={professorInfo.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all flex items-center gap-1.5"
            >
              <School className="w-4 h-4" />
              Scholar
            </a>
            <button
              onClick={toggleDarkMode}
              className="ml-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition-colors">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-accent transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2.5 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ============ News Ticker ============
function NewsTicker() {
  const items = professorInfo.news || []
  if (items.length === 0) return null
  const doubled = [...items, ...items]
  return (
    <div className="bg-primary/[0.03] dark:bg-primary/[0.06] border-b border-border/30 overflow-hidden">
      <div className="py-2 flex items-center">
        <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary/50 px-3 border-r border-border/30">News</span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-animate flex whitespace-nowrap">
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 mx-6 text-xs text-muted-foreground">
                {item.highlight && (
                  <Badge variant="secondary" className="text-[9px] bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30 py-0 px-1.5">★</Badge>
                )}
                <span className="text-primary/40 font-medium">{item.date}</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ Contact Dialog ============
function ContactDialog() {
  const [copied, setCopied] = useState(false)
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(professorInfo.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent group w-full text-left">
          <Mail className="w-4 h-4 flex-shrink-0 text-primary/50 group-hover:text-primary/70" />
          <span className="truncate">{professorInfo.email}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary/60" />
            Contact
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono">{professorInfo.email}</p>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Address</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {professorInfo.office.slice(0, 3).join(', ')}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${professorInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ============ Hero Section ============
function HeroSection({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <SectionWrapper id="home" className="section-pattern relative overflow-hidden">
      {/* Floating Orbs with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl" style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)` }} />
        <div className="hero-orb-2 absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)` }} />
        <div className="hero-orb-3 absolute top-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-accent/4 blur-3xl" style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 12}px)` }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] rounded-2xl opacity-15 group-hover:opacity-25 transition-opacity blur-md" />
              <Image
                src={publicAsset(professorInfo.photo)}
                alt={`Photo of ${professorInfo.name}`}
                width={288}
                height={370}
                className="relative w-60 h-[310px] md:w-72 md:h-[370px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-col gap-1.5 w-full max-w-[300px]">
              <ContactDialog />
              {[
                { icon: School, label: 'Google Scholar Profile', href: professorInfo.googleScholar, external: true },
                { icon: Globe, label: 'Chinese Site', href: professorInfo.chineseSite.url, external: true },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent group"
                >
                  <link.icon className="w-4 h-4 flex-shrink-0 text-primary/50 group-hover:text-primary/70" />
                  <span className="truncate">{link.label}</span>
                  {link.external && <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <div className="space-y-7">
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-tight">
                {professorInfo.name}
                <span className="typewriter-cursor" />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-2">
                {professorInfo.nameCn} · {professorInfo.title}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/50" />
                <div className="space-y-1.5">
                  {professorInfo.office.map((line, i) => (
                    <p key={i}>
                      {i === 1 ? (
                        <a href={professorInfo.officeLinks[0]?.url} target="_blank" rel="noopener noreferrer" className="academic-link">{line}</a>
                      ) : i === 2 ? (
                        <a href={professorInfo.officeLinks[1]?.url} target="_blank" rel="noopener noreferrer" className="academic-link">{line}</a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-gradient-to-r from-primary/5 via-primary/8 to-primary/3 p-4 rounded-xl border border-primary/10">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-primary/60 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{professorInfo.recruiting}</p>
                </div>
              </div>
            </motion.div>

            {/* Research Topic Tags */}
            <motion.div variants={fadeInUp}>
              <div className="flex flex-wrap gap-2">
                {researchTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onNavigate('research')}
                    className="research-tag-hover inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/5 text-primary/70 border border-primary/10 hover:bg-primary/10 hover:text-primary hover:border-primary/20 cursor-pointer"
                  >
                    <Tag className="w-3 h-3" />
                    {topic.title}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick stats with animated counters */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Journal Papers', value: journalPapers.length, icon: BookOpen, color: 'from-blue-500/10 to-blue-600/5' },
                { label: 'Conf. Papers', value: conferencePapers.length, icon: FileText, color: 'from-emerald-500/10 to-emerald-600/5' },
                { label: 'Patents', value: patents.length, icon: Award, color: 'from-amber-500/10 to-amber-600/5' },
                { label: 'PhD Students', value: phdStudents.length, icon: Users, color: 'from-rose-500/10 to-rose-600/5' },
              ].map((stat) => (
                <AnimatedStatCard key={stat.label} stat={stat} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ About Section (Education, Experience, Honors, Services) ============
function TimelineItem({ period, title, subtitle, isLast = false }: { period: string; title: string; subtitle: string; isLast?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40 mt-1.5 flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
      </div>
      <div className="pb-6">
        <p className="text-xs font-medium text-primary/60 mb-0.5">{period}</p>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Background, honors, and professional services">
          About
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Bio + Education + Experience */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Short Bio */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Short Bio</h3>
              <p className="text-sm leading-[1.8] text-foreground/85">
                {professorInfo.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Education
              </h3>
              <div>
                {professorInfo.education.map((edu, i) => (
                  <TimelineItem
                    key={i}
                    period={edu.year}
                    title={`${edu.degree} in ${edu.field}`}
                    subtitle={edu.school}
                    isLast={i === professorInfo.education.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Work Experience
              </h3>
              <div>
                {professorInfo.experience.map((exp, i) => (
                  <TimelineItem
                    key={i}
                    period={exp.period}
                    title={exp.role}
                    subtitle={exp.org}
                    isLast={i === professorInfo.experience.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Honors + Services */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Honors & Awards */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Honors & Awards
              </h3>
              <div className="space-y-2 max-h-[460px] overflow-y-auto custom-scrollbar pr-2">
                {professorInfo.honors.map((honor, i) => {
                  const isTop = i < 3
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 py-2 px-3 rounded-lg transition-colors ${
                        isTop ? 'bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-800/20' : 'hover:bg-accent/50'
                      }`}
                    >
                      {isTop ? (
                        <Award className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-1.5 flex-shrink-0" />
                      )}
                      <p className={`text-sm leading-relaxed ${isTop ? 'font-medium' : 'text-muted-foreground'}`}>{honor}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Reviewer for
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.reviewer.map((journal) => (
                  <Badge key={journal} variant="secondary" className="text-[11px] bg-primary/5 text-primary/60 border-primary/10 font-normal">
                    {journal}
                  </Badge>
                ))}
              </div>

              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-5 mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                TPC Member
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {professorInfo.services.tpc.map((conf) => (
                  <Badge key={conf} variant="secondary" className="text-[11px] bg-primary/5 text-primary/60 border-primary/10 font-normal">
                    {conf}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ Publications Section ============
function extractYear(yearStr: string): string {
  const match = yearStr.match(/\d{4}/)
  return match ? match[0] : 'Other'
}

function PublicationItem({ pub, index, type }: { pub: Publication; index: number; type: 'journal' | 'conference' }) {
  const [copied, setCopied] = useState(false)
  const [bibtexOpen, setBibtexOpen] = useState(false)
  const [bibtexCopied, setBibtexCopied] = useState(false)
  const citationText = `[${index + 1}] ${pub.authors}, \"${pub.title},\" ${pub.venue}, ${pub.year}.`
  const bibtexText = generateBibTeX(pub, index)

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleCopyBibTeX = () => {
    navigator.clipboard.writeText(bibtexText).then(() => {
      setBibtexCopied(true)
      setTimeout(() => setBibtexCopied(false), 2000)
    })
  }

  return (
    <motion.div variants={staggerItem} className="group">
      <div className="flex gap-3 py-3.5 px-3 rounded-lg hover:bg-accent/50 transition-colors">
        <span className="pub-number text-xs mt-1 flex-shrink-0 tabular-nums">[{index + 1}]</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
            {pub.authors.split(',').map((author, i) => {
              const trimmed = author.trim()
              if (trimmed === 'H. Yin') {
                return <strong key={i} className="text-foreground">{i > 0 ? ', ' : ''}{trimmed}</strong>
              }
              return <span key={i} className="text-muted-foreground">{i > 0 ? ', ' : ''}{trimmed}</span>
            })}
            , &ldquo;<span className="text-foreground/90">{pub.title}</span>,&rdquo;{' '}
            <em className="text-muted-foreground">{pub.venue}</em>, {pub.year}.
            {pub.link && (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1 text-xs">
                [Link]
              </a>
            )}
            {pub.highlight && (
              <span className="ml-2 inline-flex items-center">
                <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
                  {pub.highlight}
                </Badge>
              </span>
            )}
          </p>
          {/* BibTeX expandable */}
          <AnimatePresence>
            {bibtexOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 relative">
                  <pre className="text-[11px] leading-relaxed bg-muted/70 dark:bg-muted/40 rounded-lg p-3 font-mono overflow-x-auto custom-scrollbar border border-border/40">
                    {bibtexText}
                  </pre>
                  <button
                    onClick={handleCopyBibTeX}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                    title="Copy BibTeX"
                  >
                    {bibtexCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="copy-btn p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" title="Copy citation">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setBibtexOpen(!bibtexOpen)} className="copy-btn p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" title={bibtexOpen ? 'Hide BibTeX' : 'Show BibTeX'}>
            <Braces className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function PublicationsSection({ fullPage = false, hideTitle = false }: { fullPage?: boolean; hideTitle?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('journal')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [sortDesc, setSortDesc] = useState(true)
  const [toastVisible, setToastVisible] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // Publication Summary Stats Bar (only on full page)
  const showStatsBar = fullPage

  // Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allYears = useMemo(() => {
    const years = new Set<string>()
    journalPapers.forEach(p => years.add(extractYear(p.year)))
    conferencePapers.forEach(p => years.add(extractYear(p.year)))
    const sorted = Array.from(years).sort((a, b) => b.localeCompare(a))
    return ['all', ...sorted]
  }, [])

  const filterPubs = useCallback((pubs: Publication[]) => {
    let filtered = pubs
    if (yearFilter !== 'all') {
      filtered = filtered.filter(p => extractYear(p.year) === yearFilter)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q) || p.venue.toLowerCase().includes(q)
      )
    }
    if (!sortDesc) {
      filtered = [...filtered].reverse()
    }
    return filtered
  }, [searchQuery, yearFilter, sortDesc])

  const filteredJournals = filterPubs(journalPapers)
  const filteredConferences = filterPubs(conferencePapers)

  const handleDownloadBibTeX = () => {
    const pubs = activeTab === 'journal' ? filteredJournals : activeTab === 'conference' ? filteredConferences : []
    if (pubs.length === 0) return
    const allBibTeX = pubs.map((pub, i) => generateBibTeX(pub, i)).join('\n\n')
    const blob = new Blob([allBibTeX], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-references.bib`
    a.click()
    URL.revokeObjectURL(url)
    setToastVisible(true)
  }

  return (
    <SectionWrapper id="publications" className="dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        {!hideTitle && (
          <SectionTitle subtitle="Selected publications in top-tier journals and conferences">
            Publications
          </SectionTitle>
        )}

        {/* Publication Summary Stats Bar */}
        {showStatsBar && <PubStatsBar />}

        {/* Search & Filter */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={searchRef}
              placeholder="Search by title, author, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-16 bg-card"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 bg-muted rounded border border-border/50">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </div>
          <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1 min-w-0 flex-1">
                {allYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setYearFilter(year)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all shrink-0 ${
                      yearFilter === year
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {year === 'all' ? 'All' : year}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
              <button
                onClick={() => setSortDesc(!sortDesc)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title={sortDesc ? 'Sort: Newest first' : 'Sort: Oldest first'}
              >
                {sortDesc ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
              </button>
              {activeTab !== 'patents' && (
                <button
                  onClick={handleDownloadBibTeX}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  title="Download BibTeX"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="min-w-0">
            <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain pb-1 -mx-0.5 px-0.5 sm:mx-0 sm:px-0">
              <TabsList className="mb-6 w-max min-w-full justify-between sm:w-fit sm:min-w-0 sm:justify-center">
              <TabsTrigger value="journal" className="gap-1.5">
                <BookOpen className="w-4 h-4" />
                Journal Papers
                <Badge variant="secondary" className="ml-1 text-xs">{filteredJournals.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="conference" className="gap-1.5">
                <FileText className="w-4 h-4" />
                Conference Papers
                <Badge variant="secondary" className="ml-1 text-xs">{filteredConferences.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="patents" className="gap-1.5">
                <Award className="w-4 h-4" />
                Patents
                <Badge variant="secondary" className="ml-1 text-xs">{patents.length}</Badge>
              </TabsTrigger>
            </TabsList>
            </div>

            <TabsContent value="journal">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-2`}>
                  {filteredJournals.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} index={i} type="journal" />
                  ))}
                  {filteredJournals.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">No results found.</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conference">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-2`}>
                  {filteredConferences.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} index={i} type="conference" />
                  ))}
                  {filteredConferences.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">No results found.</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patents">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-5`}>
                  <div className="grid sm:grid-cols-2 gap-x-8">
                    {patents.map((patent, i) => (
                      <motion.div key={i} variants={staggerItem} className="flex gap-2 py-1.5 text-sm">
                        <span className="pub-number text-xs mt-0.5 flex-shrink-0">[{i + 1}]</span>
                        <span className="text-muted-foreground break-words [overflow-wrap:anywhere]">{patent}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </SectionWrapper>
  )
}

// ============ Research Section ============
function ResearchCard({ topic, index }: { topic: ResearchTopic; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div variants={staggerItem}>
      <Card className="overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 group research-card-glow">
        <div className="grid md:grid-cols-[320px_1fr] gap-0">
          <div className="relative h-52 md:h-auto md:min-h-[240px] overflow-hidden">
            <Image
              src={publicAsset(topic.image)}
              alt={topic.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-lg drop-shadow-md">{topic.title}</h3>
              {topic.subtitle && (
                <p className="text-white/80 text-xs font-medium">{topic.subtitle}</p>
              )}
            </div>
          </div>

          <CardContent className="p-5 md:p-6 flex flex-col">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {topic.description}
            </p>
            {/* Impact tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topic.id === 'massive-mimo' && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">50% perf. reduction addressed</Badge>}
              {topic.id === 'fdd-mimo' && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">CSI feedback optimization</Badge>}
              {topic.id === 'pilot-contamination' && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">1000+ citations</Badge>}
              {topic.id === 'ris' && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">Stephen O. Rice Prize</Badge>}
              {topic.id === 'superdirective' && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">M² directivity achieved</Badge>}
            </div>

            {topic.papers.length > 0 && (
              <div className="mt-4 flex-1">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  {expanded ? 'Hide' : 'Show'} Key Papers ({topic.papers.length})
                  {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {topic.papers.map((paper, i) => (
                          <div key={i} className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-2.5">
                            <span className="font-medium text-foreground/70">[{i + 1}]</span>{' '}
                            {paper.citation}
                            {paper.link && (
                              <a href={paper.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1 text-xs">[Link]</a>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {topic.blogPosts && topic.blogPosts.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-2">Blog Posts:</p>
                <div className="flex flex-wrap gap-2">
                  {topic.blogPosts.map((post, i) => (
                    <a
                      key={i}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs academic-link flex items-center gap-1"
                    >
                      {post.title}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

function ResearchSection({ hideTitle = false }: { hideTitle?: boolean } = {}) {
  return (
    <SectionWrapper id="research" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Exploring the frontiers of wireless communications and signal processing">
            Research
          </SectionTitle>
        )}

        <div className="space-y-6">
          {researchTopics.map((topic, i) => (
            <ResearchCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ Students Section ============
function StudentCard({ student }: { student: Student }) {
  const [showPapers, setShowPapers] = useState(false)
  const isPhd = student.degree === 'phd'
  const degreeClass = isPhd ? 'student-card-phd' : 'student-card-master'

  return (
    <motion.div variants={staggerItem}>
      <Card className={`overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 h-full student-card-accent ${degreeClass} student-card-hover`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-primary/10 flex-shrink-0">
              <Image
                src={publicAsset(student.avatar)}
                alt={student.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-sm">
                  {student.name}
                  <span className="text-muted-foreground font-normal ml-1.5">({student.nameCn})</span>
                </h4>
                <Badge
                  className={`text-[10px] px-2 py-0 border ${
                    isPhd
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/15 dark:text-rose-400 dark:border-rose-800/25'
                      : 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/15 dark:text-teal-400 dark:border-teal-800/25'
                  }`}
                >
                  {isPhd ? 'Ph.D.' : 'Master'}
                </Badge>
              </div>

              {student.coSupervised && (
                <p className="text-xs text-primary/60 mt-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Co-supervised with {student.coSupervised}
                </p>
              )}

              <a
                href={`mailto:${student.email}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-1"
              >
                <Mail className="w-3 h-3" />
                {student.email}
              </a>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.researchTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-[11px] bg-primary/5 text-primary/70 border-primary/10">
                    {topic}
                  </Badge>
                ))}
              </div>

              {/* Patent count */}
              {student.patents && student.patents.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                  <Award className="w-3 h-3" />
                  <span>{student.patents.length} patent{student.patents.length > 1 ? 's' : ''}</span>
                </div>
              )}

              {student.awards && student.awards.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  {student.awards.slice(0, 2).map((award, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                      <Award className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{award.length > 50 ? award.slice(0, 50) + '...' : award}</span>
                    </div>
                  ))}
                  {student.awards.length > 2 && (
                    <span className="text-xs text-muted-foreground ml-4">+{student.awards.length - 2} more</span>
                  )}
                </div>
              )}

              {student.papers && student.papers.length > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowPapers(!showPapers)}
                    className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    {showPapers ? 'Hide' : 'Show'} Papers ({student.papers.length})
                    {showPapers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <AnimatePresence>
                    {showPapers && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                          {student.papers.map((paper, i) => (
                            <div key={i} className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-2">
                              <span className="font-medium text-foreground/70">[{i + 1}]</span>{' '}
                              {paper.citation}
                              {paper.link && (
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1">[Link]</a>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* View Profile link */}
              <div className="mt-3 pt-2 border-t border-border/30">
                <span className="text-[11px] text-primary/50 font-medium flex items-center gap-1 cursor-default">
                  <ArrowRight className="w-3 h-3" />
                  View Profile
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StudentsSection({ hideTitle = false }: { hideTitle?: boolean } = {}) {
  const [topicFilter, setTopicFilter] = useState<string>('all')

  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    phdStudents.forEach(s => s.researchTopics.forEach(t => topics.add(t)))
    masterStudents.forEach(s => s.researchTopics.forEach(t => topics.add(t)))
    return ['all', ...Array.from(topics).sort()]
  }, [])

  const filteredPhd = useMemo(() => {
    if (topicFilter === 'all') return phdStudents
    return phdStudents.filter(s => s.researchTopics.includes(topicFilter))
  }, [topicFilter])

  const filteredMaster = useMemo(() => {
    if (topicFilter === 'all') return masterStudents
    return masterStudents.filter(s => s.researchTopics.includes(topicFilter))
  }, [topicFilter])

  return (
    <SectionWrapper id="students" className="dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Meet the talented researchers in our group">
            Students
          </SectionTitle>
        )}

        {/* Research Topic Filter */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setTopicFilter(topic)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all font-medium ${
                  topicFilter === topic
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {topic === 'all' ? 'All Topics' : topic}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <GraduationCap className="w-5 h-5 text-primary/60" />
            <h3 className="text-lg font-semibold">Ph.D. Students</h3>
            <Badge variant="secondary" className="text-xs">{filteredPhd.length}</Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhd.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredPhd.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Ph.D. students match the selected topic.</div>
          )}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-2.5 mb-5">
            <BookOpen className="w-5 h-5 text-primary/60" />
            <h3 className="text-lg font-semibold">Master Students</h3>
            <Badge variant="secondary" className="text-xs">{filteredMaster.length}</Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaster.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredMaster.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Master students match the selected topic.</div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ============ Teaching Section ============
function TeachingSection() {
  const teachingData = professorInfo.teaching || []
  const allPubs = [...journalPapers, ...conferencePapers]
  const yearDist = getYearDistribution(allPubs)
  const maxCount = Math.max(...yearDist.map(d => d.count))

  return (
    <SectionWrapper id="teaching" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Courses taught at Huazhong University of Science and Technology">
          Teaching
        </SectionTitle>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Courses */}
          <motion.div variants={fadeInUp}>
            <div className="grid sm:grid-cols-2 gap-4">
              {teachingData.map((course, i) => (
                <Card key={i} className="border-border/60 hover:shadow-md transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary/20" />
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Library className="w-4 h-4 text-primary/50" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-[10px] bg-primary/5 text-primary/60 border-primary/10 mb-2">
                            {course.semester}
                          </Badge>
                          <p className="text-sm font-medium leading-relaxed">{course.course}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Publication Year Distribution Mini-Chart */}
          <motion.div variants={fadeInUp}>
            <Card className="border-border/60 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-4 h-4 text-primary/50" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Publication Timeline</h3>
                </div>
                <div className="flex items-end gap-1.5 h-28">
                  {yearDist.map((d) => (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-muted-foreground/60 tabular-nums">{d.count}</span>
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary/40 to-primary/20 hover:from-primary/60 hover:to-primary/30 transition-colors cursor-default min-h-[4px]"
                        style={{ height: `${(d.count / maxCount) * 80}px` }}
                        title={`${d.year}: ${d.count} papers`}
                      />
                      <span className="text-[9px] text-muted-foreground/50 tabular-nums">{d.year.slice(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">{journalPapers.length}</div>
                    <div className="text-[10px] text-muted-foreground">Journal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">{conferencePapers.length}</div>
                    <div className="text-[10px] text-muted-foreground">Conference</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">{patents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Patents</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ Footer ============
function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-card border-t border-border/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12">
          {/* Brand & Motto */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{professorInfo.name} ({professorInfo.nameCn})</p>
                <p className="text-[11px] text-muted-foreground">{professorInfo.title}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-4">
              MCSP Lab, School of Electronic Information and Communications, Huazhong University of Science and Technology.
            </p>
            <div className="bg-primary/[0.03] dark:bg-primary/[0.06] rounded-lg px-3 py-2 border border-primary/5">
              <p className="text-[11px] text-muted-foreground/80 italic leading-relaxed">
                &ldquo;Always looking for self-motivated master/Ph.D. students and post-doc researchers.&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              Links
            </h4>
            <div className="space-y-2.5">
              <a href={`mailto:${professorInfo.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Mail className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">{professorInfo.email}</span>
              </a>
              <a href={professorInfo.googleScholar} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <School className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Google Scholar</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://haifanyin.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Rss className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Personal Blog</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={professorInfo.chineseSite.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Globe className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Chinese Site</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            © {currentYear} {professorInfo.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            Last updated: 2024 · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============ Back to Top ============
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0
      setProgress(currentProgress)
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const circumference = 2 * Math.PI * 16
  const strokeDashoffset = circumference - progress * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-background border border-border/60 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="16" fill="none" stroke="oklch(0.90 0.01 240)" strokeWidth="2.5" className="dark:stroke-[oklch(0.25_0.01_260)]" />
            <circle
              cx="22" cy="22" r="16" fill="none"
              stroke="oklch(0.45 0.12 260)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="dark:stroke-[oklch(0.70_0.10_220)] transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <ArrowUp className="w-4 h-4 text-foreground/70 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ============ Page Components ============
function HomePage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main>
      <HomeSubNav />
      <HeroSection onNavigate={onNavigate} />
      <SectionDivider />
      <AboutSection />
      <SectionDivider flip />
      <TeachingSection />
    </main>
  )
}

function PublicationsPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main>
      <PageHero page="publications" />
      <PublicationsSection fullPage hideTitle />
    </main>
  )
}

function ResearchPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main>
      <PageHero page="research" />
      <ResearchSection hideTitle />
    </main>
  )
}

function TeamPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const [activeTab, setActiveTab] = useState<string>('students')

  // Album data - team photos and research images
  const albumPhotos = useMemo(() => [
    { src: '/professor.jpg', caption: 'Prof. Haifan Yin', category: 'Professor' },
    ...phdStudents.map(s => ({ src: s.avatar, caption: `${s.nameCn} ${s.name}`, category: 'Ph.D.' })),
    ...masterStudents.map(s => ({ src: s.avatar, caption: `${s.nameCn} ${s.name}`, category: 'Master' })),
    ...researchTopics.map(t => ({ src: t.image, caption: t.title, category: 'Research' })),
  ], [])

  return (
    <main>
      <PageHero page="team" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-navigation tabs */}
        <div className="sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 py-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'students'
                  ? 'text-primary bg-primary/5 border border-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Students
            </button>
            <button
              onClick={() => setActiveTab('album')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'album'
                  ? 'text-primary bg-primary/5 border border-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent'
              }`}
            >
              <Camera className="w-4 h-4" />
              Album
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <StudentsSection hideTitle />
            </motion.div>
          )}
          {activeTab === 'album' && (
            <motion.div
              key="album"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="py-8"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">Team Album</h2>
                <p className="text-sm text-muted-foreground mt-1">Our team members and research highlights</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albumPhotos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="group relative"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                      <Image
                        src={publicAsset(photo.src)}
                        alt={photo.caption}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-2 px-1">
                      <p className="text-xs font-medium truncate">{photo.caption}</p>
                      <Badge variant="secondary" className="text-[9px] mt-0.5 bg-primary/5 text-primary/60 border-primary/10">
                        {photo.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

// ============ Hash Routing Utility ============
function getInitialPage(): PageName {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  if (hash === 'publications' || hash === 'research' || hash === 'team') return hash
  return 'home'
}

// ============ Main Page ============
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageName>(getInitialPage)
  const [darkMode, setDarkMode] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'publications' || hash === 'research' || hash === 'team') {
        setCurrentPage(hash)
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), [])

  const handleNavigate = useCallback((page: PageName) => {
    setCurrentPage(page)
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname)
    } else {
      window.history.pushState(null, '', `${window.location.pathname}#${page}`)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage === 'home' && <ScrollProgress />}
      <Navigation currentPage={currentPage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onNavigate={handleNavigate} />
      {currentPage === 'home' && <NewsTicker />}

      <div className="flex-1">
        <AnimatePresence>
          {currentPage === 'home' && (
            <motion.div key="home" {...pageTransition}>
              <HomePage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'publications' && (
            <motion.div key="publications" {...pageTransition}>
              <PublicationsPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'research' && (
            <motion.div key="research" {...pageTransition}>
              <ResearchPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'team' && (
            <motion.div key="team" {...pageTransition}>
              <TeamPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
      <BackToTop />
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  )
}
