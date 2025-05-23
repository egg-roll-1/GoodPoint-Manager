import { padStart } from 'es-toolkit/compat';
import type { FC } from "react";
import { ScrollPicker } from "./ScrollPicker";
import { CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
    value: number;
    onChange: (value: number) => void;
    minuteUnit?: number;
    maxHour?: number;
    disabled?: boolean;
}

export const TimePicker: FC<Props> = ({ value, onChange, maxHour = 24, minuteUnit = 1, disabled }) => {

    const hour = Math.floor(value / 60);
    const minute = value % 60;
    const hourList = [...new Array(maxHour).keys()]
    const minuteList = [...new Array(60 / minuteUnit).keys()].map(x => x * minuteUnit)
    const timeString = `${padStart(`${hour}`, 2, '0')}:${padStart(`${minute}`, 2, '0')}`

    return <div>
        <Popover>
            <PopoverTrigger asChild disabled={disabled}>
                <Input value={timeString} />
            </PopoverTrigger>
            <PopoverContent>
                <CardHeader >
                    <div className="flex font-semibold text-sm">
                        <div className="flex-1 text-center">시간</div>
                        <div className="flex-1 text-center">분</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <ScrollPicker
                            list={hourList}
                            index={hour}
                            onChange={(h) => onChange(h * 60 + minute)}
                        />
                        <ScrollPicker
                            list={minuteList}
                            index={Math.floor(minute / minuteUnit)}
                            onChange={(m) => onChange(hour * 60 + m * minuteUnit)}
                        />
                    </div>
                </CardContent>
            </PopoverContent>
        </Popover>

    </div>
}