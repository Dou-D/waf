declare namespace Menace {
  export interface MenaceResponse {
    data: MenaceData;
    message: string;
    status: number;
  }

  export interface MenaceData {
    list: MenaceItems[];
    total: number;
  }

  export interface MenaceItems {
    id: string;
    info: string;
    md5: string;
    src: string;
    time: string;
    title: string;
    url: string;
  }
}
