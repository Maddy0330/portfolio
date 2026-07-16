/* ==========================================================
   Mechanical Design Portfolio v2.0
   config.js

   Global Configuration File

   Author: Madhu Prakash S
========================================================== */

export const CONFIG = Object.freeze({

    /* ======================================================
       WEBSITE INFORMATION
    ====================================================== */

    website: {

        title: "Mechanical Design Portfolio",

        engineer: "Madhu Prakash S",

        designation: "Mechanical Design Engineer",

        version: "2.0"

    },

    /* ======================================================
       GITHUB SETTINGS
    ====================================================== */

    github: {

        username: "Maddy0330",

        repository: "portfolio",

        branch: "main",

        folders: {

            models: "models",

            drawings: "drawings",

            projects: "projects",

            thumbnails: "thumbnails",

            assets: "assets"

        }

    },

    /* ======================================================
       THREE.JS VIEWER SETTINGS
    ====================================================== */

    viewer: {

        background: 0xF5F7F9,

        antialias: true,

        physicallyCorrectLights: true,

        toneMappingExposure: 1.15,

        shadows: true,

        grid: true,

        axes: false,

        autoRotate: true,

        autoRotateSpeed: 1.2,

        damping: true,

        dampingFactor: 0.05,

        zoom: true,

        pan: true

    },

    /* ======================================================
       CAMERA SETTINGS
    ====================================================== */

    camera: {

        fov: 45,

        near: 0.1,

        far: 5000,

        fitMultiplier: 2.2,

        minDistance: 0.5,

        maxDistance: 100

    },

    /* ======================================================
       LIGHTING SETTINGS
    ====================================================== */

    lighting: {

        ambient: 1.2,

        hemisphere: 1.1,

        directional: 2.8,

        shadowMapSize: 4096,

        shadowBias: -0.0001

    },

    /* ======================================================
       PDF VIEWER SETTINGS
    ====================================================== */

    pdf: {

        defaultZoom: "page-width",

        textLayer: true,

        annotationLayer: true

    },

    /* ======================================================
       PROJECT SETTINGS
    ====================================================== */

    project: {

        supportedModels: [

            ".fbx"

        ],

        supportedDrawings: [

            ".pdf"

        ],

        placeholderThumbnail:

            "assets/icons/project-placeholder.svg"

    },

    /* ======================================================
       THEME
    ====================================================== */

    theme: {

        primary: "#1A1A1D",

        secondary: "#8C969E",

        accent: "#C86446",

        background: "#F5F7F9",

        surface: "#FFFFFF"

    },

    /* ======================================================
       ANIMATION
    ====================================================== */

    animation: {

        loadingFade: 300,

        autoRotateDelay: 4000,

        transitionSpeed: 0.3

    }

});

/* ==========================================================
   PATH GENERATOR
========================================================== */

const github = CONFIG.github;

export const PATHS = Object.freeze({

    rawBase:
        `https://raw.githubusercontent.com/${github.username}/${github.repository}/${github.branch}`,

    apiBase:
        `https://api.github.com/repos/${github.username}/${github.repository}/contents`,

    get models() {

        return `${this.rawBase}/${github.folders.models}`;

    },

    get drawings() {

        return `${this.rawBase}/${github.folders.drawings}`;

    },

    get projects() {

        return `${this.rawBase}/${github.folders.projects}`;

    },

    get thumbnails() {

        return `${this.rawBase}/${github.folders.thumbnails}`;

    }

});

/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

export function getRawFile(folder, filename) {

    return `${PATHS.rawBase}/${folder}/${filename}`;

}

export function getGitHubContents(folder) {

    return `${PATHS.apiBase}/${folder}`;

}

/* ==========================================================
   END OF FILE
========================================================== */