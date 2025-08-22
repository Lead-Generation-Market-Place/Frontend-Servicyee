'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Video, GraduationCap, Award, Plus, X } from "lucide-react"
import { useState } from "react"

interface Education {
  id: number
  university: string
  degree: string
  status: string
  year: string
}
interface Certification {
  id: number
  name: string
  year: string
}
interface Skill {
  id: number
  name: string
}


export function FreelancerProfileContent() {
  // State for about section
  const [aboutText, setAboutText] = useState(
    "I am Software Engineer graduated from computer science faculty. Having 7+ years of experience in developing, managing, customizing, and teaching of web technology. Interest in Python/Django Web development with frontend technologies HTML, CSS, JavaScript, Bootstrap, jQuery, ajax and much more."
  )
  const [editingAbout, setEditingAbout] = useState(false)

  // State for education
  const [education, setEducation] = useState<Education[]>([
    { id: 1, university: "Nangarhar University", degree: "B.Sc. Degree", status: "graduated", year: "2023" }
  ])

  // State for certifications
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: "Erason Software House Web Development", year: "2023" },
    { id: 2, name: "MELI Muslim English Language Institute Writing and Translation", year: "2020" }
  ])
  const [newCertification, setNewCertification] = useState({ name: "", year: "" })

  // State for skills
  const [skills, setSkills] = useState<Skill[]> ([
    { id: 1, name: "Python Django developer" },
    { id: 2, name: "Django rest developer" },
    { id: 3, name: "Data entry expert" },
    { id: 4, name: "Translator" },
    { id: 5, name: "Web developer" },
    { id: 6, name: "Front-end web developer" }
  ])
  const [newSkill, setNewSkill] = useState("")

  // Add education
  const addEducation = (newEducation: Education ) => {
    if (newEducation.university && newEducation.degree && newEducation.year) {
      setEducation([...education, { ...newEducation }])
    }
  }

  // Add certification
  const addCertification = () => {
    if (newCertification.name && newCertification.year) {
      setCertifications([...certifications, { id: Date.now(), ...newCertification }])
      setNewCertification({ name: "", year: "" })
    }
  }

  // Add skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now(), name: newSkill.trim() }])
      setNewSkill("")
    }
  }

  // Remove education
  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id))
  }

  // Remove certification
  const removeCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id))
  }

  // Remove skill
  const removeSkill = (skillToRemove: Skill) => {
    setSkills(skills.filter(skill => skill.id !== skillToRemove.id))
  }

  return (
    <div className="space-y-8">
      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          {editingAbout ? (
            <div className="space-y-4">
              <Textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell us about yourself, your experience, and expertise..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setAboutText("I am Software Engineer graduated from computer science faculty. Having 7+ years of experience in developing, managing, customizing, and teaching of web technology. Interest in Python/Django Web development with frontend technologies HTML, CSS, JavaScript, Bootstrap, jQuery, ajax and much more.")
                    setEditingAbout(false)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => setEditingAbout(false)}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-200">
                {aboutText}
              </p>
              <Button variant="outline" size="sm" onClick={() => setEditingAbout(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Intro Video Section */}
      <Card>
        <CardHeader>
          <CardTitle>Intro video</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Make a connection with potential buyers while building credibility and gaining trust.
          </p>
          <div className="flex items-center justify-center h-32 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4">
            <div className="text-center">
              <Video className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No intro video yet</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Video className="w-4 h-4 mr-2" />
            Add intro video
          </Button>
        </CardContent>
      </Card>

      {/* Education and Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <h3 className="font-medium dark:text-gray-100">{edu.university}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{edu.degree}, {edu.status}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Graduated {edu.year}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
              <EducationDialogBox education={education} addEducation={addEducation} removeEducation={removeEducation} />
          </CardContent>
        </Card>

        {/* Certifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <h3 className="font-medium dark:text-gray-100">{cert.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit certifications
                </Button>
              </DialogTrigger>
              <DialogContent className="!max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Certifications</DialogTitle>
                </DialogHeader>
                
                {/* Add New Certification Form */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                  <h3 className="font-semibold text-lg dark:text-gray-100">Add New Certification</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="certName">Certification Name</Label>
                      <Input
                        id="certName"
                        value={newCertification.name}
                        onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                        placeholder="Certification name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certYear">Year</Label>
                      <Input
                        id="certYear"
                        value={newCertification.year}
                        onChange={(e) => setNewCertification({...newCertification, year: e.target.value})}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                  <Button onClick={addCertification} >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                </div>

                {/* Current Certifications List */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg dark:text-gray-100">Current Certifications</h3>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                      <div>
                        <h4 className="font-medium dark:text-gray-100">{cert.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCertification(cert.id)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Skills and Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Skills and expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="secondary">{skill.name}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit skills and expertise
              </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Skills and Expertise</DialogTitle>
              </DialogHeader>
              
              {/* Add New Skill Form */}
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                <h3 className="font-semibold text-lg dark:text-gray-100">Add New Skill</h3>
                <div>
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter skill name"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                </div>
                <Button onClick={addSkill}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              {/* Current Skills List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg dark:text-gray-100">Current Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary">{skill.name  }</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}

// eslint-disable-next-line
const EducationDialogBox = ({addEducation, removeEducation, education}:{addEducation: (education: Education) => void, removeEducation: (id:number) => void, education: Education[]})=>{
  console.log('education:', education)

  
  const [newEducation, setNewEducation] = useState<Education>({id: 0, university: "", degree: "", status: "", year: ""})
  
  const handleAddEducation = () => {
    if (newEducation.university && newEducation.degree && newEducation.year) {
      addEducation({...newEducation, id: Date.now()})
      // Reset form after adding
      setNewEducation({id: 0, university: "", degree: "", status: "", year: ""})
    }
  }
  
  return <Dialog >
  <DialogTrigger asChild>
    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
      <Edit className="w-4 h-4 mr-2" />
      Edit education  
    </Button>
  </DialogTrigger>
  <DialogContent className="!max-w-4xl max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Edit Education</DialogTitle>
    </DialogHeader>
    
    {/* Add New Education Form */}
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <h3 className="font-semibold text-lg dark:text-gray-100">Add New Education</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            value={newEducation.university}
            onChange={(e) => setNewEducation({...newEducation, university: e.target.value})}
            placeholder="University name"
          />
        </div>
        <div>
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
            placeholder="Degree type"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            value={newEducation.status}
            onChange={(e) => setNewEducation({...newEducation, status: e.target.value})}
            placeholder="graduated, ongoing, etc."
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={newEducation.year}
            onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
            placeholder="2023"
          />
        </div>
      </div>
      <Button onClick={handleAddEducation} >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>

    {/* Current Education List */}
    <div className="space-y-3">
      <h3 className="font-semibold text-lg dark:text-gray-100">Current Education</h3>
      {education.map((edu) => (
        <div key={edu.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
          <div>
            <h4 className="font-medium dark:text-gray-100">{edu.university}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{edu.degree}, {edu.status}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Graduated {edu.year}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeEducation(edu.id)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  </DialogContent>
</Dialog>
}