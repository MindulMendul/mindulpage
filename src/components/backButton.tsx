"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
  <button onClick={()=>{router.replace("/")}} >
    {"BACK"}
  </button>
  );
}

export default BackButton;