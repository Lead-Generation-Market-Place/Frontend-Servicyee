'use client'

import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { ServiceCard } from "@/components/it-services/search/service-card"

export function ServiceRecommendations() {
	const serviceCards = [
		{
		  id: 1,
		  title: "I will do website development as full stack web developer, PHP, laravel, react js",
		  seller: {
			name: "Md. Mahim",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face",
			level: "Top Rated",
			rating: 4.8,
			reviewCount: 280,
		  },
		  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
		  price: 120,
		  badges: ["Video Consultation"],
		  tags: ["Full Stack", "Laravel", "React", "PHP"],
		},
		{
		  id: 2,
		  title: "I will build, rebuild custom website development as front end developer",
		  seller: {
			name: "Tareq R",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
			level: "Level 2",
			rating: 5.0,
			reviewCount: 123,
		  },
		  image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
		  price: 80,
		  badges: [],
		  tags: ["Frontend", "Custom Website"],
		},
		{
		  id: 3,
		  title: "I will edit high quality football shorts for your social media",
		  seller: {
			name: "Bilal Hussain",
			avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=face",
			level: "Level 1",
			rating: 5.0,
			reviewCount: 61,
		  },
		  image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
		  price: 10,
		  badges: [],
		  tags: ["Video Editing", "Football", "Social Media"],
		},
		{
		  id: 4,
		  title: "I will be full stack web developer, mern stack developer for you",
		  seller: {
			name: "Kunal Khurana",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
			level: "Level 1",
			rating: 5.0,
			reviewCount: 610,
		  },
		  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
		  price: 120,
		  badges: ["Video Consultation"],
		  tags: ["Full Stack", "MERN", "JavaScript"],
		},
		{
		  id: 5,
		  title: "I will create an SEO optimized Next.js website",
		  seller: {
			name: "Sana U.",
			avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop&crop=face",
			level: "Top Rated",
			rating: 4.9,
			reviewCount: 342,
		  },
		  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
		  price: 95,
		  badges: ["Video Consultation"],
		  tags: ["Next.js", "SEO", "Web Development"],
		},
		{
		  id: 6,
		  title: "I will design landing pages that convert",
		  seller: {
			name: "Alex P.",
			avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
			level: "Level 2",
			rating: 4.8,
			reviewCount: 210,
		  },
		  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
		  price: 70,
		  badges: [],
		  tags: ["Landing Page", "UI/UX", "Conversion"],
		},
		{
		  id: 7,
		  title: "I will build REST APIs with Node.js and PostgreSQL",
		  seller: {
			name: "Hassan A.",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
			level: "Level 1",
			rating: 4.7,
			reviewCount: 168,
		  },
		  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
		  price: 85,
		  badges: [],
		  tags: ["Node.js", "PostgreSQL", "APIs"],
		},
		{
		  id: 8,
		  title: "I will audit and improve your website performance",
		  seller: {
			name: "Marta G.",
			avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
			level: "Verified Pro",
			rating: 5.0,
			reviewCount: 98,
		  },
		  image: "https://images.unsplash.com/photo-1537432376769-00a1d6dc1f48?w=800&h=600&fit=crop",
		  price: 140,
		  badges: ["Video Consultation"],
		  tags: ["Performance", "Audit", "Optimization"],
		},
	  ]
	  

	const serviceSections = [
		{
			title: "Based on what you might be looking for",
			services: serviceCards,
		},
		{
			title: "Service you may like",
			services: serviceCards.map((service) => ({
				...service,
				id: service.id + 10,
				price: service.price + 20,
			})),
		},
		{
			title: "Verified Pro services in Website Development",
			services: serviceCards.map((service) => ({
				...service,
				id: service.id + 20,
				price: service.price + 100,
				level: "Verified Pro",
			})),
		},
		{
			title: "Most popular services in Website Development",
			services: serviceCards.map((service) => ({
				...service,
				id: service.id + 30,
				price: service.price + 50,
			})),
		},
	]

	// refs for horizontal scroll containers per section
	const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({})
	const scrollBy = (index: number, direction: 'left' | 'right') => {
		const el = scrollRefs.current[index]
		if (!el) return
		const amount = el.clientWidth * 0.9 // nearly a viewport worth
		el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
	}

	return (
		<div className="space-y-12">
			{serviceSections.map((section, sectionIndex) => (
				<div key={sectionIndex}>
					{/* Responsive header: stack on mobile, row on md+ */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3 md:gap-0">
						<div>
							<h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-0">{section.title}</h2>
						</div>
						<div className="flex items-center gap-2">
							{/* Hide scroll buttons on small screens, show on md+ */}
							<div className="hidden md:flex space-x-2">
								<Button
									variant="outline"
									size="sm"
									className="rounded-full p-2 bg-transparent dark:bg-transparent"
									onClick={() => scrollBy(sectionIndex, 'left')}
								>
									<ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="rounded-full p-2 bg-transparent dark:bg-transparent"
									onClick={() => scrollBy(sectionIndex, 'right')}
								>
									<ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
								</Button>
							</div>
						</div>
					</div>

					{/* Horizontally scrollable row */}
					<div
						ref={(el) => {
							scrollRefs.current[sectionIndex] = el
						}}
						className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
					>
						{section.services.map((service, index) => (
							<div
								key={index}
								className="
									snap-start flex-shrink-0
									w-[85vw] sm:w-[48vw] md:w-[32vw] lg:w-[24vw] xl:w-[20vw]
									max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xs
								"
								style={{
									minWidth: '260px',
									maxWidth: '340px',
								}}
							>
								<ServiceCard service={service} className="h-full" />
							</div>
						))}
					</div>
					{/* Show scroll buttons below carousel on mobile */}
					<div className="flex justify-end space-x-2 mt-2 md:hidden">
						<Button
							variant="outline"
							size="sm"
							className="rounded-full p-2 bg-transparent dark:bg-transparent"
							onClick={() => scrollBy(sectionIndex, 'left')}
						>
							<ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="rounded-full p-2 bg-transparent dark:bg-transparent"
							onClick={() => scrollBy(sectionIndex, 'right')}
						>
							<ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
