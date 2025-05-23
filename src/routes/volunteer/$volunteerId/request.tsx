import { Layout } from '@/components/Layout'
import { VolunteerRequestList } from '@/features/volunteer-request/containers/VolunteerRequest'
import { useVolunteerPatch, useVolunteerRemove, useVolunteerWorkDetail } from '@/features/volunteer-work/hooks/useVolunteerWork'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/volunteer/$volunteerId/request')({
    component: RouteComponent,
})

function RouteComponent() {
    const { volunteerId: _volunteerId } = useParams({ from: '/volunteer/$volunteerId/request' })
    const volunteerId = Number(_volunteerId);

    const { data } = useVolunteerWorkDetail(volunteerId);
    const { mutate: remove } = useVolunteerRemove(volunteerId);
    const { mutate: patch } = useVolunteerPatch(volunteerId);

    return <Layout title={'봉사활동 상세'} back>
        <VolunteerRequestList id={volunteerId} />
    </Layout>
}

