'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Mail, MapPin, GraduationCap, Award, BookOpen, Users,
  ExternalLink, ChevronDown, ChevronUp, Search,
  FileText, Briefcase, Menu, X, ArrowUp,
  Globe, School, BookMarked, Sparkles, Moon, Sun,
  Calendar, Copy, Check, Filter, Download,
  Library, Microscope,
  ArrowRight, Braces, SortAsc, SortDesc,
  TrendingUp, Tag, HomeIcon, Camera, Rss, Maximize2, ChevronLeft, ChevronRight,
  Clock, Star, Zap, BarChart3, Quote, Link2,
  Trophy, Users as UsersIcon, BookOpen as BookOpenIcon, Search as SearchIcon
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
  graduatedPhdStudents, graduatedMasterStudents,
  patentBreakdown, citationStats,
  type Publication, type ResearchTopic, type Student
} from '@/lib/data'

// ============ Page Types ============
type PageName = 'home' | 'publications' | 'research' | 'team' | 'teaching' | 'gallery'

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
      // Elastic bounce easing
      const eased = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 3)
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

// ============ Typewriter Hook ============
function useTypewriter(text: string, speed = 80, startDelay = 400) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return displayed
}

// ============ Hero Particles (CSS-only) ============
function HeroParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      size: [2, 3, 3, 4][i % 4],
      opacity: [0.1, 0.15, 0.2, 0.25, 0.3][i % 5],
      duration: 15 + (i * 7 % 16),
      delay: (i * 1.3) % 10,
      top: `${5 + (i * 37 % 85)}%`,
      left: `${3 + (i * 43 % 90)}%`,
    })), [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            top: p.top,
            left: p.left,
            animation: `particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
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

const accentLineMap: Record<string, string> = {
  blue: 'decorative-line-blue',
  emerald: 'decorative-line-emerald',
  violet: 'decorative-line-violet',
  amber: 'decorative-line-amber',
  rose: 'decorative-line-rose',
}

function SectionTitle({ children, subtitle, accent }: { children: React.ReactNode; subtitle?: string; accent?: string }) {
  const accentClass = accent ? accentLineMap[accent] : null
  return (
    <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight gradient-text leading-tight">
        {children}
      </h2>
      <div className={accentClass ? `${accentClass} w-20 mt-3 mb-2` : 'decorative-line w-20 mt-3 mb-2'} />
      {subtitle && (
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  )
}

// ============ Page Hero Banner ============
const pageInfoMap: Record<Exclude<PageName, 'home'>, { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }> = {
  publications: { title: 'Publications', subtitle: 'Selected publications in top-tier journals and conferences', icon: BookOpen },
  research: { title: 'Research', subtitle: 'Exploring the frontiers of wireless communications and signal processing', icon: Microscope },
  team: { title: 'Team', subtitle: 'Meet the talented researchers in our group', icon: Users },
  teaching: { title: 'Teaching', subtitle: 'Courses taught at Huazhong University of Science and Technology', icon: GraduationCap },
  gallery: { title: 'Gallery', subtitle: 'Our team members, research highlights, and lab life', icon: Camera },
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

// ============ Sparkline Chart with Tooltip ============
function SparklineChart({ yearDist, maxCount }: { yearDist: { year: string; count: number }[]; maxCount: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-0.5 h-9" aria-label="Publications by year mini chart">
        {yearDist.map((d, idx) => (
          <div
            key={d.year}
            className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`sparkline-bar w-full rounded-t-sm min-h-[2px] transition-all duration-200 ${
                hoveredIndex === idx
                  ? 'bg-gradient-to-t from-primary to-primary/60'
                  : 'bg-gradient-to-t from-primary/40 to-primary/20'
              }`}
              style={{ height: `${(d.count / maxCount) * 100}%` }}
            />
            {/* Hover year label */}
            {hoveredIndex === idx && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-foreground tabular-nums whitespace-nowrap bg-card px-1.5 py-0.5 rounded shadow-sm border border-border/40">
                {d.year}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Hover tooltip */}
      {hoveredIndex !== null && yearDist[hoveredIndex] && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-foreground text-background text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
            <span className="tabular-nums">{yearDist[hoveredIndex].year}</span>
            <span className="w-px h-3 bg-background/30" />
            <span className="text-primary-foreground/80">{yearDist[hoveredIndex].count} papers</span>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[0]?.year}</span>
        <span className="text-[9px] text-muted-foreground/50 tabular-nums">{yearDist[yearDist.length - 1]?.year}</span>
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
            <SparklineChart yearDist={yearDist} maxCount={maxCount} />
          </div>

          {/* Citation Stats */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/20">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{citationStats.totalCitations.toLocaleString()}</span>
              <span className="text-[9px] text-emerald-600/70 dark:text-emerald-400/60">citations</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200/30 dark:border-violet-800/20">
              <BarChart3 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold text-violet-700 dark:text-violet-400 tabular-nums">h{citationStats.hIndex}</span>
            </div>
          </div>

          {/* Google Scholar Link */}
          <a
            href={professorInfo.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <School className="w-3.5 h-3.5" />
            Google Scholar
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ============ Command Palette ============
type CommandItem = { id: string; label: string; icon: React.ComponentType<{ className?: string }>; group: string; action: () => void }

function CommandPalette({ visible, onClose, onNavigate }: { visible: boolean; onClose: () => void; onNavigate: (page: PageName) => void }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset state when palette opens
  useEffect(() => {
    if (visible) {
      const id = requestAnimationFrame(() => {
        setQuery('')
        setSelectedIndex(0)
        inputRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }
  }, [visible])

  const allItems = useMemo<CommandItem[]>(() => {
    const pages: CommandItem[] = [
      { id: 'p-home', label: 'Home', icon: HomeIcon, group: 'Pages', action: () => onNavigate('home') },
      { id: 'p-res', label: 'Research', icon: Microscope, group: 'Pages', action: () => onNavigate('research') },
      { id: 'p-pub', label: 'Publications', icon: BookOpen, group: 'Pages', action: () => onNavigate('publications') },
      { id: 'p-team', label: 'Team', icon: Users, group: 'Pages', action: () => onNavigate('team') },
      { id: 'p-teach', label: 'Teaching', icon: GraduationCap, group: 'Pages', action: () => onNavigate('teaching') },
      { id: 'p-gal', label: 'Gallery', icon: Camera, group: 'Pages', action: () => onNavigate('gallery') },
    ]
    const pubs: CommandItem[] = [...journalPapers, ...conferencePapers].slice(0, 20).map((p, i) => ({
      id: `pub-${i}`, label: p.title, icon: FileText, group: 'Publications',
      action: () => onNavigate('publications'),
    }))
    const team: CommandItem[] = [...phdStudents, ...masterStudents].map((s, i) => ({
      id: `s-${i}`, label: `${s.name} (${s.nameCn})`, icon: Users, group: 'Team Members',
      action: () => onNavigate('team'),
    }))
    const topics: CommandItem[] = researchTopics.map((t) => ({
      id: `t-${t.id}`, label: t.title, icon: Microscope, group: 'Research Topics',
      action: () => onNavigate('research'),
    }))
    return [...pages, ...pubs, ...team, ...topics]
  }, [onNavigate])

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12)
    const q = query.toLowerCase()
    return allItems.filter(item => {
      const label = item.label.toLowerCase()
      // Search by title or author names for publications
      return label.includes(q)
    }).slice(0, 12)
  }, [query, allItems])

  const executeItem = useCallback((item: CommandItem) => {
    item.action()
    onClose()
  }, [onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault()
      executeItem(filtered[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }, [filtered, selectedIndex, executeItem, onClose])

  // Group filtered items
  const grouped = useMemo(() => {
    const groups: { group: string; items: CommandItem[] }[] = []
    let currentGroup = ''
    for (const item of filtered) {
      if (item.group !== currentGroup) {
        currentGroup = item.group
        groups.push({ group: currentGroup, items: [] })
      }
      groups[groups.length - 1].items.push(item)
    }
    return groups
  }, [filtered])

  // Track flat index for selected item
  const getFlatIndex = useCallback((groupIdx: number, itemIdx: number) => {
    let flat = 0
    for (let g = 0; g < groupIdx; g++) flat += grouped[g].items.length
    return flat + itemIdx
  }, [grouped])

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[110] w-[90vw] max-w-lg bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
              <SearchIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, publications, team, topics..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-mono text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
              {grouped.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">No results found</div>
              )}
              {grouped.map((group, gi) => (
                <div key={group.group} className="mb-1">
                  <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">{group.group}</div>
                  {group.items.map((item, ii) => {
                    const flatIdx = getFlatIndex(gi, ii)
                    return (
                      <button
                        key={item.id}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setSelectedIndex(flatIdx)}
                        className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          flatIdx === selectedIndex
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent/50'
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0 opacity-60" />
                        <span className="truncate flex-1">{item.label}</span>
                        {flatIdx === selectedIndex && (
                          <kbd className="text-[10px] text-muted-foreground/40">↵</kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ============ Publication Highlight Badge Helper ============
function getHighlightBadge(highlight: string): { icon: React.ComponentType<{ className?: string }>; label: string; colorClass: string; borderClass: string } | null {
  const h = highlight.toLowerCase()
  if (h.includes('prize')) {
    return { icon: Trophy, label: highlight, colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30', borderClass: 'border-l-amber-400 dark:border-l-amber-500' }
  }
  if (h.includes('esi') || h.includes('highly cited')) {
    return { icon: Star, label: highlight, colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30', borderClass: 'border-l-emerald-400 dark:border-l-emerald-500' }
  }
  if (h.includes('invited')) {
    return { icon: Sparkles, label: highlight, colorClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800/30', borderClass: 'border-l-violet-400 dark:border-l-violet-500' }
  }
  return null
}

// ============ Navigation (Page-Based) ============
function Navigation({ currentPage, darkMode, toggleDarkMode, onNavigate }: { currentPage: PageName; darkMode: boolean; toggleDarkMode: () => void; onNavigate: (page: PageName) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? Math.min(1, window.scrollY / totalHeight) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: { id: PageName; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'teaching', label: 'Teaching', icon: GraduationCap },
    { id: 'gallery', label: 'Gallery', icon: Camera },
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
          ? 'bg-background/90 dark:bg-neutral-900/90 shadow-sm border-b border-border/50'
          : 'bg-background/60 dark:bg-neutral-900/60'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)', WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleNav('home')} className="flex items-center group">
            <Image
                src="/MCSP_LAB_logo.svg"
                alt="MCSP Lab"
                width={200}
                height={22}
                className="h-10 md:h-14 w-auto object-contain"
                priority
              />
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
            <button
              onClick={toggleDarkMode}
              className="ml-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-1">
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[280px] max-w-[80vw] bg-background border-l border-border/60 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                <div className="flex items-center">
                  <Image
                    src="/MCSP_LAB_logo.svg"
                    alt="MCSP Lab"
                    width={160}
                    height={18}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
              {/* Nav Items */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'text-primary bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className={`w-4.5 h-4.5 ${currentPage === item.id ? 'text-primary' : ''}`} />
                    {item.label}
                    {currentPage === item.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </nav>
              {/* Drawer Footer */}
              <div className="border-t border-border/40 px-3 py-4 space-y-2">
                <a
                  href={`mailto:${professorInfo.email}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary/50" />
                  Contact
                </a>
                <button
                  onClick={() => { toggleDarkMode(); setMobileOpen(false) }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-primary/50" /> : <Moon className="w-4 h-4 text-primary/50" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Scroll Progress Bar */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary/80 via-primary/60 to-primary/20 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </motion.header>
  )
}

// ============ Mobile Bottom Tab Bar ============
function MobileBottomNav({ currentPage, onNavigate }: { currentPage: PageName; onNavigate: (page: PageName) => void }) {
  const tabs: { id: PageName; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'publications', label: 'Papers', icon: BookOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'teaching', label: 'Teaching', icon: GraduationCap },
    { id: 'gallery', label: 'Gallery', icon: Camera },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/90 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]"
      style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-center justify-around px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 rounded-lg min-w-[56px] transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground/70 active:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] leading-tight font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobileBottomNav"
                  className="absolute -top-px left-3 right-3 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ============ News Ticker ============
const topicGradientMap: Record<string, string> = {
  'massive-mimo': 'from-blue-600 to-indigo-800',
  'ris': 'from-emerald-600 to-teal-800',
  'fdd-mimo': 'from-violet-600 to-purple-800',
  'superdirective': 'from-rose-600 to-pink-800',
  'channel-prediction': 'from-amber-600 to-orange-800',
  'holographic': 'from-cyan-600 to-blue-800',
}

function NewsTicker() {
  const [paused, setPaused] = useState(false)
  const items = professorInfo.news || []
  if (items.length === 0) return null
  const doubled = [...items, ...items]
  return (
    <div
      className="group bg-primary/[0.03] dark:bg-primary/[0.06] border-b border-border/30 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="py-2 flex items-center">
        <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary/50 px-3 border-r border-border/30">News</span>
        <div className="overflow-hidden flex-1 relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--color-bg,white)] dark:from-[var(--color-bg-dark,#171717)] to-transparent z-10 pointer-events-none" />
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-bg,white)] dark:from-[var(--color-bg-dark,#171717)] to-transparent z-10 pointer-events-none" />
          <div
            className={`ticker-animate flex whitespace-nowrap ${paused ? '[animation-play-state:paused]' : 'group-hover:[animation-play-state:paused]'}`}
          >
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 mx-6 text-xs text-muted-foreground">
                {item.highlight && (
                  <Badge variant="secondary" className="text-[9px] bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30 py-0 px-1.5">★</Badge>
                )}
                <span className="text-primary/40 font-medium">{item.date}</span>
                <span>{item.text}</span>
                {/* Separator dot between items */}
                <span className="ml-4 w-1 h-1 rounded-full bg-border/60 flex-shrink-0" aria-hidden="true" />
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

// ============ Key Highlights Metrics Ribbon ============
function KeyHighlightsRibbon() {
  const stats = [
    { label: 'Total Publications', value: journalPapers.length + conferencePapers.length, icon: FileText },
    { label: 'Journal Papers', value: journalPapers.length, icon: BookOpen },
    { label: 'Conference Papers', value: conferencePapers.length, icon: BookMarked },
    { label: 'Patents', value: patents.length, icon: Award },
    { label: 'Research Areas', value: researchTopics.length, icon: Microscope },
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[oklch(0.30_0.08_260)] via-[oklch(0.28_0.06_250)] to-[oklch(0.32_0.07_270)]">
      {/* Decorative floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white/10 blur-sm" />
        <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-white/5 blur-sm" />
        <div className="absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-white/10 blur-sm" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4">
          {stats.map((stat) => (
            <HighlightStat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  )
}

function HighlightStat({ stat }: { stat: { label: string; value: number; icon: React.ComponentType<{ className?: string }> } }) {
  const { count, ref } = useAnimatedCounter(stat.value, 1800)
  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2 group cursor-default">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
        <stat.icon className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums group-hover:scale-105 transition-transform duration-300">{count}</div>
      <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider group-hover:text-white/70 transition-colors">{stat.label}</div>
    </div>
  )
}

// ============ Hero Section ============
function HeroSection({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const typedName = useTypewriter(professorInfo.name)

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
      {/* Gradient mesh background layer */}
      <div className="hero-mesh-bg" aria-hidden="true" />
      {/* Floating Orbs with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-orb-1 absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl" style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)` }} />
        <div className="hero-orb-2 absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)` }} />
        <div className="hero-orb-3 absolute top-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-accent/4 blur-3xl" style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 12}px)` }} />
        <HeroParticles />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-14 items-start">
          {/* Photo */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center md:items-start">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[oklch(0.45_0.12_260)] to-[oklch(0.35_0.08_220)] rounded-2xl opacity-15 group-hover:opacity-25 transition-opacity blur-md" />
              <div className="relative w-60 h-[310px] md:w-72 md:h-[370px] rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/professor.jpg"
                  alt="Prof. Haifan Yin"
                  width={288}
                  height={370}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-tight overflow-hidden">
                {typedName}
                <span className="typewriter-cursor" />
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mt-2">
                {professorInfo.nameCn} · {professorInfo.title}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/50" />
                <div className="space-y-1.5 text-xs sm:text-sm break-words">
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
                  <p className="text-xs sm:text-sm leading-relaxed">{professorInfo.recruiting}</p>
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

            {/* Scroll Down Indicator */}
            <motion.div
              variants={fadeInUp}
              className="hidden md:flex items-center justify-center pt-4"
            >
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col items-center gap-1.5 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors group cursor-pointer"
              >
                <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ About Section (Education, Experience, Honors, Services) ============
function TimelineItem({ period, title, subtitle, isLast = false, Icon }: { period: string; title: string; subtitle: string; isLast?: boolean; Icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40 mt-1.5 flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
      </div>
      <div className="pb-6">
        <p className="text-xs font-medium text-primary/60 mb-0.5 tabular-nums">{period}</p>
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
        <SectionTitle accent="blue" subtitle="Background, honors, and professional services">
          About
        </SectionTitle>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Bio + Education + Experience */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Research Mission Statement */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent border border-primary/10 p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-primary/70" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">Research Mission</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Advancing the frontiers of 5G/6G wireless communications through fundamental research in massive MIMO, reconfigurable intelligent surfaces, and channel prediction — bridging theory and practice with real-world prototyping.
                  </p>
                </div>
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Short Bio</h3>
              <p className="text-sm leading-[1.8] text-foreground/85 bio-text-highlight rounded-lg px-1 -mx-1 py-0.5">
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
                    Icon={i === 0 ? GraduationCap : undefined}
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
                    Icon={i === 0 ? Briefcase : undefined}
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
                  const yearMatch = honor.match(/\b(19\d{2}|20\d{2})\b/)
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
                      <p className={`text-sm leading-relaxed flex-1 ${isTop ? 'font-medium' : 'text-muted-foreground'}`}>{honor}</p>
                      {yearMatch && (
                        <span className="text-[10px] text-muted-foreground/50 tabular-nums flex-shrink-0 mt-0.5">{yearMatch[0]}</span>
                      )}
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

function getVenueBadge(venue: string): { label: string; colorClass: string } | null {
  const v = venue.toLowerCase()
  if (v.includes('ieee transactions on wireless communications')) return { label: 'IEEE TWC', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25' }
  if (v.includes('ieee transactions on communications') && !v.includes('wireless')) return { label: 'IEEE TCOM', colorClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/15 dark:text-teal-400 dark:border-teal-800/25' }
  if (v.includes('ieee journal on selected areas')) return { label: 'IEEE JSAC', colorClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25' }
  if (v.includes('ieee transactions on signal processing')) return { label: 'IEEE TSP', colorClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/15 dark:text-rose-400 dark:border-rose-800/25' }
  if (v.includes('ieee transactions on antennas')) return { label: 'IEEE TAP', colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25' }
  if (v.includes('ieee transactions on vehicular')) return { label: 'IEEE TVT', colorClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/15 dark:text-cyan-400 dark:border-cyan-800/25' }
  if (v.includes('ieee wireless communications letters')) return { label: 'IEEE WCL', colorClass: 'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-900/15 dark:text-lime-400 dark:border-lime-800/25' }
  if (v.includes('ieee communications magazine')) return { label: 'IEEE COM', colorClass: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/15 dark:text-pink-400 dark:border-pink-800/25' }
  if (v.includes('globecom')) return { label: 'GLOBECOM', colorClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/15 dark:text-orange-400 dark:border-orange-800/25' }
  if (v.includes('ieee icc') || v === 'ieee icc 2013, budapest, hungary' || v === '2022 ieee icc, seoul, south korea' || v === '2020 ieee icc, dublin, ireland') return { label: 'ICC', colorClass: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/15 dark:text-sky-400 dark:border-sky-800/25' }
  if (v.includes('icassp')) return { label: 'ICASSP', colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/15 dark:text-indigo-400 dark:border-indigo-800/25' }
  if (v.includes('submitted') || v === 'submitted') return { label: 'Submitted', colorClass: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/15 dark:text-gray-400 dark:border-gray-700/25' }
  const words = venue.split(' ').slice(0, 3).join(' ')
  return { label: words.length > 20 ? words.slice(0, 20) + '…' : words, colorClass: 'bg-neutral-50 text-neutral-600 border-neutral-200 dark:bg-neutral-800/15 dark:text-neutral-400 dark:border-neutral-700/25' }
}

function PublicationItem({ pub, index, type }: { pub: Publication; index: number; type: 'journal' | 'conference' }) {
  const [copied, setCopied] = useState(false)
  const [bibtexOpen, setBibtexOpen] = useState(false)
  const [bibtexCopied, setBibtexCopied] = useState(false)
  const [abstractOpen, setAbstractOpen] = useState(false)
  const citationText = `[${index + 1}] ${pub.authors}, \"${pub.title},\" ${pub.venue}, ${pub.year}.`
  const bibtexText = generateBibTeX(pub, index)
  const highlightBadge = pub.highlight ? getHighlightBadge(pub.highlight) : null

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
      <div className={`flex gap-3 py-3.5 px-3 rounded-lg hover:bg-accent/50 transition-colors ${highlightBadge ? `border-l-[3px] ${highlightBadge.borderClass}` : ''}`}>
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
            {(() => { const badge = getVenueBadge(pub.venue); return badge ? (
              <Badge variant="secondary" className={`text-[9px] px-1.5 py-0 rounded ml-1.5 align-middle border ${badge.colorClass}`}>{badge.label}</Badge>
            ) : null })()}
            {pub.link && (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="academic-link ml-1 text-xs">
                [Link]
              </a>
            )}
            {pub.highlight && (
              <span className="ml-2 inline-flex items-center gap-1">
                {highlightBadge && <highlightBadge.icon className="w-3 h-3" />}
                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 rounded border ${highlightBadge ? highlightBadge.colorClass : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30'}`}>
                  {pub.highlight}
                </Badge>
              </span>
            )}
          </p>
          {/* Abstract expandable */}
          {pub.abstract && (
            <div className="mt-2">
              <button
                onClick={() => setAbstractOpen(!abstractOpen)}
                className="flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
              >
                {abstractOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {abstractOpen ? 'Hide' : 'Show'} Abstract
              </button>
              <AnimatePresence>
                {abstractOpen && (
                  <motion.div
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: 200 }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3 border border-border/30">
                      {pub.abstract}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
  const [authorFilter, setAuthorFilter] = useState<string>('all')
  const [sortDesc, setSortDesc] = useState(true)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const prevJCountRef = useRef(journalPapers.length)
  const prevCCountRef = useRef(conferencePapers.length)

  // Scroll progress bar (full page only)
  useEffect(() => {
    if (!fullPage) return
    const handleScroll = () => {
      const el = document.getElementById('publications')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fullPage])

  // Publication Summary Stats Bar (only on full page)
  const showStatsBar = fullPage

  // Extract top authors
  const topAuthors = useMemo(() => {
    const authorCount = new Map<string, number>()
    const allPubs = [...journalPapers, ...conferencePapers]
    allPubs.forEach(p => {
      p.authors.split(',').forEach(a => {
        const trimmed = a.trim()
        if (trimmed && trimmed !== 'et al.') {
          authorCount.set(trimmed, (authorCount.get(trimmed) || 0) + 1)
        }
      })
    })
    // Only show authors with 3+ papers, sort by count, limit to 8
    return Array.from(authorCount.entries())
      .filter(([_, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))
  }, [])

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
    if (authorFilter !== 'all') {
      filtered = filtered.filter(p => p.authors.includes(authorFilter))
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
  }, [searchQuery, yearFilter, sortDesc, authorFilter])

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

  const handleExportAllBibTeX = () => {
    const allPubs = [...filteredJournals, ...filteredConferences]
    if (allPubs.length === 0) return
    const allBibTeX = allPubs.map((pub, i) => generateBibTeX(pub, i)).join('\n\n')
    const blob = new Blob([allBibTeX], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'all-references.bib'
    a.click()
    URL.revokeObjectURL(url)
    setToastVisible(true)
  }

  return (
    <SectionWrapper id="publications" className="dot-pattern">
      {/* Scroll Progress Bar (full page only) */}
      {fullPage && (
        <div className="sticky top-16 md:top-20 z-30 h-0.5 bg-border/30">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full progress-bar-animated"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        {!hideTitle && (
          <SectionTitle subtitle="Selected publications in top-tier journals and conferences">
            Publications
          </SectionTitle>
        )}

        {/* Publication Summary Stats Bar */}
        {showStatsBar && <PubStatsBar />}

        {/* Search & Filter */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-4">
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
              {showStatsBar && activeTab !== 'patents' && (
                <button
                  onClick={handleExportAllBibTeX}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border border-border/40"
                  title="Export all publications as BibTeX"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export All
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Author Filter Chips (full page only) */}
        {showStatsBar && topAuthors.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground font-medium mr-1">Authors:</span>
              <button
                onClick={() => setAuthorFilter('all')}
                className={`px-2.5 py-1 text-[11px] rounded-md transition-all shrink-0 ${
                  authorFilter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                All
              </button>
              {topAuthors.map(author => (
                <button
                  key={author.name}
                  onClick={() => setAuthorFilter(author.name)}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-all shrink-0 ${
                    authorFilter === author.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {author.name}
                  <span className="ml-1 opacity-60">{author.count}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

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

            {/* Result Count */}
            {fullPage && (searchQuery || yearFilter !== 'all' || authorFilter !== 'all') && (
              <motion.div variants={fadeInUp} className="mb-4">
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                  <Filter className="w-3 h-3" />
                  {activeTab === 'journal' && <span>Showing {filteredJournals.length} of {journalPapers.length} journal papers</span>}
                  {activeTab === 'conference' && <span>Showing {filteredConferences.length} of {conferencePapers.length} conference papers</span>}
                  {activeTab === 'patents' && <span>Showing {patents.length} patents</span>}
                </p>
              </motion.div>
            )}

            <TabsContent value="journal">
              <div className="bg-card rounded-xl border border-border/60 overflow-hidden shadow-sm">
                <div className={`${fullPage ? '' : 'max-h-[800px]'} overflow-y-auto custom-scrollbar p-2`}>
                  {filteredJournals.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} index={i} type="journal" />
                  ))}
                  {filteredJournals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Search className="w-8 h-8 mb-3 text-muted-foreground/40" />
                      <p className="text-sm font-medium">No publications match your filters</p>
                      <button
                        onClick={() => { setSearchQuery(''); setYearFilter('all'); setAuthorFilter('all') }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                      >
                        <Filter className="w-3 h-3" />
                        Clear Filters
                      </button>
                    </div>
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
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Search className="w-8 h-8 mb-3 text-muted-foreground/40" />
                      <p className="text-sm font-medium">No publications match your filters</p>
                      <button
                        onClick={() => { setSearchQuery(''); setYearFilter('all'); setAuthorFilter('all') }}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                      >
                        <Filter className="w-3 h-3" />
                        Clear Filters
                      </button>
                    </div>
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
function ResearchCard({ topic, index, allExpanded, onToggleAll }: { topic: ResearchTopic; index: number; allExpanded?: boolean; onToggleAll?: () => void }) {
  const [localExpanded, setLocalExpanded] = useState(false)
  const expanded = allExpanded !== undefined ? allExpanded : localExpanded
  const setExpanded = useCallback((val: boolean) => {
    if (allExpanded === undefined) setLocalExpanded(val)
  }, [allExpanded])

  // 3D tilt effect
  const cardRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -2 // max 1 degree
    const rotateY = (x - 0.5) * 2  // max 1 degree
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [])
  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return (
    <motion.div variants={staggerItem}>
      <Card ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="overflow-hidden border-border/60 hover:shadow-lg transition-[shadow,transform] duration-300 ease-out group research-card-glow card-shimmer">
        <div className="grid md:grid-cols-[320px_1fr] gap-0">
          <div className="relative h-52 md:h-auto md:min-h-[240px] overflow-hidden">
            <Image
              src={publicAsset(topic.image)}
              alt={topic.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${topicGradientMap[topic.id] || 'from-black/30'} via-black/10 to-black/20 md:via-black/5 md:to-transparent`} />
            {/* Paper Count Badge */}
            <div className="absolute top-3 right-3 z-10">
              <Badge className="text-[10px] px-2 py-0.5 bg-black/50 text-white/90 border-white/20 backdrop-blur-sm font-medium shadow-sm">
                <BookMarked className="w-3 h-3 mr-1" />
                {topic.papers.length}
              </Badge>
            </div>
            {/* Decorative corner accent */}
            <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Microscope className="w-4 h-4 text-white/70" />
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-lg drop-shadow-md">{topic.title}</h3>
              {topic.subtitle && (
                <p className="text-white/80 text-xs font-medium mt-0.5">{topic.subtitle}</p>
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

            {/* Top Collaborator */}
            {topic.topCollaborator && (
              <div className="mt-3 pt-3 border-t border-dotted border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-primary/70">{topic.topCollaborator.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-medium text-foreground/80">{topic.topCollaborator.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-1.5">{topic.topCollaborator.paperCount} papers</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider flex-shrink-0">Top Collaborator</span>
                </div>
              </div>
            )}

            {/* Related Topics */}
            {topic.relatedTopics && topic.relatedTopics.length > 0 && (
              <div className="mt-3 pt-3 border-t border-dotted border-border/60">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Related Topics</span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {topic.relatedTopics.map((rtId) => {
                    const rt = researchTopics.find(t => t.id === rtId)
                    if (!rt) return null
                    return (
                      <Badge key={rtId} variant="secondary" className="text-[10px] bg-primary/5 text-primary/70 border-primary/10 hover:bg-primary/10 hover:text-primary cursor-default">
                        <Link2 className="w-2.5 h-2.5 mr-0.5 opacity-50" />
                        {rt.title}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

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
  const [allExpanded, setAllExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const totalPapers = useMemo(() => researchTopics.reduce((acc, t) => acc + t.papers.length, 0), [])
  const avgPapers = useMemo(() => Math.round(totalPapers / researchTopics.length), [totalPapers])
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return researchTopics
    const q = searchQuery.toLowerCase()
    return researchTopics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.subtitle || '').toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.papers.some(p => p.citation.toLowerCase().includes(q))
    )
  }, [searchQuery])

  return (
    <SectionWrapper id="research" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Exploring the frontiers of wireless communications and signal processing">
            Research
          </SectionTitle>
        )}

        {/* Research Summary Bar */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/5 flex items-center justify-center">
                  <Microscope className="w-4 h-4 text-violet-500/60" />
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight">{researchTopics.length}</div>
                  <div className="text-[10px] text-muted-foreground">Research Areas</div>
                </div>
              </div>
              <div className="w-px h-8 bg-border/60 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 flex items-center justify-center">
                  <BookMarked className="w-4 h-4 text-emerald-500/60" />
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight">{totalPapers}</div>
                  <div className="text-[10px] text-muted-foreground">Key Publications</div>
                </div>
              </div>
              <div className="w-px h-8 bg-border/60 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-amber-500/60" />
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight">{avgPapers}</div>
                  <div className="text-[10px] text-muted-foreground">Avg. Papers/Topic</div>
                </div>
              </div>
              {/* Quick topic chips */}
              <div className="flex-1 hidden lg:flex items-center justify-end gap-1.5 flex-wrap">
                {researchTopics.map(topic => (
                  <span
                    key={topic.id}
                    className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium bg-primary/5 text-primary/60 border border-primary/10"
                  >
                    {topic.title.length > 18 ? topic.title.slice(0, 18) + '...' : topic.title}
                    <span className="ml-1.5 text-[9px] text-muted-foreground">{topic.papers.length}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search + Expand/Collapse */}
        <motion.div variants={fadeInUp} className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research topics..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-card border border-border/60 outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/10 placeholder:text-muted-foreground/40 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent transition-colors">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {searchQuery && (
              <span className="text-xs text-muted-foreground">{filteredTopics.length} result{filteredTopics.length !== 1 ? 's' : ''}</span>
            )}
            <button
              onClick={() => setAllExpanded(!allExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {allExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {allExpanded ? 'Collapse All Papers' : 'Expand All Papers'}
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, i) => (
              <ResearchCard key={topic.id} topic={topic} index={i} allExpanded={allExpanded} onToggleAll={() => setAllExpanded(!allExpanded)} />
            ))
          ) : (
            <motion.div variants={staggerItem} className="text-center py-16">
              <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No research topics match "{searchQuery}"</p>
              <button onClick={() => setSearchQuery('')} className="mt-2 text-xs text-primary/70 hover:text-primary transition-colors">Clear search</button>
            </motion.div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ============ Students Section ============
function StudentCard({ student, onNavigate }: { student: Student; onNavigate?: (page: PageName) => void }) {
  const [showPapers, setShowPapers] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isPhd = student.degree === 'phd'
  const degreeClass = isPhd ? 'student-card-phd' : 'student-card-master'

  return (
    <motion.div variants={staggerItem}>
      <Card className={`overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 h-full student-card-accent ${degreeClass}`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-48 aspect-[3/4] rounded-xl overflow-hidden border border-primary/10 flex-shrink-0">
              <Image
                src={publicAsset(student.avatar)}
                alt={student.name}
                width={192}
                height={256}
                className="w-full h-full object-cover student-avatar-img"
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
                {student.graduated && student.destination && (
                  <Badge className="text-[10px] px-2 py-0 border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/15 dark:text-blue-400 dark:border-blue-800/25">
                    → {student.destination}
                  </Badge>
                )}
              </div>

              {student.coSupervised && (
                <p className="text-xs text-primary/60 mt-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Co-supervised with {student.coSupervised}
                </p>
              )}

              {/* Enrollment / Graduation dates */}
              {student.enrollDate && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {student.gradDate
                    ? <span>{student.enrollDate} — {student.gradDate}</span>
                    : <span>Enrolled: {student.enrollDate}</span>
                  }
                </p>
              )}

              <div className="flex items-center gap-1 mt-1">
                <a
                  href={`mailto:${student.email}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  {student.email}
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(student.email).then(() => {
                      setEmailCopied(true)
                      setTimeout(() => setEmailCopied(false), 2000)
                    })
                  }}
                  className="p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {emailCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.researchTopics.map((topic) => {
                  const topicKey = Object.keys(topicGradientMap).find(k => topic.toLowerCase().includes(k.replace(/-/g, ' ').split(' ')[0]) || topic.toLowerCase().includes('fdd') && k === 'fdd-mimo' || topic.toLowerCase().includes('ris') && k === 'ris' || topic.toLowerCase().includes('massive') && k === 'massive-mimo' || topic.toLowerCase().includes('superdirective') && k === 'superdirective' || topic.toLowerCase().includes('channel') && k === 'channel-prediction' || topic.toLowerCase().includes('holographic') && k === 'holographic')
                  const gradientColors: Record<string, string> = {
                    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/15 dark:text-blue-400 dark:border-blue-800/25',
                    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25',
                    violet: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25',
                    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25',
                    rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/15 dark:text-rose-400 dark:border-rose-800/25',
                    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/15 dark:text-cyan-400 dark:border-cyan-800/25',
                  }
                  const colorKey = topicKey ? Object.keys(gradientColors)[Object.keys(topicGradientMap).indexOf(topicKey) % Object.keys(gradientColors).length] : null
                  return (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className={`text-[10px] px-2 py-0 border cursor-pointer hover:opacity-80 transition-opacity ${colorKey ? gradientColors[colorKey] : 'bg-primary/5 text-primary/70 border-primary/10'}`}
                      onClick={() => onNavigate?.('research')}
                    >
                      {topic}
                    </Badge>
                  )
                })}
              </div>

              {student.awards && student.awards.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  {student.awards.map((award, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                      <Award className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
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
                {student.profileUrl ? (
                  <a
                    href={student.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary/70 hover:text-primary font-medium flex items-center gap-1 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </a>
                ) : (
                  <span className="text-[11px] text-primary/50 font-medium flex items-center gap-1 cursor-default">
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </span>
                )}
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
  const [destFilter, setDestFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Sort helpers
  const sortByEnrollDesc = (a: Student, b: Student) => (b.enrollDate || '').localeCompare(a.enrollDate || '')
  const sortByGradDesc = (a: Student, b: Student) => (b.gradDate || '').localeCompare(a.gradDate || '')

  const allStudents = useMemo(() => [...phdStudents, ...masterStudents, ...graduatedPhdStudents, ...graduatedMasterStudents], [])

  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    allStudents.forEach(s => s.researchTopics.forEach(t => topics.add(t)))
    return ['all', ...Array.from(topics).sort()]
  }, [allStudents])

  const allDestinations = useMemo(() => {
    const dests = new Set<string>()
    ;[...graduatedPhdStudents, ...graduatedMasterStudents].forEach(s => {
      if (s.destination) dests.add(s.destination)
    })
    return Array.from(dests).sort()
  }, [])

  const filteredPhd = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const base = phdStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return topicFilter === 'all' || s.researchTopics.includes(topicFilter)
    })
    return [...base].sort(sortByEnrollDesc)
  }, [topicFilter, searchQuery])

  const filteredMaster = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const base = masterStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return topicFilter === 'all' || s.researchTopics.includes(topicFilter)
    })
    return [...base].sort(sortByEnrollDesc)
  }, [topicFilter, searchQuery])

  const filteredGraduatedPhd = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let base = graduatedPhdStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return topicFilter === 'all' || s.researchTopics.includes(topicFilter)
    })
    if (destFilter !== 'all') base = base.filter(s => s.destination === destFilter)
    return [...base].sort(sortByGradDesc)
  }, [topicFilter, destFilter, searchQuery])

  const filteredGraduatedMaster = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let base = graduatedMasterStudents.filter(s => {
      if (q && !s.name.toLowerCase().includes(q) && !s.nameCn.includes(q) && !s.researchTopics.some(t => t.toLowerCase().includes(q))) return false
      return topicFilter === 'all' || s.researchTopics.includes(topicFilter)
    })
    if (destFilter !== 'all') base = base.filter(s => s.destination === destFilter)
    return [...base].sort(sortByGradDesc)
  }, [topicFilter, destFilter, searchQuery])

  const graduatedTotal = filteredGraduatedPhd.length + filteredGraduatedMaster.length

  // Stats for team page
  const totalCurrent = useMemo(() => phdStudents.length + masterStudents.length, [])

  return (
    <SectionWrapper id="students" className="dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle subtitle="Meet the talented researchers in our group">
            Students
          </SectionTitle>
        )}

        {/* Member Stats Bar (team page: hideTitle is true) */}
        {hideTitle && (
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/5 flex items-center justify-center">
                    <Users className="w-4 h-4 text-violet-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{totalCurrent + graduatedPhdStudents.length + graduatedMasterStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Total Members</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-emerald-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{phdStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Ph.D. Students</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-border/60 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-amber-500/60" />
                  </div>
                  <div>
                    <div className="text-lg font-bold tracking-tight">{masterStudents.length}</div>
                    <div className="text-[10px] text-muted-foreground">Master Students</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Research Topic Filter */}
        <motion.div variants={fadeInUp} className="mb-8 space-y-3">
          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or research topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 bg-card"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
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

        {/* Ph.D. Students */}
        <motion.div variants={fadeInUp} className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <GraduationCap className="w-5 h-5 text-red-800/60 dark:text-red-400/60" />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Ph.D. Students</h3>
            <Badge variant="secondary" className="text-xs bg-red-50 text-red-800 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25">{filteredPhd.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPhd.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredPhd.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Ph.D. students match the selected topic.</div>
          )}
        </motion.div>

        {/* Master Students */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-2.5 mb-5">
            <BookOpen className="w-5 h-5 text-emerald-500/70" />
            <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">Master Students</h3>
            <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">{filteredMaster.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMaster.map((student) => (
              <StudentCard key={student.email} student={student} />
            ))}
          </div>
          {filteredMaster.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No Master students match the selected topic.</div>
          )}
        </motion.div>

        {/* Alumni Section */}
        {graduatedTotal > 0 && (
          <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-border/40">
            <div className="flex items-center gap-2.5 mb-5">
              <Award className="w-5 h-5 text-amber-500/70" />
              <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400">Alumni</h3>
              <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800/25">{graduatedTotal}</Badge>
            </div>

            {/* Alumni Destination Filter */}
            {allDestinations.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground font-medium">Destination:</span>
                  <button
                    onClick={() => setDestFilter('all')}
                    className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                      destFilter === 'all'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    All
                  </button>
                  {allDestinations.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setDestFilter(dest)}
                      className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                        destFilter === dest
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredGraduatedPhd.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-red-800/60 dark:text-red-400/60" />
                  <h4 className="text-xl font-bold text-red-800 dark:text-red-400">Ph.D. Alumni</h4>
                  <span className="text-xs text-muted-foreground">({filteredGraduatedPhd.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGraduatedPhd.map((student) => (
                    <StudentCard key={student.email} student={student} />
                  ))}
                </div>
              </div>
            )}
            {filteredGraduatedMaster.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-emerald-500/60" />
                  <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Master Alumni</h4>
                  <span className="text-xs text-muted-foreground">({filteredGraduatedMaster.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGraduatedMaster.map((student) => (
                    <StudentCard key={student.email} student={student} />
                  ))}
                </div>
              </div>
            )}
            {graduatedTotal === 0 && destFilter !== 'all' && (
              <div className="text-center py-8 text-muted-foreground text-sm">No alumni match the selected destination.</div>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}

// ============ Teaching Section ============
function TeachingSection({ hideTitle = false, hideStats = false }: { hideTitle?: boolean; hideStats?: boolean } = {}) {
  const teachingData = professorInfo.teaching || []
  const courseIcons = [BookOpen, Braces, Library, Microscope]

  return (
    <SectionWrapper id="teaching" className={hideTitle ? '' : 'bg-muted/30'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideTitle && (
          <SectionTitle accent="violet" subtitle="Courses taught at Huazhong University of Science and Technology">
            Teaching
          </SectionTitle>
        )}

        {/* Stats Highlight Strip */}
        {!hideStats && (
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Journal Papers', value: journalPapers.length, icon: BookOpen, color: 'text-blue-500/60 dark:text-blue-400/60' },
                { label: 'Conference Papers', value: conferencePapers.length, icon: FileText, color: 'text-emerald-500/60 dark:text-emerald-400/60' },
                { label: 'Patents', value: patents.length, icon: Award, color: 'text-amber-500/60 dark:text-amber-400/60' },
                { label: 'Research Areas', value: researchTopics.length, icon: Microscope, color: 'text-rose-500/60 dark:text-rose-400/60' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        )}

        {/* Course Cards Grid */}
        <motion.div variants={fadeInUp}>
          <div className="grid sm:grid-cols-2 gap-4">
            {teachingData.map((course, i) => {
              const CourseIcon = courseIcons[i % courseIcons.length]
              return (
                <Card key={i} className="border-border/60 hover:shadow-md transition-all duration-300 group overflow-hidden card-glow">
                  <CardContent className="p-0">
                    <div className="h-1 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
                    <div className="p-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:from-primary/15 group-hover:to-primary/8 transition-all duration-300">
                          <CourseIcon className="w-4 h-4 text-primary/50 group-hover:text-primary/70 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge variant="secondary" className="text-[10px] bg-primary/5 text-primary/60 border-primary/10 mb-2">
                            <Calendar className="w-2.5 h-2.5 mr-1" />
                            {course.semester}
                          </Badge>
                          <p className="text-sm font-semibold leading-relaxed mb-1.5">{course.course}</p>
                          {'description' in course && (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{course.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ============ Quote Banner ============
function QuoteBanner() {
  const quotes = [
    { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
    { text: "Innovation is the ability to see change as an opportunity — not a threat.", author: "Steve Jobs" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Research is to see what everybody else has seen, and to think what nobody else has thought.", author: "Albert Szent-Györgyi" },
  ]
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <SectionWrapper id="quote" className="relative overflow-hidden !py-10 md:!py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="w-5 h-5 text-primary/15 mx-auto mb-2" />
            <blockquote className="text-sm md:text-base font-light leading-relaxed text-foreground/70 italic">
              &ldquo;{quotes[currentQuote].text}&rdquo;
            </blockquote>
            <p className="text-xs text-muted-foreground mt-1.5">— {quotes[currentQuote].author}</p>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-3">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuote(idx)}
                  className={`dot-indicator rounded-full ${
                    currentQuote === idx
                      ? 'w-6 h-2 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}

// ============ Footer ============
function Footer({ onNavigate, currentPage }: { onNavigate: (page: PageName) => void; currentPage: PageName }) {
  const currentYear = new Date().getFullYear()
  const quickLinks = [
    { label: 'Home', page: 'home' as PageName },
    { label: 'Research', page: 'research' as PageName },
    { label: 'Publications', page: 'publications' as PageName },
    { label: 'Team', page: 'team' as PageName },
    { label: 'Teaching', page: 'teaching' as PageName },
    { label: 'Gallery', page: 'gallery' as PageName },
  ]

  return (
    <>
    {/* Wave Separator Before Footer */}
    <div className="w-full overflow-hidden leading-[0] mt-auto">
      <svg className="w-full h-[40px] md:h-[60px] relative" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,20 C360,60 720,0 1080,30 C1260,45 1380,20 1440,20 L1440,60 L0,60 Z"
          className="fill-card dark:fill-[var(--color-card,#0a0a0a)]"
          fillOpacity="0.5"
        />
        <path
          d="M0,35 C240,10 480,50 720,25 C960,0 1200,40 1440,35 L1440,60 L0,60 Z"
          className="fill-card dark:fill-[var(--color-card,#0a0a0a)]"
        />
      </svg>
    </div>
    <footer className="bg-card border-t-0 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand / Logo / Description / Recruiting */}
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
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mb-4">
              MCSP Lab, School of Electronic Information and Communications, Huazhong University of Science and Technology.
            </p>
            <div className="bg-primary/[0.03] dark:bg-primary/[0.06] rounded-lg px-3 py-2 border border-primary/5">
              <p className="text-[11px] text-muted-foreground/80 italic leading-relaxed">
                &ldquo;Always looking for self-motivated master/Ph.D. students and post-doc researchers.&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <HomeIcon className="w-3 h-3" />
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`block text-xs transition-colors group ${
                    currentPage === link.page
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {currentPage === link.page && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    <ArrowRight className={`w-2.5 h-2.5 transition-colors ${currentPage === link.page ? 'text-primary' : 'text-primary/40 group-hover:text-primary/70'}`} />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Research Areas */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Microscope className="w-3 h-3" />
              Research Areas
            </h4>
            <div className="space-y-2">
              {researchTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onNavigate('research')}
                  className="block text-xs text-muted-foreground hover:text-foreground transition-colors group text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors flex-shrink-0" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{topic.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Profiles */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              Profiles
            </h4>
            <div className="space-y-2.5">
              <a href={professorInfo.googleScholar} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <School className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">Google Scholar</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://dblp.org/pid/y/haifanyin.html" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Library className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">DBLP</span>
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
              <a href={`mailto:${professorInfo.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                <Mail className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                <span className="group-hover:translate-x-0.5 transition-transform">{professorInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>© {currentYear} {professorInfo.name}. All rights reserved.</span>
            <span className="hidden sm:inline w-px h-3 bg-border/60" />
            <span className="hidden sm:inline text-muted-foreground/60">HUST, Wuhan, China</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
    </>
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
          className="fixed bottom-20 md:bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-background border border-border/60 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <defs>
              <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--back-to-top-stop1)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--back-to-top-stop2)' }} />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r="16" fill="none" stroke="oklch(0.90 0.01 240)" strokeWidth="2.5" className="dark:stroke-[oklch(0.25_0.01_260)]" />
            <circle
              cx="22" cy="22" r="16" fill="none"
              stroke="url(#backToTopGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-150"
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
  const recentPapers = useMemo(() => journalPapers.slice(0, 3), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main>
      <HeroSection onNavigate={onNavigate} />

      <SectionDivider />
      <AboutSection />
      <SectionDivider flip />

      {/* Recent Publications Preview */}
      <SectionWrapper id="recent-pubs" className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle accent="emerald" subtitle="Latest journal papers from our group">Recent Publications</SectionTitle>
            <button
              onClick={() => onNavigate('publications')}
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary/70 hover:text-primary transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentPapers.map((paper, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                onClick={() => onNavigate('publications')}
                className="bg-card rounded-xl border border-border/60 p-5 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer group"
              >
                <p className="text-sm font-medium leading-relaxed line-clamp-2 mb-3 group-hover:text-primary/80 transition-colors">
                  {paper.title.length > 80 ? paper.title.slice(0, 80) + '…' : paper.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookMarked className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{paper.venue}</span>
                  <span className="ml-auto flex-shrink-0 tabular-nums">{paper.year.match(/\d{4}/)?.[0]}</span>
                </div>
                {paper.highlight && (
                  <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30 mt-3">
                    {paper.highlight}
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
          {/* Mobile View All link */}
          <button
            onClick={() => onNavigate('publications')}
            className="sm:hidden mt-4 flex items-center gap-1 text-sm font-medium text-primary/70 hover:text-primary transition-colors mx-auto"
          >
            View All Publications
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </SectionWrapper>

      <SectionDivider />
      <NewsSection />
      <SectionDivider flip />
      <QuoteBanner />
    </main>
  )
}

// ============ News & Announcements Timeline Section ============
function NewsSection() {
  const newsItems = professorInfo.news || []

  if (newsItems.length === 0) return null

  return (
    <SectionWrapper id="news" className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle accent="amber" subtitle="Latest updates and achievements from our group">
          News & Announcements
        </SectionTitle>

        <motion.div variants={fadeInUp}>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left: Highlighted News */}
            <div className="space-y-4">
              {newsItems.filter(n => n.highlight).map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-xl border border-amber-200/50 dark:border-amber-800/30 bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/5 p-5 group hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/30 to-transparent dark:from-amber-800/10 rounded-bl-full" />
                  <div className="relative z-10 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
                          <Zap className="w-2.5 h-2.5 mr-1" />
                          Highlight
                        </Badge>
                        <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{item.date}</span>
                      </div>
                      <p className="text-sm font-medium leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* If no highlight news, show first item as featured */}
              {newsItems.filter(n => n.highlight).length === 0 && newsItems.length > 0 && (
                <motion.div
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/[0.02] p-5 group hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                  <div className="relative z-10 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{newsItems[0].date}</span>
                      <p className="text-sm font-medium leading-relaxed mt-1">{newsItems[0].text}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Timeline with scrollbar */}
            <div className="max-h-[380px] overflow-y-auto custom-scrollbar pr-2 relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border/60" />
              <div className="space-y-1">
                {newsItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="relative flex items-start gap-4 py-2.5 group"
                  >
                    {/* Timeline icon */}
                    <div className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                      item.highlight
                        ? 'bg-amber-100 dark:bg-amber-900/30'
                        : 'bg-muted group-hover:bg-accent'
                    }`}>
                      {(() => {
                        const t = item.text.toLowerCase()
                        if (t.includes('prize') || t.includes('award')) return <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        if (t.includes('paper') || t.includes('published') || t.includes('accepted')) return <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        if (t.includes('research') || t.includes('direction') || t.includes('holographic')) return <Microscope className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                        if (t.includes('professor') || t.includes('joined')) return <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        if (t.includes('medal')) return <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        if (t.includes('competition') || t.includes('cup') || t.includes('champion')) return <Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        if (t.includes('mentor') || t.includes('instructor')) return <Users className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        if (t.includes('leader') || t.includes('expert')) return <Star className="w-3.5 h-3.5 text-primary/70" />
                        return <Rss className="w-3.5 h-3.5 text-muted-foreground" />
                      })()}
                    </div>
                    <div className="flex-1 min-w-0 rounded-lg px-3 py-2 -ml-2 hover:bg-accent/50 transition-colors">
                      <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{item.date}</span>
                      <p className={`text-sm leading-relaxed mt-0.5 ${item.highlight ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ============ Alumni Destinations Section ============
function AlumniSection() {
  const alumni = useMemo(() => [
    ...graduatedPhdStudents.map(s => ({ ...s, type: 'Ph.D.' as const })),
    ...graduatedMasterStudents.map(s => ({ ...s, type: 'Master' as const })),
  ], [])

  if (alumni.length === 0) return null

  return (
    <SectionWrapper id="alumni" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle accent="rose" subtitle="Where our graduates continue their journey">
          Alumni Destinations
        </SectionTitle>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {alumni.map((student, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Card className="border-border/60 hover:shadow-md transition-all duration-300 group overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={publicAsset(student.avatar)}
                        alt={student.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                      />
                      <Badge variant="secondary" className="absolute -bottom-1 -right-1 text-[8px] px-1.5 py-0 bg-card border-border shadow-sm">
                        {student.type}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug">{student.nameCn}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{student.name}</p>
                      {student.destination && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-primary/70">
                          <GraduationCap className="w-3 h-3 flex-shrink-0" />
                          <span className="font-medium">{student.destination}</span>
                        </div>
                      )}
                      {student.researchTopics && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {student.researchTopics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-[9px] bg-primary/5 text-primary/50 border-primary/8 font-normal px-1.5 py-0">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
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

  return (
    <main>
      <PageHero page="team" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Open Positions CTA Banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-r from-primary/5 via-primary/[0.08] to-primary/3 shadow-sm"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-primary/50 rounded-r-full" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 pl-6 sm:pl-7">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                  We are actively recruiting self-motivated Ph.D. students, Master students, and Post-doc researchers!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Students from Mathematics, Physics, Optoelectronics and other disciplines are highly encouraged to apply.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${professorInfo.email}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentsSection hideTitle />
      </div>
    </main>
  )
}

// ============ Teaching Page ============
function TeachingPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main>
      <PageHero page="teaching" />
      <TeachingSection hideTitle hideStats />
    </main>
  )
}

// ============ Gallery Page ============
function GalleryPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Gallery data - team photos and research images
  const galleryPhotos = useMemo(() => [
    { src: '/professor.jpg', caption: 'Prof. Haifan Yin', category: 'Professor' },
    ...phdStudents.map(s => ({ src: s.avatar, caption: `${s.nameCn} ${s.name}`, category: 'Ph.D.' })),
    ...masterStudents.map(s => ({ src: s.avatar, caption: `${s.nameCn} ${s.name}`, category: 'Master' })),
    ...researchTopics.map(t => ({ src: t.image, caption: t.title, category: 'Research' })),
  ], [])

  const categories = useMemo(() => {
    const catMap = new Map<string, number>()
    galleryPhotos.forEach(p => {
      catMap.set(p.category, (catMap.get(p.category) || 0) + 1)
    })
    return [{ name: 'All', count: galleryPhotos.length }, ...Array.from(catMap.entries()).map(([name, count]) => ({ name, count }))]
  }, [galleryPhotos])

  const filteredPhotos = useMemo(() => {
    if (categoryFilter === 'All') return galleryPhotos
    return galleryPhotos.filter(p => p.category === categoryFilter)
  }, [galleryPhotos, categoryFilter])

  // Touch swipe handlers for lightbox
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default scroll only if horizontal swipe is detected
    if (touchStartX.current !== null) {
      const dx = e.touches[0].clientX - touchStartX.current
      if (Math.abs(dx) > Math.abs((e.touches[0].clientY - (touchStartY.current ?? 0)))) {
        e.preventDefault()
      }
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    const threshold = 50
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        // Swipe left → next photo
        setSelectedPhoto(prev => prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0)
      } else {
        // Swipe right → previous photo
        setSelectedPhoto(prev => prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1)
      }
    }
    touchStartX.current = null
    touchStartY.current = null
  }, [filteredPhotos.length])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhoto(prev => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedPhoto(prev => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, filteredPhotos.length])

  return (
    <main>
      <PageHero page="gallery" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Camera className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">
              {filteredPhotos.length}/{galleryPhotos.length} photos
            </span>
            <span className="w-px h-4 bg-border/60" />
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategoryFilter(cat.name)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all font-medium ${
                  categoryFilter === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Photo Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={`${photo.src}-${photo.caption}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="break-inside-avoid group relative cursor-pointer"
                onClick={() => setSelectedPhoto(i)}
              >
                <div className={`relative rounded-xl overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 hover:border-primary/30 ${
                  photo.category === 'Ph.D.' || photo.category === 'Master' || photo.category === 'Professor'
                    ? 'aspect-[3/4]'
                    : 'aspect-[4/3]'
                }`}>
                  <Image
                    src={publicAsset(photo.src)}
                    alt={photo.caption}
                    width={640}
                    height={853}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-white text-xs font-medium truncate drop-shadow-md">{photo.caption}</p>
                    <Badge variant="secondary" className="text-[9px] mt-1 bg-white/20 text-white/90 border-white/20 backdrop-blur-sm">
                      {photo.category}
                    </Badge>
                  </div>
                  {/* View icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No photos found for the selected category.
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => { if (!open) setSelectedPhoto(null) }}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 gap-0 bg-black/95 border-white/10 backdrop-blur-xl [&>button]:hidden">
          {selectedPhoto !== null && filteredPhotos[selectedPhoto] && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{filteredPhotos[selectedPhoto].caption}</DialogTitle>
              </DialogHeader>
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPhoto(prev => prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPhoto(prev => prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              {/* Image */}
              <div
                className="flex items-center justify-center w-full py-6 px-12"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full flex items-center justify-center max-h-[75vh]">
                  <Image
                    src={publicAsset(filteredPhotos[selectedPhoto].src)}
                    alt={filteredPhotos[selectedPhoto].caption}
                    width={800}
                    height={1067}
                    className="object-contain rounded-lg max-w-full max-h-[65vh]"
                  />
                </div>
              </div>
              {/* Thumbnail Strip */}
              {filteredPhotos.length > 1 && (
                <div className="px-8 pb-3">
                  <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1 custom-scrollbar">
                    {filteredPhotos.map((photo, idx) => {
                      const isActive = idx === selectedPhoto
                      const isNeighbor = Math.abs(idx - selectedPhoto) <= 3
                      if (!isActive && !isNeighbor && filteredPhotos.length > 7) return null
                      return (
                        <button
                          key={`${photo.src}-${idx}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedPhoto(idx) }}
                          className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                            isActive
                              ? 'border-white/80 opacity-100 scale-105'
                              : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
                          }`}
                        >
                          <Image
                            src={publicAsset(photo.src)}
                            alt={photo.caption}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              {/* Caption bar */}
              <div className="px-12 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{filteredPhotos[selectedPhoto].caption}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1 bg-white/10 text-white/70 border-white/10">
                      {filteredPhotos[selectedPhoto].category}
                    </Badge>
                  </div>
                  <p className="text-white/40 text-xs tabular-nums">
                    {selectedPhoto + 1} / {filteredPhotos.length}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

// ============ Hash Routing Utility ============
function getInitialPage(): PageName {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  if (hash === 'publications' || hash === 'research' || hash === 'team' || hash === 'teaching' || hash === 'gallery') return hash
  return 'home'
}

// ============ Main Page ============
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageName>(getInitialPage)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('mcsp-dark-mode') === 'true'
  })
  const [toastVisible, setToastVisible] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'publications' || hash === 'research' || hash === 'team' || hash === 'teaching' || hash === 'gallery') {
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
    localStorage.setItem('mcsp-dark-mode', String(darkMode))
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

  // Command palette shortcut (Ctrl/Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(prev => !prev)
      } else if (e.key === 'Escape') {
        if (showCommandPalette) setShowCommandPalette(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showCommandPalette])

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navigation currentPage={currentPage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onNavigate={handleNavigate} />


      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <HomePage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'publications' && (
            <motion.div key="publications" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <PublicationsPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'research' && (
            <motion.div key="research" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <ResearchPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'team' && (
            <motion.div key="team" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <TeamPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'teaching' && (
            <motion.div key="teaching" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <TeachingPage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -6, filter: 'blur(1px)' }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>
              <GalleryPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
      <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      <BackToTop />
      <Toast message="Downloaded BibTeX file!" visible={toastVisible} onClose={() => setToastVisible(false)} />

      {/* Command Palette */}
      <CommandPalette
        visible={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onNavigate={handleNavigate}
      />


    </div>
  )
}
