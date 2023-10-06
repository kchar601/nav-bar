import './src/nav-bar.js';

document.body.querySelector("nav-bar").addEventListener('theme-has-changed', function(e) {
    console.log("Theme has changed to " + e.detail.value);
    document.body.classList.toggle("dark");
    });