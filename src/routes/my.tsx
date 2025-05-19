import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my')({
    component: My,
})


function My() {

    const { logout } = useLogout()

    return (
        <Layout>
            <h3>Welcome Home!</h3>
            <Button onClick={logout}>로그아웃</Button>
        </Layout>
    )
}