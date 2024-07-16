/**
 * 普通日志
 */
export interface CommonResponse {
    data:    CommonData;
    message: string;
    status:  number;
}
export interface CommonData {
    logs: FlowItems[];
    total: number;
}
export interface FlowItems {
    code?:   number;
    id?:     string;
    ip?:     string;
    method?: string;
    time?:   string;
    url?:    string;
}
/**
 * 手动日志
 */
export interface ManualResponse {
    data: ManualData;
    message: string;
    status: number;
}
export interface ManualData {
    logs: ManualItems[];
    total: number;
}
export interface ManualItems {
    action?: string;
    id?: string;
    judgmentType?: string;
    operationID?: string;
    timestamp?: number;
}

/**
 * ban_ip日志
 */
export interface BanIpResponse {
    data: BanIpData;
    message: string;
    status: number;
}
export interface BanIpData {
    logs: BanIpItems[];
    total: number;
}
export interface BanIpItems {
    id?: string;
    operationID?: string;
    targetIP?: string;
    time?: string;
}
