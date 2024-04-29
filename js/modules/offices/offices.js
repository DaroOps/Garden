const port= 5004;
const endpoint = `http://localhost:${port}/offices`

// 1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.
// 1. (1) List the office codes and cities where offices are located.
export const getAllOfficesCitiesAndCodes = async ()=>{

    let response = await fetch(`${endpoint}`);
    let offices =  await response.json();
    let info = []
    offices.forEach(office => {
        info.push({
           office_code: office.code_office,
           office_city: office.city 
        })    
    });
    return info
}

// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
//(2) List the cities and phone numbers of offices in Spain.
export const getCitieAndPhoneOfficesByCountry = async (countryName="Spain")=>{

    let response = await fetch(`${endpoint}?country=${countryName}`);
    let offices =  await response.json();
    let info = []
    offices.forEach(office => {
        info.push({
            office_country: office.country,
            office_city: office.city,
            office_phone: office.movil
        })    
    });
    return info
}

//(6) List the addresses of offices that have clients in Fuenlabrada.
// export const getOfficeAdressesByClientsCity = async (cityName="Fuenlabrada")=>{

//     let response = await fetch(`${endpoint}?country=${countryName}`);
//     let offices =  await response.json();
//     let info = []
//     offices.forEach(office => {
//         info.push({
//             office_country: office.country,
//             office_city: office.city,
//             office_phone: office.movil
//         })    
//     });
//     return info
// }