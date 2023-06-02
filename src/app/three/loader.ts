import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadModel = (scene:THREE.Scene, locVecter:any) => {
  const loader = new GLTFLoader();
  loader.load("./test/scene.gltf", (object) => {
    const matilda = object.scene.children[0];
    matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정
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
