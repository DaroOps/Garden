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
    const res = await fetch("${endpoint}");
    const data = await res.json();
    return [...new Set(data.map(request => request.status))];
};

export const getClientsRequestByYear = async (year = 2008) => {
    const res = await fetch("${endpoint}");
    const data = await res.json();
    const clientCodes = new Set(data.filter(request => request.date_request?.split('-')[0] === year.toString()).map(request => request.code_client));
    return [...clientCodes].sort((a, b) => a - b);
};

export const getAllLateRequest = async () => {
    const res = await fetch("${endpoint}?status=Entregado");
    const data = await res.json();
    return data.filter(request => {
        const [deliveryYear, deliveryMonth, deliveryDay] = request.date_delivery?.split('-');
        const [waitYear, waitMonth, waitDay] = request.date_wait?.split('-');
        return (deliveryMonth >= waitMonth && deliveryDay > waitDay);
    }).map(({ code_request, code_client, date_wait, date_delivery }) => ({
        Codigo_del_pedido: code_request,
        Codigo_del_cliente: code_client,
        Fecha_esperada: date_wait,
        Fecha_de_entrega: date_delivery
    }));
};

export const getAllRequestEarlyTwoDays = async () => {
    const res = await fetch("${endpoint}?status=Entregado");
    const data = await res.json();
    return data.filter(request => {
        const [deliveryYear, deliveryMonth, deliveryDay] = request.date_delivery?.split('-');
        const [waitYear, waitMonth, waitDay] = request.date_wait?.split('-');
        return (deliveryMonth <= waitMonth && (deliveryDay - 2) < waitDay) && !(deliveryDay === waitDay);
    }).map(({ code_request, code_client, date_wait, date_delivery }) => ({
        Codigo_del_pedido: code_request,
        Codigo_del_cliente: code_client,
        Fecha_esperada: date_wait,
        Fecha_de_entrega: date_delivery
    }));
};

export const getRejectRequestsByYear = async (year = 2009) => {
    const res = await fetch("${endpoint}?status=Rechazado");
    const data = await res.json();
    const uniqueRequests = new Set(data.filter(request => request.date_delivery?.split('-')[0] === year.toString()).map(({ code_request, code_client, date_wait, date_delivery, status }) => ({
        Codigo_del_pedido: code_request,
        Codigo_del_cliente: code_client,
        Fecha_esperada: date_wait,
        Fecha_de_entrega: date_delivery,
        Estado: status
    })));
    return [...uniqueRequests].sort((a, b) => a - b);
};

export const getRequestDeliveredInJanuary = async () => {
    const res = await fetch("${endpoint}?status=Entregado");
    const data = await res.json();
    const uniqueRequests = new Set(data.filter(request => request.date_delivery?.split('-')[1] === "01").map(({ code_request, code_client, date_wait, date_delivery, status }) => ({
        Codigo_del_pedido: code_request,
        Codigo_del_cliente: code_client,
        Fecha_esperada: date_wait,
        Fecha_de_entrega: date_delivery,
        Estado: status
    })));
    return [...uniqueRequests].sort((a, b) => a - b);
};