export interface FlowListResponse {
    data:    Items[];
    message: string;
    status:  number;
}

export interface FlowListItems {
    attackType:   string;
    dstIp:        string;
    dstMac:       string;
    dstPort:      string;
    id:           string;
    label:        string;
    payload:      string;
    protocol:     string;
    responseTime: string;
    srcIp:        string;
    srcMac:       string;
    srcPort:      string;
    timestamp:    string;
}
