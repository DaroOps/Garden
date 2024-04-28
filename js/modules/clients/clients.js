const port = 5001
const endpoint = `http://localhost:${port}/clients`

export const getAllClientsNameByCountry = async (countryName="Spain")=>{

    let response = fetch(`${endpoint}?country=${countryName}`);
    let clients = await response.json()
    let info = []

    clients.forEach(client => {
        info.push({
            client_name : client.client_name
        })    
    });

    return info

}