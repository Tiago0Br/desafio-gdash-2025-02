import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/http/get-users'
import { useAuth } from '@/hooks/use-auth'
import { deleteUser } from '@/http/delete-user'
import { DeleteUserDialog } from '@/components/users/delete-user-dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function UsersPage() {
  const navigate = useNavigate()

  const { getLoggedUser, logout } = useAuth()
  const loggedUser = getLoggedUser()

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const { mutateAsync: deleteUserRequest } = useMutation({
    mutationFn: deleteUser
  })

  async function handleDeleteUser() {
    await deleteUserRequest()
    logout()
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie quem tem acesso ao WeatherStack.
          </p>
        </div>
      </div>

      <div className="border rounded-lg shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    className="bg-green-600 hover:bg-green-700 transition-colors"
                    size="icon"
                    disabled={user.id !== loggedUser.id}
                    onClick={() => navigate('/users/update')}
                  >
                    <Pencil />
                  </Button>
                  <DeleteUserDialog
                    disabled={user.id !== loggedUser.id}
                    handleDeleteUser={handleDeleteUser}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
