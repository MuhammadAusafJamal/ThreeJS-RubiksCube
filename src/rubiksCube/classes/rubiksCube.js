import * as THREE from 'three';
import { gsap } from "gsap";
import { Cubelets } from './cublets.js'

export class RubiksCube {
    constructor() {
        // this.scale = 20;
        this.epsilon = 0.1;
        this.rubiksCubeGroup = new THREE.Group();
        this.enableButtons = null
        this.disableButtons = null
    }

    create() {
        const gap = 5
        this.cubes = [

            // // Front 2x2.
            // new Cubelets(-gap, gap, gap),
            // new Cubelets(gap, gap, gap),
            // new Cubelets(-gap, -gap, gap),
            // new Cubelets(gap, -gap, gap),

            // // Back 2x2.
            // new Cubelets(-gap, gap, -gap),
            // new Cubelets(gap, gap, -gap),
            // new Cubelets(-gap, -gap, -gap),
            // new Cubelets(gap, -gap, -gap),

            // Front face.
            new Cubelets(-gap, gap, gap),
            new Cubelets(0, gap, gap),
            new Cubelets(gap, gap, gap),
            new Cubelets(-gap, 0, gap),
            new Cubelets(0, 0, gap),
            new Cubelets(gap, 0, gap),
            new Cubelets(-gap, -gap, gap),
            new Cubelets(0, -gap, gap),
            new Cubelets(gap, -gap, gap),

            // Middle face.
            new Cubelets(-gap, gap, 0),
            new Cubelets(0, gap, 0),
            new Cubelets(gap, gap, 0),
            new Cubelets(-gap, 0, 0),
            new Cubelets(0, 0, 0),
            new Cubelets(gap, 0, 0),
            new Cubelets(-gap, -gap, 0),
            new Cubelets(0, -gap, 0),
            new Cubelets(gap, -gap, 0),

            // Back face.
            new Cubelets(-gap, gap, -gap),
            new Cubelets(0, gap, -gap),
            new Cubelets(gap, gap, -gap),
            new Cubelets(-gap, 0, -gap),
            new Cubelets(0, 0, -gap),
            new Cubelets(gap, 0, -gap),
            new Cubelets(-gap, -gap, -gap),
            new Cubelets(0, -gap, -gap),
            new Cubelets(gap, -gap, -gap),
        ]

        this.cubes.forEach((cube) => {
            this.rubiksCubeGroup.add(cube.cubletsGroup);
        });
        this.selectedCube = this.cubes[0];
    }

    rotateAroundWorldAxis(cubeGroup, axis) {
        this.disableButtons();
        // Ensure the axis is normalized
        axis.normalize();

        const start = { rotation: 0 };
        const prev = { rotation: 0 };
        const end = { rotation: Math.PI / 2 };

        const tween = gsap.to(start, {
            duration: 1,
            rotation: end.rotation,
            onUpdate: () => {
                // Calculate the difference in rotation
                const rotation = start.rotation;
                const deltaRotation = rotation - prev.rotation;

                // Apply the delta rotation to the cube's position and rotation
                cubeGroup.position.applyAxisAngle(axis, deltaRotation);
                cubeGroup.rotateOnWorldAxis(axis, deltaRotation);

                // Update the previous rotation value
                prev.rotation = rotation;
            },
            onComplete: () => {
                this.enableButtons();
            }
        });

        tween.play();
    }

    cubeInSameY(c1, c2) {
        return Math.abs(c1.cubletsGroup.position.y - c2.cubletsGroup.position.y) < this.epsilon;
    }

    cubeInSameX(c1, c2) {
        return Math.abs(c1.cubletsGroup.position.x - c2.cubletsGroup.position.x) < this.epsilon;
    }

    cubeInSameZ(c1, c2) {
        return Math.abs(c1.cubletsGroup.position.z - c2.cubletsGroup.position.z) < this.epsilon;
    }

    rotateAnimation() {
        this.disableButtons = () => {
            leftBtnBack.disabled = true;
            leftBtnFront.disabled = true;
            topBtnRight.disabled = true;
            topBtnLeft.disabled = true;
            rightBtnFront.disabled = true;
            rightBtnBack.disabled = true;
            bottomBtnRight.disabled = true;
            bottomBtnLeft.disabled = true;
        };

        this.enableButtons = () => {
            leftBtnBack.disabled = false;
            leftBtnFront.disabled = false;
            topBtnRight.disabled = false;
            topBtnLeft.disabled = false;
            rightBtnFront.disabled = false;
            rightBtnBack.disabled = false;
            bottomBtnRight.disabled = false;
            bottomBtnLeft.disabled = false;
        };

        // Create buttons
        const createButton = (text, marginTop) => {
            const button = document.createElement('button');
            button.innerText = text;
            button.style.position = 'absolute';
            button.style.marginTop = marginTop;
            return button;
        };

        const leftBtnBack = createButton('Rotate Left Back', '0px');
        const leftBtnFront = createButton('Rotate Left Front', '20px');
        const topBtnRight = createButton('Rotate Top Right', '40px');
        const topBtnLeft = createButton('Rotate Top Left', '60px');
        const rightBtnFront = createButton('Rotate Right Front', '80px');
        const rightBtnBack = createButton('Rotate Right Back', '100px');
        const bottomBtnRight = createButton('Rotate Bottom Right', '120px');
        const bottomBtnLeft = createButton('Rotate Bottom Left', '140px');

        // Add buttons to the DOM
        document.body.appendChild(leftBtnBack);
        document.body.appendChild(leftBtnFront);
        document.body.appendChild(topBtnLeft);
        document.body.appendChild(topBtnRight);
        document.body.appendChild(rightBtnBack);
        document.body.appendChild(rightBtnFront);
        document.body.appendChild(bottomBtnRight);
        document.body.appendChild(bottomBtnLeft);

        // Rotate functions
        const leftFront = () => {
            const axis = new THREE.Vector3(1, 0, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameX(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const leftBack = () => {
            const axis = new THREE.Vector3(-1, 0, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameX(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const topLeft = () => {
            const axis = new THREE.Vector3(0, 1, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameY(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const topRight = () => {
            const axis = new THREE.Vector3(0, -1, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameY(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const bottomRight = () => {
            const axis = new THREE.Vector3(1, 0, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameX(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const bottomLeft = () => {
            const axis = new THREE.Vector3(-1, 0, 0);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameX(cube, this.selectedCube)) {
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
                }
            });
        };

        const rightFront = () => {
            const axis = new THREE.Vector3(0, 0, 1);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameZ(cube, this.selectedCube))
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
            });
        };

        const rightBack = () => {
            const axis = new THREE.Vector3(0, 0, -1);
            this.cubes.forEach((cube) => {
                if (this.cubeInSameZ(cube, this.selectedCube))
                    this.rotateAroundWorldAxis(cube.cubletsGroup, axis);
            });
        };

        // Attach actions to buttons
        leftBtnBack.addEventListener('click', leftBack);
        leftBtnFront.addEventListener('click', leftFront);
        topBtnRight.addEventListener('click', topRight);
        topBtnLeft.addEventListener('click', topLeft);
        rightBtnFront.addEventListener('click', rightFront);
        rightBtnBack.addEventListener('click', rightBack);
        bottomBtnRight.addEventListener('click', bottomRight);
        bottomBtnLeft.addEventListener('click', bottomLeft);
    }
}