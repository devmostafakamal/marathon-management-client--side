import React from "react";

function NotFound() {
  return (
    <div>
      {" "}
      <div className="text-5xl min-h-screen  flex flex-col  justify-center items-center gap-7 font-bold text-red-500">
        <div>
          <img
            className=" w-[360px] md:w-[500px] md:h-[400px]  rounded-2xl"
            src="/assets/error page.jpg"
            alt=""
          />
        </div>
        <h1> 4O4 Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
