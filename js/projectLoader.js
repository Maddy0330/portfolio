/* ==========================================================
   projectLoader.js
========================================================== */

export class ProjectLoader {

    constructor(viewer) {

        this.viewer = viewer;

        this.projects = [];

        this.currentProject = null;

        this.projectGrid =
            document.getElementById("projectGrid");

    }

    /* ==========================================
        LOAD PROJECTS
    ========================================== */

    async loadProjects() {

        try {

            const response = await fetch("projects/projects.json");

            this.projects = await response.json();

            this.renderProjects();

        }

        catch (error) {

            console.error(
                "Unable to load projects.",
                error
            );

        }

    }

    /* ==========================================
        RENDER PROJECTS
    ========================================== */

    renderProjects() {

        this.projectGrid.innerHTML = "";

        this.projects.forEach(project => {

            const card =
                this.createCard(project);

            this.projectGrid.appendChild(card);

        });

    }

    /* ==========================================
        CREATE CARD
    ========================================== */

    createCard(project) {

        const card = document.createElement("div");
   
        card.className = "project-card";
   
        card.innerHTML = `
   
            <div class="project-thumb">
   
                <div class="placeholder">⚙️</div>
   
            </div>
   
            <div class="project-content">
   
                <h3 class="project-title">${project.title}</h3>
   
                <p class="project-description">${project.description}</p>
   
                <div class="project-footer">
    
                    <span class="software-badge">
   
                        ${project.software}
   
                    </span>
   
                    <button class="view-project-btn">
   
                        View Project
   
                    </button>
   
                </div>
   
            </div>
   
        `;
   
        card.addEventListener("click", () => this.openProject(project));
   
        return card;
   
    }

    /* ==========================================
        OPEN PROJECT
    ========================================== */

    async openProject(project) {

        this.currentProject = project;

        document.getElementById(

            "projectTitle"

        ).textContent = project.title;

        document.getElementById(

            "projectDescription"

        ).textContent = project.description;

        document.getElementById(

            "software"

        ).textContent = project.software;

        document.getElementById(

            "category"

        ).textContent = project.category;

        document.getElementById(

            "material"

        ).textContent = project.material;

        document.getElementById(

            "manufacturing"

        ).textContent = project.manufacturing;

        await this.viewer.load(

            `models/${project.model}`

        );

        const pdfViewer = document.getElementById(

            "pdfViewer"

        );

        pdfViewer.innerHTML = `

            <iframe

                src="drawings/${project.drawing}"

                width="100%"

                height="700"

                frameborder="0"

            ></iframe>

        `;

        window.scrollTo({

            top:

                document.getElementById(

                    "projectViewer"

                ).offsetTop - 80,

            behavior: "smooth"

        });

    }

    /* ==========================================
        SEARCH
    ========================================== */

    search(keyword) {

        keyword =
            keyword.toLowerCase();

        const filtered =

            this.projects.filter(project =>

                project.title
                    .toLowerCase()
                    .includes(keyword)

            );

        this.projectGrid.innerHTML = "";

        filtered.forEach(project => {

            this.projectGrid.appendChild(

                this.createCard(project)

            );

        });

    }

    /* ==========================================
        FILTER
    ========================================== */

    filter(category) {

        if (category === "all") {

            this.renderProjects();

            return;

        }

        const filtered =

            this.projects.filter(project =>

                project.category === category

            );

        this.projectGrid.innerHTML = "";

        filtered.forEach(project => {

            this.projectGrid.appendChild(

                this.createCard(project)

            );

        });

    }

}
