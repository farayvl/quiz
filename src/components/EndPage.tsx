import React from "react";

type EndPageProps = {
  percentage: number;
};

export default function EndPage({ percentage }: EndPageProps) {
  return (
    <div className="bg-linear-to-r from-[#003A57] to-[#505486] h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-[36px] text-white text-center mb-[30px]">
        Quiz is over! Thank you for completing it!
      </div>
      <div className="w-[300px] bg-white rounded-[20px] overflow-hidden mb-[20px]">
        <div
          className="h-[73px] flex items-center justify-center text-[32px] text-white bg-[#559843] p-10 px-12"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
      <button
        className="bg-[#8B65FF] p-10 text-white text-[32px] h-[65px] items-center 
          justify-center flex rounded-[20px] cursor-pointer"
        onClick={() => window.location.reload()}
      >
        Take the quiz again
      </button>
    </div>
  );
}
