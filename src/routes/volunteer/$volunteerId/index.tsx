import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { VolunteerWorkBaseForm } from '@/features/volunteer-work/containers/VolunteerWorkBaseForm'
import { useVolunteerPatch, useVolunteerRemove, useVolunteerWorkDetail } from '@/features/volunteer-work/hooks/useVolunteerWork'
import { PostVolunteerWorkForm, type PostVolunteerWorkRequest } from '@/features/volunteer-work/model/volunteer-work.request'
import { KSTDate } from '@/lib/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/volunteer/$volunteerId/')({
  component: RouteComponent,
})

export const VolunteerWorkPatchFormId = 'volunteer-work-patch-form'

function RouteComponent() {
  const { volunteerId: _volunteerId } = useParams({ from: '/volunteer/$volunteerId/' })
  const id = Number(_volunteerId);

  const router = useRouter();
  const { data: volunteerWork } = useVolunteerWorkDetail(id);
  const { mutate: patch, isPending: isPatching } = useVolunteerPatch(id);
  const { mutate: remove, isPending: isRemoving } = useVolunteerRemove(id)
  const [editMode, setEditMode] = useState(false)

  const form = useForm<PostVolunteerWorkRequest>({
    resolver: zodResolver(PostVolunteerWorkForm),
    disabled: !editMode,
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
    patch({ ...request, id }, {
      onSuccess: () => {
        setEditMode(false);
      }
    })
  }, [form, id, patch])

  const fillWithData = useCallback(() => {
    if (!volunteerWork) return;

    form.setValue('title', volunteerWork.title)
    form.setValue('startDate', new Date(volunteerWork.startDate));
    form.setValue('endDate', new Date(volunteerWork.endDate));
    form.setValue('startMinute', volunteerWork.startMinute);
    form.setValue('endMinute', volunteerWork.endMinute);
    form.setValue('recruitStartDate', new Date(volunteerWork.recruitStartDate));
    form.setValue('recruitEndDate', new Date(volunteerWork.recruitEndDate));
    form.setValue('dayOfWeek', volunteerWork.dayOfWeek);
    form.setValue('recruitPeopleCount', volunteerWork.recruitPeopleCount);
    form.setValue('notice', volunteerWork.notice);
    form.setValue('workAddress', volunteerWork.workAddress);
    form.setValue('workPlace', volunteerWork.workPlace);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerWork])

  const onCancel = useCallback(() => {
    setEditMode(false);
    fillWithData();
  }, [fillWithData])

  const onRemove = useCallback(() => {
    remove({ id }, {
      onSuccess: () => {
        router.history.back();
      }
    })
  }, [id, remove, router.history])


  useEffect(() => {
    fillWithData();
  }, [fillWithData])

  return <Layout
    title={'봉사활동 수정'}
    className='py-3'
    back
    right={
      <div>
        {editMode && <div className='space-x-2'>
          <Button variant={'destructive'} onClick={onCancel}>
            취소
          </Button>
          <Button
            type='submit'
            form={VolunteerWorkPatchFormId}>
            {`저장${isPatching ? '중...' : ''}`}
          </Button>
        </div>}
        {!editMode && <div className='space-x-2'>
          <Button variant={'destructive'} onClick={onRemove}>
            {`삭제${isRemoving ? '중...' : ''}`}
          </Button>
          <Button onClick={() => setEditMode(true)}>
            수정
          </Button>
        </div>}
      </div>
    }
  >
    <Form {...form}>
      <form id={VolunteerWorkPatchFormId} className="space-y-5 p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <VolunteerWorkBaseForm form={form} />
      </form>
    </Form>
  </Layout>
}
