// "use client"
// import * as THREE from 'three';
// import { Scene } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import React, { useEffect, useRef } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Home = () => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const scene = new THREE.Scene();
  //     const renderer = new THREE.WebGLRenderer({
  //       canvas: canvasRef.current,
  //       antialias: true,
  //     });
  //     const camera = new THREE.PerspectiveCamera(30, 1);
  //     camera.position.set(0, 0, 5);
  //     const loader = new GLTFLoader();
  //     scene.background = new THREE.Color("white");
  //     const light = new THREE.DirectionalLight(0xffff00, 10);
  //     scene.add(light);

  //     loader.load("/scene.gltf", (object) => {
  //       scene.add(object.scene);
  //       renderer.render(scene, camera);
  //     });
  //   }
  // }, [canvasRef]);

  return (
    <main className="flex min-h-screen flex-col">
      Mindul Three Page
    </main>
  );
  //return <canvas ref={canvasRef} id="canvas" width="300" height="300"></canvas>;
};

export default Home;

// // 3D를 보여줄 화면과 카메라 조정을 담당하는 함수
// // 옷을 보여주기 위해 의도적으로 제약을 걸어둔 부분이 많으므로 유의
// export const ThreeView = () => {
//   const scene = new Scene();
//   const [canvasWidth, canvasHeight] = [640, 640]; // 브라우저 크기 확인

//   //scene : 화면 출력의 대상
//   scene.background = new THREE.Color(0x000A32); // 플레이스홀더의 색깔은 회색으로.

//   //renderer : 화면 렌더러
//   const renderer = new THREE.WebGLRenderer({antialias:false}); // 안티앨리어싱은 필요하지 않음.
//   renderer.shadowMap.enabled = true; // 셰도우맵 사용 : 그림자 표현
//   renderer.shadowMap.type = THREE.PCFShadowMap; // PCF 방식의 섀도우맵을 사용할 예정

//   //camera : 화면 출력 카메라
//   const camera = new THREE.PerspectiveCamera(45, 3/4, 1/64, 2000); // 화면각은 45도, 화면 비율은 실제 보여지는 비율에 맞게 수정.
//   camera.position.set(0, 0, 0); //최초 카메라 위치 조절

//   //lights : 광원
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // 빛 종류는 AmbientLight, 빛 색깔은 사이트 분위기와 비교하여 고르기
//   ambientLight.name = 'ambientLight';
//   scene.add(ambientLight);

//   //controls : 카메라 조절하는 컨트롤러 (depend on camera & renderer)
//   const controls = new OrbitControls(camera, renderer.domElement);
//   const _dis=100;

//   controls.minDistance = _dis; // 카메라 최소 거리
//   controls.maxDistance = _dis; // 카메라 최대 거리
//   controls.enablePan = true; // 카메라 절대 위치 조절
//   controls.keys = { LEFT: '', RIGHT: '', UP: '', BOTTOM: '' }; //카메라 절대 위치는 마우스로만 조절할 수 있음
//   controls.panSpeed = 2; // 카메라 절대 위치 속도 조절
//   controls.minPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (하)
//   controls.maxPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (상)
//   controls.enableDamping = false; //마찰력 기능
//   controls.target.set(0, 200, 0); //카메라 시점 조절
//   controls.update();

//   const animate = () => {
//     //need to load model
//     controls.update();

//     // Dom 갱신을 위한 부분
//     renderer.setSize(canvasWidth, canvasHeight); // 브라우저 크기에 맞춰서 사이즈 조절
//     renderer.render(scene, camera); // 렌더링하는 부분.
//     window.requestAnimationFrame(animate); // 브라우저에 애니메이트
//   };

//   animate();

//   return (
//     <div className="View" />
//   );
// }