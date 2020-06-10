import React from 'react'
import './login.less'
import { Form, Input, Button, Icon, message } from 'antd';
import { reqLogin } from '../../api'
import { Redirect } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
/**
 * 登录页面路由组件
 */
class Login extends React.Component {

    //判断用户是否登录



    handleSubmit = (event) => {
        // 阻止事件的默认行为
        // event.preventDefault()
        const form = this.props.form
        const values = form.getFieldsValue()
        const { username, password } = values
        this.props.form.validateFields(async (err, values) => {
            //校验成功
            if (!err) {
                try {
                    const result = await reqLogin(username, password)
                    //判断登录成功
                    if (result.data.status === 0) {
                        message.success("登录成功！")
                        const user = result.data.data
                        console.log(user);
                        storageUtils.saveUser(user)
                        //跳转到登录
                        this.props.history.replace('/')
                    } else {
                        message.error("登录失败！" + result.data.msg)
                    }

                } catch (error) {
                    console.log('出错了', error.message)
                }

            } else {
                console.log('校验失败')
            }
        })

        console.log("handleSubmit", values)
    }

    /**
     * 密码验证
     */
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd', rule, value);
        if (!value) {
            callback("密码不能为空")
        } else if (value.length < 4) {
            callback("密码长度不能小于4")
        } else if (value.length > 12) {
            callback("密码长度不能小于4")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文、数字或下换线")
        } else {
            callback()
        }
    }



    render() {

        //判断是否登录
        const user = storageUtils.getUser()
        if (user && user._id) {
            return <Redirect to="/" />
        }


        //得到具有强大功能的 form 对象
        const { getFieldDecorator } = this.props.form

        return (
            <div className="login">
                <header className="login-header">
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    {/* 登录表单 */}
                    <Form
                        className="login-form"
                        onSubmitCapture={this.handleSubmit}
                    >
                        <Form.Item>
                            {
                                getFieldDecorator('username', { //配置对象：属性名必须是特定的一些名称
                                    //声明式验证：直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少 4 位' },
                                        { max: 12, message: '用户名最多 12 位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名至必须是英文、数字或下划线组成' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WarpLogin = Form.create()(Login)
export default WarpLogin

