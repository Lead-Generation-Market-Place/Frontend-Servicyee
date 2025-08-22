import { ServiceCard } from "@/components/it-services/search/service-card"
import TopServices from "@/components/it-services/search/top-service"

// Mock data for search results
const searchResults = [
  {
    id: 1,
    title: "I will develop a full stack web application using react and node js",
    seller: {
      name: "techexpert_dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.9,
      reviewCount: 127,
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    price: 25,
    badges: ["Choice"],
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "I will create a responsive website with modern design and functionality",
    seller: {
      name: "webmaster_pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 5.0,
      reviewCount: 89,
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    price: 50,
    badges: ["Pro"],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "I will build a custom web application with database integration",
    seller: {
      name: "fullstack_guru",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.8,
      reviewCount: 203,
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    price: 75,
    badges: [],
    tags: ["PHP", "MySQL", "Laravel"],
  },
  {
    id: 4,
    title: "I will develop a modern e-commerce website with payment integration",
    seller: {
      name: "ecom_specialist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.9,
      reviewCount: 156,
    },
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 100,
    badges: ["Choice"],
    tags: ["Shopify", "WooCommerce", "Stripe"],
  },
  {
    id: 5,
    title: "I will create a full stack application with real-time features",
    seller: {
      name: "realtime_dev",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 94,
    },
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
    price: 80,
    badges: ["Pro"],
    tags: ["Socket.io", "Express", "Vue.js"],
  },
  {
    id: 6,
    title: "I will build a scalable web application using modern technologies",
    seller: {
      name: "scale_master",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.7,
      reviewCount: 178,
    },
    image: "https://images.unsplash.com/photo-1561070791-2526d41294ab?w=300&h=200&fit=crop",
    price: 120,
    badges: [],
    tags: ["Next.js", "PostgreSQL", "AWS"],
  },
  {
    id: 7,
    title: "I will design and develop a mobile-first responsive website",
    seller: {
      name: "mobile_expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.6,
      reviewCount: 92,
    },
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 45,
    badges: [],
    tags: ["Responsive Design", "Mobile First", "CSS Grid"],
  },
  {
    id: 8,
    title: "I will create a professional portfolio website with animations",
    seller: {
      name: "portfolio_pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 134,
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    price: 65,
    badges: ["Choice"],
    tags: ["Portfolio", "Animations", "Modern Design"],
  },
  {
    id: 9,
    title: "I will develop a REST API with comprehensive documentation",
    seller: {
      name: "api_master",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.8,
      reviewCount: 87,
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    price: 55,
    badges: [],
    tags: ["REST API", "Documentation", "Node.js"],
  },
  {
    id: 10,
    title: "I will build a WordPress theme with custom functionality",
    seller: {
      name: "wordpress_guru",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.7,
      reviewCount: 156,
    },
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 40,
    badges: [],
    tags: ["WordPress", "Theme Development", "PHP"],
  },
  {
    id: 11,
    title: "I will create a progressive web app with offline capabilities",
    seller: {
      name: "pwa_specialist",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 78,
    },
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
    price: 90,
    badges: ["Pro"],
    tags: ["PWA", "Service Workers", "Offline First"],
  },
  {
    id: 12,
    title: "I will develop a machine learning web application",
    seller: {
      name: "ml_expert",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.8,
      reviewCount: 112,
    },
    image: "https://images.unsplash.com/photo-1561070791-2526d41294ab?w=300&h=200&fit=crop",
    price: 150,
    badges: ["Choice"],
    tags: ["Machine Learning", "Python", "TensorFlow"],
  },
  {
    id: 13,
    title: "I will build a real-time chat application with video calls",
    seller: {
      name: "chat_master",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.6,
      reviewCount: 89,
    },
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 70,
    badges: [],
    tags: ["Real-time Chat", "Video Calls", "WebRTC"],
  },
  {
    id: 14,
    title: "I will create a data visualization dashboard",
    seller: {
      name: "data_viz_pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 145,
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    price: 85,
    badges: ["Choice"],
    tags: ["Data Visualization", "D3.js", "Charts"],
  },
  {
    id: 15,
    title: "I will develop a blockchain-based web application",
    seller: {
      name: "blockchain_dev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.7,
      reviewCount: 67,
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    price: 200,
    badges: ["Pro"],
    tags: ["Blockchain", "Smart Contracts", "Web3"],
  },
  {
    id: 16,
    title: "I will build a multi-language international website",
    seller: {
      name: "i18n_specialist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.8,
      reviewCount: 93,
    },
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 60,
    badges: [],
    tags: ["Internationalization", "Multi-language", "Localization"],
  },
]
const resultCount = "2,157 services available"

export function SearchResults() {
  return (
    <div >
      <div>
        <p className="text-gray-600 dark:text-gray-300 mt-8">{resultCount}</p>
      </div>
      <TopServices />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {searchResults.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

     

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Previous</button>
          <button className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded transition-colors">1</button>
          <button className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">2</button>
          <button className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">3</button>
          <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
          <button className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">10</button>
          <button className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Next</button>
        </nav>
      </div>
    </div>
  )
}
  
