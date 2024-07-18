declare namespace AttackPath {
  interface AttackPathResponse {
    data: AttackPathItems[];
    message: string;
    status: number;
    [property: string]: any;
  }

  interface AttackPathItems {
    content?: string;
    dstIp?: string;
    from?: string;
    id?: string;
    srcIp?: string;
    [property: string]: any;
  }
}
