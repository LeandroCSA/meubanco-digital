// src/components/CreditCardSection.tsx
"use client";

import { RiVisaLine } from "react-icons/ri";
import ButtonLinkSimple from "./ButtonLinkSimple";

interface CreditCardSectionProps {
  name: string;
  cardNumber: string;
  expiry: string;
  availableLimit: string;
  outstandingBalance: string;
  closingDate: string;
  viewAmount: boolean;
}

const CreditCardSection: React.FC<CreditCardSectionProps> = ({
  name,
  cardNumber,
  expiry,
  availableLimit,
  outstandingBalance,
  closingDate,
  viewAmount
}) => {

  return (
    <section className="grid border border-slate-200 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="p-4 flex justify-between items-center">
        <p>Cartão de crédito</p>
        <ButtonLinkSimple label="Acessar cartão" />
      </div>
      {/* Cartão */}
      <div className="p-6 text-white w-full relative h-48 grid content-between bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500 via-teal-500 to-green-400">
        <RiVisaLine size={50} className="absolute top-2 right-6" />
        <strong>{name}</strong>
        <div className="absolute left-0 bottom-0 w-full flex items-center gap-6 p-6 border-t border-white border-opacity-20 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10">
          <small>•••• •••• •••• {cardNumber.slice(-4)}</small>
          <small>{expiry}</small>
        </div>
      </div>
      {/* Informações */}
      <div className="grid md:flex gap-0 md:gap-8 w-full p-0 md:p-6">
        <p className="grid border-b md:border-r md:border-b-0 border-slate-200 pr-0 md:pr-8 text-lg dark:border-slate-800 p-3">
          <small className="text-slate-400">Limite disponível:</small>
          <b>{viewAmount ? `R$ ${availableLimit}` : "••••••"}</b>
        </p>
        <p className="grid border-b md:border-r md:border-b-0 border-slate-200 pr-0 md:pr-8 text-lg dark:border-slate-800 p-3">
          <small className="text-slate-400">Fatura em aberto:</small>
          <b>{viewAmount ? `R$ ${outstandingBalance}` : "••••••"}</b>
        </p>
        <p className="grid text-lg p-3">
          <small className="text-slate-400">Data de fechamento:</small>
          <b>{closingDate}</b>
        </p>
      </div>
    </section>
  );
};

export default CreditCardSection;