export interface Statistic {
    title?: string;
    tip?: string;
    value?: number | string | '-';
    status?: success | processing | error | warning | default;
}