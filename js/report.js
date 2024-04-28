import {reports} from "./modules/reports/reports.js" 

const createReport = (report) => {
  let queryReportDetails = document?.querySelector("#report__details");

  let fragment = ` <details id="queryDetails${report.queryID}">
                        <summary>
                            <div class="details__description">${report.section}: </div>
                            <div class="details__container">
                                <p class= "moving-text">${report.title}</p>
                            </div>
                        </summary>
                        <div class="report__container"></div>
                     </details>
                     `;

  queryReportDetails.innerHTML += fragment;

  generateInfo(report);
};

const generateInfo = (report) => {
  const queryDetails = document?.querySelector(`#queryDetails${report.queryID}`);

  queryDetails.addEventListener("click", async () => {
    let [, report__container] = queryDetails.children;

    if (!report__container.innerHTML) {
      let data = await report.getData();
      report__container.innerHTML = report.generateInfo(data);
    }
  });
};


reports.forEach(report  => createReport(report))