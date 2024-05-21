import { getEmployByCode, getOfficesByCode, getPaymentByClientCode, 
    getRequestByCodeClient, getAllLateRequest } from "../helper.js";

const port = 5001;
const endpoint = `http://localhost:${port}/clients`;

export const getNameByClientCode = async (code) => {
    const res = await fetch(`${endpoint}?client_code=${code}`);
    const [client] = await res.json();
    return client.client_name;
};

export const getAllClients = async () => {
    const res = await fetch(`${endpoint}`);
    const data = await res.json();
    return data;
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
    return data
        .filter(({ code_employee_sales_manager }) => [11, 30].includes(code_employee_sales_manager))
        .map(({ client_name, region, code_employee_sales_manager }) => ({
            nombre: client_name,
            region,
            representante_de_ventas: code_employee_sales_manager,
        }));
};

const getEmployeeInfo = async (code) => {
    if (code) {
        const [employee] = await getEmployByCode(code);
        if (employee) {
            const { name, lastname1, lastname2, code_office } = employee;
            return { name_employee: `${name} ${lastname1} ${lastname2}`, code_office };
        }
    }
    return {};
};

const getOfficeInfo = async (code) => {
    if (code) {
        const [office] = await getOfficesByCode(code);
        if (office) {
            const { city } = office;
            return { city_office: city };
        }
    }
    return {};
};

const getClientsWithEmployeeInfo = async (clients) => {
    return await Promise.all(clients.map(async (client) => {
        const { code_employee_sales_manager, ...clientData } = client;
        const employeeInfo = await getEmployeeInfo(code_employee_sales_manager);
        return { ...clientData, ...employeeInfo };
    }));
};

export const getClientsWithEmployeeAndOfficeInfo = async (clients) => {
    return await Promise.all(clients.map(async (client) => {
        const { code_employee_sales_manager, ...clientData } = client;
        const employeeInfo = await getEmployeeInfo(code_employee_sales_manager);
        const officeInfo = await getOfficeInfo(employeeInfo.code_office);
        return { ...clientData, ...employeeInfo, ...officeInfo };
    }));
};

export const getClientsAndEmployeesNames = async () => {
    const clients = await getAllClients();
    const result = await getClientsWithEmployeeInfo(clients);
    return result.map(({ client_name, name_employee }) => ({ client_name, name_employee }));
};

export const getClientsWhoMadePayment = async () => {
    const clients = await getAllClients();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    const filteredClients = await Promise.all(
        clientsWithEmployeeInfo.map(async (client) => {
            const payments = await getPaymentByClientCode(client.client_code);
            return payments.length > 0 ? client : null;
        })
    );
    return filteredClients.filter(Boolean);
};

export const getClientsWhoNotMadePayment = async () => {
    const clients = await getAllClients();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    const filteredClients = await Promise.all(
        clientsWithEmployeeInfo.map(async (client) => {
            const payments = await getPaymentByClientCode(client.client_code);
            return payments.length === 0 ? client : null;
        })
    );
    return filteredClients.filter(Boolean);
};

export const getClientsWhoMadePaymentsAndTheyCity = async () => {
    const clients = await getAllClients();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    const filteredClients = await Promise.all(
        clientsWithEmployeeInfo.map(async (client) => {
            const payments = await getPaymentByClientCode(client.client_code);
            return payments.length > 0 ? client : null;
        })
    );
    return await getClientsWithEmployeeAndOfficeInfo(filteredClients.filter(Boolean));
};

export const getClientsWhoDidntMadePaymentsAndTheyCity = async () => {
    const clients = await getAllClients();
    const clientsWithEmployeeInfo = await getClientsWithEmployeeInfo(clients);
    const filteredClients = await Promise.all(
        clientsWithEmployeeInfo.map(async (client) => {
            const payments = await getPaymentByClientCode(client.client_code);
            return payments.length === 0 ? client : null;
        })
    );
    return await getClientsWithEmployeeAndOfficeInfo(filteredClients.filter(Boolean));
};

export const getOfficeAddressOfClientsFromFuenlabrada = async () => {
    const clients = await getAllClients();
    const clientsFromFuenlabrada = clients.filter(client => client.city === 'Fuenlabrada');
    return await getClientsWithEmployeeAndOfficeInfo(clientsFromFuenlabrada);
};

export const getClientsEmploy = async () => {
    const clients = await getAllClients();
    return await getClientsWithEmployeeInfo(clients);
};

export const clientsWhoReceivedTheirRequestLate = async () => {
    const lateRequests = await getAllLateRequest();
    console.log("late", lateRequests);

    const clientCodes = [...new Set(lateRequests.map(({ code_client }) => code_client))];
    console.log("recived reques late", clientCodes);
    const clients = await Promise.all(clientCodes.map(async (code) => {
        const clientName = await getNameByClientCode(code);
        return { client_code: code, client_name: clientName };
    }));
    return clients;
};

export const getClientsWithoutPayments = async () => {
    const clients = await getAllClients();
    const clientsWithoutPayments = await Promise.all(clients.map(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        return payments.length === 0 ? client.client_name : null;
    }));
    return clientsWithoutPayments.filter(Boolean);
};

export const getClientsWithoutRequest = async () => {
    const clients = await getAllClients();
    const clientsWithoutRequests = await Promise.all(clients.map(async (client) => {
        const requests = await getRequestByCodeClient(client.client_code);
        return requests.length === 0 ? { code_client: client.client_code, name: client.client_name } : null;
    }));
    return clientsWithoutRequests.filter(Boolean);
};

export const getClientsWithoutPaymentsAndRequest = async () => {
    const clients = await getAllClients();
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
    const clients = await getAllClients();
    const clientRequestsWithoutPayments = await Promise.all(clients.map(async (client) => {
        const payments = await getPaymentByClientCode(client.client_code);
        const requests = await getRequestByCodeClient(client.client_code);
        return payments.length === 0 && requests.length > 0 ? client.client_code : null;
    }));
    return clientRequestsWithoutPayments.filter(Boolean);
};

export const getClientsAndRepresentativesWithOfficeCity = async () => {
    const clients = await getAllClients();
    const clientsWithRepAndOfficeCity = await Promise.all(clients.map(async (client) => {
        const { code_employee_sales_manager, client_name } = client;
        const employeeInfo = await getEmployeeInfo(code_employee_sales_manager);
        const officeInfo = await getOfficeInfo(employeeInfo.code_office);
        return {
            client_name: client_name,
            representative_name: employeeInfo.name_employee,
            office_city: officeInfo.city_office
        };
    }));
    return clientsWithRepAndOfficeCity;
};
