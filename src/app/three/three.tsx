"use client"

import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { loadModel } from './loader';
import { loadGround } from './ground';
import { DrawClass } from './draw';

const Three = () => {
  const [_radius, _theta] = [25, Math.PI/4];
  const locVecter = new THREE.Vector3(0, 0, 0);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000A2B);

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.shadowMap.enabled = false; // 셰도우맵 사용 : 그림자 표현
      renderer.shadowMap.type = THREE.PCFShadowMap; // PCF 방식의 섀도우맵을 사용할 예정

      const light = new THREE.DirectionalLight(0xffffff, 1);
      scene.add(light);

      const camera = new THREE.PerspectiveCamera(30, document.documentElement.clientWidth/document.documentElement.clientHeight, 0.001, 2000);
      camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta)+locVecter.z);
      camera.lookAt(locVecter);

      document.addEventListener("wheel", function (e) {
        locVecter.setZ(locVecter.z+e.deltaY/100);
      });
      
       // Dom 갱신을 위한 부분
      const animate = () => {
        renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);

        camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta)+locVecter.z);
        camera.lookAt(locVecter);
      };
      animate();
      
      // loadModel(scene, locVecter);
      // loadGround(scene, locVecter);
      
      const drawClass=new DrawClass(scene, 1, 4);
      drawClass.drawLine(12);
      drawClass.drawSections(20);
    }
  }, [canvasRef]);

  return (
    <main>
      <canvas ref={canvasRef} id="canvas" width={document.documentElement.clientWidth} height={document.documentElement.clientHeight}/>
    </main>
  );
}

export default Three;