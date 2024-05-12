import { getAllSpainClients } from "../helpers/helpers.js";

export const reports = [
    {
      queryID: "1",
      section: "Clients",
      title: "List all Spanish customers names",
      getData: getAllSpainClients,
      generateInfo: (data) => {
        let template = "";
        data.forEach(item => {
          console.log(item);
          template += `
                   <div class="report__card">
                          <div class="card__title">
                              <div>Spain</div>
                          </div>
                          <div class="card__body">
                              <div class="body__marck">
                                  <p><b>Client Name: </b>${item.name}</p>
                          </div>
                      </div>
                  </div>
              `;
        });
        return template;
      },
      
      
    },
    {
      queryID: "1",
      section: "Clients",
      title: "List all Spanish customers names",
      getData: getAllSpainClients,
      generateInfo: (data) => {
        let template = "";
        data.forEach(item => {
          console.log(item);
          template += `
                   <div class="report__card">
                          <div class="card__title">
                              <div>Spain</div>
                          </div>
                          <div class="card__body">
                              <div class="body__marck">
                                  <p><b>Client Name: </b>${item.name}</p>
                          </div>
                      </div>
                  </div>
              `;
        });
        return template;
      },
    }
    // {
    //   queryID: "2",
    //   section: "Clients",
    //   title: "List the names of clients whose orders were not delivered on time",

    // }
  
  ];