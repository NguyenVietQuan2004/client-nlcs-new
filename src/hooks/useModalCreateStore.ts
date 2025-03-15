import { create } from "zustand";

interface ModalCreateProps {
  isShowModalCreate: boolean;
  setIsShowModalCreate: (isShowModalCreate: boolean) => void;
}

const useModalCreateStore = create<ModalCreateProps>()((set) => ({
  isShowModalCreate: false,
  setIsShowModalCreate: (isShowModalCreate: boolean) => set({ isShowModalCreate }),
}));
export default useModalCreateStore;
