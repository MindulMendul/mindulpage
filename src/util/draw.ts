import * as THREE from 'three';
import { loadLine, loadCube, loadText } from './loader';
import { witch } from './witch';

const precision = 100;

const drawLine = (scene: THREE.Scene, N: number, horizontalRadius: number, verticalRadius: number) => {
  const INF = 100;
  const points = [-INF, 0, 0];
  for (let i = 0; i < N * precision; i++) {
    const { x, z } = witch(horizontalRadius, verticalRadius, i / precision);
    points.push(x);
    points.push(0);
    points.push(z);

  }
  points.push((1 - 2 * (N % 2)) * INF);
  points.push(0);
  points.push(2 * verticalRadius * N);
  loadLine(scene, points, 0.005);
}

const drawSection = (scene: THREE.Scene, index: number, name:string, locVector: THREE.Vector3) => {
  const height = 3;
  loadLine(scene, [locVector.x, locVector.y, locVector.z, locVector.x, locVector.y + height, locVector.z], 0.003);
  const vec1 = new THREE.Vector3(locVector.x, locVector.y + height, locVector.z);
  const res = loadCube(scene, vec1, index, name );
  const vec2 = new THREE.Vector3(locVector.x, locVector.y + 1.5*height, locVector.z);
  loadText(scene, vec2, name);
  return res;
}

export const drawSections = (scene: THREE.Scene, sections: string[], horizontalRadius: number, verticalRadius: number) => {
  const sectionNum=sections.length;
  const res = [];
  drawLine(scene, Math.floor(sectionNum / 2), horizontalRadius, verticalRadius);
  for (let i = 0; i < sectionNum; i++) {
    const { x, z } = witch(horizontalRadius, verticalRadius, (5 * i + 1) / 10);
    if(i==sectionNum-1) res.push(drawSection(scene, i, sections[i], new THREE.Vector3(x, 0, verticalRadius * (sectionNum-1))));
    else res.push(drawSection(scene, i, sections[i], new THREE.Vector3(x, 0, z)));
  }
  return res;
}

export const drawBall = (scene: THREE.Scene) => {
  const geometrySphere = new THREE.SphereGeometry(0.3, 16, 16);
  const materialSphere = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const ball = new THREE.Mesh(geometrySphere, materialSphere);
  ball.name="ball";
  scene.add(ball);
  return ball;
}
