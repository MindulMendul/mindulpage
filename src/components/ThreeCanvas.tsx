"use client"

import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { drawBall, drawSections } from '@/util/draw';
import { witch } from '@/util/witch';
import { useRouter } from 'next/navigation';
import { Vector3, WebGLRenderer } from 'three';
import { loadGround, loadLight, loadText, loadTextKR } from '@/util/loader';

const lookAtVector = new THREE.Vector3(0, 0, 0.1);
const curVector = new THREE.Vector3(0.1, 0, 0.1);
const pointer = new THREE.Vector2(-100, -100);

const twStart=-6;
let cw = twStart;
let tw = twStart;
let ball:any = null;
let ss: any[] = [];
let ani = 0; let aniMax=2, aniMin=1;
let anix = 0.005;
let animationId:number;
let swipeX=0;
let canSwipe=0;

const sections = ["mindulbot", "matilda", "slidepuzzle", "vi828583", "codingtest"];
const horizontalRadius = 8;
const verticalRadius = 6;
const zRadius = 40;
const zTheta = Math.PI/3.4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 1, 100);
const raycaster = new THREE.Raycaster();
let renderer:WebGLRenderer;
scene.background = new THREE.Color(0x000000);//0x000A2B
camera.position.set(0, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta));

const ThreeCanvas = () => {
  const router = useRouter();
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  });

  useEffect(()=>{
    scene.clear();
    ss=drawSections(scene, sections, horizontalRadius, verticalRadius);
    ball=drawBall(scene);
    loadGround(scene, new Vector3(-25, -1, 3), 100, `./test/Mindullormoon.png`);//
    loadLight(scene);
    loadText(scene, new Vector3(-43, 3, -3), 2, "Mindul Page");
    loadTextKR(scene, new Vector3(-43, 3, 8), 1.5, "민둘이의 포트폴리오용 페이지");
  },[]);

  useEffect(() => {
    if (canvasRef.current) {
      renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
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

      const {x, y, z} = witch(horizontalRadius, verticalRadius, cw);
      curVector.set(x, y, z);
      lookAtVector.set(cw>0?0:x, 0, z);
      
      ball.position.set(curVector.x, curVector.y, curVector.z);
      camera.position.set(cw>0?0:x, zRadius*Math.sin(zTheta), zRadius*Math.cos(zTheta)+curVector.z);
      camera.lookAt(lookAtVector);
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.fov=45*window.innerWidth/window.innerHeight;
      
      raycaster.setFromCamera( pointer, camera );
  
      setSectionSize();
      setSectionAnimate();
  
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

const setSectionSize = () => {
  ss.forEach((elem, i)=>{
    const [cube, light] = elem;
    if(Math.abs(0.2*(tw*10-1)-i)<0.001){
      cube.scale.x=cube.scale.x<aniMax?cube.scale.x+(aniMax-cube.scale.x)*ani:aniMax;
      cube.scale.y=cube.scale.y<aniMax?cube.scale.y+(aniMax-cube.scale.y)*ani:aniMax;
      cube.scale.z=cube.scale.z<aniMax?cube.scale.z+(aniMax-cube.scale.z)*ani:aniMax;
      light.intensity=light.intensity<aniMax-1?light.intensity+(aniMax-1-light.intensity)*ani:aniMax-1;
    } else {
      cube.scale.x=cube.scale.x>aniMin?cube.scale.x-(cube.scale.x-aniMin)*ani:aniMin;
      cube.scale.y=cube.scale.y>aniMin?cube.scale.y-(cube.scale.y-aniMin)*ani:aniMin;
      cube.scale.z=cube.scale.z>aniMin?cube.scale.z-(cube.scale.z-aniMin)*ani:aniMin;
      light.intensity=light.intensity>aniMin-1?light.intensity-(light.intensity-aniMin+1)*ani:aniMin-1;
    }
  });
};

const setSectionAnimate = () => {
  ss.forEach((elem)=>{elem[0].rotateY(anix);});
};

const onTouchStart = ( event:TouchEvent ) => {
  swipeX=event.targetTouches[0].clientX;
}

const onTouch = ( event:TouchEvent ) => {
  if(event.targetTouches[0].clientX-swipeX>100) canSwipe=1;
  if(swipeX-event.targetTouches[0].clientX>100) canSwipe=-1;
}

const onTouchEnd = ( event:TouchEvent ) => {
  if(canSwipe==1) tw=twStart;
  if(canSwipe==-1) tw=0.1;
  canSwipe=0;
}

const onWheel = ( event:WheelEvent ) => {
  ani=0;
  if(tw>0){
    tw = Math.max(-0.4, Math.min(tw+event.deltaY/200, (5*ss.length-4)/10));
    if(tw<0) tw=twStart;
  } else {
    tw = Math.max(twStart, Math.min(tw+event.deltaY, 0.1));
  }
};

const onPointerMove = ( event:PointerEvent ) => {
  const x = (event.clientX/window.innerWidth)*2-1;
  const y = - (event.clientY/window.innerHeight)*2+1;
  pointer.set(x, y);
};

const onClick = (event:Event) => {
  ani=0;
  if(tw<0) {tw=0.1; return;}

  const intersects = raycaster.intersectObjects(scene.children).filter(
    (i: THREE.Intersection<THREE.Object3D<THREE.Event>>) => {
      return ss.some((elem)=>(elem[0].uuid==i.object.uuid))
    }
  );
  
  if(intersects.length){
    const intersect = intersects.shift() as THREE.Intersection<THREE.Object3D<THREE.Event>>;
    const i=ss.findIndex((e)=>(e[0].uuid==intersect.object.uuid));
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

