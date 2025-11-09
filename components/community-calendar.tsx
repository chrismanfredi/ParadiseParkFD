"use client";

import { useMemo, useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type EventDay = {
  date: string;
  label: string;
};

const scheduledEvents: EventDay[] = [
  { date: "2025-05-24", label: "Open House" },
  { date: "2025-06-01", label: "River Safety" },
  { date: "2025-06-12", label: "Community Parade" },
  { date: "2025-06-20", label: "Wildfire Drill" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function CommunityCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventDay>();
    for (const event of scheduledEvents) {
      map.set(event.date, event);
    }
    return map;
  }, []);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const weeks: Array<Array<number | null>> = [];
  let day = 1 - firstDayOfMonth;
  while (day <= daysInMonth) {
    const week: Array<number | null> = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }

  const handlePrev = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev - 1;
      if (newMonth < 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return newMonth;
    });
  };

  const handleNext = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev + 1;
      if (newMonth > 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return newMonth;
    });
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          onClick={handlePrev}
        >
          ←
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-500">Monthly view</p>
          <p className="text-xl font-semibold text-zinc-900">
            {monthNames[currentMonth]} {currentYear}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          onClick={handleNext}
        >
          →
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div key={dayName}>{dayName}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-[11px] sm:gap-2 sm:text-sm">
        {weeks.map((week, weekIndex) =>
          week.map((value, dayIndex) => {
            if (value === null) {
              return <div key={`${weekIndex}-${dayIndex}`} className="h-16 rounded-2xl bg-zinc-50" />;
            }
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(value).padStart(
              2,
              "0",
            )}`;
            const event = eventsByDay.get(dateString);
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`flex h-16 flex-col justify-between rounded-2xl border px-2 py-1 ${
                  event ? "border-rose-200 bg-rose-50" : "border-zinc-100 bg-zinc-50"
                }`}
              >
                <span className="text-xs font-semibold text-zinc-500">{value}</span>
                {event && <span className="text-[11px] font-semibold text-rose-600">{event.label}</span>}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
