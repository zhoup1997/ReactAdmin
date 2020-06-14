import React, { Component } from 'react'
import './category.less'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd';
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api/index'
import AddForm from './addForm'
import UpdateForm from './updateForm';


/**
 * 主页组件 
 */
export default class Category extends Component {

    state = {
        categorys: [],//一级商品分类列表
        columns: [],//分类列表标题
        loading: false,//是否正在获取数据中
        parentId: '0',//父元素id
        subCategory: [],//二级分类列表数据
        parentName: '',//父元素name
        showModal: 0,//标识添加/更新确认框是否显示0：都不显示,1：显示添加2：显示更新
    }



    //初始化table标题
    initColumns = () => {
        this.state.columns = [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdateCategory(category)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ];
    }
    //显示一级分类列表
    showFirstCategorys = () => {
        this.setState({
            parentId: '0',
        }, () => {
            this.getCategorys()
        })
    }



    //显示二级分类列表
    showSubCategorys = (category) => {
        console.log(category);
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            console.log('parentId', this.state.parentId);
            this.getCategorys()
        })
    }

    getCategorys = async () => {
        //发送请求前显示加载框
        this.setState({ loading: true })
        const { parentId } = this.state
        const result = await reqCategorys(parentId)
        console.log(result);

        this.setState({ loading: false }) //发送完成后关闭
        if (result.data.status === 0) {
            const categorys = result.data.data
            // 判断是一级分类还是二级分类
            if (this.state.parentId === '0') {
                this.setState({
                    categorys
                })
            } else {
                this.setState({
                    subCategory: categorys
                })
            }
        } else {
            message.error('获取分类列表失败')
        }

    }

    //为第一次render准备标题数据
    componentWillMount() {
        this.initColumns()
    }

    //执行异步任务
    componentDidMount() {
        this.getCategorys()
    }

    /**
     * 显示添加对话框
     */
    showAddCategory = () => {
        this.setState({
            showModal: 1
        })
    }

    /**
     * 显示更新对话框
     */
    showUpdateCategory = (category) => {
        this.setState({
            showModal: 2
        })
    }
    /**
     * 隐藏对话框
     */
    handleCancel = () => {
        this.setState({
            showModal: 0
        })
    }
    /**
     * 弹出添加对话框
     */
    addCategory = () => {
        this.setState({
            showModal: 0
        })
    }


    /**
     * 弹出更新对话框
     */
    updateCategory = () => {
        this.setState({
            showModal: 0
        })
    }


    render() {

        const { categorys, columns, loading, parentId, subCategory, parentName, showModal } = this.state

        const title = parentId === '0' ? "一级商品列表" : (
            <span>
                <LinkButton onClick={this.showFirstCategorys}>一级商品列表</LinkButton>
                <Icon className="cateIcon" type="arrow-right"></Icon>
                <span>{parentName}</span>
            </span>
        )

        const extra = (
            <Button type="primary" onClick={this.showAddCategory}>
                <Icon type="plus"></Icon>
                添加
            </Button>
        )


        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={parentId === '0' ? categorys : subCategory}
                        columns={columns}
                        loading={loading}
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    />;
                </Card>
                <Modal
                    title="添加分类"
                    visible={showModal === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categorys={categorys} />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showModal === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    {/* <UpdateForm categorys={categorys} /> */}
                </Modal>
            </div>
        )
    }
}
