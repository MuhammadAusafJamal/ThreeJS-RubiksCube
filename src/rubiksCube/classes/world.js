import * as THREE from "three";
import {
    INNER_HEIGHT, INNER_WIDTH, CAMERA_NEAR, CAMERA_FAR, ASPECT_RATIO, CAMERA_FOV,
    ENABLE_DAMPING, DAMPING_FACTOR, MIN_DISTANCE, MAX_DISTANCE, ENABLE_PAN
} from '../constants/common-constants.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RubiksCube } from "./rubiksCube.js";
// import { Reflector } from 'three/examples/jsm/objects/Reflector'


export default class World {
    constructor({ canvasRef }) {

        this.canvasRef = canvasRef;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_FOV, ASPECT_RATIO, CAMERA_NEAR, CAMERA_FAR
        );
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current, antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Renderer and Controls
        this.handleRendererConfigurations();
        this.handleControlsConfigurations();
        this.handleResponsiveness();
        this.animate();

    }

    init = () => {
        // Scene
        // this.scene.background = new THREE.Color(0xAF8500);
        
        // Camera
        this.camera.position.set(10, 6, 10);
        this.camera.lookAt(5, 5, 5);

        //Rubiks Cube Class
        const rubiksCube = new RubiksCube()
        rubiksCube.create();
        this.scene.add(rubiksCube.rubiksCubeGroup)
        rubiksCube.rotateAnimation(this.scene)
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
