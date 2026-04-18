import Hls from 'hls.js'
import { motion } from 'motion/react'
import { Compass, Orbit, Rocket, Shield, Sparkles, Star, Telescope } from 'lucide-react'
import { useEffect, useRef } from 'react'

const streamUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

const metrics = [
  { label: 'Orbital Routes', value: '42' },
  { label: 'Departures / Week', value: '18' },
  { label: 'Safety Confidence', value: '99.9%' },
]

const packages = [
  {
    title: 'Lunar Arc',
    detail: '3 days circling lunar dark side with private observatory module.',
    icon: Orbit,
  },
  {
    title: 'Aurora Drift',
    detail: 'Polar atmosphere skim with adaptive dome views and zero-g suite.',
    icon: Compass,
  },
  {
    title: 'Deep Sky',
    detail: 'Extended deep-space route for stargazing with onboard astronomers.',
    icon: Telescope,
  },
]

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(streamUrl)
      hls.attachMedia(video)

      return () => {
        hls.destroy()
      }
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-8 md:gap-20 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass flex items-center justify-between rounded-full px-5 py-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-white/85">
            <Star className="h-4 w-4" /> Astra
          </div>
          <a href="#book" className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
            Reserve Flight
          </a>
        </motion.header>

        <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-white/85">
              <Sparkles className="h-3.5 w-3.5" /> Premium Space Tourism
            </span>
            <h1 className="font-heading text-5xl italic leading-[0.95] md:text-7xl">Astra: Your Next Address Is Orbit</h1>
            <p className="max-w-xl text-lg font-light text-white/75 md:text-xl">
              Discover private orbital journeys crafted for explorers, dreamers, and founders seeking the rarest horizon.
            </p>
            <div id="book" className="flex flex-wrap gap-3">
              <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                Plan My Mission
              </button>
              <button className="liquid-glass rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white/85">
                View Itineraries
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="liquid-glass-strong overflow-hidden rounded-[2rem] p-3"
          >
            <video ref={videoRef} autoPlay muted loop playsInline className="h-[320px] w-full rounded-[1.5rem] object-cover" />
          </motion.div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {metrics.map((metric, idx) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.08 }}
              className="liquid-glass rounded-[2rem] px-6 py-5"
            >
              <p className="font-heading text-4xl italic">{metric.value}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.16em] text-white/70">{metric.label}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {packages.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              whileHover={{ y: -5 }}
              className="liquid-glass rounded-[2rem] p-6"
            >
              <item.icon className="h-5 w-5 text-white/90" />
              <h2 className="mt-4 font-heading text-3xl italic">{item.title}</h2>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/70">{item.detail}</p>
            </motion.article>
          ))}
        </section>

        <section className="liquid-glass-strong flex flex-col items-start justify-between gap-4 rounded-[2rem] px-6 py-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Concierge Assurance</p>
            <p className="mt-2 max-w-2xl text-base font-light text-white/85">
              White-glove planning, adaptive life-support pods, and guardian AI systems overseen by mission control.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="liquid-glass rounded-full p-3">
              <Rocket className="h-4 w-4" />
            </span>
            <span className="liquid-glass rounded-full p-3">
              <Shield className="h-4 w-4" />
            </span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
