const port = 5008
const endpoint = `http://localhost:${port}/requests`

export const getRequestByCodeClient = async (code) => {
    const res = await fetch(`${endpoint}?code_client=${code}`);
    return await res.json();
};

export const getRequestByDetails = async (code) => {
    const res = await fetch(`${endpoint}?code_request=${code}`);
    return await res.json();
};

export const getAllStatus = async () => {
    const res = await fetch(`${endpoint}`);
    const data = await res.json();
    const uniqueStatus = [...new Set(data.map(request => request.status))];
    const statusObject = {};
    uniqueStatus.forEach((item, index) => {
        statusObject[index] = item;
    });

    return statusObject;
};

export const getClientsRequestByYear = async (year = 2008) => {
    const res = await fetch(`${endpoint}`);
    const data = await res.json();
    const clientCodes = new Set(data.filter(request => request.date_request?.split('-')[0] === year.toString()).map(request => request.code_client));
    return [...clientCodes].sort((a, b) => a - b);
};

export const getAllLateRequest = async () => {
    const res = await fetch(`${endpoint}`);
    const data = await res.json();
    return data.filter(request => {
        if (!request?.date_delivery || !request?.date_wait) {
            return false;
        }
        
        const [deliveryYear, deliveryMonth, deliveryDay] = request.date_delivery.split('-');
        const [waitYear, waitMonth, waitDay] = request.date_wait.split('-');

        if (!deliveryMonth || !deliveryDay || !waitMonth || !waitDay) {
            return false;
        }

        return (deliveryMonth >= waitMonth && deliveryDay > waitDay);
    }).map(({ code_request, code_client, date_wait, date_delivery }) => ({
        code_request: code_request,
        code_client: code_client,
        date_wait: date_wait,
        date_delivery: date_delivery
    }));
};

export const getAllRequestEarlyTwoDays = async () => {
    const res = await fetch(`${endpoint}?status=Entregado`);
    const data = await res.json();
    return data.filter(request => {
        if (!request?.date_delivery || !request?.date_wait) {
            return false;
        }

        const [deliveryYear, deliveryMonth, deliveryDay] = request.date_delivery?.split('-');
        const [waitYear, waitMonth, waitDay] = request.date_wait?.split('-');

        if (!deliveryMonth || !deliveryDay || !waitMonth || !waitDay) {
            return false;
        }

        return (deliveryMonth <= waitMonth && (deliveryDay - 2) < waitDay) && !(deliveryDay === waitDay);
    }).map(({ code_request, code_client, date_wait, date_delivery }) => ({
        code_request: code_request,
        code_client: code_client,
        date_wait: date_wait,
        date_delivery: date_delivery
    }));
};

export const getRejectRequestsByYear = async (year = 2009) => {
    const res = await fetch(`${endpoint}?status=Rechazado`);
    const data = await res.json();
    const uniqueRequests = new Set(data.filter(request => request.date_delivery?.split('-')[0] === year.toString()).map(({ code_request, code_client, date_wait, date_delivery, status }) => ({
        code_request: code_request,
        client_code: code_client,
        estimated_date: date_wait,
        delivery_date: date_delivery,
        status: status
    })));
    return [...uniqueRequests].sort((a, b) => a - b);
};

export const getRequestDeliveredInJanuary = async () => {
    const res = await fetch(`${endpoint}?status=Entregado`);
    const data = await res.json();
    const uniqueRequests = new Set(data.filter(request => request.date_delivery?.split('-')[1] === `01`).map(({ code_request, code_client, date_wait, date_delivery, status }) => ({
        request_code: code_request,
        client_code: code_client,
        delivery_date: date_wait,
        delivery_date: date_delivery,
        status: status
    })));
    return [...uniqueRequests].sort((a, b) => a - b);
};