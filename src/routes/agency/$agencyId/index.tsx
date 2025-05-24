import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AgencyBaseForm } from '@/features/agency/containers/AgencyBaseForm';
import { useAgencyDetail, useAgencyPatch } from '@/features/agency/hooks/useAgency';
import { PostAgencyForm, type PostAgencyRequest } from '@/features/agency/model/agency.request';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/agency/$agencyId/')({
    component: RouteComponent,
})

export const AgencyPatchFormId = 'agency-patch-form'

function RouteComponent() {
    const { agencyId } = useParams({ from: '/agency/$agencyId/' })
    const id = Number(agencyId);
    const { data: agency } = useAgencyDetail(id);
    const { mutate: patch, isPending: isPatching } = useAgencyPatch(id)

    const form = useForm<PostAgencyRequest>({
        resolver: zodResolver(PostAgencyForm),
        defaultValues: {
            title: '',
            nationAgency: ''
        }
    })

    const onSubmit = useCallback(() => {
        const request = form.getValues();
        patch({ ...request, id })
    }, [form, id, patch])

    const fillWithData = useCallback(() => {
        if (!agency) return;

        form.setValue('title', agency.title)
        form.setValue('nationAgency', agency.type);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agency])

    useEffect(() => {
        fillWithData()
    }, [fillWithData])

    return <Layout
        title={<span className='font-semibold'>{`'${agency?.title}'`}</span>}
        right={<div>
            <Button type='submit' form={AgencyPatchFormId}>
                {`저장${isPatching ? '중...' : ''}`}
            </Button>
        </div>}
    >
        <div>
            <Form {...form}>
                <form
                    id={AgencyPatchFormId}
                    className="space-y-5 p-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <AgencyBaseForm form={form} />
                </form>
            </Form>
        </div>
    </Layout>
}
