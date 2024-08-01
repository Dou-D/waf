import { Card } from "antd"
import { memo, useEffect, useState } from "react"
import { useLocation } from 'umi'
import request from "umi-request"


const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
  };
const Description: React.FC = () => {
    const data = useLocation()
    const [details, setDetails] = useState<Attack.DescriptionItems>()
    useEffect(() => {
        const id = data.search.split('&')[0].split('=')[1]
        request('/api/detailedPoc', {
            params: {
                id
            },
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((res: Attack.DescriptionResponse) => {
            setDetails(res.data)
        })
    }, [])
    return (
        details && <Card title={"攻击信息ID:"+details?.ID}>
            {/* <Card.Grid style={gridStyle}>id: </Card.Grid>
            <Card.Grid style={gridStyle}>{details?.ID}</Card.Grid> */}
            <Card.Grid style={gridStyle}>名称： </Card.Grid>
            <Card.Grid style={gridStyle}>{details?.name}</Card.Grid>
            <Card.Grid style={gridStyle}>载荷：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.payload}</Card.Grid>
            <Card.Grid style={gridStyle}>协议：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.protocol}</Card.Grid>
            <Card.Grid style={gridStyle}>端口：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.port}</Card.Grid>
            <Card.Grid style={gridStyle}>类型：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.type}</Card.Grid>
            <Card.Grid style={gridStyle}>起始时间：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.CreatedAt}</Card.Grid>
            <Card.Grid style={gridStyle}>更新时间：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.UpdatedAt}</Card.Grid>
            <Card.Grid style={gridStyle}>cve_id：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.cve_id}</Card.Grid>
            <Card.Grid style={gridStyle}>请求方法：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.requestMethod}</Card.Grid>
            <Card.Grid style={gridStyle}>请求头：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.requestHeader}</Card.Grid>
            <Card.Grid style={gridStyle}>请求体：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.requestBody}</Card.Grid>
            <Card.Grid style={gridStyle}>请求路径：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.requestUrl}</Card.Grid>
            <Card.Grid style={gridStyle}>响应头：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.responseHeader}</Card.Grid>
            <Card.Grid style={gridStyle}>响应体：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.responseBody}</Card.Grid>
            <Card.Grid style={gridStyle}>状态码：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.responseStatus}</Card.Grid>
            <Card.Grid style={gridStyle}>删除时间：</Card.Grid>
            <Card.Grid style={gridStyle}>{details?.DeletedAt}</Card.Grid>
        </Card>
    )
}

export default memo(Description)