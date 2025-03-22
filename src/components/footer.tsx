"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"];

  return (
    <footer className="bg-white flex-grow-0 z-10">
      <div className="p-4">
        <div className="border-t border-gray-200">
          {pathsToMinimize.includes(pathname) ? null : (
            <div className="pb-8 pt-16">
              <div className="flex justify-center"></div>
            </div>
          )}

          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div aria-hidden="true" className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90" />
                </div>

                <div className="text-center relative mx-auto max-w-sm">
                  <h3 className="font-semibold text-gray-900">Hệ thống quản lý thương mại điện tử</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nếu bạn muốn tạo ra các sản phẩm kỹ thuật số chất lượng cao, bạn có thể làm điều đó trong vài phút.{" "}
                    <Link href="#" className="whitespace-nowrap font-medium text-black hover:text-zinc-900">
                      Bắt đầu ngay &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Tất Cả Quyền Được Bảo Lưu</p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <div className="text-sm text-muted-foreground hover:text-gray-600">Hotline: 0763948610</div>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Điều Khoản
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Chính Sách Bảo Mật
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Chính Sách Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
