/* ==========================================================
   app.js
========================================================== */

import { PortfolioViewer } from "./viewer.js";
import { ProjectLoader } from "./projectLoader.js";
import { PDFViewer } from "./pdfviewer.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        /* ==========================================
            VIEWERS
        ========================================== */

        const modelViewer = new PortfolioViewer("modelViewer");

        const pdfViewer = new PDFViewer("pdfViewer");

        pdfViewer.init();

        /* ==========================================
            PROJECT LOADER
        ========================================== */

        const projectLoader = new ProjectLoader(modelViewer);

        await projectLoader.loadProjects();

        /* ==========================================
            UI
        ========================================== */

        const ui = new UI(projectLoader);

        ui.init();

        /* ==========================================
            DEFAULT PROJECT
        ========================================== */

        if (projectLoader.projects.length > 0) {

            projectLoader.openProject(

                projectLoader.projects[0]

            );

        }

        console.log(

            "Mechanical Design Portfolio Loaded Successfully."

        );

    }

    catch (error) {

        console.error(

            "Application failed to start.",

            error

        );

    }

});