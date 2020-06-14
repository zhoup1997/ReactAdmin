import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

    state = {
        categorys: []
    }

    //为第一次render准备标题数据
    // componentWillMount() {
    //     this.setState({
    //         categorys
    //     })
    // }

    render() {

        const { getFieldDecorator } = this.props.form
        const { categorys } = this.state

        return (
            <div>
                <Form>
                    <Item>
                        {
                            getFieldDecorator('parentId', {
                                initialValue: '0'
                            })(

                                <Select>
                                    <Option value='0'>一级分类</Option>
                                    {
                                        categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('parentName', {
                                initialValue: ''
                            })(

                                <Select>
                                    <Input placeholder='请输入分类名称' />
                                </Select>
                            )
                        }

                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddForm);