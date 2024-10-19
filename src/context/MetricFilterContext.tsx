'use client';

import { createContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

type MetricFilterContextType = {
    dateRange?: DateRange;
    setDateRange: (dateRange?: DateRange) => void;
};

export const MetricFilterContext = createContext<MetricFilterContextType>({
    dateRange: undefined,
    setDateRange: () => {},
});

export function MetricFilterProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [dateRange, setDateRange] = useState<DateRange>();

    return (
        <MetricFilterContext.Provider value={{ dateRange, setDateRange }}>
            {children}
        </MetricFilterContext.Provider>
    );
}
