import {myGet} from './axios'
//查询卡号列表
export const seleceCode = (data) => myGet('/selectCode', data);
//生成卡号
export const createCode = (data) => myGet('/createCode', data);
