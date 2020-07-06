import React, { Component } from "react"
import { Card, Icon, List } from "antd"
import Item from "antd/lib/list/Item"
import LinkButton from "../../components/link-button"
import { BASE_IMG_URL } from "../../utils/constains"
import { reqCategory } from "../../api"
/**
 * Product的添加和修改表单
 */

export default class detail extends Component {
    state = {
        cName1: "", //一级分类名字
        cName2: "", //二级分类名字
    }

    //获取所属分类
    async componentWillMount() {
        const { pCategoryId, categoryId } = this.props.location.state
        if (pCategoryId === "0") {
            //如果是一级分类下的商品
            const result = await reqCategory(categoryId)
            const cName1 = result.data.data.name
            this.setState({ cName1 })
        } else {
            const results = await Promise.all([
                reqCategory(pCategoryId),
                reqCategory(categoryId),
            ])
            const cName1 = results[0].data.data.name
            const cName2 = results[1].data.data.name
            this.setState({ cName1, cName2 })
        }
    }

    render() {
        //获取点击详情携带的product对象
        const { name, desc, price, detail, imgs } = this.props.location.state

        const { cName1, cName2 } = this.state

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
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item>
                        <span>
                            <span className="left">商品名称:</span>
                            <span>{name}</span>
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <span className="left">商品描述:</span>
                            <span>{desc}</span>
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <span className="left">商品价格:</span>
                            <span>{price}</span>
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <span className="left">所属分类:</span>
                            <span>
                                {cName1} {cName2 ? "-->" + cName2 : ""}
                            </span>
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <span className="left">商品图片:</span>
                            <span>
                                {imgs.map(img => (
                                    <img
                                        key={img}
                                        className="product-img"
                                        src={BASE_IMG_URL + img}
                                        alt="img"
                                    />
                                ))}
                            </span>
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <span className="left">商品详情:</span>
                            <span
                                dangerouslySetInnerHTML={{ __html: detail }}
                            ></span>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
