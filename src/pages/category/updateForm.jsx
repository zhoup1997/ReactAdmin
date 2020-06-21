import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
const Item = Form.Item
const Option = Select.Option

class UpdateForm extends Component {

    state = {
        categorys: []
    }

    //为第一次render准备标题数据
    // componentWillMount() {
    //     const categorys = this.props.categorys
    //     this.setState({
    //         categorys
    //     })
    // }

    render() {
        const { getFieldDecorator } = this.props.form
        const { categoryName } = this.props
        return (
            <div>
                <Form>
                    <Item>
                        {
                            getFieldDecorator('categoryName', {
                                initialValue: categoryName
                            })(
                                    <Input placeholder='请输入分类名称' />
                            )
                        }

                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateForm);