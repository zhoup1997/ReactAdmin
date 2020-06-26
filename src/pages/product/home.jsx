import React, { Component } from "react";
import { Card, Table, Button, Icon, message, Modal, Select, Input } from "antd";
import LinkButton from "../../components/link-button";
import { reqProducts } from "../../api";
const { Option } = Select;
/**
 * Product的默认子路由组件
 */

export default class home extends Component {
  //数据
  state = {
    products: [], //商品数组
    columns: [], //table标题列
    total: 0, //商品总数量
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(2);
  }
  /**
   * 获取指定页码数据显示
   */
  getProducts = async (pageNum) => {
    const result = await reqProducts(pageNum, 5);
    console.log(result);

    if (result.data.status === 0) {
      const { total, list } = result.data.data;
      this.setState({
        total,
        products: list,
      });
    }
  };

  initColumns = () => {
    //table标题列
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "￥" + price,
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (status) => {
          return status == 1 ? (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          ) : (
            <span>
              <Button type="primary">上架</Button>
              <span>在售</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  render() {
    //头部搜索框
    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 150, margin: "0 15px" }} />
        <Button type="primary">搜索</Button>
      </span>
    );
    //头部添加按钮
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    );
    //
    const { products } = this.state;
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            rowKey="_id"
            columns={this.columns}
            dataSource={products}
          ></Table>
        </Card>
      </div>
    );
  }
}
