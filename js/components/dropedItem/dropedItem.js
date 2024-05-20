export class DropedItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ['item-title', 'data'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const itemTitle = this.getAttribute('item-title') || 'tileItem';
        const data = this.getAttribute('data');
        let parsedData = {};

        try {
            parsedData = data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Failed to parse data attribute:', e);
        }

        const keyValuePairs = Object.entries(parsedData).map(([key, value]) => {
            return `<p><b>${key}: </b>${value}</p>`;
        }).join('');

        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="css/dropedItem.css">
        <div class="card__title">
          <div>${itemTitle}</div>
        </div>
        <div class="card__body">
          <div class="body__marck">
            ${keyValuePairs}
          </div>
        </div>
        <div class="card__footer">
          <div>${itemTitle}</div>
        </div>
      `;
    }
}

