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
        console.log();
        await waitTime(2000);
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
