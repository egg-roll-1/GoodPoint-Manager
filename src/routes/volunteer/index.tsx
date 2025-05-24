import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgencyDetail, useCurrentAgency } from '@/features/agency/hooks/useAgency';
import { dayOfWeek2Title } from '@/features/common/day';
import { useVolunteerWork } from '@/features/volunteer-work/hooks/useVolunteerWork';
import { KSTDate } from '@/lib/date';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon } from 'lucide-react';

export const Route = createFileRoute('/volunteer/')({
    component: VolunteerWork,
})


function VolunteerWork() {
    const agencyId = useCurrentAgency();
    const { data: agencyDetail } = useAgencyDetail(agencyId)
    const { data: volunteerWorkList } = useVolunteerWork({ agencyId })

    return (
        <Layout className='p-2'
            title={
                <span className='font-semibold'>
                    '{agencyDetail?.title ?? ''}' 봉사활동
                </span>
            }
            right={
                <div>
                    <div className='space-x-2'>
                        <Link to='/volunteer/new'>
                            <Button>
                                {`추가`}
                            </Button>
                        </Link>
                    </div>
                </div>
            }>
            <div className='space-y-2 overflow-y-scroll'>
                {
                    volunteerWorkList?.map((work) => (
                        <Card key={work.id}>
                            <CardHeader className=''>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <CardTitle className='w-50'>
                                            <span className=''>{`${work.title}`}</span>
                                        </CardTitle>
                                    </div>
                                    <Link to='/volunteer/$volunteerId' params={{ volunteerId: `${work.id}` }}>
                                        <Button className='w-fit' variant={'outline'}>
                                            편집 <PencilIcon />
                                        </Button>
                                    </Link>
                                </div>
                                <CardDescription className='flex-col'>
                                    {`${work.dayOfWeek.map(d => dayOfWeek2Title[d]).join(',')}
                                ${KSTDate().startOf('day').add(work.startMinute, 'minute').format('HH:mm')} ~
                                ${KSTDate().startOf('day').add(work.endMinute, 'minute').format('HH:mm')}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='text-sm'>
                                <div className='flex flex-col'>
                                    <span>모집기간: {KSTDate(work.recruitStartDate).format('YY.MM.DD')} ~ {KSTDate(work.recruitEndDate).format('YY.MM.DD')}</span>
                                    <span>모집현황: {work.peopleCount}명 / {work.recruitPeopleCount}명</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className='w-full flex space-x-2'>
                                    <Link
                                        to='/volunteer/$volunteerId/request'
                                        params={{ volunteerId: `${work.id}` }}
                                        className='w-full'
                                    >
                                        <Button className='w-full' variant={'default'}>
                                            신청현황
                                        </Button>
                                    </Link>
                                    <Link
                                        to='/volunteer/$volunteerId/history'
                                        params={{ volunteerId: `${work.id}` }}
                                        className='w-full'
                                    >
                                        <Button className='w-full' variant={'default'}>
                                            활동인정 관리
                                        </Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>

                    ))
                }
            </div>
        </Layout>
    )
}