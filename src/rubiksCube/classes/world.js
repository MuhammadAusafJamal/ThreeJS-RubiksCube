import * as THREE from "three";
import {
    INNER_HEIGHT, INNER_WIDTH, CAMERA_NEAR, CAMERA_FAR, ASPECT_RATIO, CAMERA_FOV,
    ENABLE_DAMPING, DAMPING_FACTOR, MIN_DISTANCE, MAX_DISTANCE, ENABLE_PAN, CAMERA_INITIAL_POSITION, CAMERA_INITIAL_LOOK_AT
} from '../constants/common-constants.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Cube } from "./cube.js";

export default class World {
    constructor({ canvasRef }) {
        this.ref = canvasRef;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_FOV, ASPECT_RATIO, CAMERA_NEAR, CAMERA_FAR
        );
        this.renderer = new THREE.WebGLRenderer({ canvas: this.ref.current, antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Renderer and Controls
        this.handleRendererConfigurations();
        this.handleControlsConfigurations();
        this.handleResponsiveness();
        this.animate();

    }

    init = () => {
        // Scene
        this.scene.background = new THREE.Color(0xAF8500);


        // Camera
        this.camera.position.set(...CAMERA_INITIAL_POSITION);
        this.camera.lookAt(...CAMERA_INITIAL_LOOK_AT);



        const cube = new Cube()
        cube.start(this.scene);
    }

    handleRendererConfigurations = () => {
        // NOTE - Color Management config
        THREE.ColorManagement.enabled = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // NOTE - WebGL Renderer Config
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(INNER_WIDTH, INNER_HEIGHT);
    }

    handleControlsConfigurations = () => {
        this.controls.maxDistance = MAX_DISTANCE;
        this.controls.minDistance = MIN_DISTANCE;
        this.controls.enableDamping = ENABLE_DAMPING;
        this.controls.enablePan = ENABLE_PAN;
        this.controls.dampingFactor = DAMPING_FACTOR;
        // this.controls.maxPolarAngle = MAX_POLAR_ANGLE;
        // this.controls.minPolarAngle = MIN_POLAR_ANGLE;
    }

    handleResponsiveness = () => {
        window.addEventListener("resize", () => {
            this.renderer.setSize(INNER_WIDTH, INNER_HEIGHT);
            this.camera.aspect = INNER_WIDTH / INNER_HEIGHT;
            this.camera.updateProjectionMatrix();
        });
    }


    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
