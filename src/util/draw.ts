import * as THREE from 'three';
import { loadLine, loadCube } from './loader';
import { witchLine } from './witch';

const precision = 24;

const drawLine = (scene: THREE.Scene, N: number, horizontalRadius: number, verticalRadius: number) => {
  const INF = 100;
  const points = [-INF, 0, 0];
  for (let i = 0; i < N * precision; i++) {
    const { x, z } = witchLine(horizontalRadius, verticalRadius, i / precision);
    points.push(x);
    points.push(0);
    points.push(z);

  }
  points.push((1 - 2 * (N % 2)) * INF);
  points.push(0);
  points.push(2 * verticalRadius * N);
  loadLine(scene, points, 0.005);
}

const drawSection = (scene: THREE.Scene, i: number, locVector: THREE.Vector3) => {
  const height = 1;
  loadLine(scene, [locVector.x, locVector.y, locVector.z, locVector.x, locVector.y + height, locVector.z], 0.001);
  const vec = new THREE.Vector3(locVector.x, locVector.y + height, locVector.z);
  loadCube(scene, vec, i.toString(), i);
}

export const drawSections = (scene: THREE.Scene, N: number, horizontalRadius: number, verticalRadius: number) => {
  drawLine(scene, Math.floor(N / 2), horizontalRadius, verticalRadius);
  for (let i = 0; i < N; i++) {
    const { x, z } = witchLine(horizontalRadius, verticalRadius, (5 * i + 1) / 10);
    drawSection(scene, i, new THREE.Vector3(x, 0, z));
  }
}

export const drawBall = (scene: THREE.Scene) => {
  const geometrySphere = new THREE.SphereGeometry(1, 16, 16);
  const materialSphere = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
  const ball = new THREE.Mesh(geometrySphere, materialSphere);
  ball.name="ball";
  scene.add(ball);
  return ball;
}
