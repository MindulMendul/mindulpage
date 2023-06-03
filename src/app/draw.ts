import * as THREE from 'three';
import { LoaderClass } from './loader';

export class DrawClass {
  scene;
  width;
  radius;
  precision=24;
  loader=new LoaderClass();

  constructor(scene:THREE.Scene, width:number, radius:number){
    this.scene=scene;
    this.width=width;
    this.radius=radius;
  }
  
  private drawCircleRight(points:Array<any>, x:number, y:number) {
    for(let i=0; i<this.precision; i++){
      points.push(x+this.radius*Math.sin(Math.PI*i/this.precision));
      points.push(0);
      points.push(y+this.radius-this.radius*Math.cos(Math.PI*i/this.precision));
    }
  }

  private drawCircleLeft(points:Array<any>, x:number, y:number) {
    for(let i=0; i<this.precision; i++){
      points.push(x-this.radius*Math.sin(Math.PI*i/this.precision));
      points.push(0);
      points.push(y+this.radius-this.radius*Math.cos(Math.PI*i/this.precision));
    }
  }

  public drawLine(N:number) {
    const INF=100;
    const points = [-INF, 0, 0];
    for(let i=0; i<N; i++){
      if(i%2) this.drawCircleLeft(points, -this.width, 2*this.radius*i);
      else this.drawCircleRight(points, this.width, 2*this.radius*i);
    }
    points.push((2*Number(N%2==0)-1)*INF);
    points.push(0);
    points.push(2*this.radius*N);
    this.loader.loadLine(this.scene, points, 0.005);
  }

  private drawSection(locVector:THREE.Vector3) {
    this.loader.loadSphere(this.scene, locVector);
    const height=1;
    this.loader.loadLine(this.scene, [locVector.x, locVector.y, locVector.z, locVector.x, locVector.y+height, locVector.z], 0.001);
    const vec = new THREE.Vector3(locVector.x, locVector.y+height, locVector.z);
    this.loader.loadCube(this.scene, vec);
  }

  public drawSections(N:number) {
    const dx=0.6*this.radius;
    const locX=[-dx+this.width, this.radius+this.width, dx-this.width, -this.radius-this.width];
    for(let i=0; i<N; i++){
      this.drawSection(new THREE.Vector3(locX[i%4], 0, this.radius*i));
    }
  }

  public drawBall(locVector:THREE.Vector3){
    
    return 
  }
}







