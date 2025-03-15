import Wrapper from "@/components/wrapper";

function Loading() {
  return (
    <div className="relative inset-0  z-20   ">
      <Wrapper>
        <div className="h-[80px]  before:shadow-[0_0_70px_40px_white]  w-[300px] mb-4 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
        <div className="h-[110px]   before:shadow-[0_0_70px_40px_white]  w-full my-4 rounded-lg relative    before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2  before:-translate-y-1/2 before:bg-white  before:animate-navbar-loading"></div>
        <div className="h-[462px]   before:shadow-[0_0_70px_40px_white] w-full mx-auto mt-10 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
      </Wrapper>
    </div>
  );
}
export default Loading;
