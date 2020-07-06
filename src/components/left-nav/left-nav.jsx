import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

/**
 * 左侧导航组件
 */
class LeftNav extends Component {

    constructor() {
        super();
        this.state = {
            openKey: []
        }
    }

    getMenuNodes = (menuList) => {

        const path = this.props.location.pathname

        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.Icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                //查找展开列表
                //查找一个与当前请求路径匹配的子 item
                //查找一个与当前请求路径匹配的子 item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                //如果存在，说明当前的 item 的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
                console.log(cItem);

                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >

                        {this.getMenuNodes(item.children)}
                    </SubMenu >
                )
            }
        })
    }
    //第一次render之前执行一次
    componentWillMount() {
        // const path = this.props.location.pathname
        this.menuNodes = this.getMenuNodes(menuList)
    }


    render() {


        //得到当前路径
        let path = this.props.location.pathname
        if (path.indexOf('/product') === 0) { //当前请求的是商品或其子路由界面
            path = '/product'
        }

        return (
            <div>
                <Link to="/" className="left-nav">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div >
        )
    }
}

export default withRouter(LeftNav)