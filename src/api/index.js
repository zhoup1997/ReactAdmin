import ajax from "./ajax"

const urlHeader = ""

//登录请求
export const reqLogin = (username, password) =>
    ajax(urlHeader + "/login", { username, password }, "POST")

//获取商品分类列表
export const reqCategorys = parentId =>
    ajax(urlHeader + "/manage/category/list", { parentId }, "GET")

//添加商品分类
export const reqAddCategorys = (categoryName, parentId) =>
    ajax(urlHeader + "/manage/category/add", { categoryName, parentId }, "POST")

//更新商品分类
export const reqUpdaeCategorys = (categoryName, categoryId) =>
    ajax(
        urlHeader + "/manage/category/update",
        { categoryName, categoryId },
        "POST"
    )

//获取商品列表分页查询
export const reqProducts = (pageNum, pageSize) =>
    ajax(urlHeader + "/manage/product/list", { pageNum, pageSize })

//搜索商品分页列表(根据商品名称/商品描述)
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType,
}) =>
    ajax(urlHeader + "/manage/product/search", {
        pageNum,
        pageSize,
        [searchType]: searchName,
    })

//根据获取商品分类
export const reqCategory = categoryId =>
    ajax(urlHeader + "/manage/category/info", { categoryId }, "GET")

//更新商品状态
export const reqUpdateStatus = (productId, status) =>
    ajax(
        urlHeader + "/manage/product/updateStatus",
        { productId, status },
        "POST"
    )
