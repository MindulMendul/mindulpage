"use client"

import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { drawBall, drawSections } from '@/util/draw';
import { witch } from '@/util/witch';
import { useRouter } from 'next/navigation';
import { WebGLRenderer } from 'three';

const lookAtVector = new THREE.Vector3(0, 0, 0.1);
const curVector = new THREE.Vector3(0.1, 0, 0.1);
const pointer = new THREE.Vector2(-100, -100);

let cw = 0;
let tw = 0.1;
let ball:any = null;
let ss: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] = [];
let ani = 0; let aniMax=2, aniMin=1;
let animationId:number;

const sections = ["mindulbot", "matilda", "slidepuzzle", "vi828583", "study"];
const horizontalRadius = 5;
const verticalRadius = 4;
const zRadius = 40;
const zTheta = Math.PI/4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.001, 2000);
const raycaster = new THREE.Raycaster();
let renderer:WebGLRenderer;
scene.background = new THREE.Color(0x000A2B);
camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta));

const ThreeCanvas = () => {
  const router = useRouter();
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
    };
  });

  useEffect(()=>{
    scene.clear();
    ss=drawSections(scene, sections, horizontalRadius, verticalRadius);
    ball=drawBall(scene);
  },[]);

  useEffect(() => {
    if (canvasRef.current) {
      renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
    }
    return;
  }, [canvasRef]);

  useEffect(()=>{
    const animate = ()=>{
      if(animationId) window.cancelAnimationFrame(animationId);
      cw=(Math.abs(cw-tw)>0.0001)?cw+0.05*(tw-cw):tw;
      if(ani<1) ani+=0.002;
      
      if(aniMax>10 && ani>0.1) {
        router.push("/"+sections[Math.round(0.2*(tw*10-1))]);
        ani=0; aniMax=2; aniMin=1;
      }
  
      const {x, y, z} = witch(5, 4, cw);
      curVector.set(x, y, z);
      lookAtVector.set(0, 0, z);
      
      ball.position.set(curVector.x, curVector.y, curVector.z);
      camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta)+curVector.z);
      camera.lookAt(lookAtVector);
      
      raycaster.setFromCamera( pointer, camera );
  
      setSectionSize(tw, ani);
  
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render( scene, camera );

      animationId=window.requestAnimationFrame(animate);
    };
    animate();
  }, [renderer]);

  return (
    <canvas ref={canvasRef} id="canvas"/>
  );
}

export default ThreeCanvas;

const setSectionSize = (tw:number, ani: number) => {
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
};

const onWheel = ( event:WheelEvent ) => {
  ani=0;
  tw = Math.max(1/10, Math.min(tw+event.deltaY/200, (5*5-4)/10));
};

const onPointerMove = ( event:PointerEvent ) => {
  const x = (event.clientX/window.innerWidth)*2-1;
  const y = - (event.clientY/window.innerHeight)*2+1;
  pointer.set(x, y);
};

const onClick = (event:Event)=>{
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
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      ani=0; aniMax=30; aniMin=0;
    }
    tw = (5*i+1)/10;
  }
};