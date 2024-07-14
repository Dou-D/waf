export interface RadarResponse {
    data: RadarData;
    message: string;
    status: number;
}

export interface RadarData {
    series: Items[];
}

export interface Items {
    name: string;
    value: number[];
}