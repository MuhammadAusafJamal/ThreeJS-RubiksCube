import * as THREE from 'three';

export class Cubelets {
    constructor(Xpos, Ypos, Zpos) {
        this.cubletsGroup = new THREE.Group()
        const cubeletSize = 5;
        const rubiksCubeColors = [
            "#0000FF", // Blue
            "#FFA500",  // Orange
            "#FFFFFF", // White
            "#FF0000", // Red
            "#FFFF00", // Yellow
            "#00FF00", // Green
        ];
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
        let cubelet = new THREE.Mesh(cubeGeometry, material);
        const edges = new THREE.EdgesGeometry(cubelet.geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.cubletsGroup.add(cubelet, line)
        this.cubletsGroup.position.x = Xpos;
        this.cubletsGroup.position.y = Ypos;
        this.cubletsGroup.position.z = Zpos;
    }
}