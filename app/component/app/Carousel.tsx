"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const slides = [
    {
        title: "Build Smarter, Ship Faster 🚀",
        description: "Empower your ideas with modern web and mobile solutions from Parzello.",
        image: "https://bisnisia.id/wp-content/uploads/2025/08/Politeknik-Negeri-Lhokseumawe--1920x1440.jpg",
    },
    {
        title: "Your Vision, Our Code 💻",
        description: "From design to deployment — we turn ideas into functional digital products.",
        image: "https://bisnisia.id/wp-content/uploads/2025/08/Politeknik-Negeri-Lhokseumawe--1920x1440.jpg",
    },
    {
        title: "Scale with Confidence ⚡",
        description: "Reliable, secure, and scalable systems built for long-term growth.",
        image: "https://bisnisia.id/wp-content/uploads/2025/08/Politeknik-Negeri-Lhokseumawe--1920x1440.jpg",
    },
];

export function HeroCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <section className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {slides.map((item, index) => (
                        <CarouselItem key={index}>
                            <Card className="border-none shadow-none p-0">
                                <CardContent className="relative flex h-[20vh] md:h-[50vh] items-center justify-center p-0">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="relative z-10 max-w-2xl text-center text-white px-6">
                                        <h1 className="text-1xl md:text-6xl font-bold mb-4">{item.title}</h1>
                                        <p className="text-sm md:text-xl mb-6">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </section>
    );
}
