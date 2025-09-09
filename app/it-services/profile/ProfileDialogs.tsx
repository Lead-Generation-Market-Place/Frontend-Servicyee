"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, X } from "lucide-react";

// Education Dialog
interface EducationData {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationDialogProps {
  education?: EducationData;
  // eslint-disable-next-line
  onSave: (education: EducationData) => void;
  trigger?: React.ReactNode;
}

export function EducationDialog({ education, onSave, trigger }: EducationDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<EducationData>(
    education || {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] md:max-w-[500px] mx-2">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {education ? "Edit Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {education ? "Update your education information." : "Add your education background."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="institution" className="text-sm sm:text-base">Institution</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree" className="text-sm sm:text-base">Degree</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="field" className="text-sm sm:text-base">Field of Study</Label>
              <Input
                id="field"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate" className="text-sm sm:text-base">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate" className="text-sm sm:text-base">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm sm:text-base">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Certification Dialog
interface CertificationData {
  title: string;
  provider: string;
  issued: string;
  expires: string;
  description: string;
}

interface CertificationDialogProps {
  certification?: CertificationData;
  // eslint-disable-next-line
  onSave: (certification: CertificationData) => void;
  trigger?: React.ReactNode;
}

export function CertificationDialog({ certification, onSave, trigger }: CertificationDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<CertificationData>(
    certification || {
      title: "",
      provider: "",
      issued: "",
      expires: "",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] md:max-w-[500px] mx-2">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {certification ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {certification ? "Update your certification information." : "Add a new certification."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm sm:text-base">Certification Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="provider" className="text-sm sm:text-base">Provider</Label>
              <Input
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="issued" className="text-sm sm:text-base">Issued Date</Label>
                <Input
                  id="issued"
                  type="month"
                  value={formData.issued}
                  onChange={(e) => setFormData({ ...formData, issued: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expires" className="text-sm sm:text-base">Expires Date</Label>
                <Input
                  id="expires"
                  type="month"
                  value={formData.expires}
                  onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Skills Dialog
interface SkillsDialogProps {
  skills: string[];
  // eslint-disable-next-line
  onSave: (skills: string[]) => void;
  trigger?: React.ReactNode;
}

export function SkillsDialog({ skills, onSave, trigger }: SkillsDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [skillList, setSkillList] = React.useState<string[]>(skills);
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skillList.includes(newSkill.trim())) {
      setSkillList([...skillList, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillList(skillList.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skillList);
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] md:max-w-[500px] mx-2">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Edit Skills</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Add or remove skills from your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newSkill" className="text-sm sm:text-base">Add New Skill</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a skill"
                  className="text-sm sm:text-base flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addSkill} 
                  disabled={!newSkill.trim()}
                  className="w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm sm:text-base">Current Skills</Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                {skillList.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center w-full py-2">
                    No skills added yet
                  </p>
                ) : (
                  skillList.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                      <span>{skill}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill)}
                        className="h-4 w-4 p-0 ml-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Employment History Dialog
interface EmploymentData {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EmploymentDialogProps {
  employment?: EmploymentData;
  // eslint-disable-next-line
  onSave: (employment: EmploymentData) => void;
  trigger?: React.ReactNode;
}

export function EmploymentDialog({ employment, onSave, trigger }: EmploymentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<EmploymentData>(
    employment || {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] md:max-w-[500px] mx-2">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {employment ? "Edit Employment" : "Add Employment"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {employment ? "Update your employment information." : "Add your employment history."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm sm:text-base">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company" className="text-sm sm:text-base">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate" className="text-sm sm:text-base">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate" className="text-sm sm:text-base">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Other Experience Dialog
interface ExperienceData {
  title: string;
  description: string;
}

interface ExperienceDialogProps {
  experience?: ExperienceData;
  // eslint-disable-next-line
  onSave: (experience: ExperienceData) => void;
  trigger?: React.ReactNode;
}

export function ExperienceDialog({ experience, onSave, trigger }: ExperienceDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ExperienceData>(
    experience || {
      title: "",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] md:max-w-[500px] mx-2">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {experience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {experience ? "Update your experience information." : "Add your other experiences."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm sm:text-base">Experience Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}