import React, { Component } from "react";
import { Card, Table, Button, Icon, message, Modal, Select, Input } from "antd";
import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts } from "../../api";
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
    pageNum: 1, //页码
    pageSize: 5, //页面大小
    searchName: "", //搜索内容
    searchType: 'productName', //根据哪个字段搜索
    loading: false,
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(this.state.pageNum);
  }
  /**
   * 获取指定页码数据显示
   */
  getProducts = async (pageNum) => {
    const { searchName, searchType,pageSize } = this.state
    this.state.loading=true
    //如果搜索框有值，则走搜索查询
    let result;
    if(searchName){
      result = await reqSearchProducts({pageNum,pageSize,searchName,searchType})
    }else{
      result = await reqProducts(pageNum, pageSize);
    }
    this.state.loading=false
    console.log(result);
    if (result.data.status === 0) {
      const { total, list } = result.data.data;
      this.setState({
        total,
        products: list,
      })
    }
  }

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
        width: 100,
        title: "状态",
        dataIndex: "status",
        render: (status) => {
          return status == 1 ? (
            <span>
              <Button type="primary">下架</Button>
              <span>在售中</span>
            </span>
          ) : (
            <span>
              <Button type="primary">上架</Button>
              <span>下架中</span>
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
              <LinkButton onClick={()=>this.props.history.push('/product/detail',product)}>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  render() {
    //分页数据
    const {
      products,
      total,
      pageNum,
      pageSize,
      loading,
      searchName,
      searchType,
    } = this.state;

    //头部搜索框
    const title = (
      <span>
        <Select
          value="1"
          style={{ width: 150 }}
          value={searchType}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="priductValue">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    );
    //头部添加按钮
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    );
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            rowKey="_id"
            columns={this.columns}
            loading={loading}
            dataSource={products}
            bordered
            pagination={{
              total,
              defaultPageSize: pageSize,
              showQuickJumper: true,
              onChange: this.getProducts,
            }}
          ></Table>
        </Card>
      </div>
    );
  }
}
