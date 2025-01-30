// src/components/CurrencySwitcher.tsx
import { BsCurrencyDollar } from "react-icons/bs";
import { TbCurrencyReal } from "react-icons/tb";
import ButtonIconSimple from "./ButtonIconSimple";

const CurrencySwitcher = ({
  currentCurrency,
  setCurrentCurrency
}: {
  currentCurrency: "brl" | "usd";
  setCurrentCurrency: (currency: "brl" | "usd") => void;
}) => {
  const realActive = currentCurrency === "brl" ? true : false;
  const dollarActive = currentCurrency !== "brl" ? true : false;

  return (
    <div className="flex gap-2">
      <ButtonIconSimple
        label="Real"
        onClick={() => setCurrentCurrency("brl")}
        active={realActive}
      >
        <TbCurrencyReal size={16} className={realActive ? "text-teal-400" : "text-green-500"} />
      </ButtonIconSimple>
      <ButtonIconSimple
        label="Dólar"
        onClick={() => setCurrentCurrency("usd")}
        active={dollarActive}
      >
        <BsCurrencyDollar size={16} className={dollarActive ? "text-teal-400" : "text-green-500"} />
      </ButtonIconSimple>
    </div>
  );
};

export default CurrencySwitcher;