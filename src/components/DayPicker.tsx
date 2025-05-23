import { dayOfWeek2Title, DayOfWeekList, type DayOfWeek } from "@/features/common/day";
import type { FC } from "react";
import { Button } from "./ui/button";

type Props = {
    value: DayOfWeek[],
    onChange: (value: DayOfWeek[]) => void;
    disabled?: boolean
}

export const DayPicker: FC<Props> = ({ value, onChange, disabled }) => {

    return <div className="flex justify-around">
        {DayOfWeekList.map(day => {
            const has = value.includes(day);
            return <Button
                type="button"
                key={day}
                variant={has ? 'default' : 'secondary'}
                className="rounded-full"
                onClick={() => {
                    if (disabled) return;
                    onChange(
                        has
                            ? value.filter(x => x !== day)
                            : [...value, day]
                    )
                }}

            >
                {dayOfWeek2Title[day]}
            </Button>
        })}
    </div>
}