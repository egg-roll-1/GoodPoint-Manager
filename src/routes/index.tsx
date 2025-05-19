import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/useAuth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href
                }
            })
        }
    },
    component: Index,
})

function Index() {
    const { logout } = useLogout()

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Button onClick={logout}>로그아웃</Button>
        </div>
    )
}