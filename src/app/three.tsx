"use client"

import * as THREE from 'three';
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { threeConstContext, threeVariableContext } from '@/context/threeContext';
import { drawBall, drawSections } from '@/util/draw';
import { witchLine } from '@/util/witch';
import useThree from '@/hooks/useThree';

const Three = () => {
  const { scene, camera, renderer, raycaster, setCamera, setRenderer } = useThree();
  const {sectionNum, horizontalRadius, verticalRadius, zRadius, zTheta} = useContext(threeConstContext);
  const canvasRef=useRef<HTMLCanvasElement>(null);

  let cw = 0.1;
  let tw = 0.1;
  const lookAtVector = new THREE.Vector3(0, 0, 0.1);
  const curVector = new THREE.Vector3(0.1, 0, 0.1);
  
  const pointer = new THREE.Vector2(-100, -100);
  
  drawSections(scene, sectionNum, horizontalRadius, verticalRadius);
  const ball = drawBall(scene);

  const onPointerMove = ( event:any ) => {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  window.addEventListener( 'pointermove', onPointerMove );

  document.addEventListener("wheel", function (e) {
    tw=Math.max(1/10, Math.min(tw+e.deltaY/200, (5*sectionNum-4)/10));
  });

  useEffect(() => {
    if (canvasRef.current) {
      setCamera(new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.001, 2000));
      setRenderer(new THREE.WebGLRenderer({canvas: canvasRef.current}));
    }
  }, [canvasRef]);
  
  useEffect(() => {
    const animate = () => {
      // Dom 갱신을 위한 부분
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta)+curVector.z);
      raycaster.setFromCamera( pointer, camera );
  
      const intersects = raycaster.intersectObjects( scene.children );
      for ( let i = 0; i < intersects.length; i ++ ) {
        if(intersects[i].object.type=="Mesh"){
          if(!isNaN(Number(intersects[i].object.name)))
            tw=(5*Number(intersects[i].object.name)+1)/10;
          intersects[i].object.scale.x=20/10;
          intersects[i].object.scale.y=20/10;
          intersects[i].object.scale.z=20/10;
        }
      }
  
      const {x, y, z} = witchLine(5, 4, cw+(tw-cw)/100);
      
      cw=(Math.abs(cw-tw)>0.01)?cw+(tw-cw)/20:tw;
      curVector.set(x, y, z);
      lookAtVector.set(0, 0, z);
      ball.position.set(curVector.x, curVector.y, curVector.z);
  
      window.requestAnimationFrame(animate);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render( scene, camera );
    };

    animate();
  }, [renderer]);

  return (
    <canvas ref={canvasRef} id="canvas"/>
  );
}

export default Three;