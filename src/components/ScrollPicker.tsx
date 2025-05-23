import { memo, useEffect, useRef, type FC } from "react";

interface ScrollPickerProps {
    list: (string | number)[];
    index: number;
    onChange: (index: number) => void;
}

export const ScrollPicker: FC<ScrollPickerProps> = memo(({ list, index, onChange }) => {
    index = index + 1;
    const SCROLL_DEBOUNCE_TIME = 100;

    const newList = ["", ...list, ""];
    const ref = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ITEM_HEIGHT = 50;

    const handleScroll = () => {
        if (ref.current) {
            clearTimeout(timerRef.current!);
            if (ref.current.scrollTop < ITEM_HEIGHT) {
                ref.current.scrollTop = ITEM_HEIGHT;
            }
            timerRef.current = setTimeout(() => {
                const adjustedIndex = Math.floor((ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
                if (list[adjustedIndex] !== "" && adjustedIndex !== index) {
                    onChange(adjustedIndex - 1);
                    itemRefs.current[adjustedIndex - 1]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }, SCROLL_DEBOUNCE_TIME);
        }
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = index * ITEM_HEIGHT;
        }
    }, [index]);

    const setRef = (i: number) => (el: HTMLLIElement) => {
        itemRefs.current[i] = el;
    };

    return (
        <ul
            className="relative m-0 p-0 overflow-x-hidden overflow-y-scroll w-full h-[150px]"
            ref={ref}
            onScroll={handleScroll}
        >
            <div className="border-box border-t border-b h-12 sticky top-12"></div>
            {newList.map((item, i) => (
                <li
                    className={`flex cursor-pointer items-center justify-center ${i === index ? "font-bold" : "opacity-40"}`}
                    key={i}
                    ref={setRef(i)}
                    onClick={() => {
                        ref.current?.scroll({ top: ITEM_HEIGHT * i });
                    }}
                    style={{ height: `${ITEM_HEIGHT}px` }}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
});

ScrollPicker.displayName = 'ScrollPicker'
