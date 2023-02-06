import {myGet, myPost} from './axios'
//查询卡号列表
export const seleceCode = (data) => myGet('/selectCode', data);
//生成卡号
export const createCode = (data) => myGet('/createCode', data);
//修改卡号类型
export const setCodeType = (data) => myGet('/setCodeType', data);
//获取正文内容
export const selectContentInfo = (data) => myPost('/selectContentInfo', data);