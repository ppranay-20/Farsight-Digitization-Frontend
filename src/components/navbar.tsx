import React from "react";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Rocket } from "lucide-react";

export default function Navbar() {
  return (
    <div className="border border-border px-6 py-1.5 flex justify-between">
      <div className="flex gap-6 items-center">
        <h1 className="text-[18px] not-italic font-bold -tracking-tighter leading-5 text-secondary">
          FSD
        </h1>
        <Input className="text-sm not-italic font-normal leading-5 text-secondary" placeholder="Document Template ID" />
        <button className="flex items-center gap-2 text-foreground p-1">
          <ArrowLeft className="w-3 h-3" />
          <span className="text-xs not-italic font-normal leading-none">Previous</span>
        </button>
        <Input className="text-sm not-italic font-normal leading-5 text-secondary" placeholder="Document Instance ID" />
        <button className="flex items-center gap-2 text-foreground p-1">
          <span className="text-xs not-italic font-normal leading-none">Next</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <button className="flex items-center gap-1 text-white py-2 px-4 rounded-md bg-gradient-to-r from-blue-800 to-[#3802F9]">
        <span className="font-medium text-sm leading-6">Find</span>
        <Rocket className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
