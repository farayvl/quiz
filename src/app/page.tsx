"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter()

  const toQuiz = () => {
    router.push("/quiz");
  }

  return (
    <div className="bg-linear-to-r from-[#003A57] to-[#505486] h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-[391px] gap-10">
        {" "}
        <div className="text-[48px] text-white">Welcome to Quiz!</div>
        <button onClick={toQuiz} className="bg-[#8B65FF] p-10 text-white text-[40px] h-[100px] items-center 
        justify-center flex w-[391px] rounded-[20px] cursor-pointer">
          Start
        </button>
      </div>
    </div>
  );
}
