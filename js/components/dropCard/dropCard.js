import { eventBus } from "../../global.js";

export class DropCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.manageClickCard = this.manageClickCard.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.dataEventName = null;
        this.category = null
    }

    static get observedAttributes() {
        return ['owner', 'title', 'data-event-name', 'category'];
    }

    connectedCallback() {
        this.render();
        this.dataEventName = this.getAttribute('data-event-name');
        this.category = this.getAttribute('category')
        eventBus.subscribe(this.dataEventName + "-d", this.handleData.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const ownerGroup = this.getAttribute('owner') || 'TEST';
        const titleDescription = this.getAttribute('title') || 'testing';

        this.shadowRoot.innerHTML = /*html*/`
      <link rel="stylesheet" href="css/dropCard.css">
      <details id="queryDetails">
        <summary>
          <div class="details__description">${ownerGroup}: </div>
          <div class="details__container">
            <p class="moving-text">${titleDescription}</p>
          </div>
        </summary>
        <div class="report__container"></div>
      </details>
    `;

        this.shadowRoot.querySelector("#queryDetails").addEventListener('click', this.manageClickCard);
    }

    manageClickCard() {
        const isEmpty = this.isEmpty();
        console.log("isEmpty", isEmpty);

        if (isEmpty && this.dataEventName) {
            eventBus.publish(this.dataEventName, null);
            console.log(`Evento ${this.dataEventName} emitido`);
        }
    }

    isEmpty() {
        const [, reportContainer] = this.shadowRoot.querySelector("#queryDetails").children;
        return !reportContainer.innerHTML;
    }

    handleData(data) {
        console.log(`Datos recibidos para el evento ${this.dataEventName}:`, data);

        const reportContainer = this.shadowRoot.querySelector(".report__container");
        reportContainer.innerHTML = '';

        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                const dropedItem = document.createElement('droped-item');
                dropedItem.setAttribute('item-title', `${this.category} ${index + 1}`);
                dropedItem.setAttribute('data', JSON.stringify(item));
                reportContainer.appendChild(dropedItem);
            });
        } else if (typeof data === 'object' && data !== null) {
            const dropedItem = document.createElement('droped-item');
            dropedItem.setAttribute('item-title', `${this.category}`);
            dropedItem.setAttribute('data', JSON.stringify(data));
            reportContainer.appendChild(dropedItem);
        }
    }
}