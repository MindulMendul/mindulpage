"use client"

import { threeConstContext } from '@/context/threeContext';
import { useContext, useState } from 'react';
import * as THREE from 'three';

const _scene = new THREE.Scene();
_scene.background = new THREE.Color(0x000A2B);
const _camera = new THREE.PerspectiveCamera(30, 1, 0.001, 2000);
const _renderer = new THREE.WebGLRenderer();
const _raycaster = new THREE.Raycaster();

const useThree = () => {
  const { zRadius, zTheta } = useContext(threeConstContext);
  const [scene, updateScene] = useState(_scene);
  const [camera, updateCamera] = useState(_camera);
  const [renderer, updateRenderer] = useState(_renderer);
  const [raycaster, updateRaycaster] = useState(_raycaster);

  _camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta));

  const setRenderer = (renderer:THREE.WebGLRenderer) => {
    updateRenderer(renderer);
  }
  
  return { scene, camera, renderer, raycaster, setRenderer };
}

export default useThree;