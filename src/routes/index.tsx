import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { WhopElements, Checkout, CheckoutElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'

export const Route = createFileRoute('/')({ component: Home })

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PLANS = {
  starter: {
    id: 'prod_bjvNLqzRr20Km',
    name: 'Starter Automation Build',
    price: 699,
    isOneTime: true,
    blurb: 'A custom tool that kills one piece of your paperwork, built around your exact workflow.',
    features: [
      { text: '1 Well-defined custom workflow automation or tool', on: true },
      { text: 'Custom web app / POS / billing integration', on: true },
      { text: 'Direct printer & automated PDF receipts', on: true },
      { text: 'Weekly/monthly report generator built-in', on: true },
      { text: 'Live discovery call & full handover walkthrough', on: true },
    ],
  },
  ultimate: {
    id: 'plan_WPvLnQZESEIQc',
    name: 'Full Custom Suite Build',
    price: 1499,
    isOneTime: true,
    blurb: 'Multi-system end-to-end apps, custom billing & back-office automation suite.',
    features: [
      { text: 'Full-stack custom business app (Frontend + Backend)', on: true },
      { text: 'Complete POS, Inventory & Billing ecosystem', on: true },
      { text: 'Custom report analytics & data exports', on: true },
      { text: 'Third-party CRM & API integrations', on: true },
      { text: 'Priority maintenance & dedicated support', on: true },
    ],
  },
} as const

type PlanKey = keyof typeof PLANS

const FAQS = [
  {
    q: 'How does the custom automation & app building process work?',
    a: '1. Purchase the Starter Automation Build. 2. Fill out our quick intake form detailing your repetitive process or app requirements. 3. We book a short discovery call to finalize scope. 4. We build, test, and deliver your production-ready tool with a complete video walkthrough.',
  },
  {
    q: 'What types of applications and automations can you build?',
    a: 'We build complete frontend and backend solutions: custom Point-of-Sale (POS) systems, automated billing software with direct printer integration, weekly/monthly financial report generators, CRM sync pipelines, custom client portals, and bespoke data tools.',
  },
  {
    q: 'Can you connect my software to physical hardware like receipt printers?',
    a: 'Yes! We configure direct thermal receipt printing, barcode scanners, and automated label generation right from your web or desktop interface without manual printing steps.',
  },
  {
    q: 'What if I need a larger or multi-system custom app?',
    a: 'The Starter package covers one well-defined workflow automation or standalone tool. For larger systems or full business operating suites, we provide a tailored custom quote immediately following the discovery call.',
  },
]

const AVATARS = {
  m1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=96&auto=format&fit=crop&crop=faces',
  w1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=96&auto=format&fit=crop&crop=faces',
  m2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=96&auto=format&fit=crop&crop=faces',
  w2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=96&auto=format&fit=crop&crop=faces',
  m3: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=96&auto=format&fit=crop&crop=faces',
  w3: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=96&auto=format&fit=crop&crop=faces',
  m4: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=96&auto=format&fit=crop&crop=faces',
  w4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=96&auto=format&fit=crop&crop=faces',
  m5: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=96&auto=format&fit=crop&crop=faces',
  w5: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=96&auto=format&fit=crop&crop=faces',
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll (Framer appear: y60 -> 0, .6s cubic .44,0,.56,1)   */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.disconnect()
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${0.1 + delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Logo mark                                                           */
/* ------------------------------------------------------------------ */

function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M13 3h6v10h10v6H19v10h-6V19H3v-6h10V3Z"
        fill="#0099FF"
        opacity="0.25"
      />
      <path d="M13 3h6v10l-6 6V3Z" fill="#0099FF" />
      <path d="M19 13h10v6H19l-6 6v-6l6-6Z" fill="#1470EF" />
      <path d="M13 19v10h-6V19h6Z" fill="#0099FF" transform="translate(0 0)" />
      <path d="M3 13h10l-4 6H3v-6Z" fill="#33BBFF" />
    </svg>
  )
}

function LogoLockup({ dark = false, size = 26 }: { dark?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span
        className="font-display font-semibold"
        style={{
          fontSize: size * 0.82,
          letterSpacing: '-0.8px',
          color: dark ? '#fff' : '#181818',
          fontFamily: 'Geist, Inter, sans-serif',
        }}
      >
        FlowForge
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Small icons                                                         */
/* ------------------------------------------------------------------ */

function SIcon({
  d,
  size = 16,
  stroke = 'currentColor',
  sw = 1.5,
}: {
  d: string
  size?: number
  stroke?: string
  sw?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

const paths = {
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  activity: 'M3 17l5-6 4 3 5-7 4 5 M3 21h18',
  doc: 'M7 3h7l4 4v14H7V3Z M14 3v5h5',
  users: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5M2 20c0-3 3-5 6-5s6 2 6 5m2-4c2.2.4 4 1.9 4 4',
  message: 'M21 12a8 8 0 0 1-11.6 7.1L4 21l1.5-4.6A8 8 0 1 1 21 12Z',
  headset: 'M4 13a8 8 0 1 1 16 0M4 13v4a2 2 0 0 0 2 2h1v-6H5m14 0h-2v6h1a2 2 0 0 0 2-2v-4',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 1-.3 2l2 1.6-2 3.4-2.4-1a8 8 0 0 1-3.3 2l-.4 2.6h-4l-.4-2.6a8 8 0 0 1-3.3-2l-2.4 1-2-3.4L4.3 14a8 8 0 0 1 0-4L2.5 8.4l2-3.4 2.4 1a8 8 0 0 1 3.3-2L10.6 1.4h4l.4 2.6a8 8 0 0 1 3.3 2l2.4-1 2 3.4-1.8 1.6c.2.6.3 1.3.3 2Z',
  bell: 'M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6m4 10a2 2 0 0 0 4 0',
  cloud: 'M8 17a5 5 0 1 1 .9-9.9A6 6 0 0 1 20 9.5 4.5 4.5 0 0 1 18.5 18H8Zm4-8v6m0 0-2.5-2.5M12 15l2.5-2.5',
  filter: 'M4 5h16l-6 7v5l-4 2v-7L4 5Z',
  chevron: 'M6 9l6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  rocket: 'M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5m-1-4.5 7-7c2-2 5-2 5-2s0 3-2 5l-7 7m-3-3-2 .5L3 10l3-1m5 5 .5 2L14 21l1-3',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 4 8.6 15.4M14.5 14.5 20 20M8.6 8.6 12 12',
  db: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm8-3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5m16 7c0 1.7-3.6 3-8 3s-8-1.3-8-3',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2',
  // dark section feature icons (pink strokes)
  goal: 'M9 15h6v6H9v-6Zm3-12a9 9 0 0 1 9 9h-4a5 5 0 0 0-5-5V3Z',
  price: 'M8 8a4 4 0 1 1 8 0c0 3-4 3-4 6m0 4h.01M4 12a8 8 0 1 0 16 0',
  game: 'M6 8h4M8 6v4m7-1h.01M18 12h.01M5 18c-2 0-3-8 0-10 2-1.3 12-1.3 14 0 3 2 2 10 0 10-2.5 0-2.5-2-4.5-2h-5C7.5 16 7.5 18 5 18Z',
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
  workflow: 'M12 3c4 0 7 1.5 7 3.5S16 10 12 10 5 8.5 5 6.5 8 3 12 3Zm7 3.5V12c0 2-3 3.5-7 3.5S5 14 5 12V6.5M12 15.5V19m0 0a2 2 0 1 0 .01 0Z',
  access: 'M5 4h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 10h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm3-8h.01M8 16h.01',
}

/* ------------------------------------------------------------------ */
/* Checkout modal (Whop Elements — preserved wiring)                   */
/* ------------------------------------------------------------------ */

function CheckoutModal({
  plan,
  onClose,
}: {
  plan: PlanKey
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const p = PLANS[plan]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Checkout — ${p.name} plan`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fade-up relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-widest text-royal uppercase">
              FlowForge — {p.name}
            </p>
            <h3 className="mt-1 text-lg font-bold text-ink">
              ${p.price}
              <span className="text-sm font-medium text-mist"> / one-time build</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="rounded-full p-2 text-mist transition hover:bg-paper hover:text-ink"
          >
            <SIcon d={paths.close} size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {mounted ? (
            <WhopElements elements={loadWhop()}>
              <Checkout plan={p.id}>
                <CheckoutElement onError={(e) => console.error(e)} />
              </Checkout>
            </WhopElements>
          ) : (
            <div className="flex h-48 items-center justify-center text-sm text-mist">
              Loading secure checkout…
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chart helpers                                                       */
/* ------------------------------------------------------------------ */

function MiniArea({
  color,
  id,
  up = false,
}: {
  color: string
  id: string
  up?: boolean
}) {
  const d = up
    ? 'M0 34 C14 26 22 30 34 24 S 58 30 70 20 S 96 26 110 22 S 140 30 160 12'
    : 'M0 26 C14 16 24 28 38 22 S 60 10 74 20 S 100 26 116 16 S 142 24 160 8'
  return (
    <svg viewBox="0 0 160 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L160 40 L0 40 Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx="74" cy="20" r="3" fill="#fff" stroke={color} strokeWidth="1.6" />
    </svg>
  )
}

function BalanceLine({ color, id }: { color: string; id: string }) {
  const d =
    'M0 34 C18 30 26 40 44 38 S 70 26 88 30 S 112 44 128 36 S 150 8 168 16 S 196 40 214 30 S 244 12 260 8'
  return (
    <svg viewBox="0 0 260 52" className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L260 52 L0 52 Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" />
      <circle cx="168" cy="16" r="3.5" fill="#fff" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

function PipelineChart() {
  const blue =
    'M0 150 C30 140 45 110 70 105 S 110 120 135 118 S 165 92 190 96 S 225 130 250 124 S 285 100 310 108 S 340 128 365 118 S 400 96 420 70'
  const red =
    'M0 160 C30 150 50 128 75 132 S 110 148 135 140 S 170 120 195 130 S 225 152 250 138 S 285 118 310 132 S 340 150 365 134 S 400 122 420 112'
  return (
    <svg viewBox="0 0 420 180" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="pipeBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#466CF3" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#466CF3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pipeRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F83D69" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#F83D69" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${blue} L420 180 L0 180 Z`} fill="url(#pipeBlue)" />
      <path d={`${red} L420 180 L0 180 Z`} fill="url(#pipeRed)" />
      <path d={blue} fill="none" stroke="#466CF3" strokeWidth="1.8" />
      <path d={red} fill="none" stroke="#F83D69" strokeWidth="1.8" />
      <line x1="250" y1="20" x2="250" y2="165" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="250" cy="124" r="4" fill="#fff" stroke="#466CF3" strokeWidth="1.8" />
      <circle cx="250" cy="138" r="4" fill="#fff" stroke="#F83D69" strokeWidth="1.8" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Dashboard mockup                                                    */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  delta,
  down,
  chartColor,
  id,
}: {
  label: string
  value: string
  delta: string
  down?: boolean
  chartColor: string
  id: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-[13px] font-semibold text-ink">{label}</p>
      <p className="mt-2 text-[17px] font-semibold text-ink">{value}</p>
      <p className="mt-1 text-[11.5px] text-mist">
        <span style={{ color: down ? '#F83D69' : '#22c07d' }}>{delta}</span> vs last
        month
      </p>
      <div className="mt-2">
        <MiniArea color={chartColor} id={id} up={!down} />
      </div>
    </div>
  )
}

function SideItem({
  icon,
  label,
  active,
  badge,
}: {
  icon: string
  label: string
  active?: boolean
  badge?: string
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-[13px] ${
        active
          ? 'border border-line bg-white font-medium text-ink shadow-sm'
          : 'text-body'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <SIcon d={icon} size={15} />
        {label}
      </span>
      {badge && (
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink text-[9px] font-semibold text-white">
          {badge}
        </span>
      )}
    </div>
  )
}

function DashboardMock({
  variant = 'blue',
  userName = 'Marcus Hale',
  userEmail = 'marcus.h@mail.com',
  headerTitle = 'Dashboard',
  avatar = AVATARS.m1,
}: {
  variant?: 'blue' | 'green'
  userName?: string
  userEmail?: string
  headerTitle?: string
  avatar?: string
}) {
  const line = variant === 'blue' ? '#466CF3' : '#22c07d'
  const uid = variant === 'blue' ? 'b' : 'g'
  return (
    <div className="rounded-[20px] border border-line bg-white/70 p-2.5 text-left shadow-[0_24px_60px_-20px_rgba(24,24,24,0.18)] backdrop-blur">
      <div className="flex overflow-hidden rounded-[14px] border border-line bg-paper">
        {/* sidebar */}
        <div className="hidden w-[215px] shrink-0 flex-col justify-between border-r border-line bg-paper p-4 md:flex">
          <div>
            <div className="px-1 pb-5 pt-1">
              <LogoLockup size={22} />
            </div>
            <div className="flex flex-col gap-1">
              <SideItem icon={paths.folder} label="Inbox" active badge="4" />
              <SideItem icon={paths.folder} label="Project" />
              <SideItem icon={paths.activity} label="Activity" />
              <SideItem icon={paths.doc} label="My task" />
              <SideItem icon={paths.users} label="Teams" />
              <SideItem icon={paths.message} label="Message" />
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-24">
            <SideItem icon={paths.headset} label="Help Center" />
            <SideItem icon={paths.gear} label="Settings" />
          </div>
        </div>
        {/* main */}
        <div className="min-w-0 flex-1 bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="text-[15px] font-semibold text-ink">{headerTitle}</p>
            <div className="flex items-center gap-4">
              <span className="text-body">
                <SIcon d={paths.cloud} size={17} />
              </span>
              <span className="relative text-body">
                <SIcon d={paths.bell} size={17} />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-pink" />
              </span>
              <span className="flex items-center gap-2">
                <img
                  src={avatar}
                  alt={userName}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="hidden leading-tight sm:block">
                  <span className="block text-[12px] font-semibold text-ink">
                    {userName}
                  </span>
                  <span className="block text-[10.5px] text-mist">{userEmail}</span>
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4">
            {/* balance */}
            <div className="flex items-center justify-between gap-6 rounded-xl border border-line bg-white p-4">
              <div className="shrink-0">
                <p className="text-[12px] font-medium text-body">Balance</p>
                <p className="mt-1 text-[22px] font-semibold tracking-tight text-ink">
                  $58,410.22
                </p>
                <p className="mt-1 text-[11.5px] text-mist">
                  You've grown your sales by{' '}
                  <span style={{ color: line }}>$58,410.22</span> this month
                </p>
              </div>
              <div className="w-full max-w-[290px]">
                <BalanceLine color={line} id={`bal-${uid}`} />
              </div>
            </div>
            {/* stat row */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Total Revenue"
                value="$54,102.40"
                delta="-4%"
                down
                chartColor="#F83D69"
                id={`s1-${uid}`}
              />
              <StatCard
                label="Total Customer"
                value="7,214.36"
                delta="+3%"
                chartColor={line}
                id={`s2-${uid}`}
              />
              <StatCard
                label="Total Transaction"
                value="7,912.85"
                delta="-2%"
                down
                chartColor="#F83D69"
                id={`s3-${uid}`}
              />
            </div>
            {/* pipeline */}
            <div className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink">Sales Pipeline</p>
                <div className="flex items-center gap-2">
                  <div className="flex overflow-hidden rounded-md border border-line text-[11px] text-body">
                    {['1w', '1M', '6M', '1Y'].map((t, i) => (
                      <span
                        key={t}
                        className={`px-2 py-1 ${i < 3 ? 'border-r border-line' : ''} ${i === 1 ? 'bg-paper font-medium text-ink' : ''}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-body">
                    <SIcon d={paths.filter} size={11} /> Filter
                  </span>
                </div>
              </div>
              <div className="relative mt-3 flex gap-3">
                <div className="flex flex-col justify-between pb-5 text-right text-[10px] text-mist">
                  {['1K', '500', '250', '100', '0'].map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <div className="relative h-[170px] min-w-0 flex-1">
                  <PipelineChart />
                  {/* tooltip */}
                  <div className="absolute left-[38%] top-[18%] w-[118px] rounded-lg border border-line bg-white p-2.5 shadow-lg">
                    <p className="text-[11px] font-semibold text-ink">Apr 2025</p>
                    <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-body">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full border-[1.5px] border-royal bg-white" />
                        Revenue
                      </span>
                      <span className="font-medium text-ink">590</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10.5px] text-body">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full border-[1.5px] border-pink bg-white" />
                        Spend
                      </span>
                      <span className="font-medium text-ink">190</span>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between px-1 text-[10.5px] text-mist">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section chrome: hairline + corner squares                            */
/* ------------------------------------------------------------------ */

function SectionRule() {
  return (
    <div className="relative mx-auto h-px max-w-[1280px] bg-line px-6">
      <span className="absolute left-6 -top-1 h-2 w-2 border border-[#d9d9d9] bg-white" />
      <span className="absolute right-6 -top-1 h-2 w-2 border border-[#d9d9d9] bg-white" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav({ onCta }: { onCta: () => void }) {
  return (
    <header className="absolute left-1/2 top-4 z-40 w-[min(1040px,calc(100%-32px))] -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-line bg-[#fafafa]/90 py-2.5 pl-6 pr-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <a href="#top" aria-label="FlowForge Home">
          <LogoLockup size={26} />
        </a>
        <nav className="hidden items-center gap-8 text-[15px] font-medium text-ink md:flex">
          <a href="#features" className="transition hover:text-royal">
            Services
          </a>
          <a href="#tools" className="transition hover:text-royal">
            Capabilities
          </a>
          <a href="#pricing" className="transition hover:text-royal">
            Packages &amp; Pricing
          </a>
          <a href="#faq" className="transition hover:text-royal">
            How It Works
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <a href="#pricing" className="hidden text-[15px] font-medium text-ink transition hover:text-royal sm:block">
            Pricing
          </a>
          <button onClick={onCta} className="btn-dark !py-2.5 !px-6 text-[14px]">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* faint rising chart line */}
      <svg
        className="absolute right-0 top-[240px] h-[520px] w-[62%] opacity-70"
        viewBox="0 0 800 520"
        preserveAspectRatio="none"
      >
        <path
          d="M0 520 C 120 500 200 470 280 430 S 420 340 500 290 S 640 190 720 130 S 780 60 800 30"
          fill="none"
          stroke="#e8e6ef"
          strokeWidth="1.5"
        />
        <circle cx="500" cy="290" r="7" fill="#fff" stroke="#dcd9e6" strokeWidth="1.5" />
      </svg>
      {/* right axis labels */}
      <div className="absolute right-6 top-[195px] hidden flex-col gap-[100px] text-[11px] text-[#a3a3ab] lg:flex">
        {['70K', '60K', '50K', '40K'].map((l) => (
          <span key={l} className="flex items-center gap-1.5">
            <span className="inline-block h-px w-3 bg-[#c9c9d2]" /> {l}
          </span>
        ))}
      </div>
      <div className="absolute right-6 top-[620px] hidden flex-col gap-[100px] text-[11px] text-[#a3a3ab] lg:flex">
        {['100K', '20K', '0'].map((l) => (
          <span key={l} className="flex items-center gap-1.5">
            <span className="inline-block h-px w-3 bg-[#c9c9d2]" /> {l}
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section id="top" className="relative pt-[140px] pb-12">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-[1240px] px-6 text-center">
        <Reveal>
          <span className="badge-pill !text-[14px]">Custom Business Apps &amp; Workflows</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-hero mx-auto mt-7 max-w-[860px] text-ink">
            A custom tool that kills one piece of your paperwork,
            <br />
            <span className="bg-gradient-to-r from-royal via-[#6927da] to-pink bg-clip-text text-transparent">
              built around your workflow
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="body-copy mx-auto mt-5 max-w-[580px]">
            Tell us the manual, repetitive process that's eating your time — data entry, custom billing, POS systems, scheduling, or reporting. We build high-performance custom software that handles it all for you.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="cta-glow">
              <button onClick={onCta} className="btn-dark !px-8 !py-4 text-[16px]">
                Get Starter Build — $699
              </button>
            </span>
            <a
              href="#video-demo"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-[15px] font-medium text-ink shadow-sm transition hover:border-ink hover:bg-paper"
            >
              <SIcon d={paths.activity} size={16} /> Watch Live Production App
            </a>
          </div>
          <p className="mt-4 text-[13.5px] text-mist">One-time build • No vendor lock-in • 100% bespoke</p>
        </Reveal>

        {/* Live Production Video Showcase */}
        <div id="video-demo" className="dash-spring mx-auto mt-14 max-w-[1040px]">
          <div className="rounded-[24px] border border-line bg-white/80 p-3 shadow-[0_24px_60px_-20px_rgba(24,24,24,0.18)] backdrop-blur">
            <div className="overflow-hidden rounded-[18px] border border-line bg-black">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#161618] px-4 py-3 text-[12.5px] text-white/80">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 font-medium text-white/90">Live App in Production — Point of Sale &amp; Billing System</span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  ● Production Ready
                </span>
              </div>
              <video
                src="/brag.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="h-auto w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Why section — three product cards                                   */
/* ------------------------------------------------------------------ */

function AvatarCluster() {
  const imgs = [AVATARS.m2, AVATARS.w1, AVATARS.m3, AVATARS.w2]
  return (
    <span className="flex -space-x-2">
      <span className="z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-royal text-[10px] font-bold text-white">
        +
      </span>
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="h-6 w-6 rounded-full border-2 border-white object-cover"
          style={{ zIndex: 9 - i }}
        />
      ))}
    </span>
  )
}

function TaskCard() {
  const tasks = [
    { t: 'Design team stand-up', time: '09AM - 10AM' },
    { t: 'Webflow Team', time: '08AM - 11AM' },
    { t: 'Framer Team', time: '11AM - 12AM' },
  ]
  return (
    <div className="h-[300px] overflow-hidden rounded-2xl border border-line bg-paper p-5">
      <p className="text-[14px] font-semibold text-ink">Today's Task</p>
      <div className="mt-4 flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.t} className="rounded-xl border border-line bg-white p-3.5">
            <p className="text-[13.5px] font-medium text-ink">{task.t}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[12px] text-mist">{task.time}</p>
              <AvatarCluster />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrafficCard() {
  const bars = [
    { w: '40%', color: '#466CF3', label: '40%' },
    { w: '80%', color: '#F83D69', label: '80%' },
    { w: '20%', color: '#21CCEE', label: '20%' },
  ]
  return (
    <div className="flex h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper p-5">
      <p className="text-[14px] font-semibold text-ink">Traffic</p>
      <div className="relative flex flex-1 flex-col justify-center gap-7">
        {/* dashed grid */}
        <div className="pointer-events-none absolute inset-0 flex justify-between px-2" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="h-full border-l border-dashed border-[#e4e4e7]" />
          ))}
        </div>
        {bars.map((b) => (
          <div key={b.label} className="relative">
            <div
              className="flex h-7 items-center justify-end rounded-md"
              style={{ width: b.w, background: b.color }}
            >
              <span className="translate-x-1/2 rounded-[4px] border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink shadow-sm">
                {b.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 text-[12.5px] text-body">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan" /> Google
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pink" /> Facebook
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-royal" /> X
        </span>
      </div>
    </div>
  )
}

function OverviewCard() {
  return (
    <div className="h-[300px] overflow-hidden rounded-2xl border border-line bg-paper p-5">
      <p className="text-[14px] font-semibold text-ink">Sales overview</p>
      <div className="mt-4 grid w-[130%] grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[12.5px] font-medium text-ink">Total Transaction</p>
          <p className="mt-1.5 text-[16px] font-semibold text-ink">7,912.85</p>
          <p className="mt-0.5 text-[11px] text-mist">
            <span className="text-pink">-2%</span> vs last month
          </p>
          <MiniArea color="#f4623a" id="ov1" />
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[12.5px] font-medium text-ink">Total Customer</p>
          <p className="mt-1.5 text-[16px] font-semibold text-ink">7,214.36</p>
          <p className="mt-0.5 text-[11px] text-mist">
            <span className="text-[#22c07d]">+3%</span> vs last month
          </p>
          <MiniArea color="#22c07d" id="ov2" up />
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[12.5px] font-medium text-ink">Total Customer</p>
          <p className="mt-1.5 text-[16px] font-semibold text-ink">7,214.36</p>
          <p className="mt-0.5 text-[11px] text-mist">
            <span className="text-[#22c07d]">+3%</span> vs last month
          </p>
          <MiniArea color="#22c07d" id="ov3" up />
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[12.5px] font-medium text-ink">Total Transaction</p>
          <p className="mt-1.5 text-[16px] font-semibold text-ink">7,912.85</p>
          <p className="mt-0.5 text-[11px] text-mist">
            <span className="text-pink">-2%</span> vs last month
          </p>
          <MiniArea color="#f4623a" id="ov4" />
        </div>
      </div>
    </div>
  )
}

function WhySection() {
  const items = [
    {
      card: <TaskCard />,
      title: 'POS & Order Management',
      copy: 'Custom cashier screens, fast checkout flows, barcode scanning, and direct receipt printing.',
    },
    {
      card: <TrafficCard />,
      title: 'Automated Billing & Invoices',
      copy: 'Kill manual paperwork with automated billing, PDF receipt dispatch, and inventory sync.',
    },
    {
      card: <OverviewCard />,
      title: 'Weekly & Monthly Reports',
      copy: 'Auto-generate comprehensive revenue, tax, and inventory summaries delivered straight to your inbox.',
    },
  ]
  return (
    <section id="features" className="relative pb-24 pt-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Reveal>
            <span className="badge-pill">
              <SIcon d={paths.scissors} size={14} /> Full-Stack Capabilities
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-h2 mt-6 text-ink">Built Specifically For Your Business Model</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mx-auto mt-4 max-w-[620px]">
              No cookie-cutter templates with monthly bloat. We architect frontend and backend applications with physical hardware integration tailored to your day-to-day operations.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1}>
              {it.card}
              <h3 className="mt-7 text-[20px] font-semibold tracking-tight text-ink">
                {it.title}
              </h3>
              <p className="body-copy mt-2 max-w-[300px]">{it.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Key tools — sticky scrollspy                                        */
/* ------------------------------------------------------------------ */

const TOOL_TABS = [
  {
    id: 'pos',
    label: 'Custom POS & Billing Systems',
    copy: 'High-speed checkout interfaces with thermal printer hooks, tax calculations, and real-time inventory deduction.',
  },
  {
    id: 'reports',
    label: 'Automated Report Generation',
    copy: 'Eliminate manual spreadsheet entry. Generate weekly and monthly PDF/Excel analytics summaries automatically.',
  },
  {
    id: 'workflows',
    label: 'Workflow & API Automation',
    copy: 'Sync your customer inquiries, orders, and internal tools directly with third-party APIs and CRM databases.',
  },
]

function DealsTable() {
  const rows = [
    { c: 'Innoveta', a: '$75000', stage: 'Proposal', sc: '#6927DA', p: '65%' },
    { c: 'Acmecore', a: '$15000', stage: 'Negotiation', sc: '#F23D94', p: '95%' },
    { c: 'Veltora', a: '$12000', stage: 'Discovery', sc: '#1470EF', p: '55%' },
    { c: 'Brivona', a: '$19000', stage: 'Closed won', sc: '#21CCEE', p: '100%' },
    { c: 'BitFlow', a: '$20000', stage: 'Negotiation', sc: '#F23D94', p: '65%' },
    { c: 'Innoveta', a: '$24000', stage: 'Discovery', sc: '#1470EF', p: '55%' },
  ]
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
      <p className="text-[14px] font-semibold text-ink">Manage Your All Deals</p>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <div className="grid grid-cols-4 gap-2 border-b border-line bg-paper px-4 py-2.5 text-[12.5px] font-medium text-body">
          <span>Company</span>
          <span>Amount</span>
          <span>Stage</span>
          <span>Probability</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 items-center gap-2 px-4 py-3 text-[13px] text-ink ${i < rows.length - 1 ? 'border-b border-line' : ''}`}
          >
            <span>{r.c}</span>
            <span>{r.a}</span>
            <span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
                style={{ color: r.sc, background: `${r.sc}14` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.sc }} />
                {r.stage}
              </span>
            </span>
            <span className="flex items-center gap-2 text-[12px]">
              <span className="flex gap-[2px]">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="h-3 w-[3px] rounded-sm bg-royal/70" />
                ))}
              </span>
              {r.p}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function KanbanCard({
  name,
  glyph,
  amount,
  color,
  avatar,
  lifted,
}: {
  name: string
  glyph: string
  amount: string
  color: string
  avatar: string
  lifted?: boolean
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-white p-4 ${
        lifted ? 'z-10 -translate-y-3 -rotate-3 shadow-xl' : ''
      }`}
    >
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
        <span className="text-[13px] text-[#5b8c3e]">{glyph}</span> {name}
      </p>
      <p className="mt-1.5 text-[14px] text-body">
        <span className="font-semibold" style={{ color }}>
          {amount}
        </span>{' '}
        Monthly
      </p>
      <p className="mt-2.5 border-t border-line pt-2.5 text-[12px] leading-relaxed text-mist">
        Set a follow-up for next week
      </p>
      <div className="mt-2.5 flex items-center justify-between">
        <img src={avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
        <span className="flex items-center gap-1 text-[11px] text-mist">
          <SIcon d={paths.clock} size={11} /> 1h
        </span>
      </div>
    </div>
  )
}

function KanbanBoard() {
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-5 text-[12.5px] font-medium text-ink">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-royal" /> Closed won
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10.5px] text-white">$2800</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan" /> Pending
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10.5px] text-white">$3500</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-magenta" /> Potential
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10.5px] text-white">$700</span>
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <KanbanCard name="Nimbus" glyph="✳" amount="$5,555" color="#466CF3" avatar={AVATARS.m2} />
        <KanbanCard name="Vertex" glyph="✳" amount="$5,789" color="#466CF3" avatar={AVATARS.m1} lifted />
        <KanbanCard name="Orbita" glyph="✳" amount="$789" color="#F23D94" avatar={AVATARS.w3} />
        <div className="flex items-center justify-center rounded-xl border border-dashed border-[#d4d4d8] bg-paper text-[15px] font-medium text-[#a1a1aa]">
          Close Deal
        </div>
        <KanbanCard name="Pulsewave" glyph="✳" amount="$4,859" color="#466CF3" avatar={AVATARS.w1} />
        <KanbanCard name="Zephyr" glyph="✳" amount="$836" color="#F23D94" avatar={AVATARS.w2} />
      </div>
    </div>
  )
}

function KeyToolsSection() {
  const [active, setActive] = useState(0)
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = refs.findIndex((r) => r.current === e.target)
            if (idx >= 0) setActive(idx)
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    refs.forEach((r) => r.current && io.observe(r.current))
    return () => io.disconnect()
  }, [])

  const visuals = [
    <div key="v1" className="overflow-hidden rounded-xl border border-line bg-paper p-3 shadow-sm">
      <div className="max-h-[420px] overflow-hidden rounded-lg">
        <DashboardMock
          variant="blue"
          headerTitle="Good Morning, Rowan"
          userName="Rowan Vale"
          userEmail="rowan.v@mail.com"
          avatar={AVATARS.m4}
        />
      </div>
    </div>,
    <DealsTable key="v2" />,
    <KanbanBoard key="v3" />,
  ]

  return (
    <section id="tools" className="relative py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-14 lg:grid-cols-[380px_1fr]">
          {/* sticky left */}
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="badge-pill">
                  <SIcon d={paths.rocket} size={14} /> Key Tools
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-h2 mt-6 max-w-[360px] text-ink">
                  AI that pushes every deal ahead
                </h2>
              </Reveal>
              <div className="mt-10 flex flex-col gap-6">
                {TOOL_TABS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() =>
                      refs[i].current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                    className={`border-l-2 pl-4 text-left text-[19px] font-medium transition-colors duration-300 ${
                      active === i
                        ? 'border-royal text-royal'
                        : 'border-transparent text-ink hover:text-royal'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* right stack */}
          <div className="flex min-w-0 flex-col">
            {TOOL_TABS.map((t, i) => (
              <div
                key={t.id}
                ref={refs[i]}
                className={i > 0 ? 'mt-12 border-t border-line pt-12' : ''}
              >
                <Reveal>
                  <h3 className="text-[26px] font-medium tracking-tight text-ink" style={{ fontFamily: 'Geist, Inter, sans-serif', letterSpacing: '-1px' }}>
                    {t.label}
                  </h3>
                  <p className="body-copy mt-3 max-w-[480px]">{t.copy}</p>
                  <div className="mt-7">{visuals[i]}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Dark features                                                       */
/* ------------------------------------------------------------------ */

const DARK_FEATURES = [
  { icon: paths.goal, title: 'POS & Cashier Screens', copy: 'Intuitive touch-friendly checkout interfaces designed for retail, services, or food businesses.' },
  { icon: paths.price, title: 'Hardware & Printer Sync', copy: 'Direct automated printing to thermal receipt printers, USB/network scanners, and label makers.' },
  { icon: paths.game, title: 'Automated Billing & Invoicing', copy: 'End-to-end payment collection, automated PDF invoices, and automated recurring billing workflows.' },
  { icon: paths.pulse, title: 'Scheduled Report Generation', copy: 'Weekly & monthly automated financial summaries, sales audits, and inventory tracking reports.' },
  { icon: paths.workflow, title: 'Custom Database & Backend', copy: 'Reliable Postgres/SQL databases with fast REST/GraphQL APIs and secure role-based permissions.' },
  { icon: paths.access, title: 'Role & Staff Permissions', copy: 'Granular cashier, manager, and administrator security views to safeguard business records.' },
]

function DarkSection() {
  return (
    <section className="relative px-4 py-6">
      <div className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[32px] bg-night py-28">
        {/* orange accent hairlines */}
        <div className="pointer-events-none absolute left-0 top-[128px] h-px w-[42%] bg-gradient-to-r from-transparent via-[#c2410c] to-[#c2410c]" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-[128px] h-px w-[42%] bg-gradient-to-l from-transparent via-[#c2410c] to-[#c2410c]" aria-hidden />
        <div className="pointer-events-none absolute right-[96px] top-[128px] h-[420px] w-px bg-gradient-to-b from-[#c2410c] to-transparent" aria-hidden />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <Reveal>
              <span className="badge-pill badge-pill--dark">
                <SIcon d={paths.rocket} size={14} /> Full-Stack Engineering
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-h2 mt-6 text-white">What We Build For You</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.7] text-[#9b9b9b]">
                From custom internal web tools to complete customer-facing apps with hardware integration.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DARK_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.1}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-colors duration-300 hover:border-white/[0.16]">
                  <span className="text-[#fb3b5c]">
                    <SIcon d={f.icon} size={40} sw={1.4} />
                  </span>
                  <h3 className="mt-8 text-[20px] font-semibold tracking-tight text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#9b9b9b]">{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Analytics tabs + table                                              */
/* ------------------------------------------------------------------ */

const ANALYTIC_TABS = [
  { label: 'Meeting Planner', color: '#21CCEE', glyph: '◔' },
  { label: 'Territory Mapping', color: '#1470EF', glyph: '♃' },
  { label: 'Lead Scoring', color: '#F23D94', glyph: '⌁' },
]

const TABLE_ROWS = [
  { name: 'Ronan Cole', avatar: AVATARS.m2, date: '2023-10-01', amount: '$130,000', pink: true, status: 'Pending' },
  { name: 'Lena Ashford', avatar: AVATARS.w2, date: '2024-11-02', amount: '$400,000', pink: false, status: 'Approved' },
  { name: 'Gray Hollis', avatar: AVATARS.m3, date: '2025-10-08', amount: '$220,000', pink: false, status: 'Approved' },
  { name: 'Jonas Reed', avatar: AVATARS.m1, date: '2021-09-06', amount: '$360,000', pink: true, status: 'Pending' },
  { name: 'Bess Calder', avatar: AVATARS.w1, date: '2024-03-07', amount: '$890,000', pink: false, status: 'Approved' },
]

function AnalyticsSection() {
  const [tab, setTab] = useState(0)
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Reveal>
            <span className="badge-pill">
              <SIcon d={paths.scissors} size={14} /> Growth Gear
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-h2 mt-6 text-ink">Deep analytics &amp; clean reporting</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mx-auto mt-4 max-w-[460px]">
              Gain complete visibility into sales velocity, order metrics, and cashier performance across every branch.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {ANALYTIC_TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setTab(i)}
                className={`flex items-center gap-2.5 rounded-full border bg-white px-5 py-2.5 text-[15px] font-medium text-ink transition-all duration-300 ${
                  tab === i ? 'shadow-sm' : 'border-line hover:border-[#d4d4d8]'
                }`}
                style={tab === i ? { borderColor: t.color } : undefined}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] text-white"
                  style={{ background: t.color }}
                >
                  {t.glyph}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-[900px] rounded-[24px] border border-line bg-paper p-4 shadow-[0_24px_50px_-24px_rgba(24,24,24,0.18)]">
            <p className="px-2 pb-3 pt-1 text-[13px] font-semibold text-ink">Sales Analytics</p>
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-line bg-paper px-5 py-3 text-[13px] text-body">
                <span>Job Title</span>
                <span>Date Sent</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {TABLE_ROWS.map((r, i) => (
                <div
                  key={r.name}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center gap-2 px-5 py-4 text-[14px] ${
                    i < TABLE_ROWS.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <span className="flex items-center gap-3 text-ink">
                    <img src={r.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    {r.name}
                  </span>
                  <span className="text-body">{r.date}</span>
                  <span
                    className="font-medium"
                    style={{ color: r.pink ? '#F23D94' : '#1470EF' }}
                  >
                    {r.amount}
                  </span>
                  <span>
                    <span
                      className="rounded-full px-3 py-1 text-[12.5px] font-medium"
                      style={
                        r.status === 'Pending'
                          ? { color: '#F23D94', background: '#F23D9418' }
                          : { color: '#1470EF', background: '#1470EF14' }
                      }
                    >
                      {r.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

function PricingCard({
  plan,
  featured,
  onSelect,
}: {
  plan: (typeof PLANS)[PlanKey]
  featured?: boolean
  onSelect: () => void
}) {
  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl p-8 ${
        featured
          ? 'border-2 border-royal bg-white shadow-xl ring-4 ring-royal/10'
          : 'border border-line bg-paper'
      }`}
    >
      {featured && (
        <span className="absolute -right-[2px] -top-[2px] rounded-bl-xl rounded-tr-2xl bg-royal px-4 py-2 text-[11px] font-semibold tracking-wide text-white">
          RECOMMENDED
        </span>
      )}
      <div>
        <h3 className="text-[22px] font-semibold tracking-tight text-ink">{plan.name}</h3>
        <p className="body-copy mt-2 min-h-[48px] !text-[14.5px]">{plan.blurb}</p>
        <p className="mt-5">
          <span
            className="text-[44px] font-semibold tracking-tight text-ink"
            style={{ fontFamily: 'Geist, Inter, sans-serif', letterSpacing: '-1.5px' }}
          >
            ${plan.price}
          </span>
          <span className="ml-2 text-[15px] font-medium text-mist">/ one-time build</span>
        </p>
        <button
          onClick={onSelect}
          className={`mt-7 w-full rounded-full py-3.5 text-[15px] font-medium transition-all duration-300 ${
            featured
              ? 'bg-[#0d0402] text-white hover:bg-[#2a1a14]'
              : 'border border-[#d4d4d8] bg-white text-ink hover:border-ink hover:bg-paper'
          }`}
        >
          Get Offer Now
        </button>
        <p className="mt-8 text-[14.5px] font-semibold text-ink">What's included:</p>
        <ul className="mt-4 flex flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5 text-[14.5px]">
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: f.on ? '#466CF3' : '#c7c7cc' }}
              />
              <span style={{ color: f.on ? '#181818' : '#a1a1aa' }}>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 border-t border-line pt-4 text-center text-[12.5px] text-mist">
        Full source code &amp; live deployment included
      </p>
    </div>
  )
}

function Pricing({ onSelect }: { onSelect: (p: PlanKey) => void }) {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Reveal>
            <span className="badge-pill">
              <SIcon d={paths.db} size={14} /> Pricing &amp; Offers
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-h2 mt-6 text-ink">Simple, Transparent Project Pricing</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mx-auto mt-4 max-w-[540px]">
              No unpredictable monthly subscription bloat. We build, test, and hand over custom business software built around your exact workflow.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-14 grid max-w-[840px] gap-8 md:grid-cols-2">
          <Reveal>
            <PricingCard
              plan={PLANS.starter}
              featured
              onSelect={() => onSelect('starter')}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <PricingCard
              plan={PLANS.ultimate}
              onSelect={() => onSelect('ultimate')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="relative py-24">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[380px_1fr]">
        <div>
          <Reveal>
            <span className="badge-pill">
              <SIcon d={paths.rocket} size={14} /> FAQ
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-h2 mt-6 text-ink">Frequently Asked Questions</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mt-4">Find quick answers to common questions</p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className="rounded-2xl border border-line bg-paper">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >
                  <span className="text-[18px] font-semibold tracking-tight text-ink">
                    {f.q}
                  </span>
                  <span className={`faq-chevron text-body ${open === i ? 'open' : ''}`}>
                    <SIcon d={paths.chevron} size={18} />
                  </span>
                </button>
                <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                  <div>
                    <p className="body-copy px-7 pb-6 max-w-[560px]">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Final CTA + Footer                                                  */
/* ------------------------------------------------------------------ */

function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="relative mx-auto max-w-[1000px] px-6">
        <div
          className="pointer-events-none mx-auto max-w-[880px]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 88%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 88%)',
          }}
          aria-hidden
        >
          <div className="max-h-[430px] overflow-hidden">
            <DashboardMock
              variant="green"
              userName="Rowan Vale"
              userEmail="rowan.v@mail.com"
              avatar={AVATARS.m4}
            />
          </div>
        </div>
        <div className="relative -mt-28 text-center">
          <Reveal>
            <div className="flex justify-center">
              <LogoMark size={56} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-h2 mt-6 text-ink">Ready to automate your paperwork today?</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mt-4">Get a custom app or workflow automation delivered for your business.</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex justify-center pb-4">
              <span className="cta-glow">
                <button onClick={onCta} className="btn-dark !px-8 !py-4 text-[16px]">
                  Get Starter Automation Build — $699
                </button>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SocialCircle({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#top"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white transition hover:bg-[#333]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  )
}

const social = {
  fb: 'M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.5H7.4V14h2.7v8h3.4Z',
  li: 'M6.5 21H3V9h3.5v12ZM4.7 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4ZM21 21h-3.4v-5.8c0-1.4-.5-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V21h-3.4V9h3.4v1.5c.5-.7 1.3-1.7 3.1-1.7 2.3 0 4 1.5 4 4.7V21Z',
  ig: 'M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm0-2.1a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm6.9-.3a1.2 1.2 0 1 1-2.5 0 1.2 1.2 0 0 1 2.5 0ZM12 4.2c-2.6 0-3 0-4.1.1-1 0-1.6.2-2 .4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2C3.4 9.8 3.4 10.1 3.4 12s0 2.2.1 3.3c0 1 .2 1.6.4 2 .2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2 .4 1.1.1 1.5.1 4.1.1s3 0 4.1-.1c1 0 1.6-.2 2-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2 .1-1.1.1-1.4.1-3.3s0-2.2-.1-3.3c0-1-.2-1.6-.4-2a3.3 3.3 0 0 0-.8-1.2 3.3 3.3 0 0 0-1.2-.8c-.4-.2-1-.3-2-.4-1.1-.1-1.5-.1-4.1-.1Z',
  tg: 'M21.9 4.6 18.9 19c-.2 1-.8 1.3-1.6.8l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.6L18.3 7c.4-.3-.1-.5-.6-.2L7.4 13.3l-4.4-1.4c-1-.3-1-1 .2-1.4L20.6 3.2c.8-.3 1.5.2 1.3 1.4Z',
}

function Footer() {
  return (
    <footer className="relative pt-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoLockup size={30} />
            <p className="body-copy mt-6 max-w-[260px]">
              FlowForge builds bespoke business software, automated billing systems, and custom tools tailored to your operational workflows.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialCircle label="Facebook" d={social.fb} />
              <SocialCircle label="LinkedIn" d={social.li} />
              <SocialCircle label="Instagram" d={social.ig} />
              <SocialCircle label="Telegram" d={social.tg} />
            </div>
          </div>
          {[
            { h: 'Services', links: ['Custom POS Systems', 'Billing Automation', 'Report Generators', 'Pricing'] },
            { h: 'Capabilities', links: ['Full-stack Web Apps', 'Hardware/Printer Sync', 'Database Pipelines', 'Integrations'] },
            { h: 'Company', links: ['Terms & Conditions', 'Whop Product Page'] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-[15px] font-semibold text-ink">{col.h}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="body-copy transition hover:text-royal">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SectionRule />
        <p className="py-8 text-center text-[14.5px] text-body">
          © 2026 FlowForge Automation. Powered by Whop.
        </p>
      </div>
      <div className="gradient-rail" />
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Home() {
  const [checkoutPlan, setCheckoutPlan] = useState<PlanKey | null>(null)
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <div className="gradient-rail w-full" />
      <div className="relative z-10 w-full">
        <Nav onCta={() => setCheckoutPlan('ultimate')} />
        <Hero onCta={() => setCheckoutPlan('ultimate')} />
        <WhySection />
        <KeyToolsSection />
        <DarkSection />
        <AnalyticsSection />
        <Pricing onSelect={(p) => setCheckoutPlan(p)} />
        <Faq />
        <FinalCta onCta={() => setCheckoutPlan('ultimate')} />
        <Footer />
      </div>
      {checkoutPlan && (
        <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />
      )}
    </div>
  )
}
