import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { register } from '@/http/register'
import { Button } from '../ui/button'
import { Form, FormField, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    passwordConfirm: z.string()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm']
  })

type RegisterFormType = z.infer<typeof registerSchema>

export function RegisterForm() {
  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const { mutateAsync: createUserRequest, isPending } = useMutation({
    mutationFn: () => register(registerForm.getValues()),
    onSuccess: () => {
      toast.success('Conta criada com sucesso')
      registerForm.reset()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(() => createUserRequest())}>
        <div className="space-y-4">
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...field} placeholder="John Doe" />
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="johndoe@email.com" {...field} />
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={registerForm.control}
            name="passwordConfirm"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirmar Senha</Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  placeholder="••••••••"
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            Criar Conta Grátis
          </Button>
        </div>
      </form>
    </Form>
  )
}
