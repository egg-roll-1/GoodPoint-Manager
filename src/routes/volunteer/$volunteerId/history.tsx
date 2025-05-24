import { Layout } from '@/components/Layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVolunteerHistory, useVolunteerHistoryCancel, useVolunteerHistoryPost } from '@/features/volunteer-history/hooks/useVolunteerHistory'
import type { GetVolunteerHistoryResponse } from '@/features/volunteer-history/model/volunteer-history.response'
import { useVolunteerRequest } from '@/features/volunteer-request/hooks/useVolunteerRequest'
import type { VolunteerRequestResponse } from '@/features/volunteer-request/model/volunteer-request.response'
import { useVolunteerWorkDetail } from '@/features/volunteer-work/hooks/useVolunteerWork'
import { KSTDate } from '@/lib/date'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { groupBy, isNaN } from 'es-toolkit/compat'
import { useCallback, useRef, type FC } from 'react'

export const Route = createFileRoute('/volunteer/$volunteerId/history')({
  component: RouteComponent,
})

function RouteComponent() {
  const { volunteerId: _volunteerId } = useParams({ from: '/volunteer/$volunteerId/history' })
  const id = Number(_volunteerId);

  const { data: volunteer } = useVolunteerWorkDetail(id)
  const { data: volunteerHistoryList } = useVolunteerHistory({ volunteerWorkId: id });
  const { data: volunteerRequestList } = useVolunteerRequest({ volunteerWorkId: id, status: 'Approve' });

  const DATE_FORMAT = 'YYYY년 MM월 DD일(ddd)'
  const groupedHistoryList = groupBy(volunteerHistoryList, (x) => KSTDate(x.startDateTime).format(DATE_FORMAT))

  return <Layout title={'활동인정 관리'}
    className='py-3'
    back>
    <div className='flex flex-col w-full p-2'>
      <Accordion type="multiple" className='w-full'>
        {
          volunteer?.dateList.map((date) => {
            const dateString = KSTDate(date).format(DATE_FORMAT);
            return <AccordionItem value={dateString} key={dateString}>
              <AccordionTrigger>{dateString}</AccordionTrigger>
              <AccordionContent>
                {
                  volunteerRequestList?.map(request => {
                    return <VolunteerHistoryCard
                      key={request.id}
                      request={request}
                      date={date}
                      historyList={groupedHistoryList[dateString] ?? []}
                    />
                  })
                }
              </AccordionContent>
            </AccordionItem>
          })
        }
      </Accordion>
    </div>
  </Layout>
}

type CardProps = {
  historyList: GetVolunteerHistoryResponse[],
  request: VolunteerRequestResponse,
  date: Date
}

export const VolunteerHistoryCard: FC<CardProps> = ({ historyList, request, date }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate: postHistory, isPending: isPosting } = useVolunteerHistoryPost();
  const { mutate: removeHistory, isPending: isRemoving } = useVolunteerHistoryCancel()

  const volunteerWork = request.volunteerWork;
  const history = historyList.find(history => history.userId === request.userId)

  const handleHistory = useCallback(() => {
    const { userId, volunteerWork } = request;
    const startDate = KSTDate(date).startOf('day').add(volunteerWork.startMinute);
    const inputValue = Number(inputRef.current?.value) * 60;
    const minute = !isNaN(inputValue) ? inputValue : (volunteerWork.endMinute - volunteerWork.startMinute);

    postHistory({
      userId,
      volunteerWorkId: volunteerWork.id,
      startDateTime: startDate.toDate(),
      endDateTime: startDate.add(minute, 'minute').toDate()
    })
  }, [date, postHistory, request]);

  const cancelHistory = useCallback(() => {
    if (!history) return;
    removeHistory(history.id)
  }, [history, removeHistory])


  return <div className='flex justify-between items-center'>
    <div className='space-x-2 flex flex-2'>
      {
        history
          ? <Badge>{history.minute / 60}시간 출석</Badge>
          : <Badge variant={'outline'}>결석</Badge>
      }
      <span>{request.name}</span>
      <span>{request.phoneNumber}</span>
    </div>

    {history
      ? <div className='flex flex-1 items-center justify-end'>
        <Button
          size={'sm'}
          variant={'destructive'}
          onClick={cancelHistory}
          disabled={isRemoving}
        >
          {`취소${isRemoving ? '중...' : ''}`}
        </Button>
      </div>
      : <div className='flex flex-1 items-center'>
        <Input
          ref={inputRef}
          inputMode='numeric'
          defaultValue={(volunteerWork.endMinute - volunteerWork.startMinute) / 60}
        />
        <Button
          size={'sm'}
          onClick={handleHistory}
          disabled={isPosting}>
          {`인정${isPosting ? '처리중...' : ''}`}
        </Button>
      </div>}
  </div>

}