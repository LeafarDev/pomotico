import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* Document */
    html {
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
    }

    body {
        margin: 0;
    }

    main {
        display: block;
    }

    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }

    /* Grouping content */
    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    pre {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    /* Text-level semantics */
    a {
        background-color: transparent;
    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline dotted;
    }

    b, strong {
        font-weight: bolder;
    }

    code, kbd, samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    small {
        font-size: 80%;
    }

    sub, sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    /* Embedded content */
    img {
        border-style: none;
    }

    /* Forms */
    button, input, optgroup, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }

    button, input {
        overflow: visible;
    }

    button, select {
        text-transform: none;
    }

    button, [type="button"], [type="reset"], [type="submit"] {
        -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }

    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    [type="checkbox"], [type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }

    [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }

    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    /* Interactive */
    details {
        display: block;
    }

    summary {
        display: list-item;
    }

    /* Misc */
    template {
        display: none;
    }

    [hidden] {
        display: none;
    }
    
    #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    /* Modal Content */
    .modal-content {
        background-color: #333;
        padding: 20px;
        border-radius: 8px;
        color: white;
        max-width: 90%;  /* Ensure the modal does not take up too much space on smaller screens */
        width: 500px;    /* Set a base width for larger screens */
        margin: 0 auto;  /* Center the modal horizontally */
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        max-height: 80vh; /* Prevent the modal from being taller than 80% of the viewport */
        overflow-y: auto; /* Add scroll if content overflows */
    }

    /* Modal Overlay */
    .modal-overlay {
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black overlay */
        position: fixed; /* Fix the overlay to the viewport */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center; /* Center the modal vertically */
    }

    /* For smaller screens, adjust the modal size */
    @media (max-width: 600px) {
        .modal-content {
            width: 90%;  /* Make modal width smaller on smaller screens */
            max-width: 95%;  /* Prevent it from going out of the screen */
        }
    }
    
    :root {
        color-scheme: light dark;
    }
    :root {
        --swal2-outline-color: rgba(100, 150, 200, 0.5);
        --swal2-dark-theme-black: #19191a;
        --swal2-dark-theme-white: #e1e1e1;

        /* Lightened versions of the colors */
        --swal2-outline-color-light: rgba(100, 150, 200, 0.6); /* lighten by 10% */
        --swal2-background: #19191a;
        --swal2-html-container-color: #e1e1e1;
        --swal2-title-color: #e1e1e1;
        --swal2-backdrop: rgba(25, 25, 26, 0.75);

        /* Footer */
        --swal2-footer-border-color: #555;
        --swal2-footer-color: #b0b0b0; /* darkened by 15% */

        /* Timer Progress Bar */
        --swal2-timer-progress-bar-background: rgba(225, 225, 225, 0.6); /* lightened by 10% */

        /* Input */
        --swal2-input-color: #e1e1e1;
        --swal2-input-background: #2a2a2b; /* lightened by 10% from black */

        /* Validation Message */
        --swal2-validation-message-background: #2a2a2b; /* lightened by 10% from black */
        --swal2-validation-message-color: #e1e1e1;

        /* Queue */
        --swal2-progress-step-background: #3b3b3d; /* lightened by 25% from black */

        /* Common Variables for Confirm and Cancel Buttons */
        --swal2-button-focus-box-shadow: 0 0 0 1px #19191a, 0 0 0 3px rgba(100, 150, 200, 0.6);

        /* Toast */
        --swal2-toast-background: #19191a;
        --swal2-toast-button-focus-box-shadow: 0 0 0 1px #19191a, 0 0 0 3px rgba(100, 150, 200, 0.6);
    }
    
    /* Applying the variables to SweetAlert2 elements */
    .swal2-popup {
        background-color: var(--swal2-background, #19191a);
        color: var(--swal2-title-color, #e1e1e1);
    }

    .swal2-html-container {
        color: var(--swal2-html-container-color, #e1e1e1);
    }

    .swal2-backdrop {
        background: var(--swal2-backdrop, rgba(25, 25, 26, 0.75));
    }

    .swal2-footer {
        border-top: 1px solid var(--swal2-footer-border-color, #555);
        color: var(--swal2-footer-color, #b0b0b0);
    }

    .swal2-timer-progress-bar {
        background: var(--swal2-timer-progress-bar-background, rgba(225, 225, 225, 0.6));
    }

    .swal2-input {
        color: var(--swal2-input-color, #e1e1e1);
        background-color: var(--swal2-input-background, #2a2a2b);
    }

    .swal2-validation-message {
        background-color: var(--swal2-validation-message-background, #2a2a2b);
        color: var(--swal2-validation-message-color, #e1e1e1);
    }

    .swal2-progress-step {
        background-color: var(--swal2-progress-step-background, #3b3b3d);
    }

    .swal2-button:focus {
        box-shadow: var(--swal2-button-focus-box-shadow, 0 0 0 1px #19191a, 0 0 0 3px rgba(100, 150, 200, 0.6));
    }

    .swal2-toast {
        background: var(--swal2-toast-background, #19191a);
    }

    .swal2-toast-button:focus {
        box-shadow: var(--swal2-toast-button-focus-box-shadow, 0 0 0 1px #19191a, 0 0 0 3px rgba(100, 150, 200, 0.6));
    }
`;
