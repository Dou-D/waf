declare namespace Attack {
    export interface AttackResponse {
        data:    AttackItems[];
        message: string;
        status:  number;
        [property: string]: any;
    }
    
    export interface AttackItems {
        attackType:  string;
        dstIp:       string;
        dstMac:      string;
        dstPort:     string;
        httpPayload: string;
        id:          string;
        label:       string;
        payload:     string;
        pocId:       string;
        protocol:    string;
        srcIp:       string;
        srcMac:      string;
        srcPort:     string;
        time:        string;
        timestamp:   number;
        [property: string]: any;
    }
}