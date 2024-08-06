import { FlagResponse } from '@/common/FlagResponse';
import { AttackPath, Assets } from '@/components/Attack';
import { Col, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import request from 'umi-request';

const Attack: React.FC = () => {
  const [value, setValue] = useState(1);
  const [uploadState, setUploadState] = useState<boolean>();
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    request<FlagResponse>('/api/flag', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      setUploadState(res.data);
    });
  });
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
        <Col span={24}>
          {value === 1 ? <>{uploadState && <AttackPath />}</> : <>{uploadState && <Assets />}</>}
        </Col>
      </Row>
    </>
  );
};

export default Attack;
