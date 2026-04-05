"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface HeroImage {
  src: string;
  alt: string;
  blurDataURL: string;
}

export function HeroCarousel({ images }: { images: HeroImage[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImage = images[currentSlide];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={75}
            placeholder="blur"
            blurDataURL={currentImage.blurDataURL}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                currentSlide === index
                  ? "#FF5A2F"
                  : "rgba(255, 255, 255, 0.5)",
              transform: currentSlide === index ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
