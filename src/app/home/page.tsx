"use client"

import { useCallback, useState } from 'react'
import Image from "next/image";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";
import { IoCopyOutline } from "react-icons/io5";
import { RiEyeLine, RiEyeOffLine, RiVisaLine } from 'react-icons/ri';
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
  const { transactions, loading } = useTransactions();
  const [copiedText, copy] = useCopyToClipboard()
  const {
    paginatedTransactions,
  } = useFilteredTransactions(transactions);

  const [viewAmount, setViewAmount] = useState(true)

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10">

      <div className="w-full grid md:flex items-center justify-between mb-4 mt-12 md:mt-0">
        <h1 className="text-xl font-bold grid gap-0">
          Olá Leandro, bem vindo!
          <small className="text-sm font-normal text-slate-400">{getCurrentDateTime()}</small>
        </h1>

        <div className="mt-2 flex gap-2 md:gap-4 items-center z-10">
          <div className="flex items-center gap-1">
            Agência: <button onClick={handleCopy('0300')} className="relative group px-2 py-1 w-auto flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-100 text-[11px] md:text-sm">
              0300
              <IoCopyOutline size={14} />
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-28 mt-12 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-1 z-10">
                <small>{copiedText && 'copiado'}copiar agência</small>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-1">
            Conta: <button onClick={handleCopy('000035712-8')} className="relative group px-2 py-1 w-auto flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-100 text-[11px] md:text-sm">
              000035712-8
              <IoCopyOutline size={14} />
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-28 mt-12 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-1 z-10">
                <small>copiar conta</small>
              </div>
            </button>
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

          <section className="grid border border-slate-200 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <div className="p-4 flex justify-between items-center">
              <p>Cartão de crédito</p>
              <ButtonLinkSimple label='Acessar cartão' />
            </div>
            <div className="p-6 text-white w-full relative h-48 grid content-between bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500 via-teal-500 to-green-400">
              <RiVisaLine size={50} className='absolute top-2 right-6' />
              <strong>Leandro C S Almeida</strong>
              <div className="absolute left-0 bottom-0 w-full flex items-center gap-6 p-6 border-t border-white border-opacity-20 mt-06 bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-[url('data:image/svg+xml;base64,CiAgICAgIDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmRldi9zdmdqcyIgdmlld0JveD0iMCAwIDcwMCA3MDAiIHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBvcGFjaXR5PSIwLjQ0Ij4KICAgICAgICA8ZGVmcz4KICAgICAgICAgIDxmaWx0ZXIgaWQ9Im5ubm9pc2UtZmlsdGVyIiB4PSItMjAlIiB5PSItMjAlIiB3aWR0aD0iMTQwJSIgaGVpZ2h0PSIxNDAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHByaW1pdGl2ZVVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJsaW5lYXJSR0IiPgogICAgICAgICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC4xMTYiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjE1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlc3VsdD0idHVyYnVsZW5jZSI+PC9mZVR1cmJ1bGVuY2U+CiAgICAgICAgICAgIDxmZVNwZWN1bGFyTGlnaHRpbmcgc3VyZmFjZVNjYWxlPSIxOCIgc3BlY3VsYXJDb25zdGFudD0iMC43IiBzcGVjdWxhckV4cG9uZW50PSIyMCIgbGlnaHRpbmctY29sb3I9IiM3OTU3QTgiIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgaW49InR1cmJ1bGVuY2UiIHJlc3VsdD0ic3BlY3VsYXJMaWdodGluZyI+CiAgICAgICAgICAgICAgPGZlRGlzdGFudExpZ2h0IGF6aW11dGg9IjMiIGVsZXZhdGlvbj0iMTAwIj48L2ZlRGlzdGFudExpZ2h0PgogICAgICAgICAgICA8L2ZlU3BlY3VsYXJMaWdodGluZz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBpbj0ic3BlY3VsYXJMaWdodGluZyIgcmVzdWx0PSJjb2xvcm1hdHJpeCI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgICAgPC9maWx0ZXI+CiAgICAgICAgPC9kZWZzPgogICAgICAgIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0PgogICAgICAgIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBmaWxsPSIjNzk1N2E4IiBmaWx0ZXI9InVybCgjbm5ub2lzZS1maWx0ZXIpIj48L3JlY3Q+CiAgICAgIDwvc3ZnPgogICAg')] bg-blend-overlay">
                <small>•••• •••• •••• 7645</small>
                <small>07/33</small>
              </div>
            </div>
            <div className="grid md:flex gap-0 md:gap-8 w-full p-0 md:p-6">
              <p className="grid border-b md:border-r md:border-b-0 border-slate-200 pr-0 md:pr-8 text-lg dark:border-slate-800 p-3">
                <small className="text-slate-400">Limite do cartão disponível:</small>
                <b>R$ {viewAmount ? "6.000,00" : "••••••"}</b>
              </p>
              <p className="grid border-b md:border-r md:border-b-0 border-slate-200 pr-0 md:pr-8 text-lg dark:border-slate-800 p-3">
                <small className="text-slate-400">Fatura em aberto:</small>
                <b>R$ {viewAmount ? "1.350,00" : "••••••"}</b>
              </p>
              <p className="grid text-lg p-3">
                <small className="text-slate-400">Data de fechamento:</small>
                <b>25/01</b>
              </p>
            </div>
          </section>

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




type CopiedValue = string | null

type CopyFn = (text: string) => Promise<boolean>

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}

{/* 
<section className="grid bg-slate-50 border border-slate-200 p-8 rounded-xl">
  <p>
  Empréstimo Pessoal: R$ 3.000,00<br />
    Valores pré-aprovados<br />
    Link Simular
  </p>
</section> */}


{/*
<p>
  Empréstimo Pessoal: R$ 3.000,00<br />
  Valores pré-aprovados<br />
  Link Simular
</p> */}