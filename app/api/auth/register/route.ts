import { NextRequest, NextResponse } from 'next/server'
import { signUpSchema } from '@/lib/validation/schemas'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = signUpSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { email, password, name } = parsed.data

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    })

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || 'Registration failed' },
        { status: 400 }
      )
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: data.user.id,
        email,
        name,
        display_name: name,
      })

    if (profileError) {
      // Roll back the auth user so a retry doesn't hit "already registered".
      await supabaseAdmin.auth.admin.deleteUser(data.user.id)
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
