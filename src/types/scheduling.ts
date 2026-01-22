export type TimeValue = {
    hour: number;    // 0–23
    minute: number;  // 0–59
};

export type TimeSelectOption = {
    value: TimeValue;
    label: string;        // "14:30"
};