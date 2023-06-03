"use client"

import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { DrawClass } from './draw';
import { useThree } from '@/hook/useThree';

const Three = () => {
  
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const sectionNum=7;
  let t=0;

  useEffect(() => {
    if (canvasRef.current) {
      const { scene, renderer, camera, locVector, animate } = useThree(canvasRef);

      const drawClass=new DrawClass(scene, document.documentElement.clientWidth/document.documentElement.clientHeight, 4);
      drawClass.drawSections(sectionNum);
      drawClass.drawLine(Math.floor(sectionNum/2));
      
      document.addEventListener("wheel", function (e) {
        locVector.setZ(locVector.z+e.deltaY/100);
      });

      animate();
    }
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} id="canvas"/>
  );
}

export default Three;

// loadModel(scene, locVecter);
      // loadGround(scene, locVecter);