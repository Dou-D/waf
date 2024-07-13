export interface RadarResponse {
    data: RadarData;
    message: string;
    status: number;
}

export interface RadarData {
    series: Series[];
}

export interface Series {
    name: string;
    value: number[];
}