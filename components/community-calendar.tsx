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

const staticEvents: EventDay[] = [];
const ICE_CREAM_LABEL = "Thursday Ice Cream Social";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function CommunityCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventDay>();
    for (const event of staticEvents) {
      map.set(event.date, event);
    }
    // Add weekly ice cream socials on Thursdays.
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (date.getDay() === 4) {
        const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        map.set(key, { date: key, label: ICE_CREAM_LABEL });
      }
    }
    return map;
  }, [currentMonth, currentYear]);

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
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
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
      <div className="mt-2 hidden grid-cols-7 gap-[2px] text-[10px] lg:grid sm:gap-2 sm:text-sm">
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
                className={`flex h-16 flex-col justify-between rounded-xl border px-1 py-1 sm:rounded-2xl sm:px-2 ${
                  event ? "border-emerald-200 bg-emerald-50" : "border-zinc-100 bg-zinc-50"
                }`}
              >
                <span className="text-[10px] font-semibold text-zinc-500 sm:text-xs">{value}</span>
                {event && (
                  <div className="flex flex-col text-[11px] font-semibold text-emerald-700">
                    <span>{event.label}</span>
                    <span className="text-[10px] font-medium text-emerald-600 sm:text-xs md:text-sm">4:00 PM</span>
                    <span className="text-[10px] font-medium text-emerald-500 sm:text-xs md:text-sm">Bingo Hall</span>
                  </div>
                )}
              </div>
            );
          }),
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 text-sm lg:hidden">
        {Array.from(eventsByDay.values()).map((event) => {
          const displayDate = new Date(`${event.date}T12:00:00`);
          const dayStamp = displayDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
          return (
            <div key={event.date} className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Thursday · {dayStamp}
              </p>
              <p className="text-base font-semibold text-emerald-900">{ICE_CREAM_LABEL}</p>
              <p className="text-xs font-medium text-emerald-800 sm:text-sm">4:00 PM · Bingo Hall</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
