import { Card } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        <Card>

        </Card>
    </div>
}
