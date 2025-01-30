import Image from "next/image";
import { Currency } from "@/helpers";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { convertToDate } from "@/helpers/Utils";
import Breadcrumb from "@/components/Breadcrumb";
import TransactionActions from "@/components/TransactionActions";

interface PostProps {
  id: string;
  title: string;
  content: string;
}

export async function generateStaticParams() {
  const posts = await fetch(
    "https://67982974c2c861de0c6f0321.mockapi.io/api/v1/transactions"
  ).then((res) => res.json());

  return posts.map((post: PostProps) => ({
    id: post.id.toString(),
  }));
}

export default async function TransactionDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const transaction = await fetch(
    `https://67982974c2c861de0c6f0321.mockapi.io/api/v1/transactions/${id}`
  ).then((res) => res.json());

  if (!transaction) {
    return (
      <div className="grid min-h-screen place-items-center">
        <h1 className="text-2xl font-bold">Transação não encontrada</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10 pt-20 md:pt-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/home", icon: <GrHomeRounded size={12} /> },
          { label: "Transações", href: "/transactions" },
          { label: `TSD-${transaction.pin}` },
        ]}
      />

      <h1 className="text-2xl font-bold mb-6">Detalhes da Transação</h1>

      <small className="block mb-2">
        Identificador da transação: <b>#{transaction.pin}</b>
      </small>

      {/* Responsivo para mobile */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
            {/* Informações do usuário */}
            <div className="flex items-center gap-4">
              <Image
                src={`https://i.pravatar.cc/150?img=${transaction.id}`}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full"
                priority
              />
              <div>
                <h2 className="font-bold">{transaction.contact_name}</h2>
                <small className="opacity-70">{transaction.contact_email}</small>
              </div>
            </div>

            {/* Tipo e Data da Transação */}
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-3xl ${
                  transaction.type === "deposit"
                    ? "bg-green-200"
                    : "bg-red-100 dark:bg-red-400"
                }`}
              >
                <HiOutlineArrowUpRight size={24} />
              </div>
              <div>
                <h4 className="font-bold capitalize">{transaction.type}</h4>
                <small className="opacity-70">
                  {convertToDate(transaction.createdAt, true)}
                </small>
              </div>
            </div>
          </div>

          {/* Origem e Valor */}
          <p className="font-bold text-xl md:text-3xl">{transaction.origin}</p>
          <p className="text-lg md:text-xl font-semibold">
            {transaction.type === "deposit" ? "" : "-"}
            {Currency.toBRL(Number(parseFloat(transaction.value)))}
          </p>
        </div>

        {/* Descrição */}
        <div className="grid gap-2 p-4 md:p-8 bg-white border-y border-slate-200 dark:bg-slate-900 dark:border-slate-700">
          <span className="text-sm text-slate-400">Descrição</span>
          <p className="text-sm md:text-base">{transaction.description}</p>
        </div>

        <TransactionActions
          transaction={transaction}
        />
      </section>
    </div>
  );
}