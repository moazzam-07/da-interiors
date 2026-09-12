import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  imageSrc?: string;
  className?: string;
}

export function ServiceCard({ title, description, Icon, imageSrc, className }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group h-full cursor-pointer", className)}
    >
      <Card className="h-full overflow-hidden border-border/40 bg-surface-container-lowest/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 rounded-3xl">
        {imageSrc && (
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}
        <CardContent className="p-8 relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 p-4 bg-background rounded-full shadow-md border border-border/40 text-primary group-hover:scale-110 group-hover:text-accent transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground mt-4 mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-80 group-hover:opacity-100 transition-opacity">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
