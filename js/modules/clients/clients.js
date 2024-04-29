const port = 5001
const endpoint = `http://localhost:${port}/clients`

//

export const getAllClientsNameByCountry = async (countryName="Spain")=>{

    let response = await fetch(`${endpoint}?country=${countryName}`);
    let clients =  await response.json();
    let info = []
    clients.forEach(client => {
        info.push({
            client_name : client.client_name
        })    
    });

    return info

}

export const getAllClientsByRegionAndSalesManagerCodes = async (clientsRegion = "Madrid", employeeID1 = 11 , employeeID2 = 30 ) => {
    let res = await fetch(`http://localhost:5501/clients?region=${clientsRegion}`)
    let clients = await res.json();
    let dataUpdate = []
    clients.forEach(val => {
        if (val.code_employee_sales_manager == employeeID1 || val.code_employee_sales_manager == employeeID2) {
            dataUpdate.push({
                nombre: val.client_name,
                region: val.region,
                representante_de_ventas: val.code_employee_sales_manager
            })
        }
    })
    return dataUpdate;
}


export const getClientsAndEmployeesNames = async () => {
    const res = await fetch("http://localhost:5501/clients");
    const clients = await res.json();
  
    for (const client of clients) {
      const employee = await getEmployByCode(client.code_employee_sales_manager);
      client.name_employee = `${employee.name}`;
      client.lastnames_employee = `${employee.lastname1} ${employee.lastname2}`;
    }
  
    return clients;
  };
