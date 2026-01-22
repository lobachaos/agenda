export type TimeValue = {
    hour: number;    // 0–23
    minute: number;  // 0–59
};

export type DateValue = {
    day: number;     // 1–31
    month: number;   // 1–12
    year: number;    // YYYY
};

export type TimeSelectOption = {
    value: TimeValue;
    label: string;
};

export type DateSelectOption = {
    value: DateValue;
    label: string;  // Formato: d/M/Y (ex: "22/1/2026")
};
