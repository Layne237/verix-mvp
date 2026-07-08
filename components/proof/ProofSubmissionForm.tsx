'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { proofSubmissionSchema, type ProofSubmissionInput } from '@/lib/validation/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IMPACT_CATEGORIES } from '@/lib/utils/constants'

export function ProofSubmissionForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterPreview, setAfterPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProofSubmissionInput>({
    resolver: zodResolver(proofSubmissionSchema),
  })

  function handleImagePreview(file: File, type: 'before' | 'after') {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (type === 'before') setBeforePreview(e.target?.result as string)
      else setAfterPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function onSubmit(data: ProofSubmissionInput) {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('action_type', data.action_type)
      formData.append('beforeImage', data.beforeImage)
      formData.append('afterImage', data.afterImage)
      if (data.description) formData.append('description', data.description)
      if (data.latitude) formData.append('latitude', String(data.latitude))
      if (data.longitude) formData.append('longitude', String(data.longitude))
      if (data.locationName) formData.append('locationName', data.locationName)

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Submission failed')

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Impact Proof</CardTitle>
        <CardDescription>
          Document your positive impact with before/after photos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What did you do?"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="action_type">Action Type</Label>
            <Select onValueChange={(value) => setValue('action_type', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an action type" />
              </SelectTrigger>
              <SelectContent>
                {IMPACT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="beforeImage">Before Photo</Label>
              <Input
                id="beforeImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...register('beforeImage', {
                  onChange: (e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImagePreview(file, 'before')
                  },
                })}
              />
              {errors.beforeImage && (
                <p className="text-sm text-destructive">
                  {errors.beforeImage.message as string}
                </p>
              )}
              {beforePreview && (
                <img
                  src={beforePreview}
                  alt="Before"
                  className="mt-2 h-48 w-full rounded-md object-cover"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="afterImage">After Photo</Label>
              <Input
                id="afterImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...register('afterImage', {
                  onChange: (e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImagePreview(file, 'after')
                  },
                })}
              />
              {errors.afterImage && (
                <p className="text-sm text-destructive">
                  {errors.afterImage.message as string}
                </p>
              )}
              {afterPreview && (
                <img
                  src={afterPreview}
                  alt="After"
                  className="mt-2 h-48 w-full rounded-md object-cover"
                />
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
