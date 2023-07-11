export const witch = (hr:number, vr:number, theta:number) => {
  if(theta<=0){
    const x=Math.sqrt((hr*hr+vr*vr)/2)*theta, y=0, z=0;
    return {x, y, z};
  }

  const x=Math.sin(Math.PI*theta)*hr;
  const y=0;
  const az=(2*(Math.floor(theta)%2)-1);
  const bz=2*Math.floor(theta)+1;
  const z=(bz+az*Math.cos(Math.PI*theta))*vr;

  return {x, y, z};
}