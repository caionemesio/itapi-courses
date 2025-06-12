import { LoginFormValues } from '@/app/(unAuth)/login/validations'
import { createSupabaseBrowserClient } from '@/utils/supabase/client'
import { Session, User } from '@supabase/auth-helpers-nextjs'

export default function useAuth() {
  const supabase = createSupabaseBrowserClient()

  async function signInWithEmailAndPassword({
    email,
    password,
  }: LoginFormValues): Promise<{ user: User | null; session: Session | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { user: data.user, session: data.session }
  }
  return { signInWithEmailAndPassword }
}
