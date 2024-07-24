import * as THREE from 'three';
import { gsap } from "gsap";


export class Cube {
    constructor() {
        this.scale = 20;
        this.epsilon = 0.5;
        this.consoleDebug = true;
        this.selectedCube = null;
        this.cube = []
        this.rubiksCubeGroup = new THREE.Group();
        this.cubelets = []
        this.cubeletsWithEdge1 = new THREE.Group()
        this.cubeletsWithEdge2 = new THREE.Group()
        this.cubeletsWithEdge3 = new THREE.Group()
        this.cubeletsWithEdge4 = new THREE.Group()
        this.cubeletsWithEdge5 = new THREE.Group()
        this.cubeletsWithEdge6 = new THREE.Group()
        this.cubeletsWithEdge7 = new THREE.Group()
        this.cubeletsWithEdge8 = new THREE.Group()

        this.miniGroup1 = new THREE.Group();
        this.miniGroup2 = new THREE.Group();
        this.miniGroup3 = new THREE.Group();
        this.miniGroup4 = new THREE.Group();
        // this.rubiksCubeGroup.scale.x = this.scale;
        // this.rubiksCubeGroup.scale.y = this.scale;
        // this.rubiksCubeGroup.scale.z = this.scale;

        // this.rubiksCubeGroup.rotation.x = Math.PI / 7;
        // this.rubiksCubeGroup.rotation.y = -Math.PI / 4;
    }

    start(scene) {
        const cubeletSize = 5;
        const gap = 2.515
        const rubiksCubeColors = [
            "#0000FF", // Blue
            "#FFA500",  // Orange
            "#FFFFFF", // White
            "#FF0000", // Red
            "#FFFF00", // Yellow
            "#00FF00", // Green
        ];

        function createColoredCube() {
            const cubeGeometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize).toNonIndexed();
            const colors = [];
            const color = new THREE.Color();

            // Loop through each face (6 faces, 6 vertices per face)
            for (let face = 0; face < 6; face++) {
                color.set(rubiksCubeColors[face]);
                for (let vertex = 0; vertex < 6; vertex++) {
                    colors.push(color.r, color.g, color.b);
                }
            }

            cubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            const material = new THREE.MeshBasicMaterial({ vertexColors: true });
            let cube = new THREE.Mesh(cubeGeometry, material);

            return cube;
        }

        const positions = [
            { x: -gap, y: -gap, z: -gap },
            { x: gap, y: -gap, z: -gap },
            { x: -gap, y: gap, z: -gap },
            { x: gap, y: gap, z: -gap },
            { x: -gap, y: -gap, z: gap },
            { x: gap, y: -gap, z: gap },
            { x: -gap, y: gap, z: gap },
            { x: gap, y: gap, z: gap }
        ];

        positions.forEach((pos) => {
            const cubelet = createColoredCube();
            cubelet.position.set(pos.x, pos.y, pos.z);
            this.cubelets.push(cubelet);

            // Add edges to each cubelet
            const edges = new THREE.EdgesGeometry(cubelet.geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
            line.position.set(pos.x, pos.y, pos.z);
            this.cubelets.push(line);



            // Add cubelet to respective group

            // if (index < 4) {
            //     this.miniGroup1.add(cubelet)
            // } else {
            //     this.miniGroup2.add(cubelet)
            // }


            // if (index % 2 === 0) {
            //     miniGroup3.add(cubelet)
            // } else {
            //     miniGroup4.add(cubelet)
            // }

        });

        this.cubeletsWithEdge1.add(this.cubelets[0], this.cubelets[1])
        this.cubeletsWithEdge2.add(this.cubelets[2], this.cubelets[3])
        this.cubeletsWithEdge3.add(this.cubelets[4], this.cubelets[5])
        this.cubeletsWithEdge4.add(this.cubelets[6], this.cubelets[7])
        this.cubeletsWithEdge5.add(this.cubelets[8], this.cubelets[9])
        this.cubeletsWithEdge6.add(this.cubelets[10], this.cubelets[11])
        this.cubeletsWithEdge7.add(this.cubelets[12], this.cubelets[13])
        this.cubeletsWithEdge8.add(this.cubelets[14], this.cubelets[15])

        scene.add(this.cubeletsWithEdge1)
        scene.add(this.cubeletsWithEdge2)
        scene.add(this.cubeletsWithEdge3)
        scene.add(this.cubeletsWithEdge4)
        scene.add(this.cubeletsWithEdge5)
        scene.add(this.cubeletsWithEdge6)
        scene.add(this.cubeletsWithEdge7)
        scene.add(this.cubeletsWithEdge8)

        this.cube.push(
            this.cubeletsWithEdge1,
            this.cubeletsWithEdge2,
            this.cubeletsWithEdge3,
            this.cubeletsWithEdge4,
            this.cubeletsWithEdge5,
            this.cubeletsWithEdge6,
            this.cubeletsWithEdge7,
            this.cubeletsWithEdge8,
        )


        console.log(this.cube)



        // this.miniGroup1.add(this.cube[0], this.cube[1], this.cube[2], this.cube[3])
        // this.miniGroup2.add(this.cube[4], this.cube[5], this.cube[6], this.cube[7])
        this.miniGroup3.add(this.cube[2], this.cube[3], this.cube[6], this.cube[7])
        this.miniGroup4.add(this.cube[0], this.cube[1], this.cube[4], this.cube[5])



        scene.add(this.miniGroup3 , this.miniGroup4 )
        // , this.miniGroup2, miniGroup3, miniGroup4
        console.log('miniGroup1-->', this.miniGroup1)
        console.log('miniGroup2-->', this.miniGroup2)
        console.log('miniGroup3-->', this.miniGroup3)
        console.log('miniGroup4-->', this.miniGroup4)


        //Mini Groups
        // const rubiksCube = new THREE.Group();


        const helper = new THREE.AxesHelper(10);
        scene.add(helper);

        // this.selectedCube = this.cubelets[0]
    }

    rotateAnimation() {

        var leftBtn = document.createElement('button');
        leftBtn.innerText = 'Rotate Left';
        leftBtn.style.position = 'absolute';

        var rightBtn = document.createElement('button');
        rightBtn.innerText = 'Rotate Right';
        rightBtn.style.marginTop = '20px';
        rightBtn.style.position = 'absolute';

        var topBtn = document.createElement('button');
        topBtn.innerText = 'Rotate Top';
        topBtn.style.marginTop = '40px';
        topBtn.style.position = 'absolute';

        var bottomBtn = document.createElement('button');
        bottomBtn.innerText = 'Rotate Bottom';
        bottomBtn.style.marginTop = '60px';
        bottomBtn.style.position = 'absolute';
        // Add buttons to the DOM
        document.body.appendChild(leftBtn);
        document.body.appendChild(rightBtn);
        document.body.appendChild(topBtn);
        document.body.appendChild(bottomBtn);

        const right = () => {
            gsap.to(this.miniGroup1.rotation, {
                z: this.miniGroup1.rotation.z + Math.PI / 2,
                duration: 1,
                onUpdate:()=>rightBtn.disabled=true,
                onComplete:()=>rightBtn.disabled=false
            });
        };
        
        const left = () => {
            gsap.to(this.miniGroup2.rotation, {
                z: this.miniGroup2.rotation.z + Math.PI / 2,
                duration: 1,
                onUpdate:()=>leftBtn.disabled=true,
                onComplete:()=>leftBtn.disabled=false
            });
        };
        
        const top = () => {
            gsap.to(this.miniGroup3.rotation, {
                y: this.miniGroup3.rotation.y + Math.PI / 2,
                duration: 1,
                onUpdate:()=>topBtn.disabled=true,
                onComplete:()=>topBtn.disabled=false
            });
        };
        
        const bottom = () => {
            gsap.to(this.miniGroup4.rotation, {
                y: this.miniGroup4.rotation.y + Math.PI / 2,
                duration: 1,
                onUpdate:()=>bottomBtn.disabled=true,
                onComplete:()=>bottomBtn.disabled=false
            });
        };

        // Event listeners on buttons
        leftBtn.addEventListener('click', left);
        rightBtn.addEventListener('click', right);
        topBtn.addEventListener('click', top);
        bottomBtn.addEventListener('click', bottom);
    }

}
