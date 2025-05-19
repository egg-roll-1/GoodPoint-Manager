import { Layout } from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { useAgency } from '@/features/agency/hooks/useAgency'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href
                }
            })
        }
    },
    component: Index,
})

function Index() {
    const { data: agencyList } = useAgency();

    return (
        <Layout className='p-2'>
            <div className='space-y-2'>
                <div>
                    <span className='font-semibold'>내 봉사기관</span>
                </div>
                {
                    agencyList?.map(agency => {
                        return <Card key={agency.id}>
                            <CardContent>
                                <div className='flex flex-col'>
                                    <span className='text-sm'>{agency.type}</span>
                                    <span className='font-medium'>{agency.title}</span>
                                </div>
                            </CardContent>
                        </Card>
                    })
                }
            </div>
        </Layout>
    )
}