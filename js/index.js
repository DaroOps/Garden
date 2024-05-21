import { DropCard, DropedItem } from "./components/components.js";
import { eventBus } from "./global.js";
import { clientsWhoReceivedTheirRequestLate, getAllClientsInMadrid, getAllEmployeesNotSalesRepresentative, getAllLateRequest, getAllNameSurnamesAndEmailInCargeOfBossSeven, getAllOfficesAndPhonesFromSpain, getAllOfficesCodeAndCity, getAllPaymentStatus, getAllRequestEarlyTwoDays, getAllSpainClients, getAllStatus, getCEOInformation, getClientCodesPaymentsByYear, getClientsAndEmployeesNames, getClientsAndRepresentativesWithOfficeCity, getClientsWhoDidntMadePaymentsAndTheyCity, getClientsWhoMadePayment, getClientsWhoMadePaymentsAndTheyCity, getClientsWhoNotMadePayment, getEmployeesWithBoss, getEmployeesWithBosses, getOfficeAddressOfClientsFromFuenlabrada, getPaymentsByYearAndPaypal, getProductsWithGammaOrnamentales, getRejectRequestsByYear, getRequestDeliveredInJanuary } from "./modules/helper.js";

customElements.define('drop-card', DropCard)
customElements.define('droped-item', DropedItem)


//#region single_table
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

eventBus.subscribe('single14', async () => {
    const data = await getAllPaymentStatus();
    eventBus.publish('single14-d', data);
});

eventBus.subscribe('single15', async () => {
    const data = await getProductsWithGammaOrnamentales();
    eventBus.publish('single15-d', data);
});

eventBus.subscribe('single16', async () => {
    const data = await getAllClientsInMadrid();
    eventBus.publish('single16-d', data);
});
// #endregion

eventBus.subscribe('multi-i1', async () => {
    const data = await getClientsAndEmployeesNames();
    eventBus.publish('multi-i1-d', data);
});

eventBus.subscribe('multi-i2', async () => {
    const data = await getClientsAndEmployeesNames();
    eventBus.publish('multi-i2-d', data);
});

eventBus.subscribe('multi-i3', async () => {
    const data = await getClientsWhoNotMadePayment();
    const need = data.map(({ client_name, name_employee }) => ({ client_name, name_employee }));
    eventBus.publish('multi-i3-d', need);
});

eventBus.subscribe('multi-i4', async () => {
    const data = await getClientsWhoMadePaymentsAndTheyCity();
    eventBus.publish('multi-i4-d', data);
});

eventBus.subscribe('multi-i5', async () => {
    const data = await getClientsWhoDidntMadePaymentsAndTheyCity();
    eventBus.publish('multi-i5-d', data);
});

eventBus.subscribe('multi-i6', async () => {
    const data = await getOfficeAddressOfClientsFromFuenlabrada();
    eventBus.publish('multi-i6-d', data);
});

eventBus.subscribe('multi-i7', async () => {
    const data = await getClientsAndRepresentativesWithOfficeCity();
    eventBus.publish('multi-i7-d', data);
});

eventBus.subscribe('multi-i8', async () => {
    const data = await getEmployeesWithBoss();
    eventBus.publish('multi-i8-d', data);
});

eventBus.subscribe('multi-i9', async () => {
    const data = await getEmployeesWithBosses();
    eventBus.publish('multi-i9-d', data);
});

eventBus.subscribe('multi-i10', async () => {
    const data = await clientsWhoReceivedTheirRequestLate();
    eventBus.publish('multi-i10-d', data);
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
              <drop-card owner="Garden" title="1.(multi-i) Obtain a list with the name of each client and the first and last name of their sales representative." category="Client" data-event-name="multi-i1"></drop-card>
              <drop-card owner="Garden" title="2.(multi-i) Shows the name of customers who have made payments along with the name of their sales representatives." category="Client" data-event-name="multi-i2"></drop-card>
              <drop-card owner="Garden" title="3.(multi-i) Displays the name of customers who have NOT made payments along with the name of their sales representatives." category="Client" data-event-name="multi-i3"></drop-card>
              <drop-card owner="Garden" title="4.(multi-i) Returns the name of customers who have made payments and the name of their representatives along with the city of the office to which the representative belongs." category="Client" data-event-name="multi-i4"></drop-card>
              <drop-card owner="Garden" title="5.(multi-i) Returns the name of customers who have NOT made payments and the name of their representatives along with the city of the office to which the representative belongs." category="Client" data-event-name="multi-i5"></drop-card>
              <drop-card owner="Garden" title="6.(multi-i) List the address of the offices that have clients in Fuenlabrada." category="Client" data-event-name="multi-i6"></drop-card>
              <drop-card owner="Garden" title="7.(multi-i) Returns the name of the clients and the name of their representatives along with the city of the office to which the representative belongs." category="Client" data-event-name="multi-i7"></drop-card>
              <drop-card owner="Garden" title="10.(multi-i) Returns the name of customers to whom an order has not been delivered on time." category="Client" data-event-name="multi-i10"></drop-card>
              
              `
        }
        if (e.target.innerHTML == "employees") {
            report__details.innerHTML = /*html*/`
                <drop-card owner="Garden" title="3.(single) Returns a list with the first name, last name and email of the employees whose boss has a boss code equal to 7." category="Employee" data-event-name="single3"></drop-card>
                <drop-card owner="Garden" title="4.(single) Returns the position name, first name, last name and email of the head of the company." category="CEO" data-event-name="single4"></drop-card>
                <drop-card owner="Garden" title="5.(single) Returns a list with the first name, last name and position of those employees who are not sales representatives." category="Employee" data-event-name="single5"></drop-card>
                <drop-card owner="Garden" title="8.(multi-i) Returns a list with the names of the employees along with the names of their bosses." category="Employee" data-event-name="multi-i8"></drop-card>
                <drop-card owner="Garden" title="9.(multi-i) Returns a list showing the name of each employee, the name of their boss, and the name of their boss's boss." category="Employee" data-event-name="multi-i9"></drop-card>

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
            <drop-card owner="Garden" title="13.(single) Returns a list with all the payments that were made in 2008 through Paypal. Order the result from highest to lowest." category="Payment" data-event-name="single13"></drop-card>
            <drop-card owner="Garden" title="14.(single) Returns a list with all the payment methods that appear in the payment table." category="Payment" data-event-name="single14"></drop-card>
            
              `;
        }



        if (e.target.innerHTML == "gama") {
            report__details.innerHTML = /*html*/`
              `;
        }

        if (e.target.innerHTML == "product") {
            report__details.innerHTML = /*html*/`
            <drop-card owner="Garden" title="15.(single) Returns a list with all the products that belong to the Ornamental range and that have more than 100 units in stock. The list must be ordered by their sales price, showing the highest prices first." category="Product" data-event-name="single15"></drop-card>
            <drop-card owner="Garden" title="11.(multi-i) Returns a list of the different product ranges that each customer has purchased." category="Product" data-event-name="multi-i11"></drop-card>
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