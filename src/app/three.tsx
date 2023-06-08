"use client"

import * as THREE from 'three';
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { threeConstContext } from '@/context/threeContext';
import { drawBall, drawSections } from '@/util/draw';
import { witch } from '@/util/witch';
import useThree from '@/hooks/useThree';
import { useRouter } from 'next/navigation';

const _lookAtVector = new THREE.Vector3(0, 0, 0.1);
const _curVector = new THREE.Vector3(0.1, 0, 0.1);

let cw = 0;
let tw = 0.1;
const _pointer = new THREE.Vector2(-100, -100);
let ball:any = null;
let ss: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] = [];

const Three = () => {
  const router = useRouter();
  const { scene, camera, renderer, raycaster, setRenderer } = useThree();
  const {sections, horizontalRadius, verticalRadius, zRadius, zTheta} = useContext(threeConstContext);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  
  const [lookAtVector, setLookAtVector] = useState(_lookAtVector);
  const [curVector, setCurVector] = useState(_curVector);
  const [pointer, setPointer] = useState(_pointer);

  const onWheel = useCallback(( event:WheelEvent ) => {
    tw = Math.max(1/10, Math.min(tw+event.deltaY/200, (5*5-4)/10));
    ss.forEach((elem, i)=>{
      if(Math.abs(0.2*(tw*10-1)-i)<0.001){
        tw = (5*i+1)/10;
        elem.scale.x=20/10;
        elem.scale.y=20/10;
        elem.scale.z=20/10;
      } else {
        elem.scale.x=1;
        elem.scale.y=1;
        elem.scale.z=1;
      }
    });
  },[tw]);

  const onPointerMove = useCallback(( event:PointerEvent ) => {
    const x = (event.clientX/window.innerWidth)*2-1;
    const y = - (event.clientY/window.innerHeight)*2+1;
    setPointer((p)=>{p.set(x, y); return p;})
  },[pointer]);

  const onClick = useCallback((event:Event)=>{
    const intersects = raycaster.intersectObjects(scene.children).filter(
      (i: THREE.Intersection<THREE.Object3D<THREE.Event>>) => {
        return ss.some((elem)=>(elem.uuid==i.object.uuid))
      }
    );
    
    if(intersects.length){
      const intersect = intersects.shift() as THREE.Intersection<THREE.Object3D<THREE.Event>>;
      ss.forEach((elem, i)=>{
        if(elem.uuid==intersect.object.uuid){
          if(Math.abs(0.2*(tw*10-1)-i)<0.001){
            router.push('/'+sections[i]);
          }
          tw = (5*i+1)/10;
          elem.scale.x=20/10;
          elem.scale.y=20/10;
          elem.scale.z=20/10;
        } else {
          elem.scale.x=1;
          elem.scale.y=1;
          elem.scale.z=1;
        }
      });
    }
  }, [raycaster])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointermove", onClick);
      window.removeEventListener("wheel", onWheel);
    };
  },[pointer]);

  useEffect(()=>{
    scene.clear();
    ss=drawSections(scene, sections, horizontalRadius, verticalRadius);
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