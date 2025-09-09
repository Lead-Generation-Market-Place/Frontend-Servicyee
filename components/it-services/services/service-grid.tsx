import { ServiceCard } from "@/components/it-services/services/service-card"

const services = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will design modern websites in figma or adobe xd",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    price: 983,
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&w=600",
    category: "Art & Illustration",
    title: "I will create modern flat design illustration",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Ali Tufan",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    price: 983,
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600",
    category: "Design & Creative",
    title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Sophie Lee",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    price: 983,
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will do mobile app development for ios and android",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Carlos Vega",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    price: 983,
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will design modern websites in figma or adobe xd",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Mia Chen",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    price: 983,
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will design modern websites in figma or adobe xd",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    price: 983,
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/3861973/pexels-photo-3861973.jpeg?auto=compress&w=600",
    category: "Design & Creative",
    title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Ali Tufan",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    price: 983,
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/3861974/pexels-photo-3861974.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will do mobile app development for ios and android",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Carlos Vega",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    price: 983,
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/3861975/pexels-photo-3861975.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will design modern websites in figma or adobe xd",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Mia Chen",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    price: 983,
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will design modern websites in figma or adobe xd",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Sophie Lee",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    price: 983,
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/3861977/pexels-photo-3861977.jpeg?auto=compress&w=600",
    category: "Design & Creative",
    title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Ali Tufan",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    price: 983,
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/3861978/pexels-photo-3861978.jpeg?auto=compress&w=600",
    category: "Web & App Design",
    title: "I will do mobile app development for ios and android",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Carlos Vega",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    price: 983,
  },
]

export function ServiceGrid() {
  return (
    <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
    </div>
  )
}
