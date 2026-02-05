'use client';

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface ProductImageGalleryProps {
    images: string[];
    title: string;
    discount: number;
    selectedImage: number;
    onSelectImage: (index: number) => void;
    imageRef: React.RefObject<HTMLDivElement>;
}

export default function ProductImageGallery({
    images,
    title,
    discount,
    selectedImage,
    onSelectImage,
    imageRef,
}: ProductImageGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        onSelectImage(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi, onSelectImage]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (emblaApi) emblaApi.scrollTo(selectedImage);
    }, [emblaApi, selectedImage]);

    return (
        <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" ref={imageRef}>
                {discount > 0 && (
                    <div className="absolute left-4 top-4 z-20 rounded-full border border-red-200 bg-red-500 px-3 py-1 text-xs text-white font-semibold shadow-lg">
                        Save {discount.toFixed(0)}%
                    </div>
                )}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => emblaApi?.scrollPrev()}
                            disabled={!canScrollPrev}
                            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-900" />
                        </button>
                        <button
                            onClick={() => emblaApi?.scrollNext()}
                            disabled={!canScrollNext}
                            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-900" />
                        </button>
                        <div className="absolute bottom-4 right-4 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </>
                )}
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex">
                        {images.map((src, index) => (
                            <div key={`${src}-${index}`} className="flex-[0_0_100%] min-w-0">
                                <div className="aspect-square relative">
                                    <Image
                                        src={src}
                                        alt={`${title} - image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                                        className="object-cover"
                                        priority={index === 0}
                                        quality={90}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {images.length > 1 && (
                <div className="space-y-2">
                    <div className="flex gap-2 overflow-x-auto p-2">
                        {images.map((src, i) => (
                            <button
                                key={`${src}-${i}`}
                                onClick={() => onSelectImage(i)}
                                className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                                    selectedImage === i
                                        ? 'border-blue-500 shadow-md ring-2 ring-blue-300'
                                        : 'border-slate-200 hover:border-slate-400'
                                }`}
                            >
                                <div className="relative h-24 w-24">
                                    <Image
                                        src={src}
                                        alt={`${title} - thumbnail ${i + 1}`}
                                        fill
                                        sizes="96px"
                                        className="object-cover"
                                        quality={75}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
