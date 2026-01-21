import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

export const educationInquirySchema = contactFormSchema.extend({
  instagram: z.string().min(1, 'Instagram or portfolio handle is required'),
  experience: z.enum([
    'Complete Beginner',
    'Self-Taught',
    'Licensed Esthetician/Cosmetologist',
    'Working Artist',
  ]),
  goal: z.enum([
    'Learn Basics',
    'Perfect my Skin Prep',
    'Business/Marketing',
    'Full Career Pivot',
  ]),
  modelAvailability: z.enum([
    'I can bring a model',
    'I need help finding a model',
  ]),
});

export const bridalFormSchema = contactFormSchema.extend({
  weddingDate: z.date({ required_error: 'Please select your wedding date' }),
  venueLocation: z.string().min(2, 'Please enter the venue location'),
  partySize: z.number().min(1, 'Party size must be at least 1'),
  details: z.string().optional(),
});

export const lessonFormSchema = contactFormSchema.extend({
  preferredDate: z.date({ required_error: 'Please select a preferred date' }),
  lessonType: z.string().min(1, 'Please select a lesson type'),
  skillLevel: z.string().min(1, 'Please select your skill level'),
  details: z.string().optional(),
});

export const contactFormSchemaSimple = contactFormSchema.extend({
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type EducationInquiryData = z.infer<typeof educationInquirySchema>;
export type BridalFormData = z.infer<typeof bridalFormSchema>;
export type LessonFormData = z.infer<typeof lessonFormSchema>;
export type ContactFormSimpleData = z.infer<typeof contactFormSchemaSimple>;
