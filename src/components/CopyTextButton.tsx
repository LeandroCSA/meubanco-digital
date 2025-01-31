// src/components/CopyTextButton.tsx
"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

interface CopyButtonProps {
  text: string;
  field: string;
  label: string;
}

const CopyTextButton: React.FC<CopyButtonProps> = ({ text, field, label }) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      console.log(copiedText);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative group px-2 py-1 w-auto flex items-center gap-2 rounded-md border border-slate-300 hover:bg-slate-100 text-[11px] md:text-sm"
    >
      {text}
      <IoCopyOutline size={14} />
      <div className="flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-28 mt-12 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-1 z-10">
        {copiedField === field ? <BsCheck className="text-green-500" /> : null}
        <small>{copiedField === field ? "Copiado" : label}</small>
      </div>
    </button>
  );
};

export default CopyTextButton;
