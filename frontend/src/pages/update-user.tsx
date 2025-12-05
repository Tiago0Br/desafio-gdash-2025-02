import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUser } from '@/http/update-user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

const updateUserSchema = z
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

type UpdateUserFormType = z.infer<typeof updateUserSchema>

export function UpdateUserPage() {
  const navigate = useNavigate()
  const { getLoggedUser, updateLoggedUser } = useAuth()
  const loggedUser = getLoggedUser()

  const registerForm = useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: loggedUser.name,
      email: loggedUser.email,
      password: '',
      passwordConfirm: ''
    }
  })

  const { mutateAsync: createUserRequest, isPending } = useMutation({
    mutationFn: () => updateUser(registerForm.getValues()),
    onSuccess: () => {
      toast.success('Cadastro atualizado com sucesso!')
      updateLoggedUser({
        name: registerForm.getValues().name,
        email: registerForm.getValues().email,
        token: loggedUser.token,
        id: loggedUser.id
      })
      registerForm.reset()
      navigate('/users')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <div className="h-[calc(100vh-4rem)] p-6 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Atualizar usuário
          </CardTitle>
          <CardDescription>
            Clique em Atualizar Dados para finalizar suas alterações
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(() => createUserRequest())}
            >
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
                      <Input
                        id="email"
                        placeholder="johndoe@email.com"
                        {...field}
                      />
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
                  Atualizar cadastro
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground text-center">
            WeatherStack • {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
