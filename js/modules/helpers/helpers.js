import { getEmployByCode } from "../employees/employees.js";
import { getOfficesByCode } from "../offices/offices.js";
import { getPaymentByClientCode } from "../payments/payments.js";
import { getRequestByCodeClient } from "../requests/requests.js";
import { getSalesRepsWithFruitPurchases } from "../request_details/request_details.js";
import { getAllLateRequest } from "../requests/requests.js";
import { getAllClientsInMadrid, getClientByEmployeeCode, getAllSpainClients} from "../clients/clients.js";

export {getAllLateRequest, getEmployByCode, getOfficesByCode, getPaymentByClientCode, getRequestByCodeClient, getAllClientsInMadrid, getClientByEmployeeCode, getSalesRepsWithFruitPurchases, getAllSpainClients}