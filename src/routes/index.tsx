import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAgency } from '@/features/agency/hooks/useAgency'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { PencilIcon } from 'lucide-react'

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

    const isAgencyExist = agencyList && agencyList.length > 0

    return (
        <Layout
            className='p-2'
            right={<div>
                {!isAgencyExist && <Button variant={'outline'}>
                    <Link to='/agency/new'>
                        {`봉사기관 추가하기`}
                    </Link>
                </Button>}
            </div>}
        >
            <div className='space-y-2'>
                {
                    agencyList?.map(agency => {
                        return <Card key={agency.id}>
                            <CardContent className='space-y-4'>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='text-xs'>{agency.type}</span>
                                        <span className='font-medium'>{agency.title}</span>
                                    </div>
                                    <div>
                                        <Link to='/agency/$agencyId'
                                            params={{ agencyId: `${agency.id}` }}
                                        >
                                            <Button variant={'outline'}>
                                                <PencilIcon />
                                                편집
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    })
                }
            </div>
        </Layout>
    )
}