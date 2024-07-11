import { Card, Col, Row, Statistic } from 'antd';
import { Component } from 'react';
import * as Echarts from 'echarts';
import liaoningJson from '@/assets/liaoning.json';

export default class Dashboard extends Component {
  state = {
    value: 95,
    total: 1000,
    newvisit: 50,
    pv: 200,
    cities: [
      { name: '沈阳', value: 500 },
      { name: '大连', value: 300 },
      { name: '鞍山', value: 100 },
    ],
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '数量',
        dataIndex: 'value',
        key: 'value',
      },
    ],
  };

  componentDidMount() {
    this.getData();
  }

  formatDate = (date) => {
    let yyyy = String(date.getFullYear());
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');
    return yyyy + mm + dd;
  };

  async getData() {
    this.drawMap();
  }

  drawMap() {
    const myChart = Echarts.init(document.getElementById('liaoning-map'));
    let name = 'Liaoning';
    Echarts.registerMap(name, liaoningJson);
    let option = {
      backgroundColor: '#fff',
      title: {
        top: 10,
        text: '',
        subtext: '30天访问来源地区',
        x: 'left',
        textStyle: {
          color: '#000',
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter(params) {
          return `地区：${params.name}</br>数值：${params.value}`;
        },
      },
      geo: {
        type: 'map',
        map: name,
        roam: true,
        scaleLimit: {
          min: 1,
          max: 2,
        },
        zoom: 1.1,
        label: {
          normal: {
            show: false,
            fontSize: '14',
            color: 'rgba(0,0,0,0.7)',
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#000000',
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            areaColor: '#aaaaaa',
          },
          emphasis: {
            areaColor: 'rgba(63, 134, 0,0.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0,
          },
        },
      },
      visualMap: {
        show: true,
        left: 26,
        bottom: 40,
        showLabel: true,
        pieces: [
          {
            gte: 500,
            label: '>500',
            color: '#9feaa5',
          },
          {
            gte: 100,
            lt: 500,
            label: '100 - 499',
            color: '#74e2ca',
          },
          {
            gte: 10,
            lt: 100,
            label: '10 - 99',
            color: '#85daef',
          },
          {
            lt: 10,
            label: '<10',
            color: '#bfe5da',
          },
        ],
      },
      series: [
        {
          name: '人数',
          type: 'map',
          geoIndex: 0,
          data: this.state.cities,
        },
      ],
    };
    myChart.setOption(option, true);
  }

  render() {
    return (
      <>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="匹配率"
                value={this.state.value}
                precision={2}
                valueStyle={this.state.value > 70 ? { color: '#3f8600' } : { color: '#cf1322' }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="累计用户数"
                value={this.state.total}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="新用户数"
                value={this.state.newvisit}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="昨日浏览量"
                value={this.state.pv}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <div id="liaoning-map" style={{ height: '350px', width: '100%' }}></div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
