import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

export const loadLine = (scene:THREE.Scene, points: Array<any>, linewidth:number) => {
  const geometry = new LineGeometry();
  const material = new LineMaterial( { color: 0xFFFFFF, linewidth: linewidth } );
  geometry.setPositions( points );
  const line = new Line2( geometry, material );
  scene.add( line );
}