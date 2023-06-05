import { createContext } from 'react';

type threeConstProps = {
  sectionNum: number
  horizontalRadius: number
  verticalRadius: number
  zRadius: number
  zTheta: number
}


export const threeConstContext = createContext({
  sectionNum:20,
  horizontalRadius: 5,
  verticalRadius:4,
  zRadius: 25,
  zTheta: Math.PI/4
} as threeConstProps);

export const threeVariableContext = createContext<any|null>(null);
