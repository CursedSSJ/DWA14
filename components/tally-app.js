import { LitElement, html, css } from "../libs/lit-html.js";

class App extends LitElement {
  static get styles() {
    return css`
      :host {
        --color--green: #31c48d;
        --color--white: #ffffff;
        --color--dark-grey: #33333d;
        --color--medium-grey: #424250;
        --color--light-grey: #9caea3;
        display: block;
        min-height: 100vh;
        background-color: var(--color--medium-grey);
        color: var(--color--white);
        font-family: Roboto, Arial, Helvetica, sans-serif;
      }

      .header {
        text-align: center;
      }

      .header__title {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color--light-grey);
      }

      .counter {
        background: var(--color--dark-grey);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .counter__value {
        width: 100%;
        text-align: center;
        font-size: 6rem;
        font-weight: 900;
        color: var(--color--white);
        background: none;
        border: none;
        border-bottom: 1px solid var(--color--light-grey);
      }

      .counter__actions {
        display: flex;
        width: 100%;
      }

      .counter__button {
        background: none;
        flex: 1;
        color: var(--color--white);
        font-size: 3rem;
        height: 10rem;
        border: none;
        border-bottom: 1px solid var(--color--light-grey);
        transition: transform 0.3s;
      }

      .counter__button:active {
        background: var(--color--medium-grey);
      }

      .counter__button_first {
        border-right: 1px solid var(--color--light-grey);
      }

      .footer {
        background: var(--color--dark-grey);
        color: var(--color--light-grey);
        padding: 2rem;
        font-size: 0.8rem;
        text-align: center;
      }

      .footer__link {
        color: var(--color--white);
      }
    `;
  }

  static get properties() {
    return {
      value: { type: Number },
      state: { type: String },
    };
  }

  constructor() {
    super();
    this.value = 0;
    this.normal();
  }

  updateValue(newValue) {
    this.value = newValue;
    this.updateState();
  }

  add() {
    const newValue = this.value + 1;
    if (newValue <= 10) {
      this.updateValue(newValue);
    } else {
      this.maxValue();
    }
  }

  subtract() {
    const newValue = this.value - 1;
    if (newValue >= 0) {
      this.updateValue(newValue);
    } else {
      this.minValue();
    }
  }

  updateState() {
    if (this.value === 10) {
      this.maxValue();
    } else if (this.value === 0) {
      this.minValue();
    } else {
      this.state = "normal";
    }
  }

  normal() {
    this.state = "normal";
    this.value = 0;
  }

  maxValue() {
    this.state = "max";
    this.value = 10;
  }

  minValue() {
    this.state = "min";
    this.value = 0;
  }

  render() {
    return html`
      <header class="header">
        <h1 class="header__title">Tally Count</h1>
      </header>
      <main class="counter">
        <input
          class="counter__value"
          data-key="number"
          readonly
          .value=${this.value}
        />
        <div class="counter__actions">
          <button
            @click="${this.subtract}"
            class="counter__button counter__button_first"
            data-key="subtract"
          >
            -
          </button>
          <button @click="${this.add}" class="counter__button" data-key="add">
            +
          </button>
        </div>
        <div>Current Phase: ${this.state}</div>
      </main>
      <footer class="footer">
        Inspired by
        <a class="footer__link" href="http://tallycount.app/">Tally Count</a>
        Note that this is merely a student practice project for learning
        JavaScript.
      </footer>
    `;
  }
}

customElements.define("tally-app", App);
