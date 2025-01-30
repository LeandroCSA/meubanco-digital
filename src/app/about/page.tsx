import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { GrHomeRounded } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10 pt-20 md:pt-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/home", icon: <GrHomeRounded size={12} /> },
          { label: "Sobre" },
        ]}
      />      
      <div className="border border-gray-200 p-6 md:p-12 rounded-xl dark:bg-slate-900 dark:border-slate-800">
        <Image
          src="/logo-symbol.svg"
          alt="Next.js logo"
          width={120}
          height={120}
          priority
        />
        <h1 className="font-bold text-2xl mt-8">Sobre o MeuBanco Digital</h1>
        
        <div className="grid gap-4 mt-4">
          <p>O projeto de nome MeuBanco Digital nasceu com objetivo de testar as habilidades de frontend, servindo como desafio frontend para uma vaga de emprego na Idez Digital.</p>
          <p>O teste consiste em desenvolver uma aplicação de um banco digital com as páginas home, transações, detalhes da transação e sobre.</p>
          <p>Foram instaladas as dependências para o desenvolvimento do projeto:</p>
          <ul className="grid gap-4">
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700 justify-start">
              <b>React Icons:</b>
              <span>FBiblioteca com ícones SVG prontos para uso, usados na interface do usuário.</span>
              
              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">react-icons --save</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>

              {/* <small>npm install react-icons --save</small> */}
            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>Lodash:</b>
              <span>Biblioteca de utilitários para otimizar funções como debounce, throttle, cloneDeep, entre outras.</span>
              
              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">lodash</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>

              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">--save-dev @types/lodash</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>

            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>json2csv:</b>
              <span>Dependência json2csv serve....</span>
              
              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">json2csv</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>

              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">--save-dev @types/json2csv</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>
            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>jsPDF + jsPDF AutoTable:</b>
              <span>Biblioteca para geração de arquivos PDF, utilizada na exportação de transações. Extensão do jspdf para gerar tabelas formatadas automaticamente nos PDFs.</span>
              <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
                <span className="flex gap-4">
                  <span className="shrink-0 text-gray-500">$</span>
                  <span className="flex-1">
                    <small>npm install </small>
                    <small className="text-yellow-500">jspdf jspdf-autotable</small>
                  </span>
                </span>
                <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />
              </code>
              {/* <small>npm install jspdf jspdf-autotable</small> */}
              {/* <small>npm i --save-dev @types/lodash</small> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
