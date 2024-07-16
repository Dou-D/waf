umi 中布局对应 layouts/index.tsx|jsx，可在.umirc.ts 中配置 conventionLayout，默认开启。所以再 routes 中不需要再写

```ts
{
    path: '/',
    component: "@/layouts",
    redirect: '/home'
}
```

umi 中路由的配置通过.umirc.ts 中的 conventionRoutes 配置。不配置的话 pages 下的文件默认为路由

## ProTable

修改表格

```typescript
editable={{
    type: 'multiple',
    /**
     * 
     * @param key 让每一行unique
     * @param record 整行表单的值
     * @param originRow 一般没啥用
     */
    onSave: async (key, record, originRow) => {
        // await waitTime(2000);
    }
}}
```  
点击表格后的按钮需要调用:
```ts
// 刷新
ref.current.reload();

// 刷新并清空,页码也会重置，不包括表单
ref.current.reloadAndRest();

// 重置到默认值，包括表单
ref.current.reset();

// 清空选中项
ref.current.clearSelected();

// 开始编辑
ref.current.startEditable(rowKey);

// 结束编辑
ref.current.cancelEditable(rowKey);
```

## useEffect不要写async
要么就再声明一个async函数，在useEffect中调用 而不是由useEffect直接调用async函数
正确写法
```ts
useEffect(() => {
    request('/api/homeInfo', {
      ...config,
      method: 'GET',
    })
    .then(res => {
      
    })
  }, [])
```  
错误写法
```ts
useEffect(async () => {
    const res = await request('/api/homeInfo', {
      ...config,
      method: 'GET',
    })
  }, [])
```  

## StatisticCard  
从antd-pro导入StatisticCard后，使用`description`中的`Statistic`API别忘了拿到
```ts
const { Statistic } = StatisticCard;
```  

## umi pages
umi pages下的页面导出得用`export default`  

## antd form默认值 initialValues  
initialValues是对象，在里面通过每个Item设置的name来给初始值
```ts
<Form
    name="basic"
    labelCol={{ span: 3 }}
    wrapperCol={{ span: 16 }}
    style={{ minWidth: 1000 }}
    initialValues={{ remember: true, radio: "钉钉" }}
    onFinish={onFinish}
    autoComplete="off"
>
    <Form.Item<FormType> name="radio">
        <Radio.Group onChange={onChange} value={value} >
            <Radio value="钉钉">钉钉</Radio>
            <Radio value="飞书">飞书</Radio>
            <Radio value="企业微信">企业微信</Radio>
        </Radio.Group>
    </Form.Item>
</Form>
```  
`new Date`必须接受一个string|number|Date参数，传变量没有用，得用模板字符串包起来
```ts
search: {
  transform: (value) => {
    const startTime = new Date(`${value[0]}`).getTime()
    const endTime = new Date(`${value[1]}`).getTime()
  }
}
```  

## antd ProTable request
```ts
interface response {
  status: number;
  data: Data;
  message: string
}
request={async (param,) => {
  const response = await request<response>('/api/flowList', {
    params: {
      ...param,
      flowType: activeKey,
    },
  });
  return {
    data: response.data.flows,
    success: true,
    total: response.data.total,
  }
}}  
```

## ProTable 泛型
表格每行的类型
```ts
<ProTable<FlowListItems> />
```