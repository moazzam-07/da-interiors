You are given a task to integrate an existing React component in the codebase

The codebase should support:
- React with TypeScript
- Tailwind CSS
- Modern build tools (Vite/Next.js)

If your project doesn't support these, provide instructions on how to set them up.

Copy-paste this component to your project:
App.tsx
```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What makes this service ultra-premium?",
    answer:
      "Our ultra-premium service combines cutting-edge technology with personalized attention, ensuring every detail exceeds expectations. We provide dedicated support, exclusive features, and a level of quality that sets new industry standards.",
  },
  {
    question: "How does the premium pricing work?",
    answer:
      "Our transparent pricing model is designed to deliver exceptional value. Premium tiers unlock advanced capabilities, priority support, and exclusive benefits tailored to your specific needs. Contact us for a customized quote.",
  },
  {
    question: "What kind of support can I expect?",
    answer:
      "Premium members receive 24/7 priority support from our expert team, including dedicated account managers, instant response times, and proactive assistance to ensure seamless operations at all times.",
  },
  {
    question: "Can I customize the premium features?",
    answer:
      "Absolutely. Our ultra-premium tier offers full customization capabilities, allowing you to tailor every aspect to your requirements. Our team works closely with you to create a bespoke solution.",
  },
  {
    question: "What's included in the premium package?",
    answer:
      "The premium package includes advanced analytics, unlimited access to all features, priority processing, dedicated infrastructure, custom integrations, and exclusive early access to new capabilities.",
  },
  {
    question: "How secure is the premium service?",
    answer:
      "Security is paramount. We employ enterprise-grade encryption, multi-factor authentication, regular security audits, and compliance with international standards to protect your data and operations.",
  },
];

const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/20 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {faq.question}
            </h3>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20"
          >
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const UltraPremiumFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Ultra Premium Experience
          </div>
          
          <h1 className="mb-4 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text">
              Questions
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you need to know about our ultra-premium service.
            <br />
            Can't find what you're looking for? Contact our dedicated support team.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20 p-8">
              <h3 className="text-xl font-semibold text-foreground">
                Still have questions?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our premium support team is here to help you 24/7
              </p>
              <button className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                <span className="relative z-10">Contact Support</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

function App() {
  return <UltraPremiumFAQ />;
}

export default App;
```

Install NPM dependencies:
```bash
npm install framer-motion @remixicon/react
```


Additional setup:
1. Make sure you have Tailwind CSS configured in your project
2. Update your main App component or create a new component file
3. Import and use the component in your application

The component is designed to work standalone and includes all necessary styling and functionality.