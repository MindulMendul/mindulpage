"use client"

import * as THREE from 'three';
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { threeConstContext } from '@/context/threeContext';
import { drawBall, drawSections } from '@/util/draw';
import { witch } from '@/util/witch';
import useThree from '@/hooks/useThree';

const _lookAtVector = new THREE.Vector3(0, 0, 0.1);
const _curVector = new THREE.Vector3(0.1, 0, 0.1);

let cw = 0;
let tw = 0.1;
const _pointer = new THREE.Vector2(-100, -100);
let ball:any = null;

const Three = () => {
  const { scene, camera, renderer, raycaster, setRenderer } = useThree();
  const {sections, horizontalRadius, verticalRadius, zRadius, zTheta} = useContext(threeConstContext);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  
  const [lookAtVector, setLookAtVector] = useState(_lookAtVector);
  const [curVector, setCurVector] = useState(_curVector);
  const [pointer, setPointer] = useState(_pointer);

  const wheelListener = useCallback(( e:WheelEvent ) => {
    tw = Math.max(1/10, Math.min(tw+e.deltaY/200, (5*5-4)/10));
    console.log(tw);
  },[tw]);

  const onPointerMove = useCallback(( event:PointerEvent ) => {
    const x = ( event.clientX / window.innerWidth ) * 2 - 1;
    const y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    setPointer((p)=>{p.set(x, y); return p;})
  },[pointer]);

  useEffect(() => {
    window.addEventListener( 'pointermove', onPointerMove );
    window.addEventListener("wheel", wheelListener);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", wheelListener);
    };
  },[pointer]);

  useEffect(()=>{
    drawSections(scene, sections, horizontalRadius, verticalRadius);
    ball=drawBall(scene);
  },[]);

  useEffect(() => {
    if (canvasRef.current) {
      const _renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
      setRenderer(_renderer);
    }
  }, [canvasRef]);

  useEffect(()=>{
    const animate = () => {
      cw=(Math.abs(cw-tw)>0.01)?cw+0.01*(tw-cw):tw;

      const {x, y, z} = witch(5, 4, cw);
      setCurVector((curVector)=>{curVector.set(x, y, z); return curVector});
      setLookAtVector((lookAtVector)=>{lookAtVector.set(0, 0, z); return lookAtVector});
      
      ball.position.set(curVector.x, curVector.y, curVector.z);
      camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta)+curVector.z);
      camera.lookAt(lookAtVector);
      
      raycaster.setFromCamera( pointer, camera );

      const intersects = raycaster.intersectObjects( scene.children );
      for ( let i = 0; i < intersects.length; i ++ ) {
        if(intersects[i].object.type=="Mesh"){
          if(sections.includes(intersects[i].object.name)){
            tw = (5*sections.indexOf(intersects[i].object.name)+1)/10;
            intersects[i].object.scale.x=20/10;
            intersects[i].object.scale.y=20/10;
            intersects[i].object.scale.z=20/10;
          }
        }
      }

      //console.log(`${cw} ${tw}`);

      camera.aspect = window.innerWidth/window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render( scene, camera );
      window.requestAnimationFrame(animate);
    };

    animate();
  }, [renderer]);

  return (
    <canvas ref={canvasRef} id="canvas"/>
  );
}

export default Three;