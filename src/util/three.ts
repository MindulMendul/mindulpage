import { useContext } from 'react';
import * as THREE from 'three';

const createThree = (e:any) => {
  //const {_radius, _theta} = useContext(threeContext);

  const [_radius, _theta]=[25, Math.PI/4];
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000A2B);

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.001, 2000);
  camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta));
  camera.lookAt(new THREE.Vector3(0,0,0));
  
  const renderer = new THREE.WebGLRenderer({ canvas:e, antialias: true });
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Dom 갱신을 위한 부분
  const animate = () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta));//+curVector.z);

    window.requestAnimationFrame(animate);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render( scene, camera );
  };

  return { scene, renderer, camera, animate };
} 
export default createThree;
