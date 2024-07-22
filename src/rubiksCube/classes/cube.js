import * as THREE from 'three';

export class Cube {
    constructor() {
        this.cubeGroup = new THREE.Group();
    }

    start(scene) {
        const size = 5;
        const cubeGeometry = new THREE.BoxGeometry(size, size, size)

        const color = new THREE.Color();
        const colors = []
        for (let i = 0; i < cubeGeometry.attributes.position.count; i++) {
            const r = Math.random()*5;
            const g = Math.random()*5;
            const b = Math.random()*5;
            color.setRGB(r, g, b, THREE.SRGBColorSpace)
            colors.push(r, g, b)
        }

        cubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


        const positions = [
            { x: 0, y: 0, z: 0, color: 0xff0000 },
            { x: 5.1, y: 0, z: 0, color: 0xffffff },
            { x: 0, y: 5.1, z: 0, color: 0xffffff },
            { x: 5.1, y: 5.1, z: 0, color: 0xff0000 },
            { x: 0, y: 0, z: 5.1, color: 0xFFA500 },
            { x: 5.1, y: 0, z: 5.1, color: 0xffff00 },
            { x: 0, y: 5.1, z: 5.1, color: 0xffff00 },
            { x: 5.1, y: 5.1, z: 5.1, color: 0xFFA500 },
        ];

        let cube;
        positions.forEach(pos => {
            cube = new THREE.Mesh(
                cubeGeometry,
                new THREE.MeshBasicMaterial({ color: pos.color, })
            );
            cube.position.set(pos.x, pos.y, pos.z);
            this.cubeGroup.add(cube);
            scene.add(this.cubeGroup)
        })

        const edges = new THREE.EdgesGeometry(cubeGeometry);
        // console.log(edges)
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, vertexColors: true }));
        scene.add(line);
        // console.log(cubeGeometry)

        const posArray = cube.geometry.attributes.position.array;
        const indArray = cube.geometry.index.array;

        console.log(posArray)
        console.log(indArray)


        const helper = new THREE.AxesHelper(10)
        scene.add(helper)
    }
}