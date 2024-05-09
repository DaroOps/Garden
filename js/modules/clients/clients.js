import { getEmployByCode, getOfficesByCode, getPaymentByClientCode, 
    getRequestByCodeClient, getAllLateRequest} from "../helpers/helpers.js"

const port = 5001
const endpoint = `http://localhost:${port}/clients`


export const getNameByClientCode = async (code) => {
    const res = await fetch(`${endpoint}?client_code=${code}`);
    const [client] = await res.json();
    return client.client_name;
};

export const getClientByEmployeeCode = async (code) => {
    const res = await fetch(`${endpoint}?code_employee_sales_manager=${code}`);
    return await res.json();
};

export const getClientByCode = async (code) => {
    const res = await fetch(`${endpoint}?client_code=${code}`);
    return await res.json();
};

export const getAllSpainClients = async () => {
    const res = await fetch(`${endpoint}?country=Spain`);
    const data = await res.json();
    return data.map(({ client_name }) => ({ name: client_name }));
};

export const getAllClientsInMadrid = async () => {
    const res = await fetch(`${endpoint}?region=Madrid`);
    const data = await res.json();
    return data.filter(({ code_employee_sales_manager }) => [11, 30].includes(code_employee_sales_manager)).map(({ client_name, region, code_employee_sales_manager }) => ({ nombre: client_name, region, representante_de_ventas: code_employee_sales_manager }));
};

const getEmployeeInfo = async (code) => {
    const [employ] = await getEmployByCode(code);
    const { name, lastname1, lastname2 } = employ;
    return { name_employee: `${name} ${lastname1} ${lastname2}` };
};

const getOfficeInfo = async (code) => {
    const [office] = await getOfficesByCode(code);
    const { city } = office;
    return { city_office: city };
};

const getClientsWithEmployeeInfo = async (clients) => {
    return await Promise.all(clients.map(async (client) => {
        const { code_employee_sales_manager, ...clientData } = client;
        const employeeInfo = await getEmployeeInfo(code_employee_sales_manager);
        return { ...clientData, ...employeeInfo };
    }));
};

const getClientsWithEmployeeAndOfficeInfo = async (clients) => {
    return await Promise.all(clients.map(async (client) => {
        const { code_employee_sales_manager, ...clientData } = client;
        const employeeInfo = await getEmployeeInfo(code_employee_sales_manager);
        const officeInfo = await getOfficeInfo(employeeInfo.code_office);
        return { ...clientData, ...employeeInfo, ...officeInfo };
    }));
};

export const getClientsAndEmployeesNames = async () => {
    const clients = await getClientByCode();
    return await getClientsWithEmployeeInfo(clients);
};

export const getClientsWhoMadePayment = async () => {
    const clients = await getClientByCode();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    return clientsWithEmployeeInfo.filter(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length > 0;
    });
};

export const getClientsWhoNotMadePayment = async () => {
    const clients = await getClientByCode();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    return clientsWithEmployeeInfo.filter(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length === 0;
    });
};

export const getClientsWhoMadePaymentsAndTheyCity = async () => {
    const clients = await getClientByCode();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    return clientsWithEmployeeInfo.filter(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length > 0;
    }).then(async (filteredClients) => await getClientsWithEmployeeAndOfficeInfo(filteredClients));
};

export const getClientsWhoDidntMadePaymentsAndTheyCity = async () => {
    const clients = await getClientByCode();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    return clientsWithEmployeeInfo.filter(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length === 0;
    }).then(async (filteredClients) => await getClientsWithEmployeeAndOfficeInfo(filteredClients));
};

export const getOfficeAddressOfClientsFromFuenlabrada = async () => {
    const clients = await getClientByCode(`Fuenlabrada`);
    return await getClientsWithEmployeeAndOfficeInfo(clients);
};

export const getClientsEmploy = async () => {
    const clients = await getClientByCode();
    return await getClientsWithEmployeeInfo(clients);
};

export const clientsWhoReceivedTheirRequestLate = async () => {
    const lateRequests = await getAllLateRequest();
    const clientCodes = [...new Set(lateRequests.map(({ Codigo_del_cliente }) => Codigo_del_cliente))];
    return Promise.all(clientCodes.map(async (code) => ({
        client_code: code,
        client_name: await getNameByClientCode(code)
    })));
};

export const getClientsWithoutPayments = async () => {
    const clients = await getClientByCode();
    const clientsWithoutPayments = await Promise.all(clients.map(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length === 0 ? client.client_name : null;
    }));
    return clientsWithoutPayments.filter(Boolean);
};

export const getClientsWithoutRequest = async () => {
    const clients = await getClientByCode();
    const clientsWithoutRequests = await Promise.all(clients.map(async (client) => {
        const requests = await getRequestByCodeClient(client.client_code);
        return requests.length === 0 ? { code_client: client.client_code, name: client.client_name } : null;
    }));
    return clientsWithoutRequests.filter(Boolean);
};

export const getClientsWithoutPaymentsAndRequest = async () => {
    const clients = await getClientByCode();
    const clientsWithoutPaymentsAndRequests = await Promise.all(clients.map(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        const requests = await getRequestByCodeClient(client.client_code);
        if (payments.length === 0 && requests.length === 0) {
            return { code_client: client.client_code, name: client.client_name };
        }
        return null;
    }));
    return clientsWithoutPaymentsAndRequests.filter(Boolean);
};

export const getClientRequestsWithoutPayments = async () => {
    const clients = await getClientByCode();
    const clientRequestsWithoutPayments = await Promise.all(clients.map(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        const requests = await getRequestByCodeClient(client.client_code);
        return payments.length === 0 && requests.length > 0 ? client.client_code : null;
    }));
    return clientRequestsWithoutPayments.filter(Boolean);
};