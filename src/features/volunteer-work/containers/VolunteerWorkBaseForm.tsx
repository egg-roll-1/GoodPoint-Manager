import { DatePicker } from "@/components/DatePicker";
import { DayPicker } from "@/components/DayPicker";
import { TimePicker } from "@/components/TimePicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { KSTDate } from "@/lib/date";
import { replace } from "es-toolkit/compat";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PostVolunteerWorkRequest } from "../model/volunteer-work.request";

type Props = {
    form: UseFormReturn<PostVolunteerWorkRequest>,
}

export const VolunteerWorkBaseForm: FC<Props> = ({ form }) => {

    return <>
        <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>봉사활동 제목</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Separator />

        <FormField
            control={form.control}
            name='recruitPeopleCount'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>모집인원</FormLabel>
                    <FormControl>
                        <Input
                            inputMode="numeric"
                            {...field}
                            onChange={(e) => field.onChange(replace(e.target.value, /[^0-9]/g, ''))}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <div className="space-y-5">
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name='recruitStartDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="">모집시작일</FormLabel>
                            <DatePicker
                                disabled={field.disabled}
                                value={form.getValues('recruitStartDate')!}
                                onChange={(date) => {
                                    if (!date) return;
                                    form.setValue('recruitStartDate', date ?? undefined);

                                    const endDate = form.getValues('recruitEndDate');
                                    if (endDate && date > endDate) {
                                        form.setValue('recruitEndDate', KSTDate(date).add(7, 'day').toDate());
                                    }
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='recruitEndDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>모집종료일</FormLabel>
                            <DatePicker
                                value={form.getValues('recruitEndDate')!}
                                disabled={field.disabled}
                                onChange={(date) => {
                                    if (!date) return;
                                    form.setValue('recruitEndDate', date ?? undefined);

                                    const startDate = form.getValues('recruitStartDate');
                                    if (startDate && startDate > date) {
                                        form.setValue('recruitStartDate', KSTDate(date).subtract(7, 'day').toDate());
                                    }
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        <Separator />
        <div className="space-y-3">
            <div className="space-y-5">
                <FormField
                    control={form.control}
                    name='startDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>활동시작일</FormLabel>
                            <DatePicker
                                disabled={field.disabled}
                                value={form.getValues('startDate')!}
                                onChange={(date) => {
                                    if (!date) return;
                                    form.setValue('startDate', date ?? undefined);

                                    const endDate = form.getValues('endDate');
                                    if (endDate && date > endDate) {
                                        form.setValue('endDate', KSTDate(date).add(7, 'day').toDate());
                                    }
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='endDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>활동종료일</FormLabel>
                            <DatePicker
                                disabled={field.disabled}
                                value={form.getValues('endDate')!}
                                onChange={(date) => {
                                    if (!date) return;
                                    form.setValue('endDate', date ?? undefined);

                                    const startDate = form.getValues('startDate');
                                    if (startDate && startDate > date) {
                                        form.setValue('startDate', KSTDate(date).subtract(7, 'day').toDate());
                                    }
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='dayOfWeek'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>활동요일</FormLabel>
                            <DayPicker
                                disabled={field.disabled}
                                value={form.getValues('dayOfWeek') ?? []}
                                onChange={(value) => {
                                    form.setValue('dayOfWeek', value);
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='startMinute'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>시작시간</FormLabel>
                            <TimePicker
                                disabled={field.disabled}
                                value={field.value ?? 0}
                                minuteUnit={10}
                                onChange={(startMinute) => {
                                    const endMinute = form.getValues('endMinute')

                                    if (!endMinute || startMinute <= endMinute) {
                                        field.onChange(startMinute);
                                        return;
                                    }

                                    field.onChange(startMinute);
                                    form.setValue('endMinute', startMinute);
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='endMinute'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>종료시간</FormLabel>
                            <TimePicker
                                disabled={field.disabled}
                                value={field.value ?? 0}
                                minuteUnit={10}
                                onChange={(endMinute) => {
                                    const startMinute = form.getValues('startMinute')

                                    if (!startMinute || startMinute <= endMinute) {
                                        field.onChange(endMinute);
                                        return;
                                    }

                                    field.onChange(endMinute);
                                    form.setValue('startMinute', endMinute);
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        <Separator />
        <FormField
            control={form.control}
            name='workAddress'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>활동장소 주소</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name='workPlace'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>활동 장소</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name='notice'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>공지사항</FormLabel>
                    <FormControl>
                        <Textarea
                            maxLength={1000}
                            rows={200}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
}