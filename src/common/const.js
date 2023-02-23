// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
  SALE_STAFF: "SALE_STAFF", // 销售销售人员
  SALE_MANAGER: "SALE_MANAGER", //销售经理
  FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
  HR: "HR", // 人力资源人员
  GM: "GM", // 总经理
  ADMIN: "ADMIN" // 最高权限
};


export const PATH = {
  // INVENTORY_MANAGER
  COMMODITY_CLASSIFICATION: {
    path: '/commodityClassification',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  COMMODITY_MANAGEMENT: {
    path: '/commodityManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_MANAGEMENT: {
    path: '/inventoryManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OPERATION: {
    path: '/inventoryOperation',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_CHECK: {
    path: '/inventoryCheck',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_IN: {
    path: '/inventoryIn',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OUT: {
    path: '/inventoryOut',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_LOSS: {
    path: '/inventoryLoss',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_WARNING: {
    path: '/inventoryWarning',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OVERFLOW: {
    path: '/inventoryOverflow',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_PRESENT: {
    path: '/inventoryPresent',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_VIEW: {
    path: '/inventoryView',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },

  // SALE_STAFF & SALE_MANAGER
  PURCHASE_VIEW: {
    path: '/purchaseView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  PURCHASE_RETURN_VIEW: {
    path: '/purchaseReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_VIEW: {
    path: '/saleView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_RETURN_VIEW:{
    path: '/saleReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  CUSTOMER_VIEW: {
    path: '/customerView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },

  // GM
  GM_APPROVAL: {
    path: '/approval',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },

  //FINANCIAL_STAFF
  ACCOUNT_MANAGEMENT:{
    path:'/AccountManagement',
    requiresAuth:[ROLE.ADMIN]
  },
  BUSINESS_VIEW:{
    path:'/BusinessView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.GM,ROLE.ADMIN]
  },
  DETAIL_SALE_VIEW:{
    path:'/DetailSaleView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.ADMIN]
  },
  PAYABLE_VIEW:{
    path:'/PayableView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  RECEIVE_VIEW:{
    path:'/ReceiveView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  SALARY_VIEW:{
    path:'/SalaryView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.GM,ROLE.ADMIN]
  },
  BUSINESS_CONDITION_VIEW:{
    path:'/BusinessConditionView',
    requiresAuth:[ROLE.FINANCIAL_STAFF,ROLE.GM,ROLE.ADMIN]
  },
  CLOCK_VIEW:{
    path:'/ClockView',
    requiresAuth:[ROLE.HR,ROLE.ADMIN]
  },
  EMPLOYEE_VIEW:{
    path:'/EmployeeView',
    requiresAuth:[ROLE.HR,ROLE.ADMIN]
  },
  SALARY_SYSTEM_VIEW:{
    path:'/SalarySystemView',
    requiresAuth:[ROLE.HR,ROLE.GM,ROLE.ADMIN]
  },
  //GM
  VOUCHER_VIEW:{
    path:'/VoucherView',
    requiresAuth:[ROLE.GM,ROLE.ADMIN]
  },
  ANNUAL_BONUS_VIEW:{
    path:'/AnnualBonusView',
    requiresAuth:[ROLE.GM,ROLE.ADMIN]
  }

}
