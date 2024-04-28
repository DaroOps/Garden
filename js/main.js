import {getAllOfficesCodeAndCity,
    getOfficesPhoneAndCityByCountryName
} from "./modules/offices/offices.js"


import {getEmployeeNamesandEmailbyBossCode,
    getJobTitleNamesAndEmailOfCompanyBoss
} from "./modules/employees/employees.js"




// let info = await getAllOfficesCodeAndCity();
let info = await getJobTitleNamesAndEmailOfCompanyBoss();

console.log(info);