import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrentAgency } from '@/features/agency/hooks/useAgency';
import { dayOfWeek2Title } from '@/features/common/day';
import { useVolunteerWork } from '@/features/volunteer-work/hooks/useVolunteerWork';
import { KSTDate } from '@/lib/date';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/volunteer/')({
    component: VolunteerWork,
})


function VolunteerWork() {
    const agencyId = useCurrentAgency();
    const { data: volunteerWorkList } = useVolunteerWork({ agencyId })

    return (
        <Layout className='p-2'>
            <div className='space-y-2 overflow-y-scroll'>
                {
                    volunteerWorkList?.map((work) => (
                        <Link key={work.id} to={`/volunteer/$volunteerId`} params={{ volunteerId: `${work.id}` }}>
                            <Card >
                                <CardHeader className=''>
                                    <CardTitle>{work.title}</CardTitle>
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
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </Layout>
    )
}