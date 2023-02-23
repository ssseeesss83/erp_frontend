import request from "@/network/request";
import {exportEx} from "@/network/request";

const testAPI = require("@/apis")

//account
export const getAllAccount = config => request._get(testAPI.ACCOUNT_ALL,config)
export const updateAccount = config => request._post(testAPI.ACCOUNT_UPDATE, config)
export const createAccount = config => request._post(testAPI.ACCOUNT_ADD, config)
export const deleteAccount = config => request._get(testAPI.ACCOUNT_DELETE, config)
//receive
export const getAllReceive = config => request._get(testAPI.RECEIVE_ALL, config)
export const createReceive = config => request._post(testAPI.RECEIVE_ADD, config)
export const approveReceive = config => request._get(testAPI.RECEIVE_APPROVAL, config)
//payable
export const getAllPayable = config => request._get(testAPI.PAYABLE_ALL, config)
export const createPayable = config => request._post(testAPI.PAYABLE_ADD, config)
export const approvePayable = config => request._get(testAPI.PAYABLE_APPROVAL, config)
//sale detail
export const getSaleDetail = config => request._post(testAPI.SALE_DETAIL_ALL, config)
//salary
export const getAllSalary = config => request._get(testAPI.SALARY_ALL, config)
export const createSalary = config => request._get(testAPI.SALARY_ADD, config)
export const approveSalary = config => request._get(testAPI.SALARY_APPROVAL, config)
//business condition
export const getBusinessCondition = config => request._get(testAPI.BUSINESS_CONDITION_ALL, config)
//business
export const getSaleBusiness = config => request._post(testAPI.SALE_BUSINESS, config)
export const getSaleReturnBusiness = config => request._post(testAPI.SALE_RETURN_BUSINESS, config)
export const getPurchaseBusiness = config => request._post(testAPI.PURCHASE_BUSINESS, config)
export const getPurchaseReturnBusiness = config => request._post(testAPI.PURCHASE_RETURN_BUSINESS, config)
export const getReceiveBusiness = config => request._post(testAPI.RECEIVE_BUSINESS, config)
export const getPayableBusiness = config => request._post(testAPI.PAYABLE_BUSINESS, config)
export const getSalaryBusiness = config => request._post(testAPI.SALARY_BUSINESS, config)

export const saleRedFlush = config => request._post(testAPI.SALE_RED_FLUSH, config)
export const saleCopyIn = config => request._post(testAPI.SALE_COPY_IN, config)
export const saleReturnRedFlush = config => request._post(testAPI.SALE_RETURN_RED_FLUSH, config)
export const saleReturnCopyIn = config => request._post(testAPI.SALE_RETURN_COPY_IN, config)
export const purchaseRedFlush = config => request._post(testAPI.PURCHASE_RED_FLUSH, config)
export const purchaseCopyIn = config => request._post(testAPI.PURCHASE_COPY_IN, config)
export const purchaseReturnRedFlush = config => request._post(testAPI.PURCHASE_RETURN_RED_FLUSH, config)
export const purchaseReturnCopyIn = config => request._post(testAPI.PURCHASE_RETURN_COPY_IN, config)
export const receiveRedFlush = config => request._post(testAPI.RECEIVE_RED_FLUSH, config)
export const receiveCopyIn = config => request._post(testAPI.RECEIVE_COPY_IN, config)
export const payableRedFlush = config => request._post(testAPI.PAYABLE_RED_FLUSH, config)
export const payableCopyIn = config => request._post(testAPI.PAYABLE_COPY_IN, config)
export const salaryRedFlush = config => request._post(testAPI.SALARY_RED_FLUSH, config)
export const salaryCopyIn = config => request._post(testAPI.SALARY_COPY_IN, config)

export const exportBusiness = config => request._post(testAPI.BUSINESS_EXPORT, config)
export const exportBusinessCondition = config => request._post(testAPI.BUSINESS_CONDITION_EXPORT, config)

export const exportBExcel = (data) => exportEx(testAPI.BUSINESS_EXPORT, data)
export const exportBCExcel = data => exportEx(testAPI.BUSINESS_CONDITION_EXPORT, data)