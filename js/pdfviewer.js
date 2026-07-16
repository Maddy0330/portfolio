/* ==========================================================
   pdfviewer.js
========================================================== */

export class PDFViewer {

    constructor(containerId) {

        this.container =
            document.getElementById(containerId);

        this.currentPDF = null;

    }

    /* ==========================================
        LOAD PDF
    ========================================== */

    load(pdfFile) {

        this.currentPDF = pdfFile;

        this.container.innerHTML = "";

        const iframe = document.createElement("iframe");

        iframe.src = pdfFile;

        iframe.width = "100%";

        iframe.height = "700";

        iframe.style.border = "none";

        iframe.loading = "lazy";

        this.container.appendChild(iframe);

    }

    /* ==========================================
        CLEAR
    ========================================== */

    clear() {

        this.currentPDF = null;

        this.container.innerHTML = `

            <div class="pdf-placeholder">

                <h3>No Drawing Selected</h3>

                <p>Select a project to view its engineering drawing.</p>

            </div>

        `;

    }

    /* ==========================================
        RELOAD
    ========================================== */

    reload() {

        if (!this.currentPDF) return;

        this.load(this.currentPDF);

    }

    /* ==========================================
        DOWNLOAD
        (Disabled)
    ========================================== */

    disableDownload() {

        this.container.addEventListener(

            "contextmenu",

            (event) => {

                event.preventDefault();

            }

        );

    }

    /* ==========================================
        INITIALIZE
    ========================================== */

    init() {

        this.clear();

        this.disableDownload();

    }

}