import { createFileRoute } from '@tanstack/react-router'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { LogoMarquee } from '@/components/logo-marquee'
import { BentoGrid } from '@/components/bento-grid'
import { Pricing } from '@/components/pricing'
import { FinalCTA } from '@/components/final-cta'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute( '/$lang/' )( { component: Home } )

function Home() {
  return (

    <SmoothScroll>

      <main className="min-h-screen bg-background no-scrollbar  ">
        {/* <ScrollArea aria-orientation='vertical'> */}
          <Navbar />
          <Hero />
          <LogoMarquee />
          <BentoGrid />
          <Pricing />
          <FinalCTA />
        {/* </ScrollArea> */}

        {/* <Footer /> */}
      </main>
    </SmoothScroll>

  )
}
