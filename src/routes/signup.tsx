import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const loginSearchSchema = z.object({
    redirect: z.string()
})

export const Route = createFileRoute('/signup')({
    validateSearch: loginSearchSchema,
    component: RouteComponent,
})

function RouteComponent() {
    return <div>

    </div>
}
