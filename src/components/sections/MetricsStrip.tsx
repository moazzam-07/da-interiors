'use client';

import { motion } from "framer-motion";

const metrics = [
  { value: "180+", label: "Residences Delivered", suffix: "" },
  { value: "14", label: "Design Accolades", suffix: "" },
  { value: "100%", label: "Turnkey Execution", suffix: "" },
  { value: "4.98", label: "Client Satisfaction", suffix: "/5" },
];

export function MetricsStrip() {
  return (
    <div className="relative z-20 -mt-16 mb-16 px-4">
      <div className="max-w-6xl mx-auto bg-surface-container-lowest/90 backdrop-blur-xl border border-border/50 rounded-3xl shadow-xl shadow-primary/5 p-8 md:p-12 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center space-y-2 justify-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
                {metric.value}
                <span className="text-2xl md:text-3xl text-primary/80 ml-1">{metric.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
