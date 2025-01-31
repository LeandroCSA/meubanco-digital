import Breadcrumb from "@/components/Breadcrumb";
import CopyCodeButton from "@/components/CopyCodeButton";
import Image from "next/image";
import { GrHomeRounded } from "react-icons/gr";

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
              <CopyCodeButton text={"npm install react-icons --save"} field="react-icons --save"/>
            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>Lodash:</b>
              <span>Biblioteca de utilitários para otimizar funções como debounce, throttle, cloneDeep, entre outras.</span>
              <CopyCodeButton text={"npm install lodash"} field="lodash"/>
              <CopyCodeButton text={"npm install --save-dev @types/lodash"} field="--save-dev @types/lodash"/>
            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>json2csv:</b>
              <span>Biblioteca que converte de forma otimizada dados JSON em CSV.</span>
              <CopyCodeButton text={"npm install json2csv"} field="json2csv"/>
              <CopyCodeButton text={"npm install --save-dev @types/json2csv"} field="--save-dev @types/json2csv"/>
            </li>
            <li className="grid gap-1 p-4 bg-gray-50 border border-gray-100 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <b>jsPDF + jsPDF AutoTable:</b>
              <span>Biblioteca para geração de arquivos PDF, utilizada na exportação de transações. Extensão do jspdf para gerar tabelas formatadas automaticamente nos PDFs.</span>
              <CopyCodeButton text={"npm install jspdf jspdf-autotable"} field="jspdf jspdf-autotable"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
