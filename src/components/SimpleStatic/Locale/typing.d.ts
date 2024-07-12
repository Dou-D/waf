export interface LocaleResponse {
  data: Data;
  message: string;
  status: number;
  [property: string]: any;
}

export interface Data {
  locale: LocaleType;
  [property: string]: any;
}

type LegendType = {
  data: string[];
};
type TitleType = {
  text: string;
};
type XAxisType = {
  data: string[];
};
export interface LocaleType {
  legend: LegendType;
  series: Series;
  title: TitleType;
  xAxisData: string[];
  toolbox?: any;
  tooltip?: any;
  yAxis?: any;
}

export interface Series {
  data: number[];
  name: string;
  type: string;
  label?: any;
  [property: string]: any;
}
