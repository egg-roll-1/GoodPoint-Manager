import { useAuthStore } from '@/features/auth/hooks/useAuthStore'
import { routeTree } from '@/routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'


const router = createRouter({
    routeTree, context: {
        auth: undefined!
    }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const RouteProvider = () => {
    const auth = useAuthStore((store) => store.context)
    return <RouterProvider router={router} context={{ auth }} />
}