"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: {
    main: string;
    gallery: string[];
  };
  alt: string;
};

export default function ProductImageGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(images.main);

  return (
    <div className="mt-6">
      <div className="relative h-96 w-full">
        <Image
          src={current}
          alt={alt}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="mt-4 flex gap-3">
        {images.gallery.map((src, index) => (
          <div
            key={index}
            className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-zinc-900 dark:hover:border-white"
            onMouseEnter={() => setCurrent(src)}
          >
            <Image
              src={src}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}