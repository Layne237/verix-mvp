import { z } from 'zod'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function validateBody(schema: z.ZodSchema) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json()
      const parsed = schema.parse(body)
      return { success: true, data: parsed }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          response: NextResponse.json(
            { error: 'Validation failed', details: error.errors },
            { status: 400 }
          ),
        }
      }
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        ),
      }
    }
  }
}
