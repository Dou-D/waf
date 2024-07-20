import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import request from 'umi-request';
import { Button, Drawer, DrawerProps } from 'antd';
import { history } from 'umi'
const Attack: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [attackData, setAttackData] = useState<Attack.AttackItems[]>([]);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');
    const [currentAttack, setCurrentAttack] = useState<Attack.AttackItems | null>(null);
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    useEffect(() => {
        request('/api/attackList', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res: Attack.AttackResponse) => {
            setAttackData(res.data);
        });
    }, []);

    useEffect(() => {
        if (chartRef.current && attackData.length > 0) {
            const myChart = echarts.init(chartRef.current);

            // 使用 Map 以确保唯一的节点并合并相关信息
            const nodeMap: Map<string, any> = new Map();

            attackData.forEach(item => {
                if (!nodeMap.has(item.srcIp)) {
                    nodeMap.set(item.srcIp, {
                        name: item.srcIp,
                        x: Math.random() * 800,
                        y: Math.random() * 600,
                        attackType: item.attackType,
                        dstIp: item.dstIp,
                        dstMac: item.dstMac,
                        dstPort: item.dstPort,
                        httpPayload: item.httpPayload,
                        label: item.label,
                        payload: item.payload,
                        pocId: item.pocId,
                        protocol: item.protocol,
                        srcIp: item.srcIp,
                        srcMac: item.srcMac,
                        srcPort: item.srcPort,
                        time: item.time,
                        timestamp: item.timestamp,
                    });
                }

                if (!nodeMap.has(item.dstIp)) {
                    nodeMap.set(item.dstIp, {
                        name: item.dstIp,
                        x: Math.random() * 800,
                        y: Math.random() * 600,
                        attackType: item.attackType,
                        dstIp: item.dstIp,
                        dstMac: item.dstMac,
                        dstPort: item.dstPort,
                        httpPayload: item.httpPayload,
                        label: item.label,
                        payload: item.payload,
                        pocId: item.pocId,
                        protocol: item.protocol,
                        srcIp: item.srcIp,
                        srcMac: item.srcMac,
                        srcPort: item.srcPort,
                        time: item.time,
                        timestamp: item.timestamp,
                    });
                }
            });

            const nodes = Array.from(nodeMap.values());

            const links = attackData.map(item => ({
                source: item.srcIp,
                target: item.dstIp,
            }));

            const option = {
                title: {
                    text: 'Attack Graph',
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            show: true,
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            fontSize: 20,
                        },
                        data: nodes,
                        links: links,
                        lineStyle: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0,
                        },
                    },
                ],
            };

            myChart.setOption(option);

            const handleResize = () => {
                myChart.resize();
            };

            myChart.on('click', function (params) {
                const data = params.data as Attack.AttackItems
                setCurrentAttack(data);
                showDrawer()
            });

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                myChart.dispose();
            };
        }
    }, [attackData]);

    return (
        <>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
            <Drawer
                title={currentAttack?.label}
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <p>来源IP:{currentAttack?.srcIp}</p>
                <p>来源MAC:{currentAttack?.srcMac}</p>
                <p>目的IP:{currentAttack?.dstIp}</p>
                <p>目的MAC:{currentAttack?.dstMac}</p>
                <p>攻击类型:{currentAttack?.attackType}</p>
                <p>时间:{currentAttack?.time}</p>
                <p>时间戳:{currentAttack?.timestamp}</p>
                <p>来源端口:{currentAttack?.srcPort}</p>
                <p>目的端口:{currentAttack?.dstPort}</p>
                <p>协议:{currentAttack?.protocol}</p>
                <p>载荷:{currentAttack?.payload}</p>
                <p>pocID:{currentAttack?.pocId}</p>
                <p>HTTP Payload:{currentAttack?.httpPayload}</p>
                <Button color='primary' onClick={() => history.push('/attack/description?pocId=' + currentAttack?.pocId)}>查看详情</Button>
            </Drawer>
        </>
    )
};

export default Attack;
