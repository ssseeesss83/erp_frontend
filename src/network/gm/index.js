import request from "@/network/request"
const testAPI = require("@/apis")

export const getAvailableVoucher = (data,config) => request.__post(testAPI.VOUCHER_AVAILABLE, data, config)
export const getAllVoucher = config => request._get(testAPI.VOUCHER_ALL, config)
export const createVoucher = config => request._post(testAPI.VOUCHER_ADD, config)
export const deleteVoucher = config => request._get(testAPI.VOUCHER_DELETE, config)