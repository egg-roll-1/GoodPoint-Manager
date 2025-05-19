import { Layout } from '@/components/Layout'
import { useVolunteerPatch, useVolunteerRemove, useVolunteerWorkDetail } from '@/features/volunteer-work/hooks/useVolunteerWork'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/volunteer/$volunteerId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { volunteerId: _volunteerId } = useParams({ from: '/volunteer/$volunteerId' })
  const volunteerId = Number(_volunteerId);

  const { data } = useVolunteerWorkDetail(volunteerId);
  const { mutate: remove } = useVolunteerRemove(volunteerId);
  const { mutate: patch } = useVolunteerPatch(volunteerId);

  return <Layout>
    <span></span>
  </Layout>
}
