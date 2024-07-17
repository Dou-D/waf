import { FireTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons';
import {
    Row,
    Col,
    Card,
    Select,
    Space,
    Button,
    Radio,
    RadioChangeEvent,
    FormProps,
    Form,
    Input,
    Checkbox,
    GetProp,
    message,
} from 'antd';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
const onCertificateChange = (value: string) => {
    // message.success("设置成功");
};
const onEngineChange = (value: string) => {
    // message.success("设置成功");
}
const handleChangeCertificate = () => {
    message.success("设置成功");
}
const handleChangeEngine = () => {
    message.success("设置成功");
}
const onFinish: FormProps<PageSetting.FormType>['onFinish'] = (values) => {
    console.log('Success:', values);
    message.success("设置成功");
};
const handleCheck: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
};
const options = [
    { label: '攻击检测告警', value: 'attack' },
    { label: '频率限制告警', value: 'frequency' },
];
const radioOptions = [
    { label: '钉钉', value: 'dingding' },
    { label: '飞书', value: 'feishu' },
    { label: '企业微信', value: 'weixin' },
]
function hashBrowserVersion(): string {
    const version = navigator.userAgent;
    const hash = CryptoJS.SHA256(version);
    return hash.toString(CryptoJS.enc.Hex);
}
export default () => {
    const [checkValue, setCheckValue] = useState<PageSetting.RadioKey>("dingding");
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setCheckValue(e.target.value);
    };
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="控制台证书">
                        <Space wrap>
                            <SafetyCertificateTwoTone />
                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}
                                onChange={onCertificateChange}
                                options={[
                                    { value: '1', label: '(ID:1)通配所有域名)' },
                                    { value: '2', label: 'demo.waf.com(R2)' },
                                    { value: '3', label: 'demo.waf.com(R3)' },
                                    { value: '4', label: 'demo.waf.com(R4)' },
                                ]}
                            />
                            <Button type="primary" onClick={handleChangeCertificate}>保存</Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="检测引擎性能模式">
                        <Space wrap>
                            <FireTwoTone />
                            <Select
                                defaultValue="1"
                                style={{ width: 220 }}
                                onChange={onEngineChange}
                                options={[
                                    { value: '1', label: '单线程模式：消耗算力小' },
                                    { value: '2', label: '均衡模式： 消耗设备算力中等' },
                                    { value: '3', label: '多线程模式：消耗算力大' },
                                ]}
                            />
                            <Button type="primary" onClick={handleChangeEngine}>保存</Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="攻击告警">
                        <div>
                            <Space wrap>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 3 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ minWidth: 1000 }}
                                    initialValues={{ remember: true, radio: radioOptions[0].value }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item<PageSetting.FormType> name="radio">
                                        <Radio.Group onChange={onChange} value={checkValue} >
                                            {radioOptions.map((item) => {
                                                return <Radio key={item.value} value={item.value}>{item.label}</Radio>
                                            })}
                                        </Radio.Group>
                                    </Form.Item>
                                    {checkValue === "dingding" && <>
                                        <Form.Item<PageSetting.FormType> label="Webhook地址：" name="path" rules={[
                                            { required: true, message: '请输入Webhook地址' },
                                        ]}>
                                            <Input placeholder="https://oapi.xxx.com/robot/send?access_token=xxxxxxx" />
                                        </Form.Item>
                                        <Form.Item<PageSetting.FormType> label="加密密钥：" name="secretKey">
                                            <Input placeholder="留空表示不加签" />
                                        </Form.Item>
                                    </>}
                                    {(checkValue === "feishu" || checkValue === "weixin") && <>
                                        <Form.Item<PageSetting.FormType> label="Webhook地址：" name="path" rules={[
                                            { required: true, message: '请输入Webhook地址' },
                                        ]} >
                                            <Input placeholder="https://oapi.xxx.com/robot/send?access_token=xxxxxxx" />
                                        </Form.Item>
                                    </>}
                                    <Form.Item<PageSetting.FormType> wrapperCol={{ span: 16 }} name={"checkArray"}>
                                        <Checkbox.Group options={options} onChange={handleCheck} />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Space>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="系统信息">
                        <div>
                            <Row gutter={[8, 8]}>
                                <Col span={6}>版本号：</Col>
                                <Col span={18}>1.0.0</Col>
                            </Row>
                        </div>
                        <div>
                            <Row gutter={[8, 8]}>
                                <Col span={6}>设备机器码：</Col>
                                <Col span={18}>{hashBrowserVersion()}</Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

