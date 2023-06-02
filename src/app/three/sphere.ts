import * as THREE from 'three';

export const loadSphere = (scene:THREE.Scene, locVecter:THREE.Vector3) => {
  const geometrySphere = new THREE.SphereGeometry( 0.1, 16, 16 );
  const materialSphere = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
  const sphere = new THREE.Mesh( geometrySphere, materialSphere );
  sphere.position.set(locVecter.x, locVecter.y, locVecter.z);
  scene.add( sphere );
}

export const loadCube = (scene:THREE.Scene, locVecter:THREE.Vector3) => {
  const edgeLen=0.3;
  const geometry = new THREE.BoxGeometry( edgeLen, edgeLen, edgeLen );
  const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(locVecter.x, locVecter.y, locVecter.z);
  scene.add( cube );
}
