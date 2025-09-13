'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';
import Link from 'next/link';

// IT Services mock data
const itServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    category: "Web Development",
    title: "Custom WordPress Website Development",
    rating: 4.9,
    reviews: 1247,
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80"
    },
    price: 299
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
    category: "Mobile Development",
    title: "iOS & Android App Development",
    rating: 4.8,
    reviews: 892,
    author: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    },
    price: 1200
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    category: "UI/UX Design",
    title: "Modern UI/UX Design for Web & Mobile",
    rating: 4.9,
    reviews: 1563,
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    },
    price: 450
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    category: "SEO Services",
    title: "Complete SEO Optimization Package",
    rating: 4.7,
    reviews: 634,
    author: {
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    },
    price: 199
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    category: "Data Analytics",
    title: "Business Intelligence Dashboard Development",
    rating: 4.8,
    reviews: 421,
    author: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
    },
    price: 800
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    category: "E-commerce",
    title: "Shopify Store Setup & Customization",
    rating: 4.9,
    reviews: 1123,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
    },
    price: 350
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&w=600",
    category: "Digital Marketing",
    title: "Social Media Marketing Campaign",
    rating: 4.6,
    reviews: 789,
    author: {
      name: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    },
    price: 150
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
    category: "Cloud Services",
    title: "AWS Cloud Infrastructure Setup",
    rating: 4.8,
    reviews: 567,
    author: {
      name: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6e00582d4b?auto=format&fit=crop&w=100&q=80"
    },
    price: 650
  }
];

interface ServiceCardProps {
  service: {
    id: number;
    image: string;
    category: string;
    title: string;
    rating: number;
    reviews: number;
    author: {
      name: string;
      avatar: string;
    };
    price: number;
  };
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 py-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 h-full flex flex-col w-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative w-full h-48">
            <Link  href={"/it-services/service/"}>
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover rounded-t-lg"
            style={{ backgroundColor: "var(--card-img-bg, #f3f4f6)" }}
            priority={false}
          />
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full"
          >
            <Heart className="h-4 w-4 text-gray-700 dark:text-gray-200" />
          </Button>
        </div>

        <div className="p-4 flex flex-col flex-1 bg-white dark:bg-gray-900">
          <Badge
            variant="secondary"
            className="mb-2 text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {service.category}
          </Badge>

          <h3 className="font-medium text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight text-sm">
            <Link href={"/it-services/service/"}>
            {service.title}
            </Link>
          </h3>

          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">{service.rating}</span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              ({service.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <Image
                src={service.author.avatar || "/placeholder.svg"}
                alt={service.author.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{service.author.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Starting at</div>
              <div className="font-semibold text-gray-900 dark:text-white">${service.price}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedServicesSection() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="bg-transparent dark:bg-gray-950 relative max-w-7xl mx-auto pb-12">
      <div className="max-w-7xl mx-auto ">
        {/* Card Container with Background */}
        <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg -mt-60 relative z-10">
          <CardContent className="p-6 sm:p-8 relative z-50">
            {/* Services Carousel */}
            <div className="relative">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {itServices.map((service) => (
                    <CarouselItem key={service.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="h-full">
                        <ServiceCard service={service} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Navigation Buttons */}
                <div className="hidden sm:block">
                  <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg z-50">
                    <ArrowLeft className="h-4 w-4" />
                  </CarouselPrevious>
                  <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg z-50">
                    <ArrowRight className="h-4 w-4" />
                  </CarouselNext>
                </div>
              </Carousel>

              {/* Mobile Navigation */}
              <div className="flex sm:hidden justify-center mt-6 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollPrev()}
                  disabled={current === 1}
                  className="px-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollNext()}
                  disabled={current === count}
                  className="px-4"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            
          </CardContent>
        </Card>
      </div>
    </section>
  );
}