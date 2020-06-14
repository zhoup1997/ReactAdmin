import React from 'react'
import storageUtils from '../../utils/storageUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
// import NotFound from '../not-found/not-found'


const { Footer, Sider, Content } = Layout;

export default class admin extends React.Component {



    // clickHandler = () => {
    //     storageUtils.removeUser()
    // }

    render() {
        // 如果内存中没有user对象
        // const user = storageUtils.getUser()
        // if (!user || !user._id) {
        //     return <Redirect to="/login" />
        // }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, backgroundColor: 'white' }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                            {/* <Route component={NotFound} /> */}
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: "center", color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}