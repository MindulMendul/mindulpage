import { createContext } from 'react';

type threeConstProps = {
  sections: string[]
  horizontalRadius: number
  verticalRadius: number
  zRadius: number
  zTheta: number
}


export const threeConstContext = createContext({
  sections:["mindulbot", "matilda", "slidepuzzle", "vi828583", "forstudy"],
  horizontalRadius: 5,
  verticalRadius:4,
  zRadius: 40,
  zTheta: Math.PI/4
} as threeConstProps);

export const threeVariableContext = createContext<any|null>(null);
