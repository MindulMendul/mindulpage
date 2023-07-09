import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { HSVtoRGB } from './color';

import ttf from '@/fonts/helvetiker_regular.typeface.json';
import ttf_kr from '@/fonts/Do Hyeon_Regular.json';

export const loadModel = (scene: THREE.Scene, locVector: any) => {
  const loader = new GLTFLoader();
  loader.load("./test/scene.gltf", (object) => {
    const matilda = object.scene.children[0];
    matilda.position.set(locVector.x, locVector.y, locVector.z); //위치 조정
    scene.add(object.scene);
  },

    // called while loading is progressing
    (xhr) => {
      console.log(xhr.loaded);
      console.log(xhr.total);
    },

    // called when loading has errors
    (error) => {
      console.error(error);
      console.log('An error happened');
    }
  );
}

export const loadSphere = (scene: THREE.Scene, locVector: THREE.Vector3) => {
  const geometrySphere = new THREE.SphereGeometry(0.3, 16, 16);
  const materialSphere = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const sphere = new THREE.Mesh(geometrySphere, materialSphere);
  sphere.position.set(locVector.x, locVector.y, locVector.z);
  scene.add(sphere);

  return sphere;
}

export const loadCube = (scene: THREE.Scene, locVector: THREE.Vector3, i: number, name: string) => {
  const edgeLen = 2.5;
  const geometry = new THREE.BoxGeometry(edgeLen, edgeLen, edgeLen);
  const material = new THREE.MeshPhongMaterial({ color: HSVtoRGB(i * 20, 1, 1) });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(locVector.x, locVector.y, locVector.z);
  cube.name = name;
  scene.add(cube);

  return cube;
}

export const loadLine = (scene: THREE.Scene, points: Array<any>, linewidth: number) => {
  const geometry = new LineGeometry();
  const material = new LineMaterial({ color: 0xFFFFFF, linewidth: linewidth });
  geometry.setPositions(points);
  const line = new Line2(geometry, material);
  scene.add(line);

  return line;
}

export const loadGround = (scene: THREE.Scene, locVector: THREE.Vector3, width:number, texture?: string) => {
  const textureLoader = new THREE.TextureLoader();

  //ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(width, width),
    new THREE.MeshPhongMaterial({
      map: textureLoader.load(texture?texture:`./test/texture1.png`)
    })
  );
  ground.rotateX(-0.5 * Math.PI);
  ground.position.set(locVector.x, locVector.y, locVector.z);
  scene.add(ground);

  return ground;
}

export const loadLight = (scene: THREE.Scene) => {
  const color = 0xFFFFFF;
  const intensity = 0.05;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  return light;
}

export const loadSpotLight = (scene: THREE.Scene, locVector: THREE.Vector3, targetVector: THREE.Vector3) => {
  const color = 0xFFFFFF;
  const intensity = 0.1;
  const light = new THREE.SpotLight(color, intensity);
  light.angle=Math.PI/8;
  light.position.set(locVector.x, locVector.y, locVector.z);
  light.target.position.set(targetVector.x, targetVector.y, targetVector.z);
  scene.add(light);
  scene.add(light.target);

  return light;
}

export const loadText = (scene:THREE.Scene, locVector: THREE.Vector3, size:number, text:string) => {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(ttf);
  const geometry = new TextGeometry(text, { 
    font: font,
    size: size,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0,
    bevelSize: 0.8,
    bevelOffset: 0,
    bevelSegments: 0.3
  });

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, 
    wireframe: true
  });

  const mesh = new THREE.Mesh(geometry, material);

  const measureBox = new THREE.Box3().setFromObject(mesh);
  const measure = new THREE.Vector3();
  measureBox.getSize(measure);
  
  mesh.position.set(locVector.x-measure.x/2, locVector.y, locVector.z);
  mesh.rotateX(-Math.PI/6);
  scene.add(mesh);

  return mesh;
}

export const loadTextKR = (scene:THREE.Scene, locVector: THREE.Vector3, size:number, text:string) => {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(ttf_kr);
  const geometry = new TextGeometry(text, { 
    font: font,
    size: size,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0,
    bevelSize: 0.8,
    bevelOffset: 0,
    bevelSegments: 0.3
  });

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, 
    wireframe: true
  });

  const mesh = new THREE.Mesh(geometry, material);

  const measureBox = new THREE.Box3().setFromObject(mesh);
  const measure = new THREE.Vector3();
  measureBox.getSize(measure);
  
  mesh.position.set(locVector.x-measure.x/2, locVector.y, locVector.z);
  mesh.rotateX(-Math.PI/6);
  scene.add(mesh);

  return mesh;
} 