import * as THREE from 'three';

export const loadGround = (scene:THREE.Scene, locVecter:any) => {
  const textureLoader = new THREE.TextureLoader();

  //ground
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./test/Mindullormoon.png`)
    })
  );
  floor.rotation.x -= 0.5 * Math.PI;
  floor.position.set(locVecter.x, locVecter.y-1.5, locVecter.z);
  scene.add(floor);
}

