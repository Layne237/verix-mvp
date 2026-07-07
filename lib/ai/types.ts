export interface VerificationResult {
  score: number
  confidence: 'low' | 'medium' | 'high'
  explanation: string
  concerns: string[]
  tags?: string[]
}

export interface VerificationRequest {
  beforeImage: string
  afterImage: string
  category?: string
  location?: {
    lat: number
    lng: number
    name: string
  }
}

export interface CategoryResult {
  categories: string[]
  primary: string
}
