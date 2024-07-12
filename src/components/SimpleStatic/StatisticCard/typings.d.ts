export interface Statistic {
    title?: string;
    tip?: string;
    value?: number | '-';
    status?: success | processing | error | warning | default;
}