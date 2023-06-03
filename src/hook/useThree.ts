import * as THREE from 'three';

export const useThree = (canvasRef:any) => {
  const [_radius, _theta] = [25, Math.PI/3];
  const locVector = new THREE.Vector3(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000A2B);

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
  renderer.shadowMap.enabled = false; // 셰도우맵 사용 : 그림자 표현
  renderer.shadowMap.type = THREE.PCFShadowMap; // PCF 방식의 섀도우맵을 사용할 예정

  const camera = new THREE.PerspectiveCamera(30, document.documentElement.clientWidth/document.documentElement.clientHeight, 0.001, 2000);
  camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta)+locVector.z);
  camera.lookAt(locVector);

  const pointer = new THREE.Vector2(-100, -100);

  const onPointerMove = ( event:any ) => {
    pointer.x = ( event.clientX / document.documentElement.clientWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / document.documentElement.clientHeight ) * 2 + 1;
  }
  window.addEventListener( 'pointermove', onPointerMove );


  
  let a = 4, t = -a;
  const curVector = new THREE.Vector3(t, t, t);
  const geometrySphere = new THREE.SphereGeometry( 0.1, 16, 16 );
  const materialSphere = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
  const sphere = new THREE.Mesh( geometrySphere, materialSphere );
  scene.add( sphere );

   // Dom 갱신을 위한 부분
   const animate = () => {
    camera.aspect = document.documentElement.clientWidth/document.documentElement.clientHeight;
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    renderer.render(scene, camera);
    

    camera.position.set(0, _radius*Math.sin(_theta), _radius*Math.cos(_theta)+locVector.z);
    camera.lookAt(locVector);

    const raycaster = new THREE.Raycaster();
    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera( pointer, camera );
  
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
      if(intersects[i].object.type=="Mesh"){
        intersects[i].object.scale.x=2;
        intersects[i].object.scale.y=2;
        intersects[i].object.scale.z=2;
      }
    }
  
    renderer.render( scene, camera );


    t+=(a-t)/50;
    if(Math.abs(t-a)<0.1) {t=a; a*=-1;}
    else if(Math.abs(t+a)<0.1) {t=-a; a*=-1;}
    
    curVector.set(t,0,t);
    sphere.position.set(curVector.x, curVector.y, curVector.z);
    console.log(sphere.position);
      
    window.requestAnimationFrame(animate);
  };

  return { scene, renderer, camera, locVector, animate };
} 
