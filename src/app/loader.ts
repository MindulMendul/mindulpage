import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

export class LoaderClass {
  public loadModel = (scene:THREE.Scene, locVector:any) => {
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
  
  public loadSphere (scene:THREE.Scene, locVector:THREE.Vector3) {
    const geometrySphere = new THREE.SphereGeometry( 0.1, 16, 16 );
    const materialSphere = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
    const sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphere.position.set(locVector.x, locVector.y, locVector.z);
    scene.add( sphere );
  }
  
  public loadCube (scene:THREE.Scene, locVector:THREE.Vector3) {
    const edgeLen=0.3;
    const geometry = new THREE.BoxGeometry( edgeLen, edgeLen, edgeLen );
    const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(locVector.x, locVector.y, locVector.z);
    
    scene.add( cube );
  }
  
  public loadLine (scene:THREE.Scene, points: Array<any>, linewidth:number) {
    const geometry = new LineGeometry();
    const material = new LineMaterial( { color: 0xFFFFFF, linewidth: linewidth } );
    geometry.setPositions( points );
    const line = new Line2( geometry, material );
    scene.add( line );
  }
  
  public loadGround (scene:THREE.Scene, locVector:any) {
    const textureLoader = new THREE.TextureLoader();
  
    //ground
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(`./test/Mindullormoon.png`)
      })
    );
    floor.rotation.x -= 0.5 * Math.PI;
    floor.position.set(locVector.x, locVector.y-1.5, locVector.z);
    scene.add(floor);
  }
  
}
