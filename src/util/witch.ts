export const witch = (hr:number, vr:number, theta:number) => {
  const x=Math.sin(Math.PI*theta)*hr;
  const y = 0;
  const az=(2*(Math.floor(theta)%2)-1);
  const bz=2*Math.floor(theta)+1;
  const z=(bz+az*Math.cos(Math.PI*theta))*vr;

  return {x, y, z};
}