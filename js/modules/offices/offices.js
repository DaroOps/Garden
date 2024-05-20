import {getSalesRepsWithFruitPurchases} from "../helper.js"

// import {  } from `./clients.js`;
// import {  } from `./employees.js`;
// import {  } from `./products.js`;
// import {  } from `./request_details.js`;
// import { } from `./requests.js`;

const port= 5004;
const endpoint = `http://localhost:${port}/offices`


export const getAllOfficesCodeAndCity = async () => {
    const res = await fetch(`${endpoint}`);
    const data = await res.json();
    return data.map(({ code_office, city }) => ({ codigo: code_office, ciudad: city }));
};

export const getAllOfficesAndPhonesFromSpain = async () => {
    const res = await fetch(`${endpoint}?country=España`);
    const data = await res.json();
    return data.map(({ city, movil }) => ({ ciudad: city, telefono: movil }));
};

export const getOfficesByCode = async (code) => {
    const res = await fetch(`${endpoint}?code_office=${code}`);
    return await res.json();
};

export const OfficesExcludingSalesRepsWithFruitPurchases = async () => {
    const res = await fetch(`${endpoint}`);
    const offices = await res.json();
    const salesRepsWithFruitPurchases = await getSalesRepsWithFruitPurchases(offices);
    const officesWithoutSalesReps = offices.filter(office => !salesRepsWithFruitPurchases.some(salesRep => salesRep.office_code === office.code_office));
    return officesWithoutSalesReps.map(office => office.code_office);
};

