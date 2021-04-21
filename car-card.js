class CarCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <h2>Car</h2>`
    }
}

customElements.define('car-card', CarCard);