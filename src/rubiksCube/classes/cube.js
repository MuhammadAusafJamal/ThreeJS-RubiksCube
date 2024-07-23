import * as THREE from 'three';

export class Cube {
    constructor() {
        this.cube = new THREE.Group();
    }

    start(scene) {

        let cubelet;
        const cubeSize = 5;

        const rubiksCubeColors = [
            "#0000FF", // Blue
            "#FFA500",  // Orange
            "#FFFFFF", // White
            "#FF0000", // Red
            "#FFFF00", // Yellow
            "#00FF00", // Green
        ];
        let cubeGeometry;
        function createColoredCube() {
            cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize).toNonIndexed();
            // const positionAttribute = cubeGeometry.getAttribute('position');
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

        }
        createColoredCube()

        const positions = [
            { x: 0, y: 0, z: 0, color: 0xff0000 },
            { x: 5.03, y: 0, z: 0, color: 0xffffff },
            { x: 0, y: 5.03, z: 0, color: 0xffffff },
            { x: 5.03, y: 5.03, z: 0, color: 0xff0000 },
            { x: 0, y: 0, z: 5.03, color: 0xFFA500 },
            { x: 5.03, y: 0, z: 5.03, color: 0xffff00 },
            { x: 0, y: 5.03, z: 5.03, color: 0xffff00 },
            { x: 5.03, y: 5.03, z: 5.03, color: 0xFFA500 },
        ];

        const colorOrders = [
            ["#FFFFFF", "#FF0000", "#FFFF00", "#0000FF", "#00FF00", "#FFA500"], // Cube 1
            ["#FF0000", "#FFFF00", "#0000FF", "#00FF00", "#FFA500", "#FFFFFF"], // Cube 2
            ["#FFFF00", "#0000FF", "#00FF00", "#FFA500", "#FFFFFF", "#FF0000"], // Cube 3
            ["#0000FF", "#00FF00", "#FFA500", "#FFFFFF", "#FF0000", "#FFFF00"], // Cube 4
            ["#00FF00", "#FFA500", "#FFFFFF", "#FF0000", "#FFFF00", "#0000FF"], // Cube 5
            ["#FFA500", "#FFFFFF", "#FF0000", "#FFFF00", "#0000FF", "#00FF00"], // Cube 6
            ["#FFFFFF", "#FFA500", "#00FF00", "#0000FF", "#FFFF00", "#FF0000"], // Cube 7
            ["#FF0000", "#FFFFFF", "#FFA500", "#00FF00", "#0000FF", "#FFFF00"]  // Cube 8
        ];

        positions.forEach((pos, index) => {
            cubelet = new THREE.Mesh(
                cubeGeometry,
                new THREE.MeshBasicMaterial({ color: colorOrders[index], vertexColors: true })

            );
            cubelet.position.set(pos.x, pos.y, pos.z);
            this.cube.add(cubelet);
            scene.add(this.cube)
        })
        // const edges = new THREE.EdgesGeometry(cubeGeometry);
        // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
        // scene.add(line);
        // console.log(cubeGeometry)
        // console.log(line)

        // const posArray = cubeGeometry.attributes.position.array;
        // const indArray = cubeGeometry.index.array;

        // console.log(posArray)
        // console.log(indArray)


        const helper = new THREE.AxesHelper(10)
        scene.add(helper)
    }
}