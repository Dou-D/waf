export type ToolBarType = "正常" | "可疑" | "攻击"

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

export interface Data {
    success: boolean;
    data: GithubIssueItem[]
    total: number;
}