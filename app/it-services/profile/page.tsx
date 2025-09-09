"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Briefcase,
  Award,
  Globe,
  GraduationCap,
  Trash2,
} from "lucide-react";
import {
  EducationDialog,
  CertificationDialog,
  SkillsDialog,
  ExperienceDialog,
} from "./ProfileDialogs";

export default function ProfilePage() {
  const router = useRouter();
  // State for all profile data
  const [bio, setBio] = React.useState(
    "I'm dedicated Entry-Level Full Stack Python Django web developer. I'm new to this platform trying to start Upwork. I have completed my bachelor degree in Software Engineering and have 3 years of experience in web development. I'm here to customize your any HTML template and add backend database functionality to your web template."
  );
  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [expandedBio, setExpandedBio] = React.useState(false);
  const [skills, setSkills] = React.useState([
    "Web Development",
    "Software Development",
    "Virtual Assistant",
    "Front-End Development",
    "Django Stack",
    "Data Entry",
    "Typing",
  ]);

  const [education, setEducation] = React.useState([
    {
      institution: "Nangarhar University",
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      startDate: "2019-09",
      endDate: "2023-06",
      description:
        "Focused on software engineering, algorithms, and web development.",
    },
  ]);

  const [certifications, setCertifications] = React.useState([
    {
      title: "Python Django Full Stack Development",
      provider: "Erasoft Software House",
      issued: "2021-07",
      expires: "2023-08",
      description:
        "Comprehensive certification covering Django framework, Python programming, database management, and full-stack development practices.",
    },
  ]);


  const [otherExperiences, setOtherExperiences] = React.useState([
    {
      title: "Frontend Developer",
      description:
        "I have served as a Frontend Developer at TechSoft Software House, specializing in crafting the visual aspects of websites. In this role, I leveraged technologies such as HTML, CSS, JavaScript, jQuery, and Bootstrap to design and implement user-friendly interfaces. Additionally, I ensured that the websites were responsive, adapting seamlessly to various devices and screen sizes.",
    },
    {
      title: "C++ Development",
      description:
        "Greetings! I am an expert C++ developer with a passion for turning complex challenges into elegant solutions. My journey on Upwork has been adorned with successful C++ development projects, showcasing my proficiency in crafting efficient, scalable, and maintainable code.",
    },
  ]);

  const languages = [
    { name: "English", level: "Fluent" },
    { name: "Pashto", level: "Native or Bilingual" },
    { name: "Hindi", level: "Fluent" },
    { name: "Persian", level: "Fluent" },
    { name: "Urdu", level: "Fluent" },
  ];

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <Button onClick={()=>{router.back()}} className="text-green-400 my-4" variant={"outline"}>Back</Button>
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
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
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
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900">
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
                    className="flex-1 sm:flex-none"
                  >
                    <Link href="/it-services/public-profile/">
                      <Eye className="h-4 w-4 mr-2" />
                      See public view
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 sm:flex-none" asChild>
                    <Link href="/it-services/buyer/settings/">
                      <Edit className="h-4 w-4 mr-2" />
                      Profile settings
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
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
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Middle: two-column layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Left Sidebar */}
          <div className="gray-200  h-auto  dark:bg-gray-950 pr-4">
            {/* View Profile Stats */}
            <div className=" border-b border-gray-200 dark:border-gray-700 py-4">
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
            <div className=" border-b border-gray-200 dark:border-gray-700 py-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                Hours per week <CheckCircle className="h-5 w-5 text-green-500" />
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">More than 30 hrs/week</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No contracts to-date preference set
              </p>
            </div>

            {/* Languages */}
            <div className=" py-4">
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

          {/* Main Content */}
          <div className="lg:col-span-2 dark:border-gray-700 pl-4 dark:bg-gray-950  border-l border-l-gray-300">
               {/* Profile Description */}
              <div className=" relative border-b border-gray-200 dark:border-gray-700 p-4">
               <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
                    Entry-Level Full Stack Python Django Developer
                  </h2>
               {!isEditingBio && (
                 <Button
                   size="icon"
                   variant="ghost"
                   className="absolute top-3 right-3"
                   aria-label="Edit bio"
                   onClick={() => setIsEditingBio(true)}
                 >
                   <Edit className="h-4 w-4" />
                 </Button>
               )}
               {isEditingBio ? (
                 <div className="space-y-3">
                   <textarea
                     className="w-full min-h-[120px] rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
                     value={bio}
                     onChange={(e) => setBio(e.target.value)}
                   />
                   <div className="flex gap-2">
                     <Button size="sm" onClick={() => setIsEditingBio(false)}>Save</Button>
                     <Button size="sm" variant="outline" onClick={() => setIsEditingBio(false)}>Cancel</Button>
                   </div>
                 </div>
               ) : (
                 <div className="text-gray-700 dark:text-gray-300">
                   <p className="leading-relaxed">
                     {expandedBio || bio.length <= 220 ? bio : `${bio.slice(0, 220)}...`}
                   </p>
                   {bio.length > 220 && (
                     <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 text-sm" onClick={() => setExpandedBio(!expandedBio)}>
                       {expandedBio ? "Show less" : "More"}
                     </Button>
                   )}
                 </div>
               )}
              </div>
            {/* Portfolio */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio</h3>
                <Plus className="h-5 w-5 text-green-500 cursor-pointer" />
              </div>
              <div className="flex gap-4 mb-4">
                <Button
                  variant="link"
                  className="text-blue-600 dark:text-blue-400 p-0 border-b-2 border-blue-600 dark:border-blue-400"
                >
                  Published
                </Button>
                <Button variant="link" className="text-gray-600 dark:text-gray-400 p-0">
                  Drafts
                </Button>
              </div>
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
                <Button variant="link" className="text-blue-600 dark:text-blue-400">
                  Add a project.
                </Button>
                <span className="text-gray-600 dark:text-gray-400">
                  {" "}
                  Talent are hired 5x more often if they&apos;ve published a
                  portfolio.
                </span>
              </div>
            </div>

            {/* Work History */}
            <div className=" border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Work history</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">No items</p>
            </div>

            {/* Skills */}
            <div className=" p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
                <SkillsDialog
                  skills={skills}
                  onSave={setSkills}
                  trigger={
                    <Edit className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer" />
                  }
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-950">
         {/* Education */}
         <Card className="bg-gray-50 dark:bg-gray-950 mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Education</CardTitle>
                  <EducationDialog
                    onSave={(newEducation) =>
                      setEducation([...education, newEducation])
                    }
                    trigger={
                      <Plus className="h-5 w-5 text-green-500 cursor-pointer" />
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{edu.field}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </p>
                          {edu.description && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <EducationDialog
                          education={edu}
                          onSave={(updatedEducation) => {
                            const updated = [...education];
                            updated[index] = updatedEducation;
                            setEducation(updated);
                          }}
                          trigger={
                            <Edit className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer" />
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete education"
                          onClick={() => {
                            const updated = education.filter((_, i) => i !== index);
                            setEducation(updated);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
          </Card>

            {/* Certifications */}
            <Card className="bg-gray-50 dark:bg-gray-950 mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Certifications
                  </CardTitle>
                  <CertificationDialog
                    onSave={(newCert) =>
                      setCertifications([...certifications, newCert])
                    }
                    trigger={
                      <Plus className="h-5 w-5 text-green-500 cursor-pointer" />
                    }
                  />
                </div>
              </CardHeader>
              <CardContent>
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Provider: {cert.provider}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Issued: {formatDate(cert.issued)} • Expires:{" "}
                        {formatDate(cert.expires)}
                      </p>
                      <Button
                        variant="link"
                        className="text-blue-600 dark:text-blue-400 p-0 h-auto text-sm mt-2"
                      >
                        Show description
                      </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <CertificationDialog
                        certification={cert}
                        onSave={(updatedCert) => {
                          const updated = [...certifications];
                          updated[index] = updatedCert;
                          setCertifications(updated);
                        }}
                        trigger={
                          <Edit className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer" />
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete certification"
                        onClick={() => {
                          const updated = certifications.filter((_, i) => i !== index);
                          setCertifications(updated);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


            {/* Other Experiences */}
            <Card className="bg-gray-50 dark:bg-gray-950 mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Experiences
                  </CardTitle>
                  <ExperienceDialog
                    onSave={(newExperience) =>
                      setOtherExperiences([...otherExperiences, newExperience])
                    }
                    trigger={
                      <Plus className="h-5 w-5 text-green-500 cursor-pointer" />
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {otherExperiences.map((exp, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <ExperienceDialog
                          experience={exp}
                          onSave={(updatedExperience) => {
                            const updated = [...otherExperiences];
                            updated[index] = updatedExperience;
                            setOtherExperiences(updated);
                          }}
                          trigger={
                            <Edit className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-pointer" />
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete experience"
                          onClick={() => {
                            const updated = otherExperiences.filter((_, i) => i !== index);
                            setOtherExperiences(updated);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
        </section>
      </div>
    </div>
  );
}
