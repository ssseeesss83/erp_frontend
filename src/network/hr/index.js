import request from "@/network/request"
const testAPI = require("@/apis")

export const getAllEmployee = config => request._get(testAPI.EMPLOYEE_ALL, config)
export const createEmployee = config => request._post(testAPI.EMPLOYEE_ADD, config)
export const updateEmployee = config => request._post(testAPI.EMPLOYEE_UPDATE, config)
export const deleteEmployee = config => request._get(testAPI.EMPLOYEE_DELETE, config)

export const clockIn = config => request._get(testAPI.CLOCK_IN, config)
export const getClock = config => request._get(testAPI.CLOCK_SHOW, config)

export const getAllSalarySystem = config => request._get(testAPI.SALARY_SYSTEM_ALL, config)
export const createSalarySystem = config => request._post(testAPI.SALARY_SYSTEM_ADD, config)
export const firstApproval = config => request._get(testAPI.SALARY_SYSTEM_FIRST_APPROVAL, config)
export const secondApproval = config => request._get(testAPI.SALARY_SYSTEM_SECOND_APPROVAL, config)
