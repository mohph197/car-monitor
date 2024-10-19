'use client';

import { Calendar as CalendarIcon } from '@mynaui/icons-react';
import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { MetricFilterContext } from '@/context/MetricFilterContext';

export default function DatePicker() {
    const { dateRange, setDateRange } = useContext(MetricFilterContext);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full justify-between font-normal',
                        !dateRange && 'text-muted-foreground'
                    )}
                >
                    {dateRange && dateRange.from && dateRange.to ? (
                        `${format(dateRange.from, 'PPP')} -
                        ${format(dateRange.to, 'PPP')}`
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                />
            </PopoverContent>
        </Popover>
    );
}
