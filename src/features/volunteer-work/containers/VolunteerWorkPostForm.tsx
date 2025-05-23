import { Form } from "@/components/ui/form";
import { KSTDate } from "@/lib/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type FC, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { PostVolunteerWorkForm, type PostVolunteerWorkRequest } from "../model/volunteer-work.request";
import { VolunteerWorkBaseForm } from "./VolunteerWorkBaseForm";

type Props = {
    onSubmit: (request: PostVolunteerWorkRequest) => void;
}

export const VolunteerWorkPostForm: FC<Props> = ({ onSubmit }) => {

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

    const _onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        onSubmit(form.getValues())
    }, [form, onSubmit])

    return <Form {...form}>
        <form className="space-y-5 p-2" onSubmit={_onSubmit}>
            <VolunteerWorkBaseForm form={form} />
        </form>
    </Form>

}