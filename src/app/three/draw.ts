import * as THREE from 'three';
import { loadLine } from './line';
import { loadCube, loadSphere } from './sphere';

export class DrawClass {
  scene;
  width;
  radius;
  precision=24;

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
    const points = [-10, 0, 0];
    for(let i=0; i<N; i++){
      if(i%2) this.drawCircleLeft(points, -this.width, 2*this.radius*i);
      else this.drawCircleRight(points, this.width, 2*this.radius*i);
    }
    points.push((2*Number(N%2==0)-1)*10);
    points.push(0);
    points.push(2*this.radius*N);
    loadLine(this.scene, points, 0.005);
  }

  private drawSection(locVecter:THREE.Vector3) {
    loadSphere(this.scene, locVecter);
    const height=1;
    loadLine(this.scene, [locVecter.x, locVecter.y, locVecter.z, locVecter.x, locVecter.y+height, locVecter.z], 0.001);
    const vec = new THREE.Vector3(locVecter.x, locVecter.y+height, locVecter.z);
    loadCube(this.scene, vec);
  }

  public drawSections(N:number) {
    const dx=0.6*this.radius;
    const locX=[-dx+this.width, this.radius+this.width, dx-this.width, -this.radius-this.width];
    for(let i=0; i<N; i++){
      this.drawSection(new THREE.Vector3(locX[i%4], 0, this.radius*i));
    }
  }
}







