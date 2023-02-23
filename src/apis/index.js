//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';


const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';
const WAREHOUSE_EXPORT_EXCEL = '/api/warehouse/exportExcel';


// 销售管理
// 销售管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';
// 销售退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';
// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
// 销售退货管理
const SALE_RETURN_ALL = '/api/sale-returns/sheet-show';
const SALE_RETURN_CREATE = '/api/sale-returns/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/sale-returns/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/sale-returns/second-approval';
const SALE_RETURN_FIND_SHEET_BY_ID = '/api/sale-returns/find-sheet';
// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_PURCHASE_ALL = '/api/purchase/sheet-show';
const SALE_PURCHASE_CREATE = '/api/purchase/sheet-make';
const SALE_CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_CUSTOMER_MAX = '/api/sale/maxAmountCustomer';

const CUSTOMER_ADD = '/api/customer/createCustomer'
const CUSTOMER_DELETE = '/api/customer/deleteCustomer'
const CUSTOMER_UPDATE = '/api/customer/updateCustomer'

const ACCOUNT_ALL = '/api/account/findAll'
const ACCOUNT_ADD = '/api/account/create'
const ACCOUNT_UPDATE = '/api/account/update'
const ACCOUNT_DELETE = '/api/account/delete'

const RECEIVE_ALL = '/api/receive/sheet-show'
const RECEIVE_ADD = '/api/receive/sheet-make'
const RECEIVE_APPROVAL = '/api/receive/sheet-approval'

const PAYABLE_ALL = '/api/payable/sheet-show'
const PAYABLE_ADD = '/api/payable/sheet-make'
const PAYABLE_APPROVAL = '/api/payable/sheet-approval'

const SALE_DETAIL_ALL = '/api/sale/get_detail_sale_sheet'

const SALARY_ALL = '/api/salary/sheet-show'
const SALARY_ADD = '/api/salary/sheet-make'
const SALARY_APPROVAL = '/api/salary/sheet-approval'

const BUSINESS_CONDITION_ALL = '/api/business/show-sheet'

const EMPLOYEE_ALL = '/api/employee/show-all'
const EMPLOYEE_ADD = '/api/employee/create'
const EMPLOYEE_UPDATE = '/api/employee/update'
const EMPLOYEE_DELETE = '/api/employee/delete'

//经营历程表
const SALE_BUSINESS = '/api/sale/get_business_process'
const SALE_RETURN_BUSINESS ='/api/sale-returns/get_business_process'
const PURCHASE_BUSINESS = '/api/purchase/get_business_process'
const PURCHASE_RETURN_BUSINESS = '/api/purchase-returns/get_business_process'
const PAYABLE_BUSINESS = '/api/payable/get_business_process'
const RECEIVE_BUSINESS = '/api/receive/get_business_process'
const SALARY_BUSINESS = '/api/salary/get_business_process'

const SALE_RED_FLUSH = '/api/sale/red_flush'
const SALE_RETURN_RED_FLUSH ='/api/sale-returns/red_flush'
const PURCHASE_RED_FLUSH = '/api/purchase/red_flush'
const PURCHASE_RETURN_RED_FLUSH = '/api/purchase-returns/red_flush'
const PAYABLE_RED_FLUSH = '/api/payable/red_flush'
const RECEIVE_RED_FLUSH = '/api/receive/red_flush'
const SALARY_RED_FLUSH = '/api/salary/red_flush'

const SALE_COPY_IN = '/api/sale/copyIn'
const SALE_RETURN_COPY_IN ='/api/sale-returns/copyIn'
const PURCHASE_COPY_IN = '/api/purchase/copyIn'
const PURCHASE_RETURN_COPY_IN = '/api/purchase-returns/copyIn'
const PAYABLE_COPY_IN = '/api/payable/copyIn'
const RECEIVE_COPY_IN = '/api/receive/copyIn'
const SALARY_COPY_IN = '/api/salary/copyIn'

const VOUCHER_AVAILABLE = '/api/voucher/get_available_voucher'
const VOUCHER_ALL = '/api/voucher/get_all_voucher'
const VOUCHER_ADD = '/api/voucher/make_voucher'
const VOUCHER_DELETE ='/api/voucher/delete'

const CLOCK_IN = '/api/clock/clock_in'
const CLOCK_SHOW = '/api/clock/show_employee_clock'

const SALARY_SYSTEM_ALL = '/api/salary_system/sheet-show'
const SALARY_SYSTEM_ADD = '/api/salary_system/sheet-make'
const SALARY_SYSTEM_FIRST_APPROVAL = '/api/salary_system/first-approval'
const SALARY_SYSTEM_SECOND_APPROVAL = '/api/salary_system/second-approval'

const BUSINESS_EXPORT = '/api/excel_export/business_process'
const BUSINESS_CONDITION_EXPORT = '/api/excel_export/business'

module.exports = {
  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DEATIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,
  WAREHOUSE_EXPORT_EXCEL,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_FIND_SHEET_BY_ID,

  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_CUSTOMER_QUERY,
  SALE_CUSTOMER_MAX,
  SALE_FIND_SHEET_BY_ID,
  CUSTOMER_QUERY,

  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  SALE_RETURN_FIND_SHEET_BY_ID,

  CUSTOMER_ADD,
  CUSTOMER_DELETE,
  CUSTOMER_UPDATE,

  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  ACCOUNT_ALL,
  ACCOUNT_ADD,

  RECEIVE_APPROVAL,
  RECEIVE_ADD,
  RECEIVE_ALL,

  PAYABLE_APPROVAL,
  PAYABLE_ALL,
  PAYABLE_ADD,

  SALE_DETAIL_ALL,

  SALARY_ALL,
  SALARY_ADD,
  SALARY_APPROVAL,

  BUSINESS_CONDITION_ALL,

  EMPLOYEE_DELETE,
  EMPLOYEE_UPDATE,
  EMPLOYEE_ALL,
  EMPLOYEE_ADD,

  SALE_BUSINESS,
  SALE_RETURN_BUSINESS,
  PURCHASE_BUSINESS,
  PURCHASE_RETURN_BUSINESS,
  RECEIVE_BUSINESS,
  PAYABLE_BUSINESS,
  SALARY_BUSINESS,

  SALE_RED_FLUSH,
  SALE_RETURN_RED_FLUSH,
  PURCHASE_RED_FLUSH,
  PURCHASE_RETURN_RED_FLUSH,
  RECEIVE_RED_FLUSH,
  PAYABLE_RED_FLUSH,
  SALARY_RED_FLUSH,
  SALE_COPY_IN,
  SALE_RETURN_COPY_IN,
  PURCHASE_COPY_IN,
  PURCHASE_RETURN_COPY_IN,
  RECEIVE_COPY_IN,
  PAYABLE_COPY_IN,
  SALARY_COPY_IN,

  VOUCHER_AVAILABLE,
  VOUCHER_ALL,
  VOUCHER_DELETE,
  VOUCHER_ADD,

  CLOCK_IN,
  CLOCK_SHOW,

  SALARY_SYSTEM_FIRST_APPROVAL,
  SALARY_SYSTEM_SECOND_APPROVAL,
  SALARY_SYSTEM_ADD,
  SALARY_SYSTEM_ALL,

  BUSINESS_EXPORT,
  BUSINESS_CONDITION_EXPORT

};
