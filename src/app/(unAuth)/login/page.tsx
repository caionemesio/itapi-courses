'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formSchema, LoginFormValues } from './validations'
import { useMutation } from '@tanstack/react-query'
import useAuth from '@/service/useAuth'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { signInWithEmailAndPassword } = useAuth()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const authMutation = useMutation({
    mutationFn: signInWithEmailAndPassword,
    onSuccess: async () => {
      router.push('/admin')
    },
    onError: (error) => {
      console.log(error)
      const message = error.message.includes('Invalid login credentials')
        ? 'Credenciais inválidas. Verifique seu e-mail e senha.'
        : 'Ocorreu um erro ao fazer login. Tente novamente.'

      toast({
        variant: 'destructive',
        title: 'Falha no login',
        description: message,
      })
    },
  })
  function onSubmit(values: LoginFormValues) {
    authMutation.mutate(values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightBackground dark:bg-background">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Image
            src="/itapi-logo.png"
            alt="Itapi Logo"
            width={150}
            height={150}
            className="h-24 w-24 object-contain"
          />
          <CardTitle className="text-2xl font-bold text-primary-600">
            Bem-vindo(a) de volta!
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Entre na sua conta para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        {...field}
                        type="email"
                        className="h-10 px-4 py-2 text-foreground focus-visible:ring-primary-600"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                        className="h-10 px-4 py-2 text-foreground focus-visible:ring-primary-600"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary-600 text-primary-foreground hover:bg-primary-700 h-10 px-4 py-2"
              >
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
