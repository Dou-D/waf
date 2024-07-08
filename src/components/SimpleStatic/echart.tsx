import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tabs, TabsProps, Table } from "antd";
import request from "@/utils/request";
import { Component } from "react";
import * as Echarts from "echarts";
export default class Dashboard extends Component {
  state = {
    value: 95,
    total: 0,
    newvisit: 0,
    pv: 0,
    platforms: [],
    devices: [],
    cities: [],
    gender: [],
    ages: [],
    columns: [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "数量",
        dataIndex: "value",
        key: "value",
      },
    ],
  };

  componentDidMount() {
    this.getData();
  }

  formatDate = (date: Date) => {
    let yyyy = String(date.getFullYear());
    let mm = String(
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + String(date.getMonth() + 1)
    );
    let dd = String(
      date.getDate() > 9 ? date.getDate() : "0" + String(date.getDate())
    );
    return yyyy + mm + dd;
  };

  async getData() {
    const yesterday = new Date();
    const lastmonth = new Date();
    const now = new Date().getTime(); // 获取当前时间戳
    yesterday.setTime(now - 1000 * 60 * 60 * 8 - 1000 * 60 * 60 * 24);
    lastmonth.setTime(now - 1000 * 60 * 60 * 8 - 1000 * 60 * 60 * 24 * 30);
    const format_yesterday = this.formatDate(yesterday);
    const format_lastmonth = this.formatDate(lastmonth);
    request
      .get(
        "/api/get_daily_summary?begin=" +
          format_yesterday +
          "&end=" +
          format_yesterday
      )
      .then((res) => {
        this.setState({ total: res.data.data.list[0].visit_total });
      });
    request
      .get(
        "/api/get_daily_visit_trend?begin=" +
          format_yesterday +
          "&end=" +
          format_yesterday
      )
      .then((res) => {
        this.setState({ newvisit: res.data.data.list[0].visit_uv_new });
        this.setState({ pv: res.data.data.list[0].visit_uv });
      });
    await request
      .get(
        "/api/get_user_portrait?begin=" +
          format_lastmonth +
          "&end=" +
          format_yesterday
      )
      .then((res) => {
        this.setState({ platforms: res.data.data.visit_uv.platforms });
        this.setState({ devices: res.data.data.visit_uv.devices });
        this.setState({ cities: res.data.data.visit_uv.city });
        this.state.cities = res.data.data.visit_uv.city;
        this.setState({ gender: res.data.data.visit_uv.genders });
        this.setState({ ages: res.data.data.visit_uv.ages });
      });
    this.drawMap();
  }
  drawMap() {
    const myChart = Echarts.init(document.getElementById("liaoning-map"));
    let name = "Liaoning";
    Echarts.registerMap(name, require("@/assets/liaoning.json"));
    let option = {
      backgroundColor: "#fff",
      title: {
        top: 10,
        text: "",
        subtext: "30天访问来源地区",
        x: "left",
        textStyle: {
          color: "#000",
        },
      },
      tooltip: {
        show: true,
        trigger: "item",
        //设置显示内容
        formatter(params: { name: any; value: any }) {
          return `地区：${params.name}</br>数值：${params.value}`;
        },
      },
      geo: {
        type: "map",
        map: name,
        roam: true,
        scaleLimit: {
          min: 1,
          max: 2,
        },
        zoom: 1.1, //地图的比例
        label: {
          normal: {
            show: false,
            fontSize: "14",
            color: "rgba(0,0,0,0.7)",
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#000000",
            },
          },
        },
        itemStyle: {
          normal: {
            //shadowBlur: 50,
            //shadowColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: "rgba(0, 0, 0, 0.2)",
            areaColor: "#aaaaaa",
          },
          emphasis: {
            areaColor: "rgba(63, 134, 0,0.2)",
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
            label: ">500",
            color: "#9feaa5",
          },
          {
            gte: 100,
            lt: 500,
            label: "100 - 499",
            color: "#74e2ca",
          },
          {
            gte: 10,
            lt: 100,
            label: "10 - 99",
            color: "#85daef",
          },
          {
            lt: 10,
            label: "<10",
            color: "#bfe5da",
          },
        ],
      },

      series: [
        {
          name: "人数",
          type: "map",
          geoIndex: 0,
          data: this.state.cities,
        },
      ],
    };
    myChart.setOption(option, true);
  }

  render() {
    const items: TabsProps["items"] = [
      {
        key: "platforms",
        label: "平台",
        children: (
          <Table
            dataSource={this.state.platforms}
            columns={this.state.columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 180 }}
          />
        ),
      },
      {
        key: "devices",
        label: "设备",
        children: (
          <Table
            dataSource={this.state.devices}
            columns={this.state.columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 180 }}
          />
        ),
      },
    ];
    const items2: TabsProps["items"] = [
      {
        key: "gender",
        label: "性别",
        children: (
          <Table
            dataSource={this.state.gender}
            columns={this.state.columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 180 }}
          />
        ),
      },
      {
        key: "ages",
        label: "年龄",
        children: (
          <Table
            dataSource={this.state.ages}
            columns={this.state.columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 180 }}
          />
        ),
      },
    ];
    return (
      <>
        <Row gutter={[16, 24]}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="匹配率"
                value={this.state.value}
                precision={2}
                valueStyle={
                  this.state.value > 70
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="累计用户数"
                value={this.state.total}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="新用户数"
                value={this.state.newvisit}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="昨日浏览量"
                value={this.state.pv}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <div
                id="liaoning-map"
                style={{ height: "350px", width: "100%" }}
              ></div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} style={{ height: "400px" }}>
              <Tabs defaultActiveKey="platforms" items={items} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} style={{ height: "400px" }}>
              <Tabs defaultActiveKey="gender" items={items2} />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
