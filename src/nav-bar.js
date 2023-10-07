import { LitElement, html, css } from 'lit';

class NavBar extends LitElement {
  static get properties() {
    return {
    logo: { type: String },
    header: { type: String },
    links: { type: Array },
    images: { type: Array },
    imageStyles: { type: Array },
    darkTheme: {type: Array},
    lightTheme: {type: Array},
    dark: { type: Boolean },
    }
  }

  static get styles() {
    return css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-size: calc(10px + 2vmin);
      --nav-bar-width: 196px;
      width: var(--nav-bar-width);
      margin: 0;
      position: absolute;
      background-color: var(--nav-bar-background-color);
    }

    .wrapper{
      display: flex;
      flex-direction: column;
      margin: 0pxA,kk 4px 0px 4px;
      width: var(--nav-bar-width);
    }
    
    h1{
      margin: 0;
      font-size: calc(var(--nav-bar-width) / 8);
      display:none;
      margin-top: 32px;
      margin-bottom: 16px;
      align-self: center;
    }
    
    a{
      text-decoration: none;
    }

    @media (max-width: 600px) {
      h1{
        display: block;
      }
      .main-img{
        display: none;
      }
    }

    .main-img{
      width: 124px;
      margin: auto;
      margin-bottom: 8px;
      margin-top:48px;
      border-radius: 1.25rem;
    }

    section{
      background-color: var(--nav-bar-background-color);
      display: flex;
      margin: auto;
      margin-top: 8px;
      margin-bottom: 4px;
    }

    .nav-link{ 
      display: flex;
      margin-left: 4px;
      margin-right: 4px;
      background-color: var(--nav-bar-background-color);
      border-radius: 8px;
    }

    .nav-imgLink{
      width: 32px;
      height: 32px;
      pointer-events: none;
      padding: 8px 8px 8px 8px;
      -webkit-filter: var(--inverted);
      filter: var(--inverted);
    }
    .nav-link:hover{
      background-color: var(--nav-bar-focus-color);
    }

    .wide {
      width: 48px;
    }
    
    .vert{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 8px;
    }

    .nav-button{
      color: var(--nav-bar-text-color);
      margin: auto;
      font-size: calc(var(--nav-bar-width) / 10);
      align-self: center;
      background-color: var(--nav-bar-background-color);
      border-radius: 8px;
      padding: 16px 32px 16px 32px;
      border: none;
    }
    
    .nav-button-wrap{
      display:flex;
      margin: auto;
      background-color: transparent;
      margin-bottom: 4px;
    }

    .nav-button:hover, .nav-button:focus{
      background-color: var(--nav-bar-focus-color);
    }

    .themeBtn{
      margin-bottom: 8px;
      align-self: flex-end;
    }

    .icons{
      fill: var(--nav-bar-text-color);
    }

    @media (height < 600px) {
      
    }
    `
    }
  

  constructor() {
    super();
    this.logo = '';
    this.header = 'My app';
    this.darkTheme = ['black', 'darkgrey', 'white'];
    this.lightTheme = ['white', 'lightgrey', 'black'];
    this.dark=false;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (changedProperties.has('dark')) {
      this.__updateDarkMode();
    }
  }

  __updateDarkMode() {
    if (this.dark) {
      this.style.setProperty('--nav-bar-background-color', this.darkTheme[0]);
      this.style.setProperty('--nav-bar-text-color', this.darkTheme[2]);
      this.style.setProperty('--inverted', 'invert(0)');
      this.style.setProperty('--nav-bar-focus-color', this.darkTheme[1]);
    } else {
      this.style.setProperty('--nav-bar-background-color', this.lightTheme[0]);
      this.style.setProperty('--nav-bar-text-color', this.lightTheme[2]);
      this.style.setProperty('--inverted', 'invert(1)');
      this.style.setProperty('--nav-bar-focus-color', this.lightTheme[1]);
    }
    this.dispatchEvent(new CustomEvent('theme-has-changed', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        value: this.dark,
      }
    }));
  }

  __toggleDarkMode() {
    this.dark = !this.dark;
    this.__updateDarkMode();
  }

  __createLinks(links, images, imageStyles){
    let buttons = [];
    for (let i = 0; i < links.length; i++) {
  
      buttons.push(html`
        <a href="${links[i]}" target="_blank" class="nav-link">
          <img src="${images[i]}" class="nav-imgLink ${imageStyles[i]}">
        </a>
        `);
    }
    return buttons;
  }

  __createNav(link, title){
    let buttons = [];
    buttons.push(html`
      <a href="${link}" class="nav-button-wrap" tabindex="-1">
        <button class="nav-button">${title}</button>
      </a>
      `);
    return buttons;
  }

  render() {
    var theme = this.dark ? html`<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="icons"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>` : html`<svg xmlns="http://www.w3.org/2000/svg" class="icons" height="1em" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`;


    return html`
    <div class="wrapper">
      <img src="${this.logo}" class="main-img">
      <h1>${this.header}</h1>
      <section class="img-Section">
      ${this.__createLinks(this.links, this.images, this.imageStyles)}
      </section>
      <section class="vert">
      ${this.__createNav("#Home", "Home")}
      ${this.__createNav("#Resume", "Resume")}
      ${this.__createNav("#Projects", "Projects")}
      ${this.__createNav("#Contact", "Contact")}
      ${this.__createNav("#About", "About")}
      </section>
    </div>
    <button @click="${this.__toggleDarkMode}" class="themeBtn nav-button">${theme}</button>
    `;
  }
}

customElements.define('nav-bar', NavBar);