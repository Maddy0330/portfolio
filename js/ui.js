/* ==========================================================
   ui.js
========================================================== */

export class UI {

    constructor(projectLoader) {

        this.projectLoader = projectLoader;

        this.searchBox =
            document.getElementById("searchBox");

        this.categoryFilter =
            document.getElementById("categoryFilter");

        this.exploreButton =
            document.getElementById("exploreProjects");

    }

    /* ==========================================
        INITIALIZE
    ========================================== */

    init() {

        this.registerSearch();

        this.registerCategory();

        this.registerExploreButton();

        this.enableSmoothNavigation();

    }

    /* ==========================================
        SEARCH
    ========================================== */

    registerSearch() {

        if (!this.searchBox) return;

        this.searchBox.addEventListener(

            "input",

            (event) => {

                this.projectLoader.search(

                    event.target.value

                );

            }

        );

    }

    /* ==========================================
        CATEGORY FILTER
    ========================================== */

    registerCategory() {

        if (!this.categoryFilter) return;

        this.categoryFilter.addEventListener(

            "change",

            (event) => {

                this.projectLoader.filter(

                    event.target.value

                );

            }

        );

    }

    /* ==========================================
        HERO BUTTON
    ========================================== */

    registerExploreButton() {

        if (!this.exploreButton) return;

        this.exploreButton.addEventListener(

            "click",

            () => {

                document.getElementById(

                    "projects"

                ).scrollIntoView({

                    behavior: "smooth"

                });

            }

        );

    }

    /* ==========================================
        ACTIVE NAVIGATION
    ========================================== */

    enableSmoothNavigation() {

        const links =

            document.querySelectorAll(

                'nav a[href^="#"]'

            );

        links.forEach(link => {

            link.addEventListener(

                "click",

                (event) => {

                    event.preventDefault();

                    const id =

                        link.getAttribute("href");

                    const target =

                        document.querySelector(id);

                    if (!target) return;

                    window.scrollTo({

                        top:

                            target.offsetTop - 70,

                        behavior: "smooth"

                    });

                }

            );

        });

    }

    /* ==========================================
        SHOW LOADING
    ========================================== */

    showLoading(containerId, text = "Loading...") {

        const container =

            document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = `

            <div class="loading">

                <h3>${text}</h3>

            </div>

        `;

    }

    /* ==========================================
        SHOW ERROR
    ========================================== */

    showError(containerId, text) {

        const container =

            document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = `

            <div class="error">

                <h3>${text}</h3>

            </div>

        `;

    }

    /* ==========================================
        CLEAR CONTAINER
    ========================================== */

    clear(containerId) {

        const container =

            document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = "";

    }

    /* ==========================================
        ENABLE BUTTON
    ========================================== */

    enableButton(buttonId) {

        const button =

            document.getElementById(buttonId);

        if (!button) return;

        button.disabled = false;

    }

    /* ==========================================
        DISABLE BUTTON
    ========================================== */

    disableButton(buttonId) {

        const button =

            document.getElementById(buttonId);

        if (!button) return;

        button.disabled = true;

    }

    /* ==========================================
        SCROLL TO TOP
    ========================================== */

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

}