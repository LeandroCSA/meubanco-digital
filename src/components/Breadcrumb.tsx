// src/components/Breadcrumb.tsx
import Link from "next/link";
import { JSX } from "react/jsx-runtime";
import { RiArrowDropRightLine } from "react-icons/ri";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: JSX.Element;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex gap-0 md:gap-2 text-sm mb-6 items-center">
      {items.map((item, index) => (
        <div className="group flex items-center gap-2" key={index}>
          {item.href ? (
            <Link
              href={item.href}
              className="flex gap-2 items-center underline underline-offset-4 group-hover:text-teal-400"
            >
              {item.icon && item.icon}
              {item.label}
            </Link>
          ) : (
            <span className="flex gap-2 items-center font-semibold">
              {item.icon && item.icon}
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <RiArrowDropRightLine size={18} />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
