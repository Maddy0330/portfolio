/* ==========================================================
   utils.js
========================================================== */

export const Utils = {

    /* ==========================================
        SELECT ELEMENT
    ========================================== */

    $(selector) {

        return document.querySelector(selector);

    },

    /* ==========================================
        SELECT ALL
    ========================================== */

    $$(selector) {

        return document.querySelectorAll(selector);

    },

    /* ==========================================
        CREATE ELEMENT
    ========================================== */

    create(tag, className = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        return element;

    },

    /* ==========================================
        SET TEXT
    ========================================== */

    setText(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    },

    /* ==========================================
        SHOW
    ========================================== */

    show(element) {

        if (typeof element === "string") {

            element = document.getElementById(element);

        }

        if (element) {

            element.style.display = "";

        }

    },

    /* ==========================================
        HIDE
    ========================================== */

    hide(element) {

        if (typeof element === "string") {

            element = document.getElementById(element);

        }

        if (element) {

            element.style.display = "none";

        }

    },

    /* ==========================================
        TOGGLE
    ========================================== */

    toggle(element) {

        if (typeof element === "string") {

            element = document.getElementById(element);

        }

        if (!element) return;

        if (element.style.display === "none") {

            element.style.display = "";

        }

        else {

            element.style.display = "none";

        }

    },

    /* ==========================================
        SCROLL
    ========================================== */

    scrollTo(id) {

        const element = document.getElementById(id);

        if (!element) return;

        window.scrollTo({

            top: element.offsetTop - 80,

            behavior: "smooth"

        });

    },

    /* ==========================================
        DEBOUNCE
    ========================================== */

    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    },

    /* ==========================================
        FORMAT TITLE
    ========================================== */

    title(text) {

        return text
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());

    },

    /* ==========================================
        FILE EXISTS
    ========================================== */

    async fileExists(path) {

        try {

            const response = await fetch(path, {

                method: "HEAD"

            });

            return response.ok;

        }

        catch {

            return false;

        }

    },

    /* ==========================================
        LOADING
    ========================================== */

    loading(element, message = "Loading...") {

        if (typeof element === "string") {

            element = document.getElementById(element);

        }

        if (!element) return;

        element.innerHTML = `

            <div class="loading">

                <p>${message}</p>

            </div>

        `;

    },

    /* ==========================================
        ERROR
    ========================================== */

    error(element, message) {

        if (typeof element === "string") {

            element = document.getElementById(element);

        }

        if (!element) return;

        element.innerHTML = `

            <div class="error">

                <p>${message}</p>

            </div>

        `;

    }

};