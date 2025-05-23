import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CopyIcon, PhoneIcon } from "lucide-react";
import { useCallback, type FC } from "react";
import { useVolunteerRequest, useVolunteerRequestApprove, useVolunteerRequestReject } from "../hooks/useVolunteerRequest";
import { VolunteerRequestStatus2Style, VolunteerRequestStatus2Title } from "../model/enum";

type Props = {
    id: number;
}

export const VolunteerRequestList: FC<Props> = ({ id }) => {
    const { data } = useVolunteerRequest({ volunteerWorkId: id })
    const { mutate: approve, isPending: isApproving } = useVolunteerRequestApprove();
    const { mutate: reject, isPending: isRejecting } = useVolunteerRequestReject();

    const onCopy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    }, []);

    const onApprove = useCallback((id: number) => {
        approve(id)
    }, [approve])

    const onReject = useCallback((id: number) => {
        reject(id)
    }, [reject])

    return <div>
        {data?.map(({ id, name, phoneNumber, status }) => {
            return <Card key={id} className="">
                <CardContent className="flex flex-col">
                    <div className="w-full flex justify-end">
                        <Badge className={VolunteerRequestStatus2Style[status]}>
                            {VolunteerRequestStatus2Title[status]}
                        </Badge>
                    </div>
                    <div>
                        <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span>
                                {phoneNumber}
                            </span>
                        </div>
                        <div className="space-x-2">
                            <Button variant={'outline'}
                                onClick={() => onCopy(phoneNumber)}
                                size={'sm'}
                            >
                                <CopyIcon />
                                복사
                            </Button>
                            <a href={`tel:${phoneNumber}`}>
                                <Button variant={'outline'} size={'sm'}>
                                    <PhoneIcon />
                                    전화
                                </Button>
                            </a>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex gap-1">
                        {['Wait', 'Approve'].includes(status) && <Button className="flex-1" variant={'secondary'}
                            onClick={() => onReject(id)}
                            disabled={isRejecting}
                        >
                            거절
                        </Button>}
                        {['Wait', 'Reject'].includes(status) && <Button className="flex-1"
                            onClick={() => onApprove(id)}
                            disabled={isApproving}>
                            승인
                        </Button>}
                    </div>
                </CardFooter>
            </Card>
        })}
    </div >
}