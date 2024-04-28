import { getAllClientsNameByCountry } from "../js/modules/clients/clients.js";

export const reports = [
    {
      queryID: "1",
      section: "Clients",
      title: "List all Spanish customers names",
      getData: getAllClientsNameByCountry,
      generateInfo: (data) => {
        let template = "";
        data.forEach(item => {
          console.log(data);
          template += `
                   <div class="report__card">
                          <div class="card__title">
                              <div>Spain</div>
                          </div>
                          <div class="card__body">
                              <div class="body__marck">
                                  <p><b>Client Name: </b>${item.client_name}</p>
                          </div>
                      </div>
                  </div>
              `;
        });
        return template;
      },
    }
  
  ];