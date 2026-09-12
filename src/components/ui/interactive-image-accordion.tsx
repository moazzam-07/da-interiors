"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface AccordionItemData {
  id: string | number;
  title: string;
  imageUrl: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}

const AccordionItem = ({ item, isActive, onActivate }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[380px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive ? "w-[280px] md:w-[400px] lg:w-[450px]" : "w-[60px] md:w-[80px] hover:w-[100px]"}
        shadow-lg
      `}
      onClick={onActivate}
      onMouseEnter={onActivate}
    >
      {/* Background Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={isActive}
      />
      {/* Dark overlay for better text readability */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isActive ? "bg-black/20" : "bg-black/50"
        }`}
      />

      {/* Caption Text overlay gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-heading font-bold whitespace-nowrap
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            isActive
              ? "bottom-8 left-8 text-2xl rotate-0 w-auto tracking-wide"
              : "bottom-16 left-1/2 -translate-x-1/2 rotate-[-90deg] text-lg w-auto tracking-widest origin-center"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

interface InteractiveImageAccordionProps {
  items: AccordionItemData[];
  defaultActiveIndex?: number;
}

export function InteractiveImageAccordion({
  items,
  defaultActiveIndex = 0,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-row items-center justify-start md:justify-end gap-2 md:gap-4 overflow-x-auto w-full max-w-full pb-4 scrollbar-hide py-4">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onActivate={() => handleItemHover(index)}
        />
      ))}
    </div>
  );
}
