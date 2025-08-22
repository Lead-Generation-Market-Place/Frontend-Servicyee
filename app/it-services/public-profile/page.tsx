'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, MessageCircle, Send, Clock } from "lucide-react"
import { useState } from "react"

export default function PublicProfile() {
  const [showFullAbout, setShowFullAbout] = useState(false)
  
  const profileData = {
    name: "Irfan Khan",
    username: "@irfankhan0101",
    location: "Afghanistan",
    languages: ["Pashto", "Persian", "English", "Urdu"],
    avatar: "/placeholder.svg?height=200&width=200",
    about: "I'm Software Engineer graduated from computer science faculty, Having 7+ years of experience in developing, managing, customizing, and teaching of web technology. Interest in Python/Django Web development with frontend technologies HTML, CSS, JavaScript, Bootstrap, JQuery, ajax and much more.",
    fullAbout: "I'm Software Engineer graduated from computer science faculty, Having 7+ years of experience in developing, managing, customizing, and teaching of web technology. Interest in Python/Django Web development with frontend technologies HTML, CSS, JavaScript, Bootstrap, JQuery, ajax and much more. I specialize in building scalable web applications using modern frameworks and best practices. My expertise includes database design, API development, frontend optimization, and deployment strategies. I've successfully delivered projects for clients across various industries including e-commerce, healthcare, and education. I'm passionate about clean code, performance optimization, and staying updated with the latest technologies in the web development ecosystem.",
    skills: [
      "Python Django developer",
      "Django rest developer", 
      "Data entry expert",
      "Translator",
      "Web developer",
      "Front-end web developer",
      "Backend developer",
      "API developer"
    ],
    education: [
      {
        id: 1,
        university: "Nangarhar University",
        degree: "B.Sc. Degree",
        field: "Computer Science",
        status: "Graduated",
        year: "2023",
        description: "Bachelor of Science in Computer Science with focus on software engineering and web development."
      }
    ],
    certifications: [
      {
        id: 1,
        name: "Erason Software House Web Development",
        issuer: "Erason Software House",
        year: "2023",
        description: "Comprehensive web development certification covering modern web technologies and best practices."
      },
      {
        id: 2,
        name: "MELI Muslim English Language Institute Writing and Translation",
        issuer: "MELI Institute",
        year: "2020",
        description: "Professional certification in English writing and translation services."
      }
    ],
    status: "Offline",
    lastSeen: "03:27 PM local time"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Left Column (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Profile Picture */}
                <div className="relative flex-shrink-0 mb-4 sm:mb-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center overflow-hidden">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="text-3xl sm:text-4xl font-bold text-white">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="flex-1 w-full">
                  <div className="mb-4 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {profileData.name}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                      {profileData.username}
                    </p>
                  </div>

                  {/* Location and Languages */}
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-3 text-gray-700 dark:text-gray-300">
                      <span className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span>{profileData.location}</span>
                      </span>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-3 text-gray-700 dark:text-gray-300">
                      <span className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span>{profileData.languages.join(", ")}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About me</h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  {showFullAbout ? profileData.fullAbout : profileData.about.substring(0, 200)}...
                </p>
                <button 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium"
                  onClick={() => setShowFullAbout(!showFullAbout)}
                >
                  {showFullAbout ? "Read less" : "Read more"}
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.slice(0, 5).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 text-sm font-medium rounded-full border-0 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {profileData.skills.length > 5 && (
                  <Badge 
                    variant="secondary" 
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 text-sm font-medium rounded-full border-0 transition-colors"
                  >
                    +{profileData.skills.length - 5}
                  </Badge>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Education</h2>
              <div className="space-y-6">
                {profileData.education.map((edu) => (
                  <Card key={edu.id} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{edu.degree}</h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{edu.university}</p>
                      <p className="text-gray-600 dark:text-gray-400">{edu.field}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{edu.year}</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Certifications</h2>
              <div className="space-y-6">
                {profileData.certifications.map((cert) => (
                  <Card key={cert.id} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{cert.name}</h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{cert.issuer}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{cert.year}</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">{cert.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column (1 column) */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <Card className="sticky top-40 shadow-sm border border-gray-100 dark:border-gray-900 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-sm font-semibold">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{profileData.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className={`w-2 h-2 rounded-full ${profileData.status === 'Online' ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'}`}></div>
                      <span>{profileData.status}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{profileData.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border-0 py-3 text-base font-medium transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Contact me
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}