import React, { Component } from "react"
import {
    Card,
    Form,
    Input,
    Cascader,
    Upload,
    Button,
    Icon,
    message,
} from "antd"
import LinkButton from "../../components/link-button"
import { reqCategorys } from "../../api"

/**
 * Product的添加和修改表单
 */
const { Item } = Form
const { TextArea } = Input

class ProductUpdate extends Component {

    state = {
        //级联选择器数据
        options: [],
    }

    initOptions = categorys => {
        const options = categorys.map(m => ({
            value: m._id,
            label: m.name,
            isLeaf: false,
        }))
        this.setState({ options })
    }

    //获取级联选择器数据
    getCategorys = async parentId => {
        const result = await reqCategorys(parentId)
        console.log(result)
        if (result.status === 200) {
            const categorys = result.data.data
            //如果是一级分类列表
            if (parentId === "0") {
                this.initOptions(categorys)
            } else {
                return categorys
            }
        }
    }
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        //获取选中的菜单id，再次发送请求去获取二级菜单
        const subCategorys = await this.getCategorys(targetOption.value)

        targetOption.loading = false
        if (subCategorys && subCategorys.length > 0) {
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            targetOption.children = cOptions
        } else {
            targetOption.isLeaf = true
        }
    }

    componentWillMount(){
        const product = this.props.location.state
        this.addOrUpdate= !! product;
        this.product = product || {}
    }

    componentDidMount() {
        this.getCategorys("0")
    }

    submit = () => {
        //表单验证
        this.props.form.validateFields((error, values) => {
            if (!error) {
            }
        })
    }
    //价格验证
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback() //验证通过
        } else {
            callback("价格必须大于 0 ") //验证没通过
        }
    }

    render() {
        const product = this.product

        const title = (
            <span>
                <LinkButton>
                    <Icon
                        type="arrow-left"
                        style={{
                            color: "green",
                            marginRight: 15,
                            fontSize: 20,
                        }}
                        onClick={() => this.props.history.goBack()}
                    ></Icon>
                </LinkButton>
                <span>添加商品</span>
            </span>
        )
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }

        const { getFieldDecorator } = this.props.form

        
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称：">
                        {getFieldDecorator(product.name, {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入商品名称!",
                                },
                            ],
                        })(<Input placeholder="请输入商品名称" />)}
                    </Item>
                    <Item label="商品描述：">
                        {getFieldDecorator("desc", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入商品描述!",
                                },
                            ],
                        })(<TextArea placeholder="请输入商品描述" autosize />)}
                    </Item>
                    <Item label="商品价格：">
                        {getFieldDecorator("price", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入商品价格!",
                                },
                                { validator: this.validatePrice },
                            ],
                        })(
                            <Input
                                type="number"
                                addonAfter="元"
                                placeholder="请输入商品价格"
                            />
                        )}
                    </Item>
                    <Item label="商品分类：">
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            changeOnSelect
                        />
                    </Item>
                    <Item label="商品价格：">
                        <Upload />
                    </Item>
                    <Item label="商品详情：">
                        <Input type="text" />
                    </Item>
                    <Item>
                        <Button type="primary" onClick={() => this.submit()}>
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductUpdate)
