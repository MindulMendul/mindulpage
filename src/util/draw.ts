import * as THREE from 'three';
import { LoaderClass } from './loader';
import { witchLine } from './witch';

export class DrawClass {
  scene;
  width;
  horizontalRadius;
  verticalRadius;
  precision=24;
  loader=new LoaderClass();

  constructor(scene:THREE.Scene, width:number, horizontalRadius:number, verticalRadius:number){
    this.scene=scene;
    this.width=width;
    this.horizontalRadius=horizontalRadius;
    this.verticalRadius=verticalRadius;
  }
  
  private drawLine(N:number) {
    const INF=100;
    const points = [-INF, 0, 0];
    for(let i=0; i<N*this.precision; i++){
      const {x,z} = witchLine(this.horizontalRadius, this.verticalRadius, i/this.precision);
      points.push(x);
      points.push(0);
      points.push(z);

    }
    points.push((1-2*(N%2))*INF);
    points.push(0);
    points.push(2*this.verticalRadius*N);
    this.loader.loadLine(this.scene, points, 0.005);
  }

  private drawSection(i:number, locVector:THREE.Vector3) {
    this.loader.loadSphere(this.scene, locVector);
    const height=1;
    this.loader.loadLine(this.scene, [locVector.x, locVector.y, locVector.z, locVector.x, locVector.y+height, locVector.z], 0.001);
    const vec = new THREE.Vector3(locVector.x, locVector.y+height, locVector.z);
    this.loader.loadCube(this.scene, vec, i);
  }

  public drawSections(N:number) {
    for(let i=0; i<N; i++){
      const {x,z} = witchLine(this.horizontalRadius, this.verticalRadius, (5*i+1)/10);
      this.drawSection(i, new THREE.Vector3(x, 0, z));
    }
    
    this.drawLine(Math.floor(N/2));
  }

  public drawBall(locVector:THREE.Vector3){
    
    
  }
}







