import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComposeOption } from 'echarts/core';
import { BarSeriesOption, GraphSeriesOption, TitleComponentOption, TooltipComponentOption } from 'echarts';
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';

type ECOption = ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | XAXisOption
    | YAXisOption
    | GraphSeriesOption
>;

const getOption = (data: Know.ListItems | null): ECOption => {
    if (!data) {
        return {};
    }
    return {
        title: {
            text: data.name,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                if (params.data.name === data.name) {
                    return `
                      名称: ${data.name}<br />
                      端口: ${data.port}<br />
                      协议: ${data.protocol}<br />
                      请求体: ${data.requestBody}<br />
                      请求头: ${data.responseHeader}<br />
                      响应体: ${data.responseBody}<br />
                      类型: ${data.type}<br />
                      时间: ${data.CreatedAt}<br />
                    `;
                }
                // 否则显示节点名称
                return params.data.name;
            },
        },
        series: [
            {
                type: 'graph',
                layout: 'none', // 不使用自动布局
                data: [
                    {
                        name: data.name,
                        label: {
                            show: true,
                            formatter: "name",
                            position: 'inside'
                        },
                        x: 300, y: 200, symbolSize: 100, itemStyle: { color: '#009688' }
                    }, // 中间节点
                    { name: data.requestMethod || 'GET', x: 100, y: 200, symbolSize: 50, itemStyle: { color: "#A6E22E" } },
                    { name: data.responseStatus || '200', x: 500, y: 200, symbolSize: 50, itemStyle: { color: "#E0D365" } },
                    { name: data.requestUrl || `/know?name=${data.name}`, x: 700, y: 200, symbolSize: 50 },
                ],
                links: [
                    { source: data.name, target: data.requestMethod || 'GET', label: { show: true, formatter: '请求方法' }, lineStyle: { color: "target" } },
                    { source: data.name, target: data.responseStatus || '200', label: { show: true, formatter: '状态码', position: "insideMiddleBottom" }, lineStyle: { color: 'target' } },
                    { source: data.name, target: data.requestUrl || `/know?name=${data.name}`, label: { show: true, formatter: '请求 URL' }, lineStyle: { color: 'target', } },
                ],
                emphasis: {
                    focus: 'adjacency',
                },
                roam: true,
                label: {
                    show: true,
                    position: 'bottom',
                    formatter: '{b}',
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.4,
                },
            },
        ],
    };
};

export const KnowEcharts: React.FC<{ data: Know.ListItems | null }> = ({ data }) => {
    return <ReactECharts key={data?.ID} option={getOption(data)} />;
};
