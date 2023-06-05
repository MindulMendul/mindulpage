// 인터넷에서 줍줍한 함수
export const HSVtoRGB = (h:number,s:number,v:number):THREE.ColorRepresentation => {                              
  let f=(n:number, k=(n+h/60)%6) => Math.round(255*(v-v*s*Math.max( Math.min(k,4-k,1), 0)));     
  return f(5)*256*256+f(3)*256+f(1);       
}