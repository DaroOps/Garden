// import {getAllOfficesCodeAndCity,
//     getOfficesPhoneAndCityByCountryName
// } from "./modules/offices/offices.js"


// import {getEmployeeNamesandEmailbyBossCode,
//     getJobTitleNamesAndEmailOfCompanyBoss
// } from "./modules/employees/employees.js"

import { DropCard, DropedItem } from "./components/components.js";
import { eventBus } from "./global.js";
import { getAllClientsInMadrid, getAllEmployeesNotSalesRepresentative, getAllLateRequest, getAllNameSurnamesAndEmailInCargeOfBossSeven, getAllOfficesAndPhonesFromSpain, getAllOfficesCodeAndCity, getAllRequestEarlyTwoDays, getAllSpainClients, getAllStatus, getCEOInformation, getClientCodesPaymentsByYear, getPaymentsByYear, getPaymentsByYearAndPaypal, getRejectRequestsByYear, getRequestDeliveredInJanuary } from "./modules/helper.js";

customElements.define('drop-card', DropCard)
customElements.define('droped-item', DropedItem)






eventBus.subscribe('single1', async () => {
    const data = await getAllOfficesCodeAndCity();
    eventBus.publish('single1-d', data);
});

eventBus.subscribe('single2', async () => {
    const data = await getAllOfficesAndPhonesFromSpain();
    eventBus.publish('single2-d', data);
});

eventBus.subscribe('single3', async () => {
    const data = await getAllNameSurnamesAndEmailInCargeOfBossSeven();
    eventBus.publish('single3-d', data);
});

eventBus.subscribe('single4', async () => {
    const data = await getCEOInformation();
    eventBus.publish('single4-d', data);
});

eventBus.subscribe('single5', async () => {
    const data = await getAllEmployeesNotSalesRepresentative();
    eventBus.publish('single5-d', data);
});

eventBus.subscribe('single6', async () => {
    const data = await getAllSpainClients();
    eventBus.publish('single6-d', data);
});

eventBus.subscribe('single7', async () => {
    const data = await getAllStatus();
    console.log(data);
    eventBus.publish('single7-d', data);
});

eventBus.subscribe('single8', async () => {
    const data = await getClientCodesPaymentsByYear();
    eventBus.publish('single8-d', data);
});

eventBus.subscribe('single9', async () => {
    const data = await getAllLateRequest();
    eventBus.publish('single9-d', data);
});

eventBus.subscribe('single10', async () => {
    const data = await getAllRequestEarlyTwoDays();
    eventBus.publish('single10-d', data);
});

eventBus.subscribe('single11', async () => {
    const data = await getRejectRequestsByYear();
    eventBus.publish('single11-d', data);
});

eventBus.subscribe('single12', async () => {
    const data = await getRequestDeliveredInJanuary();
    eventBus.publish('single12-d', data);
});

eventBus.subscribe('single13', async () => {
    const data = await getPaymentsByYearAndPaypal();
    eventBus.publish('single13-d', data);
});



eventBus.subscribe('single16', async () => {
    const data = await getAllClientsInMadrid();
    eventBus.publish('single16-d', data);
});

let btn = document.querySelectorAll("button")
let report__menu = document.querySelectorAll(".report__menu button")
let report__details = document.querySelector(".report__details")
btn.forEach(val => {
    val.addEventListener("click", (e) => {
        for (let val of report__menu) val.classList.remove('report__active');
        e.target.classList.add("report__active")

        if (e.target.innerHTML == "clients") {
            report__details.innerHTML = /*html*/`
              <drop-card owner="Garden" title="6.(single) Returns a list with the name of all Spanish clients." category="Client" data-event-name="single6"></drop-card>
              <drop-card owner="Garden" title="16.(single) Returns a list with all the clients who are from the city of Madrid and whose sales representative has the employee code 11 or 30." category="Client" data-event-name="single16"></drop-card>

              `
        }
        if (e.target.innerHTML == "employees") {
            report__details.innerHTML = /*html*/`
                <drop-card owner="Garden" title="3.(single) Returns a list with the first name, last name and email of the employees whose boss has a boss code equal to 7." category="Employee" data-event-name="single3"></drop-card>
                <drop-card owner="Garden" title="4.(single) Returns the position name, first name, last name and email of the head of the company." category="CEO" data-event-name="single4"></drop-card>
                <drop-card owner="Garden" title="5.(single)Returns a list with the first name, last name and position of those employees who are not sales representatives." category="Employee" data-event-name="single5"></drop-card>

              `;
        }

        if (e.target.innerHTML == "offices") {
            report__details.innerHTML = /*html*/`
            <drop-card owner="Garden" title="1.(single) Returns a list with the office code and the city where there are offices" category="Office" data-event-name="single1"></drop-card>
            <drop-card owner="Garden" title="2.(single) Returns a list with the city and telephone number of the offices in Spain." category="Office" data-event-name="single2"></drop-card>
            
              `;
        }

        if (e.target.innerHTML == "payments") {
            report__details.innerHTML = /*html*/`
            <drop-card owner="Garden" title="8.(single) Returns a list with the customer code of those customers who made a payment in 2008." category="Payment" data-event-name="single8"></drop-card>
            <drop-card owner="Garden" title="13.(single)  Returns a list with all the payments that were made in 2008 through Paypal. Order the result from highest to lowest." category="Payment" data-event-name="single13"></drop-card>

           
              `;
        }



        if (e.target.innerHTML == "gama") {
            report__details.innerHTML = /*html*/`
              `;
        }

        if (e.target.innerHTML == "products") {
            report__details.innerHTML = /*html*/`
              `;
        }

        if (e.target.innerHTML == "request details") {
            report__details.innerHTML = /*html*/`
              `;
        }
        if (e.target.innerHTML == "requests") {
            report__details.innerHTML = /*html*/`
       
            <drop-card owner="Garden" title="7.(single) Returns a list with the different states through which an order can go." category="Request" data-event-name="single7"></drop-card>
            <drop-card owner="Garden" title="9.(single) Returns a list with the order code, customer code, expected date and delivery date of the orders that have not been delivered on time." category="Late-Request" data-event-name="single9"></drop-card>
            <drop-card owner="Garden" title="10.(single) Returns a list with the order code, customer code, expected date and delivery date of orders whose delivery date was at least two days before the expected date." category="Early-Request" data-event-name="single10"></drop-card>
            <drop-card owner="Garden" title="11.(single) Returns a list of all orders that were rejected in 2009." category="Rejected-Request" data-event-name="single11"></drop-card>
            <drop-card owner="Garden" title="12.(single)Returns a list of all orders that have been delivered in the month of January of any year." category="January-Request" data-event-name="single12"></drop-card>

        
              `;
        }

    })
})
let [clients] = report__menu
clients.click();