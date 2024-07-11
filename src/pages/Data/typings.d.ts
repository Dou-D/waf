export type ToolBarType = "正常流量" | "可疑流量" | "攻击流量"

type GithubIssueItem = {
    id: string;
    srcMac: string;
    dstMac: string;
    srcIp: string;
    dstIp: string;
    srcPort: string;
    dstPort: string;
    protocol: string;
    payload: string;
    timestamp: string;
    label: string;
    attckType: string;
}

type LabelColor = "error" | "success" | "warning"