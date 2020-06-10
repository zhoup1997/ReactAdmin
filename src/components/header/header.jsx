import React, { Component } from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';

class header extends Component {


    state = {
        currentTime: formateDate(Date.now()),
        username: storageUtils.getUser().username,
        title: ''

    }

    getTime = () => {
        setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        })
    }

    /**
     * 根据路径获取title
     */
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    /**
     * 退出登录
     */
    Logout = () => {
        Modal.confirm({
            title: '确定退出登录吗？',
            onOk: () => {
                storageUtils.removeUser()
                this.props.history.replace('/login')
            }
        });
    }



    /**
     * 在第一次render之后执行一次，
     * 一般在此执行异步操作，发送ajax请求
     */
    componentDidMount() {
        this.getTime()
    }


    render() {
        this.title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{this.state.username}</span>
                    <a href="#" onClick={this.Logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-left">
                        {this.title}
                    </div>
                    <div className="header-right">
                        <span>{this.state.currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(header)