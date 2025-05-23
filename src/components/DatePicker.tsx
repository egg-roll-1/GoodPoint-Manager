import { ko } from 'date-fns/locale';
import dayjs from "dayjs";
import { type FC } from "react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
    value: Date;
    onChange: (value?: Date) => void;
    disabled?: boolean
}

export const DatePicker: FC<Props> = ({ value, onChange, disabled }) => {

    return <Popover>
        <PopoverTrigger asChild disabled={disabled}>
            <Input
                placeholder="YYYY-MM-DD"
                value={`${dayjs(value).format('YYYY-MM-DD')}`}
            />
        </PopoverTrigger>
        <PopoverContent className="w-full">
            <div className="flex">
                <Calendar
                    locale={ko}
                    mode='single'
                    selected={value}
                    onSelect={onChange}
                    month={value}
                    onMonthChange={onChange}
                />
            </div>
        </PopoverContent>
    </Popover>
}