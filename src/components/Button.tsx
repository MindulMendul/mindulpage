"use client"

import { useRouter } from "next/navigation";

type ButtonProps = {
  dir: string
  title: string
}

const Button = (props: ButtonProps) => {
  const router = useRouter();
  const {dir, title} = props;
  return (
  <button type="button" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
    onClick={()=>{router.push(dir);}}>
    {title}
  </button>
  );
}

export default Button;