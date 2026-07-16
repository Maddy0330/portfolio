/* ==========================================================
   viewer.js
   Mechanical Design Portfolio
   Part 1
========================================================== */

import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class PortfolioViewer {

    constructor(containerId) {

        this.container = document.getElementById(containerId);

        if (!this.container) {
            throw new Error(`Container "${containerId}" not found.`);
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.loader = new FBXLoader();

        this.model = null;

        this.grid = null;

        this.clock = new THREE.Clock();

        this.mixers = [];

        this.animationId = null;

        this.init();

    }

    /* ==========================================
        INITIALIZE
    ========================================== */

    init() {

        this.createScene();

        this.createCamera();

        this.createRenderer();

        this.createLights();

        this.createGrid();

        this.createControls();

        this.animate();

        window.addEventListener(
            "resize",
            () => this.onResize()
        );

    }

    /* ==========================================
        SCENE
    ========================================== */

    createScene() {

        this.scene = new THREE.Scene();

        this.scene.background =
            new THREE.Color(0xf5f7f9);

    }

    /* ==========================================
        CAMERA
    ========================================== */

    createCamera() {

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera =
            new THREE.PerspectiveCamera(
                45,
                width / height,
                0.1,
                1000
            );

        this.camera.position.set(5,4,8);

    }

    /* ==========================================
        RENDERER
    ========================================== */

    createRenderer() {

        this.renderer =
            new THREE.WebGLRenderer({

                antialias:true,

                alpha:true

            });

        this.renderer.setPixelRatio(
            window.devicePixelRatio
        );

        this.renderer.setSize(

            this.container.clientWidth,

            this.container.clientHeight

        );

        this.renderer.shadowMap.enabled = true;

        this.renderer.shadowMap.type =
            THREE.PCFSoftShadowMap;

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        this.container.innerHTML="";

        this.container.appendChild(

            this.renderer.domElement

        );

    }

    /* ==========================================
        LIGHTING
    ========================================== */

    createLights(){

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                1.3
            );

        this.scene.add(ambient);

        const hemi =
            new THREE.HemisphereLight(

                0xffffff,

                0xdddddd,

                1.1

            );

        hemi.position.set(

            0,

            50,

            0

        );

        this.scene.add(hemi);

        const sun =
            new THREE.DirectionalLight(

                0xffffff,

                2.5

            );

        sun.position.set(

            15,

            20,

            15

        );

        sun.castShadow = true;

        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;

        sun.shadow.camera.left = -20;
        sun.shadow.camera.right = 20;
        sun.shadow.camera.top = 20;
        sun.shadow.camera.bottom = -20;

        this.scene.add(sun);

    }

    /* ==========================================
        GRID
    ========================================== */

    createGrid(){

        this.grid =
            new THREE.GridHelper(

                40,

                40,

                0x999999,

                0xdddddd

            );

        this.grid.material.transparent=true;
        this.grid.material.opacity=.4;

        this.scene.add(this.grid);

    }

    /* ==========================================
        CONTROLS
    ========================================== */

    createControls(){

        this.controls =
            new OrbitControls(

                this.camera,

                this.renderer.domElement

            );

        this.controls.enableDamping=true;

        this.controls.dampingFactor=.05;

        this.controls.autoRotate=true;

        this.controls.autoRotateSpeed=1.2;

        this.controls.target.set(

            0,

            1,

            0

        );

        this.controls.update();

    }

    /* ==========================================
        LOAD MODEL
    ========================================== */

    async load(path){

        return new Promise((resolve,reject)=>{

            if(this.model){

                this.scene.remove(this.model);

                this.disposeModel(this.model);

                this.model=null;

            }

            this.loader.load(

                path,

                (fbx)=>{

                    this.model=fbx;

                    this.prepareModel();

                    this.scene.add(fbx);

                    this.fitCamera();

                    resolve(fbx);

                },

                undefined,

                (error)=>{

                    reject(error);

                }

            );

        });

    }
    /* ==========================================
        PREPARE MODEL
    ========================================== */

    prepareModel() {

        this.model.traverse((child) => {

            if (child.isMesh) {

                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {

                    child.material.side = THREE.DoubleSide;

                    child.material.needsUpdate = true;

                }

            }

        });

    }

    /* ==========================================
        FIT CAMERA
    ========================================== */

    fitCamera() {

        if (!this.model) return;

        const box = new THREE.Box3().setFromObject(this.model);

        const size = box.getSize(new THREE.Vector3());

        const center = box.getCenter(new THREE.Vector3());

        this.model.position.sub(center);

        const maxDimension = Math.max(
            size.x,
            size.y,
            size.z
        );

        const distance =
            maxDimension * 2.2;

        this.camera.near = distance / 100;

        this.camera.far = distance * 100;

        this.camera.updateProjectionMatrix();

        this.camera.position.set(

            distance,

            distance * 0.75,

            distance

        );

        this.controls.target.set(

            0,

            size.y * 0.25,

            0

        );

        this.controls.update();

    }

    /* ==========================================
        DISPOSE MODEL
    ========================================== */

    disposeModel(object) {

        object.traverse((child) => {

            if (!child.isMesh) return;

            if (child.geometry) {

                child.geometry.dispose();

            }

            if (child.material) {

                if (Array.isArray(child.material)) {

                    child.material.forEach(material => {

                        material.dispose();

                    });

                }

                else {

                    child.material.dispose();

                }

            }

        });

    }

    /* ==========================================
        RESET VIEW
    ========================================== */

    resetView() {

        if (!this.model) return;

        this.fitCamera();

    }

    /* ==========================================
        RESIZE
    ========================================== */

    onResize() {

        if (!this.container) return;

        const width = this.container.clientWidth;

        const height = this.container.clientHeight;

        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            width,

            height

        );

    }

    /* ==========================================
        ANIMATION
    ========================================== */

    animate = () => {

        this.animationId =

            requestAnimationFrame(

                this.animate

            );

        const delta =

            this.clock.getDelta();

        if (this.mixers.length) {

            this.mixers.forEach(mixer => {

                mixer.update(delta);

            });

        }

        this.controls.update();

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    /* ==========================================
        DESTROY
    ========================================== */

    destroy() {

        cancelAnimationFrame(

            this.animationId

        );

        if (this.model) {

            this.disposeModel(

                this.model

            );

        }

        this.controls.dispose();

        this.renderer.dispose();

        this.container.innerHTML = "";

    }

}

/* ==========================================
    END OF FILE
========================================== */