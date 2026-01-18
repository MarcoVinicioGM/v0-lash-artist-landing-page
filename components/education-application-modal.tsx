"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, Instagram } from "lucide-react"
import { motion } from "framer-motion"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const educationInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  instagram: z.string().min(1, "Instagram or portfolio handle is required"),
  experience: z.enum([
    "Complete Beginner",
    "Self-Taught",
    "Licensed Esthetician/Cosmetologist",
    "Working Artist",
  ]),
  goal: z.enum([
    "Learn Basics",
    "Perfect my Skin Prep",
    "Business/Marketing",
    "Full Career Pivot",
  ]),
  modelAvailability: z.enum([
    "I can bring a model",
    "I need help finding a model",
  ]),
})

type EducationInquiryData = z.infer<typeof educationInquirySchema>

interface EducationApplicationModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function EducationApplicationModal({
  isOpen,
  onOpenChange,
}: EducationApplicationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EducationInquiryData>({
    resolver: zodResolver(educationInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      instagram: "",
      experience: undefined,
      goal: undefined,
      modelAvailability: "I can bring a model",
    },
  })

  const onSubmit = (data: EducationInquiryData) => {
    const payload = {
      ...data,
      type: "education_inquiry",
      submittedAt: new Date().toISOString(),
    }

    console.log("Education Inquiry Submission:", JSON.stringify(payload, null, 2))

    setIsSubmitted(true)
    setTimeout(() => {
      onOpenChange(false)
      setIsSubmitted(false)
      reset()
    }, 2500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg border-zinc-100 shadow-sm">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="mb-4 h-16 w-16 text-zinc-900" />
            <h3 className="mb-2 font-serif text-2xl font-bold text-zinc-900">
              Application Received
            </h3>
            <p className="text-zinc-500">
              Thank you for your interest! Anna will review your profile and reach out within 48 hours.
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader className="gap-2">
              <DialogTitle className="font-serif text-3xl text-zinc-900">
                Apply for Mentorship
              </DialogTitle>
              <DialogDescription className="text-zinc-500 text-base">
                Please tell us about your experience level so we can tailor the curriculum.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edu-name" className="text-zinc-900">Name</Label>
                  <Input
                    id="edu-name"
                    placeholder="Jane Doe"
                    className="border-zinc-100 focus:ring-zinc-900"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edu-email" className="text-zinc-900">Email</Label>
                  <Input
                    id="edu-email"
                    type="email"
                    placeholder="jane@example.com"
                    className="border-zinc-100 focus:ring-zinc-900"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edu-phone" className="text-zinc-900">Phone Number</Label>
                  <Input
                    id="edu-phone"
                    type="tel"
                    placeholder="(504) 555-1234"
                    className="border-zinc-100 focus:ring-zinc-900"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edu-insta" className="text-zinc-900">Instagram / Portfolio</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      id="edu-insta"
                      placeholder="@yourhandle"
                      className="border-zinc-100 pl-9 focus:ring-zinc-900"
                      {...register("instagram")}
                    />
                  </div>
                  {errors.instagram && (
                    <p className="text-xs text-red-500">{errors.instagram.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-900">Current Experience Level</Label>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-zinc-100 focus:ring-zinc-900">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Complete Beginner">Complete Beginner</SelectItem>
                        <SelectItem value="Self-Taught">Self-Taught</SelectItem>
                        <SelectItem value="Licensed Esthetician/Cosmetologist">Licensed Esthetician/Cosmetologist</SelectItem>
                        <SelectItem value="Working Artist">Working Artist</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.experience && (
                  <p className="text-xs text-red-500">{errors.experience.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-900">Primary Goal</Label>
                <Controller
                  name="goal"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-zinc-100 focus:ring-zinc-900">
                        <SelectValue placeholder="What do you want to master?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Learn Basics">Learn Basics</SelectItem>
                        <SelectItem value="Perfect my Skin Prep">Perfect my Skin Prep</SelectItem>
                        <SelectItem value="Business/Marketing">Business/Marketing</SelectItem>
                        <SelectItem value="Full Career Pivot">Full Career Pivot</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.goal && (
                  <p className="text-xs text-red-500">{errors.goal.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-zinc-900">Model Availability</Label>
                <Controller
                  name="modelAvailability"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-3 rounded-lg border border-zinc-100 p-4 transition-all hover:bg-zinc-50">
                        <RadioGroupItem value="I can bring a model" id="m1" />
                        <Label htmlFor="m1" className="flex-1 cursor-pointer font-normal text-zinc-900">
                          I can bring a model
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border border-zinc-100 p-4 transition-all hover:bg-zinc-50">
                        <RadioGroupItem value="I need help finding a model" id="m2" />
                        <Label htmlFor="m2" className="flex-1 cursor-pointer font-normal text-zinc-900">
                          I need help finding a model
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 py-6 text-white transition-all duration-200 hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
