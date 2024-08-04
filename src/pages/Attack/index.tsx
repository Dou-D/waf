
import { AttackPath, Assets } from '@/components/Attack';
import { Col, notification, Radio, RadioChangeEvent, Row, Space, } from 'antd';
import { useState } from 'react';
import { FileUpload } from 'primereact/fileupload'


const Attack: React.FC = () => {
    const [value, setValue] = useState(1);
    const [upload, setUpload] = useState(false);
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const [api, contextHolder] = notification.useNotification();

    const onUpload = () => {
        setUpload(true)
        api.info({
            message: '上传成功',
            description: '上传成功',
            placement: 'topRight',
        })
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
                    <FileUpload mode="basic" name="demo[]" accept="pcap/*" maxFileSize={1000000} onUpload={onUpload} chooseLabel="上传文件" />
                    <AttackPath props={upload} />
                </> : <Assets />}</Col>
            </Row>
        </>
    )
};

export default Attack;
