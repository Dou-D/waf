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
     * @param rowKey 让每一行unique
     * @param data 整行表单的值
     * @param row 
     */
    onSave: async (key, record, originRow) => {
        console.log();
        await waitTime(2000);
    }
}}
```  
点击表格后的按钮需要调用:
```ts
// 触发 ProTable 切换到编辑模式
action?.startEditable?.(record.id); 
```

