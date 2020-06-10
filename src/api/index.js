import ajax from './ajax'

const urlHeader = ''

//登录请求
export const reqLogin = (username, password) => ajax(urlHeader + '/login', { username, password }, 'POST')

//获取商品分类列表
export const reqCategorys = (parentId) => ajax(urlHeader + '/manage/category/list', { parentId }, 'GET')

//添加商品分类
export const reqAddCategorys = (categoryName, parentId) => ajax(urlHeader + '/manage/category/add', { categoryName, parentId }, 'POST')

//更新商品分类
export const reqUpdaeCategorys = (categoryName, categoryId) => ajax(urlHeader + '/manage/category/update', { categoryName, categoryId }, 'POST')

