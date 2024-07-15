export interface FormType {
  path?: string;
  secretKey?: string;
  checkArray?: string[];
  radio?: string;
}

export type RadioKey = 'dingding' | "feishu" | "weixin"