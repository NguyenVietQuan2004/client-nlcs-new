import LoadingButton from "@/components/loading-button";

function Loading() {
  return (
    <div className="relative inset-0  z-20  ">
      <div className="h-[77px]  before:shadow-[0_0_70px_40px_white]  w-[300px] mb-4 rounded-lg relative   before:w-[30px]  before:z-30 bg-zinc-100 before:content-[''] before:absolute before:h-[60%] before:top-1/2 before:-translate-y-1/2 before:bg-white before:animate-navbar-loading"></div>
      <div className="relative inset-0 bg-zinc-50 flex justify-center items-center h-[80vh] mt-8">
        <LoadingButton />
      </div>
    </div>
  );
}

export default Loading;
