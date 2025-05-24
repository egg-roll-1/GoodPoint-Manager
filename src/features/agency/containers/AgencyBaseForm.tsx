import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PostAgencyRequest } from "../model/agency.request";

type Props = {
    form: UseFormReturn<PostAgencyRequest>,
}

export const AgencyBaseForm: FC<Props> = ({ form }) => {

    return <>
        <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>봉사기관명</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name='nationAgency'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>지차체명</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
}