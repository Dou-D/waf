
import { AttackPath, Assets } from '@/components/Attack';
import { Col, Radio, RadioChangeEvent, Row, Space, } from 'antd';
import { useState } from 'react';


const Attack: React.FC = () => {
    const [value, setValue] = useState(1);
    const [upload, setUpload] = useState(false);
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    return (
        <>
            <Row gutter={24}>
                <Col span={12}>
                    <Space>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="horizontal">
                                <Radio value={1}>攻击路径</Radio>
                                <Radio value={2}>资产</Radio>
                            </Space>
                        </Radio.Group>
                    </Space>
                </Col>
            </Row>

            <Row>
                <Col span={24}>{value === 1 ? <>
                    <AttackPath />
                </> : <Assets />}</Col>
            </Row>
        </>
    )
};

export default Attack;
