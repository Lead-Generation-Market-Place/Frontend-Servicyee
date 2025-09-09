'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  User,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  
} from "lucide-react"
import Image from "next/image"
import { SellerFeaturedServices } from "@/components/it-services/profiles/seller-featured-services"
import { useState } from "react"
import React from "react"

export default function PublicProfilePage() {
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      name: "Rosie Cooper",
      initials: "RC",
      date: "12 March 2022",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      id: 2,
      name: "Darrell Stewart",
      initials: "DS",
      date: "12 March 2022",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    }
  ])

  const [newReview, setNewReview] = useState({
    name: "Ali Tufan",
    email: "creativelayers@gmail.com",
    rating: 0,
    comment: "",
    saveInfo: false
  })

  const [hoveredStar, setHoveredStar] = useState(0)

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewReview(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Please provide a rating and comment")
      return
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      initials: newReview.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      rating: newReview.rating,
      comment: newReview.comment
    }

    setUserReviews(prev => [review, ...prev])
    
    // Reset form
    setNewReview(prev => ({
      ...prev,
      rating: 0,
      comment: ""
    }))
  }

  const education = [
    {
      title: "Bachelors in Fine Arts",
      period: "2012-2014",
      institution: "Modern College",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Computer Science",
      period: "2009-2012",
      institution: "Harvard University",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  const experience = [
    {
      title: "UX Designer",
      period: "2015-2018",
      company: "Dropbox",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Art Director",
      period: "2012-2014",
      company: "Amazon",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  const awards = [
    {
      title: "UI/UX Design",
      period: "2012-2014",
      institution: "Udemy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "App Design",
      period: "2009-2012",
      institution: "Google",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  const skills = ["Figma", "Sketch", "HTML5", "Software Design", "Prototyping", "Sass", "Design Writing"]

  // Calculate average rating from all reviews
  const averageRating = userReviews.length > 0 
    ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(2)
    : "0.00"

  // Calculate star distribution
  const starDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = userReviews.filter(review => review.rating === stars).length
    const percentage = userReviews.length > 0 ? (count / userReviews.length) * 100 : 0
    return { stars, count, percentage }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto ">
        {/* Header Banner */}
        <div className="relative pb-8 pt-4">
          <div className="relative  h-48 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=1200&h=300&fit=crop"
                alt="Background"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-between p-8">
              {/* Left side - Service and Profile Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                  Professional Website UI/UX Design Services in Adobe XD & Figma
                </h1>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Smith" />
                      <AvatarFallback className="text-lg">JS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-white drop-shadow-lg">Leslie Alexander</h2>
                    <p className="text-gray-200 text-sm drop-shadow-md">UI/UX Designer</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-white drop-shadow-md">{averageRating}</span>
                        <span className="text-gray-200 text-sm drop-shadow-md">{userReviews.length} reviews</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-200">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm drop-shadow-md">London, UK</span>
                      </div>
                      {/* Success Rate */}
                      <div className="flex items-center gap-1 text-green-300 ml-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium drop-shadow-md">98% Success Rate</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-200 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm drop-shadow-md">Member since April 1, 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
        
            {/* Description */}
            <div className=" dark:bg-gray-950 rounded-lg py-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Education */}
            <div className=" dark:bg-gray-950 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{edu.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.period} • {edu.institution}</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Work & Experience */}
            <div className=" dark:bg-gray-950 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Work & Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.period} • {exp.company}</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards and Certificates */}
            <div className=" dark:bg-gray-950 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Awards and Certificates</h3>
              <div className="space-y-6">
                {awards.map((award, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{award.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{award.period} • {award.institution}</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className=" dark:bg-gray-950 rounded-lg py-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{userReviews.length} Reviews</h3>
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{averageRating} Exceptional</div>
                <div className="space-y-2">
                  {starDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{item.stars} Star</span>
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{review.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{review.date}</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Not helpful
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Review Form */}
            <div className=" dark:bg-gray-950 rounded-lg py-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Add a Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your email address will not be published. Required fields are marked *
              </p>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                    Your rating of this product *
                  </label>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                          i < (hoveredStar || newReview.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        onMouseEnter={() => setHoveredStar(i + 1)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => handleStarClick(i + 1)}
                      />
                    ))}
                    {newReview.rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                    Comment *
                  </label>
                  <Textarea
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                    className="min-h-[100px]"
                    value={newReview.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                      Name *
                    </label>
                    <Input 
                      value={newReview.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      value={newReview.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="save-info" 
                    checked={newReview.saveInfo}
                    onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                  />
                  <label htmlFor="save-info" className="text-sm text-gray-600 dark:text-gray-400">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <Button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={newReview.rating === 0 || !newReview.comment.trim()}
                >
                  Send Review
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-44">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$29 per hour</div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Contact Me
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">London, UK</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Member since April 2022</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Last Delivery: 5 days</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Gender: Male</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Languages: English</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 dark:text-gray-300">English Level: Fluent</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className=" dark:bg-gray-950 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SellerFeaturedServices />
      </div>
    </div>
  )
}