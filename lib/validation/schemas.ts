import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const proofSubmissionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().max(500).optional(),
  action_type: z.enum([
    'tree_planting',
    'beach_cleanup',
    'community_garden',
    'renewable_energy',
    'water_conservation',
    'recycling',
    'wildlife_protection',
    'urban_greening',
    'other',
  ]),
  beforeImage: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'Image must be less than 10MB'
  ),
  afterImage: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'Image must be less than 10MB'
  ),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  locationName: z.string().max(200).optional(),
})

export const flagSchema = z.object({
  proofId: z.string().uuid(),
  reason: z.string().min(10, 'Please provide a detailed reason').max(500),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ProofSubmissionInput = z.infer<typeof proofSubmissionSchema>
export type FlagInput = z.infer<typeof flagSchema>
