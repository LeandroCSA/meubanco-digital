// src/components/ButtonLinkSimple.tsx
import Link from "next/link";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

interface ButtonLinkSimpleProps {
  label?: string;
  link?: string;
}

const icon = <HiOutlineArrowUpRight size={12} className="group-hover:translate-x-1 transition-all ease-linear" />
const tailwindStyle = "font-semibold flex items-center underline underline-offset-2 gap-1 group hover:text-teal-500";

const ButtonLinkSimple: React.FC<ButtonLinkSimpleProps> = ({
  label,
  link
}) => {

  return (
    link ?
      <Link href={link} className={tailwindStyle}>{label}{icon}</Link>
      :
      <button className={`${tailwindStyle}`}>{label}{icon}</button>
  )
};

export default ButtonLinkSimple;