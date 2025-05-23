import { Layout } from '@/components/Layout'
import { VolunteerRequestList } from '@/features/volunteer-request/containers/VolunteerRequest'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/volunteer/$volunteerId/request')({
    component: RouteComponent,
})

function RouteComponent() {
    const { volunteerId: _volunteerId } = useParams({ from: '/volunteer/$volunteerId/request' })
    const volunteerId = Number(_volunteerId);

    return <Layout title={'봉사활동 신청내역'} back>
        <VolunteerRequestList id={volunteerId} />
    </Layout>
}

