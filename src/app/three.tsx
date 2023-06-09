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
let ani = 0; const aniMax=2, aniMin=1;

const Three = () => {
  const router = useRouter();
  const { scene, camera, renderer, raycaster, setRenderer } = useThree();
  const {sections, horizontalRadius, verticalRadius, zRadius, zTheta} = useContext(threeConstContext);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  
  const [lookAtVector, setLookAtVector] = useState(_lookAtVector);
  const [curVector, setCurVector] = useState(_curVector);
  const [pointer, setPointer] = useState(_pointer);

  const setSectionSize = useCallback((tw:number, ani: number) => {
    ss.forEach((elem, i)=>{
      if(Math.abs(0.2*(tw*10-1)-i)<0.001){
        elem.scale.x=elem.scale.x<aniMax?elem.scale.x+(aniMax-elem.scale.x)*ani:aniMax;
        elem.scale.y=elem.scale.y<aniMax?elem.scale.y+(aniMax-elem.scale.y)*ani:aniMax;
        elem.scale.z=elem.scale.z<aniMax?elem.scale.z+(aniMax-elem.scale.z)*ani:aniMax;
      } else {
        elem.scale.x=elem.scale.x>aniMin?elem.scale.x-(elem.scale.x-aniMin)*ani:aniMin;
        elem.scale.y=elem.scale.y>aniMin?elem.scale.y-(elem.scale.y-aniMin)*ani:aniMin;
        elem.scale.z=elem.scale.z>aniMin?elem.scale.z-(elem.scale.z-aniMin)*ani:aniMin;
      }
    });
  },[tw]);

  const onWheel = useCallback(( event:WheelEvent ) => {
    ani=0;
    tw = Math.max(1/10, Math.min(tw+event.deltaY/200, (5*5-4)/10));
  },[tw]);

  const onPointerMove = useCallback(( event:PointerEvent ) => {
    const x = (event.clientX/window.innerWidth)*2-1;
    const y = - (event.clientY/window.innerHeight)*2+1;
    setPointer((p)=>{p.set(x, y); return p;})
  },[pointer]);

  const onClick = useCallback((event:Event)=>{
    ani=0;
    const intersects = raycaster.intersectObjects(scene.children).filter(
      (i: THREE.Intersection<THREE.Object3D<THREE.Event>>) => {
        return ss.some((elem)=>(elem.uuid==i.object.uuid))
      }
    );
    
    if(intersects.length){
      const intersect = intersects.shift() as THREE.Intersection<THREE.Object3D<THREE.Event>>;
      const i=ss.findIndex((e)=>(e.uuid==intersect.object.uuid));
      console.log(Math.abs(0.2*(tw*10-1)-i));
      if(Math.abs(0.2*(tw*10-1)-i)<0.001){
        router.replace("/"+sections[i]);
      }
      tw = (5*i+1)/10;
    }
  }, [raycaster])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener("wheel", onWheel);
    console.log("qwer");
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointermove", onClick);
      window.removeEventListener("wheel", onWheel);
      console.log("asdf");
    };
  });

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
      cw=(Math.abs(cw-tw)>0.0001)?cw+0.02*(tw-cw):tw;
      if(ani<1) ani+=0.001;

      const {x, y, z} = witch(5, 4, cw);
      setCurVector((curVector)=>{curVector.set(x, y, z); return curVector});
      setLookAtVector((lookAtVector)=>{lookAtVector.set(0, 0, z); return lookAtVector});
      
      ball.position.set(curVector.x, curVector.y, curVector.z);
      camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta)+curVector.z);
      camera.lookAt(lookAtVector);
      
      raycaster.setFromCamera( pointer, camera );

      setSectionSize(tw, ani);

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