import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="lg:px-10 px-2 sm:px-4 pt-4 min-h-[100vh]  ">{children}</div>;
}

export default Wrapper;
