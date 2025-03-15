function Loading() {
  return (
    <div className="relative inset-0  z-20  ">
      <div className="h-[80px]  before:shadow-[0_0_70px_40px_white]  w-[300px] mb-4 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
      <div className="mt-14 flex justify-between w-[93%] mx-auto">
        <div className="h-[30px] rounded-sm  before:shadow-[0_0_70px_40px_white]  relative w-[26%]  before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white  before:animate-navbar-loading "></div>
        <div className="h-[30px]  rounded-sm before:shadow-[0_0_70px_40px_white]  relative w-[10%]  before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white  before:animate-navbar-loading "></div>
      </div>
      <div className="h-[300px]   before:shadow-[0_0_70px_40px_white] w-[93%] mx-auto mt-4 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
    </div>
  );
}
export default Loading;
