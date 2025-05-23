import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useCurrentAgency } from '@/features/agency/hooks/useAgency'
import { VolunteerWorkBaseForm } from '@/features/volunteer-work/containers/VolunteerWorkBaseForm'
import { useVolunteerPost } from '@/features/volunteer-work/hooks/useVolunteerWork'
import { PostVolunteerWorkForm, type PostVolunteerWorkRequest } from '@/features/volunteer-work/model/volunteer-work.request'
import { KSTDate } from '@/lib/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/volunteer/new')({
  component: RouteComponent,
})

export const VolunteerWorkPostFormId = 'volunteer-work-post-form'

function RouteComponent() {
  const router = useRouter();
  const agencyId = useCurrentAgency();
  const { mutate: post, isPending: isSaving } = useVolunteerPost()

  const form = useForm<PostVolunteerWorkRequest>({
    resolver: zodResolver(PostVolunteerWorkForm),
    defaultValues: {
      title: '',
      startDate: KSTDate().add(20, 'day').toDate(),
      endDate: KSTDate().add(30, 'day').toDate(),
      startMinute: 0,
      endMinute: 60,
      recruitStartDate: KSTDate().toDate(),
      recruitEndDate: KSTDate().toDate(),
      dayOfWeek: ['Mon', 'Tue'],
      recruitPeopleCount: 10,
      notice: '',
      workAddress: '',
      workPlace: ''
    }
  })

  const onSubmit = useCallback(() => {
    const request = form.getValues();
    post({ ...request, agencyId }, {
      onSuccess: (id) => {
        router.navigate({ to: `/volunteer/$volunteerId`, params: { volunteerId: `${id}` }, replace: true })
      }
    })
  }, [agencyId, form, post, router])


  return <Layout
    title={'봉사활동 추가'}
    className='py-3'
    back
    right={
      <div>
        <div className='space-x-2'>
          <Button
            type='submit'
            form={VolunteerWorkPostFormId}>
            {`저장${isSaving ? '중...' : ''}`}
          </Button>
        </div>
      </div>
    }
  >
    <Form {...form}>
      <form id={VolunteerWorkPostFormId} className="space-y-5 p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <VolunteerWorkBaseForm form={form} />
      </form>
    </Form>
  </Layout>
}
