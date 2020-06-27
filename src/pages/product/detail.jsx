import React, { Component } from "react";
import { Card, Icon, List } from "antd";
import Item from "antd/lib/list/Item";
import LinkButton from "../../components/link-button";
/**
 * Product的添加和修改表单
 */

export default class detail extends Component {
  render() {
    const title = (
      <span>
        <LinkButton>
            <Icon type="arrow-left" style={{color:'green',marginRight:15,fontSize:20}} onClick={()=>this.props.history.goBack()}></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span className="right">惠普暗影精灵2Pro</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span className="right">年度重量级新品,更加轻薄机身设计</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span className="right">惠普暗影精灵2Pro</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span className="right">惠普暗影精灵2Pro</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span className="right">惠普暗影精灵2Pro</span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span className="right">惠普暗影精灵2Pro</span>
          </Item>
        </List>
      </Card>
    );
  }
}
