'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TextAnimate } from "@/components/ui/text-animate";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, ShieldCheck, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { getServiceBySlug } from "@/lib/services-data";
import { useBooking } from "@/components/booking/BookingProvider";
import { Particles } from "@/components/ui/particles";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  const { openBooking, openWhatsApp } = useBooking();
  if (!service) return null;

  return (
    <div className="pt-24 pb-0">
      {/* ─── HERO ─── */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[100%] bg-accent/8 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[80%] bg-primary/5 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 text-primary font-semibold text-xs uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {service.tagline}
            </motion.div>

            <TextAnimate
              as="h1"
              animation="blurInUp"
              by="word"
              className="text-5xl lg:text-7xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]"
            >
              {service.headline}
            </TextAnimate>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {service.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button
                onClick={() => openBooking(service.slug)}
                className="group bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                Book Your Service
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/15 relative">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-background/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 max-w-xs z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Certified Technicians</div>
                  <div className="text-xs text-muted-foreground">Expertise You Can Trust</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="py-24 bg-surface-container-lowest">
        <SectionFrame>
          <div className="mb-16">
            <TextAnimate as="h2" animation="blurInUp" by="word" once className="text-4xl font-heading font-extrabold tracking-tight text-foreground mb-4">
              What&apos;s Included
            </TextAnimate>
            <p className="text-muted-foreground text-lg">Every detail covered for complete peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.inclusions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card p-8 rounded-3xl border border-border/40 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionFrame>
      </section>


      {/* ─── EXPERTISE ─── */}
      <section className="py-24 bg-[#3a5f94] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image src={service.expertiseImage} alt="Background" fill sizes="100vw" className="object-cover" />
        </div>

        <SectionFrame className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <TextAnimate as="h2" animation="blurInUp" by="word" once className="text-4xl font-heading font-extrabold">
                {service.expertiseTitle}
              </TextAnimate>
              <p className="text-white/70 text-lg leading-relaxed">{service.expertiseDescription}</p>

              <div className="grid grid-cols-2 gap-8">
                {service.expertiseStats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="text-4xl font-heading font-black text-accent mb-2">{stat.value}</div>
                    <div className="text-white/50 text-sm uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative h-[400px] w-full rounded-3xl overflow-hidden">
              <Image src={service.expertiseImage} alt={service.expertiseTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3a5f94]/60 to-transparent" />
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24">
        <SectionFrame>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <TextAnimate as="h2" animation="blurInUp" by="word" once className="text-4xl font-heading font-extrabold tracking-tight text-foreground mb-4">
                Frequently Asked Questions
              </TextAnimate>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <motion.details key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-heading font-bold text-foreground select-none">
                    {faq.q}
                    <span className="text-primary text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed -mt-2">{faq.a}</div>
                </motion.details>
              ))}
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30" />
        
        {/* Particles Background for Ultra Premium Feel */}
        <Particles
          className="absolute inset-0 pointer-events-none z-0"
          quantity={80}
          ease={80}
          color="#ffffff"
          refresh
        />
        <SectionFrame className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6">{service.ctaTitle}</motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-white/80 text-lg mb-10">{service.ctaDescription}</motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => openBooking(service.slug)}
                className="group bg-white text-primary px-8 py-4 rounded-full font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                Book {service.shortTitle}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:+96892000000" className="flex items-center gap-2 text-white/90 font-semibold hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 text-white/90 font-semibold hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-base"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </motion.div>
          </div>
        </SectionFrame>
      </section>
    </div>
  );
}
