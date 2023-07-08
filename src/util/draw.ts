import * as THREE from 'three';
import { Vector3 } from 'three';
import { loadLine, loadCube, loadText, loadSpotLight, loadSphere } from './loader';
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

const drawSection = (scene: THREE.Scene, locVector: THREE.Vector3, index: number, name:string) => {
  const height = 3;

  loadLine(scene, [locVector.x, locVector.y, locVector.z, locVector.x, locVector.y + height, locVector.z], 0.003);
  const vecCube = new THREE.Vector3(locVector.x, locVector.y + height, locVector.z);
  const vecText = new THREE.Vector3(locVector.x, locVector.y + 1.5*height, locVector.z);
  const vecLight = new THREE.Vector3(locVector.x, locVector.y + 3*height, locVector.z);
  
  const res = loadCube(scene, vecCube, index, name );
  loadText(scene, vecText, name);
  loadSpotLight(scene, vecLight, vecCube);
  return res;
}

export const drawSections = (scene: THREE.Scene, sections: string[], horizontalRadius: number, verticalRadius: number) => {
  const sectionNum=sections.length;
  const res = [];
  drawLine(scene, Math.floor(sectionNum / 2), horizontalRadius, verticalRadius);
  for (let i = 0; i < sectionNum; i++) {
    const { x, z } = witch(horizontalRadius, verticalRadius, (5 * i + 1) / 10);
    if(i==sectionNum-1) res.push(drawSection(scene, new THREE.Vector3(x, 0, verticalRadius * (sectionNum-1)), i, sections[i]));
    else res.push(drawSection(scene, new THREE.Vector3(x, 0, z), i, sections[i]));
  }
  return res;
}

export const drawBall = (scene: THREE.Scene) => {
  const ball = loadSphere(scene, new Vector3(0,0,0));
  ball.name="ball";
  return ball;
}
