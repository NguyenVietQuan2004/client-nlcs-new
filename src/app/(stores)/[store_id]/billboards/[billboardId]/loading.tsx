function Loading() {
  return (
    <div className="relative inset-0  z-20  ">
      <div className="h-[77px]  before:shadow-[0_0_70px_40px_white]  w-[300px] mb-4 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
      <div className="h-[240px]   before:shadow-[0_0_70px_40px_white] w-[320px]  mt-8 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
    </div>
  );
}

export default Loading;
