// src/components/CopyCodeButton.tsx
"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

interface CopyButtonCodeProps {
  text: string;
  field: string;
}

const CopyCodeButton: React.FC<CopyButtonCodeProps> = ({ text, field }) => {
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
      className="w-auto flex items-cente">
      <code className="text-sm sm:text-base inline-flex text-left items-center space-x-3 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white rounded-lg py-2 px-4 w-fit group mt-2 dark:bg-slate-900 dark:hover:bg-slate-950">
        <span className="flex gap-4">
          <span className="shrink-0 text-gray-500">$</span>
          <span className="flex-1">
            <small>npm install </small>
            <small className="text-yellow-500">{field}</small>
          </span>
        </span>
        {copiedField === field ? <BsCheck size={18} className="text-green-500" /> : <IoCopyOutline size={18} className="text-gray-400 group-hover:text-gray-100" />}        
      </code>
    </button>
  );
};

export default CopyCodeButton;
