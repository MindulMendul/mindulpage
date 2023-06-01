"use client"
import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Three = () => {
  const [_radius, _theta] = [5, Math.PI/2.1];
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

      const camera = new THREE.PerspectiveCamera(3000, 1);
      camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta));
      camera.lookAt(locVecter);
      
      const animate = () => {
        // Dom 갱신을 위한 부분
        renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientWidth); // 브라우저 크기에 맞춰서 사이즈 조절
        renderer.render(scene, camera); // 렌더링하는 부분.
        window.requestAnimationFrame(animate); // 브라우저에 애니메이트
      };

      const loader = new GLTFLoader();
      
      loader.load("./test/scene.gltf", (object) => {
        const matilda = object.scene.children[0];
        matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정
        const boxSizeVecter = new THREE.Box3().setFromObject(matilda).getSize(new THREE.Vector3());
        
        scene.add(object.scene);
        camera.lookAt(locVecter);
      },
      // called while loading is progressing
      (xhr) => {
        console.log(xhr.loaded);
        console.log(xhr.total);
      },
  
      // called when loading has errors
      (error) => {
        console.error(error);
        console.log('An error happened');
      }
      );

      const geometry = new THREE.SphereGeometry( 0.2, 32, 16 ); 
      const material = new THREE.MeshBasicMaterial( { color: 0x000000 } ); 
      const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
    
      const textureLoader = new THREE.TextureLoader();

      //ground
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({
          map: textureLoader.load(`./test/Mindullormoon.png`)
        })
      );
      floor.rotation.x -= 0.5 * Math.PI;
      floor.position.set(locVecter.x, locVecter.y-1.5, locVecter.z);
      scene.add(floor);
      
      animate();
    }
  }, [canvasRef]);

  return (
    <main>
      <canvas ref={canvasRef} id="canvas" width={document.documentElement.clientWidth} height={document.documentElement.clientWidth}/>
    </main>
  );
}

export default Three;