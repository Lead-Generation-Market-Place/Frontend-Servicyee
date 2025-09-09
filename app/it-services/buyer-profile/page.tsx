"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Edit,
  Plus,
  Share,
  Eye,
  CheckCircle,
  Star,
  Calendar,
  MessageCircle,
  ExternalLink
} from "lucide-react";

/**
 * This profile page is for a buyer.
 * The "Last Ordered Services" are the most recent orders that this buyer (the profile owner) has placed and completed (or is in progress).
 * The "Recent Reviews" are reviews that freelancers (sellers) have left for this buyer after working with them.
 */

export default function ProfilePage() {
  const router = useRouter();
  const languages = [
    { name: "English", level: "Fluent" },
    { name: "Pashto", level: "Native or Bilingual" },
    { name: "Hindi", level: "Fluent" },
    { name: "Persian", level: "Fluent" },
    { name: "Urdu", level: "Fluent" },
  ];

  // These are the last orders placed by this buyer (the profile owner)
  const lastOrderedServices = [
    {
      id: 1,
      title: "Website Development",
      seller: "John Smith",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      price: 500,
      status: "Completed",
      orderDate: "2024-01-15",
      // This is the review/rating the seller gave to the buyer for this order
      sellerRatingToBuyer: 5
    },
    {
      id: 2,
      title: "Logo Design Package",
      seller: "Sarah Johnson",
      sellerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      price: 150,
      status: "In Progress",
      orderDate: "2024-01-20",
      sellerRatingToBuyer: null
    },
    {
      id: 3,
      title: "Mobile App UI/UX",
      seller: "Mike Chen",
      sellerAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      price: 800,
      status: "Completed",
      orderDate: "2024-01-10",
      sellerRatingToBuyer: 4
    }
  ];

  // These are reviews from sellers (freelancers) to this buyer
  const recentReviews = [
    {
      id: 1,
      seller: "John Smith",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      service: "Website Development",
      rating: 5,
      comment: "Great experience working with this buyer! Clear requirements and prompt communication.",
      date: "2024-01-16",
      // Optionally, the buyer can respond to the review
      buyerResponse: "Thank you for your excellent work and professionalism."
    },
    {
      id: 2,
      seller: "Mike Chen",
      sellerAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      service: "Mobile App UI/UX",
      rating: 4,
      comment: "Buyer was responsive and provided helpful feedback throughout the project.",
      date: "2024-01-12",
      buyerResponse: null
    },
    {
      id: 3,
      seller: "Emily Davis",
      sellerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      service: "Content Writing",
      rating: 5,
      comment: "Very pleasant to work with, clear instructions and fast payment.",
      date: "2024-01-08",
      buyerResponse: "Appreciate your timely delivery and quality content!"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button onClick={() => { router.back() }} className="text-green-400 dark:text-green-500 my-4" variant={"outline"}>Back</Button>
        {/* Top: Profile & Basic Info */}
        <section className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="grid grid-cols-1 gap-6 pb-2">
            {/* Responsive Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 ">
              {/* Avatar */}
              <div className="relative flex-shrink-0 flex justify-center sm:block">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Irfan I."
                  />
                  <AvatarFallback className="text-xl">II</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-gray-900 bg-green-500" />
              </div>
              {/* Name and Location */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Irfan I.</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Quetta, Pakistan
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    7:49 pm local time
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-900">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 sm:justify-end">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">4.9</span>
                      <span>(127 reviews)</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Right Side: Status, Rate, Buttons */}
              <div className="flex flex-col gap-2 sm:items-end w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400"
                  >
                    <Link href="/dashboard/profile/34">
                      <Eye className="h-4 w-4 mr-2" />
                      See public view
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                    <Edit className="h-4 w-4 mr-2" />
                    Profile settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Right Side - Profile Actions and Title */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* Freelancer Plus Offer */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    FREELANCER PLUS OFFER
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Get Freelancer Plus for 50% off one month and keep your
                      profile visible during breaks.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Limited time only</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Middle: two-column layout */}
        <section className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              {/* View Profile Stats */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                  View profile <CheckCircle className="h-5 w-5 text-green-500" />
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Draft</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Coding Tutoring</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Draft</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      General Translation Services
                    </span>
                  </div>
                  <Button variant="link" className="text-sm text-blue-600 dark:text-blue-400 p-0 h-auto">
                    All work
                  </Button>
                </div>
              </div>

              {/* Hours per week */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                  Hours per week <CheckCircle className="h-5 w-5 text-green-500" />
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">More than 30 hrs/week</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No contracts to-date preference set
                </p>
              </div>

              {/* Languages */}
              <div className="p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                  Languages{" "}
                  <Plus className="h-4 w-4 text-green-500" />
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {lang.name}:
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Last Ordered Services */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5 text-emerald-600" />
                Last Ordered Services
              </h2>
              <div className="space-y-4">
                {lastOrderedServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md dark:hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{service.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={service.sellerAvatar} alt={service.seller} />
                            <AvatarFallback className="text-xs">{service.seller.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{service.seller}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(service.orderDate).toLocaleDateString()}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">${service.price}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                        {service.sellerRatingToBuyer && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{service.sellerRatingToBuyer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                ))}
                <Button variant="link" className="w-full text-emerald-600 dark:text-emerald-400">
                  <Link href={"/it-services/buyer/orders/"}>
                    View All Orders
                  </Link>
                </Button>
              </div>
            </div>

            {/* Recent Reviews from Sellers (Freelancers) */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                <MessageCircle className="h-5 w-5 text-emerald-600" />
                Recent Reviews from Sellers
              </h2>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md dark:hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.sellerAvatar} alt={review.seller} />
                        <AvatarFallback className="text-xs">{review.seller.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900 dark:text-white">{review.seller}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{review.service}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                        {review.buyerResponse && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Response: </span>
                            {review.buyerResponse}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="w-full text-emerald-600 dark:text-emerald-400">
                  View All Reviews
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
