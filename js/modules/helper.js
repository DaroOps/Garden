import { getEmployByCode, getAllNameSurnamesAndEmailInCargeOfBossSeven, getCEOInformation, getAllEmployeesNotSalesRepresentative } from "./employees/employees.js";
import { getOfficesByCode, getAllOfficesCodeAndCity, getAllOfficesAndPhonesFromSpain } from "./offices/offices.js";
import { getPaymentByClientCode, getPaymentsByYear, getClientCodesPaymentsByYear, getPaymentsByYearAndPaypal } from "./payments/payments.js";
import { getRequestByCodeClient, getAllStatus } from "./requests/requests.js";
import { getSalesRepsWithFruitPurchases } from "./request_details/request_details.js";
import { getAllLateRequest, getAllRequestEarlyTwoDays, getRejectRequestsByYear, getRequestDeliveredInJanuary } from "./requests/requests.js";
import { getAllClientsInMadrid, getClientByEmployeeCode, getAllSpainClients } from "./clients/clients.js";

export { getAllLateRequest, getEmployByCode, getOfficesByCode, getPaymentByClientCode, getRequestByCodeClient, getAllClientsInMadrid, getClientByEmployeeCode, getSalesRepsWithFruitPurchases, getAllSpainClients, getAllOfficesCodeAndCity, getAllOfficesAndPhonesFromSpain, getAllNameSurnamesAndEmailInCargeOfBossSeven, getCEOInformation, getAllEmployeesNotSalesRepresentative, getAllStatus, getPaymentsByYear, getClientCodesPaymentsByYear, getAllRequestEarlyTwoDays, getRejectRequestsByYear, getRequestDeliveredInJanuary, getPaymentsByYearAndPaypal }