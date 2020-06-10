import React, { Component } from 'react'
import './category.less'
import { Card, Table, Button, Icon } from 'antd';
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api/index'


/**
 * 主页组件 
 */
export default class Category extends Component {

    state = {
        //一级商品分类列表
        category: [],
        columns: []
    }

    //初始化table标题
    initColumns() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            }
        ];
        console.log(this.columns);

    }

    getCategorys = async () => {
        const result = await reqCategorys('0')
        console.log(result);
    }

    //为第一次render准备标题数据
    componentWillMount() {
        this.initColumns()
    }

    //执行异步任务
    componentDidMount() {
        this.getCategorys()

    }


    render() {
        //发送请求获取列表数据


        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];



        const title = "一级商品列表"
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table dataSource={dataSource} columns={this.columns} />;
                </Card>
            </div>
        )
    }
}
