import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { login } from '@/http/login'
import { Button } from '../ui/button'
import { Form, FormField, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

type LoginSchemaType = z.infer<typeof loginSchema>

export function LoginForm() {
  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutateAsync: loginRequest } = useMutation({
    mutationFn: () => login(loginForm.getValues()),
    onSuccess: () => {
      toast.success('Login realizado com sucesso')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(() => loginRequest())}>
        <div className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          />
          <Button className="w-full" type="submit">
            Acessar Dashboard
          </Button>
        </div>
      </form>
    </Form>
  )
}
