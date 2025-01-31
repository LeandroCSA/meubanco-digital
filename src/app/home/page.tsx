"use client"

import { useState } from 'react'
import Image from "next/image";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useTransactions } from "@/providers/TransactionsProvider";
import { useFilteredTransactions } from '@/hooks/useTransactions';
import { CiVault } from 'react-icons/ci';
import { LuChartNoAxesColumnIncreasing } from 'react-icons/lu';
import { convertToDate } from '@/helpers/Utils';
import { toBRL } from '@/helpers/Currency';
import { BsFire } from 'react-icons/bs';
import { PiArrowsDownUp } from 'react-icons/pi';
import ButtonIconSimple from '@/components/ButtonIconSimple';
import ButtonLinkSimple from '@/components/ButtonLinkSimple';
import { SkeletonItemHome } from '@/components/Skeletons';
import CopyTextButton from '@/components/CopyTextButton';
import CreditCardSection from '@/components/CreditCardSection';

const getCurrentDateTime = (withTime: boolean = true) => {
  const now = new Date();
  return now.toLocaleString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
};

export default function Home() {
  const {transactions, loading} = useTransactions();
  const {paginatedTransactions} = useFilteredTransactions(transactions);
  const [viewAmount, setViewAmount] = useState(true)

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10">

      <div className="w-full grid md:flex items-center justify-between mb-4 mt-12 md:mt-0">
        <h1 className="text-xl font-bold grid gap-0">
          Olá Leandro, bem vindo!
          <small className="text-sm font-normal text-slate-400">{getCurrentDateTime()}</small>
        </h1>

        <div className="mt-2 flex gap-2 md:gap-4 items-center z-10">
          <div className="flex items-center gap-1">
            Agência: <CopyTextButton text="0300" field="agencia" label="Copiar agência" />
          </div>
          <div className="flex items-center gap-1">
            Conta: <CopyTextButton text="000035712-8" field="conta" label="Copiar conta" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] w-full gap-6 items-start">
        <section className="grid gap-6 items-start">
          <section className="grid border border-slate-200 p-6 md:p-8 rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 z-10">
            <div className="grid md:flex items-center justify-between w-full">
              <div>
                <p>Seu saldo em conta</p>
                <div className="flex items-start gap-2">
                  <strong className="text-3xl min-w-52">R$ {viewAmount ? "25.000,00" : "••••••"}</strong>
                  {viewAmount ? <button onClick={() => setViewAmount(!viewAmount)} className="relative group px-2 py-1 w-auto flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-100 text-sm"><RiEyeLine size={16} /></button> : <button onClick={() => setViewAmount(!viewAmount)} className="relative group px-2 py-1 w-auto flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-100 text-sm"><RiEyeOffLine size={16} /></button>}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <ButtonIconSimple label={"Enviar"}>
                  <HiOutlineArrowUpRight size={16} className="text-red-500" />
                </ButtonIconSimple>
                <ButtonIconSimple label={"Receber"}>
                  <HiOutlineArrowDownLeft size={16} className="text-green-500" />
                </ButtonIconSimple>
                <ButtonIconSimple>
                  <CgMoreVerticalAlt size={16} className="text-slate-500" />
                </ButtonIconSimple>
              </div>
            </div>
            <p className="font-semibold mt-6 bg-green-100 flex w-auto py-3 px-4 rounded-md items-center gap-2 text-slate-900 dark:text-lime-500 dark:bg-slate-900"><BsFire /> Limite da Conta disponível R$ 3.000,00</p>
          </section>

          <CreditCardSection
            name="Leandro C S Almeida"
            cardNumber="7645"
            expiry="07/33"
            availableLimit="6.000,00"
            outstandingBalance="1.350,00"
            closingDate="25/01"
            viewAmount={viewAmount}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="grid bg-teal-50 border-0 border-teal-500 p-6 md:p-8 rounded-xl gap-6 dark:bg-slate-900 dark:border-teal-900">
              <CiVault size={32} className="text-teal-500" />
              <p className='grid gap-4'>
                Guarde seu dinheiro em cofrinhos que rendem 100% do CDI.<br />
                <ButtonLinkSimple label='Guardar dinheiro' />
              </p>
            </section>
            <section className="grid bg-lime-50 border-0 border-lime-500 p-6 md:p-8 rounded-xl gap-6 dark:bg-slate-900 dark:border-lime-900">
              <LuChartNoAxesColumnIncreasing size={32} className="text-lime-500" />
              <p className='grid gap-4'>
                Investimentos para o futuro que você deseja.<br />
                <ButtonLinkSimple label='Conhecer Investimentos' />
              </p>
            </section>
          </div>

        </section>

        <div className="grid grid-cols-1 gap-0 w-full border border-slate-200 rounded-xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
          <h3
            className="w-full flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1 text-base md:text-sm">
              <PiArrowsDownUp size={16} /> Últimas transações</div>
            <ButtonLinkSimple label='Extrato' link={'/transactions'} />
          </h3>
          {
            loading ? (
              Array.from({ length: 8 }).map((_, index) => <SkeletonItemHome key={index} />)
            ) : (
              paginatedTransactions.map((transaction) => {
                return (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-[1fr_auto] p-4 border-b border-slate-200 dark:border-slate-800 items-center last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={`https://i.pravatar.cc/150?img=${transaction.id}`}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className='grid'>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{transaction.contact_name}</p>
                        <small className="text-slate-400">{convertToDate(transaction.createdAt, true)}</small>
                      </div>
                    </div>
                    <strong>{viewAmount ? toBRL(Number(parseFloat(transaction.value))) : "R$ •••••"}</strong>
                  </div>
                )
              })
            )
          }
        </div>

      </div>

    </div>
  );
}