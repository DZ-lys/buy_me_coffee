"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Months = () => {
  const months = [
    { month: "January", val: "january" },
    { month: "February", val: "february" },
    { month: "March", val: "march" },
    { month: "April", val: "april" },
    { month: "May", val: "may" },
    { month: "June", val: "june" },
    { month: "July", val: "july" },
    { month: "August", val: "august" },
    { month: "September", val: "september" },
    { month: "October", val: "october" },
    { month: "November", val: "november" },
    { month: "December", val: "december" },
  ];

  return (
    <Select>
      <SelectTrigger className="w-40 ">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="h-40 overflow-y-auto ">
          {months.map((month, index) => {
            return (
              <SelectItem key={index} value={month.val}>
                {month.month}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const Years = () => {
  const years = [
    {
      year: 2025,
      val: "2025",
    },
    {
      year: 2026,
      val: "2026",
    },
    {
      year: 2027,
      val: "2027",
    },
    {
      year: 2028,
      val: "2028",
    },
    {
      year: 2029,
      val: "2029",
    },
    {
      year: 2030,
      val: "2030",
    },
    {
      year: 2031,
      val: "2031",
    },
    {
      year: 2032,
      val: "2032",
    },
    {
      year: 2033,
      val: "2033",
    },
    {
      year: 2034,
      val: "2034",
    },
    {
      year: 2035,
      val: "2035",
    },
    {
      year: 2036,
      val: "2036",
    },
    {
      year: 2037,
      val: "2037",
    },
  ];
  return (
    <Select>
      <SelectTrigger className="w-40 ">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="h-40 overflow-y-auto ">
          {years.map((year, index) => {
            return (
              <SelectItem key={index} value={year.val}>
                {year.year}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
