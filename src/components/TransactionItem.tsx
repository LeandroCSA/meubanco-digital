// src/components/TransactionItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiMoneyWithdraw } from "react-icons/bi";
import { convertToDate } from "@/helpers/Utils";
import { Currency } from "@/helpers";

interface Transaction {
  id: string;
  pin?: string;
  type: string;
  createdAt: string;
  contact_name: string;
  contact_email: string;
  value: string;
}

interface TransactionItemProps {
  currency: string;
  dollar: number;
  transaction: Transaction;
}

const transactionType = (key: string) => {
  let icon;

  switch (key) {
    case "deposit":
      icon = <HiOutlineArrowDownLeft size={20} className="text-green-500" />;      
      break;
    case "withdrawal":
      icon = <BiMoneyWithdraw size={20} className="text-orange-400" />;      
      break;
    case "invoice":
      icon = <LiaFileInvoiceDollarSolid size={20} className="text-blue-500" />;      
      break;
    default:
      icon = <HiOutlineArrowUpRight size={20} className="text-red-500" />;      
      break;
  }

  return icon;
}

const TransactionItem: React.FC<TransactionItemProps> = React.memo(
  ({ currency, dollar, transaction }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_auto] gap-4 md:gap-6 items-center p-5  bg-white hover:bg-slate-50 border-dashed border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700 last:border-none">
        {/* Link para detalhes da transação */}
        <Link
          href={`/transactions/${transaction.id}`}
          className="flex items-center gap-1 font-bold text-sm text-[#01D2C7] underline underline-offset-2 group"
        >
          TSD-{transaction.pin} <HiOutlineArrowUpRight size={16} className="group-hover:translate-x-1 transition-all ease-linear" />
        </Link>

        {/* Tipo de transação */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-200 dark:border-slate-700`}>
            {transactionType(transaction.type)}
          </div>
          <div>
            <p className="capitalize font-semibold text-slate-800 dark:text-slate-200">
              {transaction.type}
            </p>
            <small className="text-slate-400">
              {convertToDate(transaction.createdAt, true)}
            </small>
          </div>
        </div>

        {/* Contato */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <Image
            src={`https://i.pravatar.cc/150?img=${transaction.id}`}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {transaction.contact_name}
            </p>
            <small className="text-slate-400">{transaction.contact_email}</small>
          </div>
        </div>

        {/* Valor da transação */}
        <strong>
          {Currency.currencyFormatChange(
            currency,
            Number(parseFloat(transaction.value)),
            dollar
          )}
        </strong>
      </div>
    );
  }
);

export default TransactionItem;