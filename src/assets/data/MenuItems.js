// src/assets/data/MenuItems.js
import { GrHomeRounded, GrTransaction } from "react-icons/gr";
import { RxIdCard } from "react-icons/rx";

export const menuScheme = [
  {
    label: "Home",
    link: "home",
    icon: <GrHomeRounded size={18} />,
  },
  {
    label: "Transações",
    link: "transactions",
    icon: <GrTransaction size={18} />
  },
  {
    label: "Sobre",
    link: "about",
    icon: <RxIdCard size={18} />
  },
];