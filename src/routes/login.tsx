import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/login')({
    component: About,
})

function About() {
    return <Layout>
        <div className="p-2">Hello from About!</div>
    </Layout>
}