import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AgencyBaseForm } from '@/features/agency/containers/AgencyBaseForm'
import { useAgencyPost } from '@/features/agency/hooks/useAgency'
import { useAgencyStore } from '@/features/agency/hooks/useAgencyStore'
import { PostAgencyForm, type PostAgencyRequest } from '@/features/agency/model/agency.request'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/agency/new')({
    component: RouteComponent,
})

export const AgencyPostFormId = 'agency-post-form'

function RouteComponent() {
    const router = useRouter();
    const { setAgency } = useAgencyStore((state) => state.actions)
    const { mutate: post, isPending: isSaving } = useAgencyPost();

    const form = useForm<PostAgencyRequest>({
        resolver: zodResolver(PostAgencyForm),
        defaultValues: {
            title: '',
            nationAgency: '',
        }
    })

    const onSubmit = useCallback(() => {
        const request = form.getValues();
        post({ ...request }, {
            onSuccess: (agencyId) => {
                setAgency({ agencyId })
                router.navigate({ to: `/agency/$agencyId`, params: { agencyId: `${agencyId}` } })
            }
        })
    }, [form, post, router, setAgency])


    return <Layout
        title={'봉사기관 추가'}
        className='py-3'
        back
        right={
            <div>
                <div className='space-x-2'>
                    <Button
                        type='submit'
                        form={AgencyPostFormId}>
                        {`저장${isSaving ? '중...' : ''}`}
                    </Button>
                </div>
            </div>
        }
    >
        <Form {...form}>
            <form id={AgencyPostFormId} className="space-y-5 p-2" onSubmit={form.handleSubmit(onSubmit)}>
                <AgencyBaseForm form={form} />
            </form>
        </Form>
    </Layout>
}
