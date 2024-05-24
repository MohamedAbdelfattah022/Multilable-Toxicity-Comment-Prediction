"use client";
import React, { useState } from "react";
import { Check, CheckCheck, Loader2, X } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sedgwick_Ave_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCheckToxicity = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("http://localhost:5000/predict/", {
        input: comment,
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error checking toxicity:", error);
      setResponse(null);
    }
    setIsLoading(false);
  };

  const parseResponse = (response: string) => {
    const lines = response.split("\n").filter(line => line.trim() !== "");
    return lines.map(line => {
      const [label, value] = line.split(": ");
      return { label, value: value === "True" };
    });
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center max-w-7xl mx-auto h-1 py-32 px-10 gap-x-28">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-5">Toxicity Detection</h1>
        <div className="text-xl">
          Welcome to{" "}
          <span className={cn("text-red-600 underline", font.className)}>
            istoxic
          </span>{" "}
          - Your Guardian Against Online Toxicity. Detect and eliminate toxic
          comments with ease. Join us in creating a safer digital space, one
          comment at a time.
        </div>
        <ul className="mt-8 space-y-2 font-medium flex flex-col items-center sm:items-start">
          <div className="space-y-2">
            <li className="flex gap-1.5 items-center">
              <CheckCheck className="h-5 w-5 shrink-0 text-red-500" /> Fairly
              precise
            </li>
            <li className="flex gap-1.5 items-center">
              <CheckCheck className="h-5 w-5 shrink-0 text-red-500" /> 100% free
              to use
            </li>
          </div>
        </ul>
      </div>
      <div>
        <div className="flex flex-col space-y-4 p-3 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10">
          <div className="flex items-center gap-x-3 w-full">
            <Input
              className="flex"
              placeholder="Enter Your Comment ..."
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="flex justify-end">
              <Button className="bg-red-600" onClick={handleCheckToxicity} disabled={isLoading}>
                Check Toxicity
              </Button>
            </div>
          </div>
          <div className="h-auto mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
            {isLoading ? (
              <p className="py-20 flex flex-col gap-2 items-center justify-center">
                <Loader2 className="animate-spin" />
                <span>Just a few sec...</span>
              </p>
            ) : response ? (
              <div className="w-full h-full p-4">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200">Label</th>
                      <th className="py-2 px-4 border-b border-gray-200">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parseResponse(response).map(({ label, value }) => (
                      <tr key={label}>
                        <td className="py-2 px-4 border-b border-gray-200">{label}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{value ? <div className="text-green-500"><Check className="w-4 h-4" /></div> : <div className="text-red-500"><X className="w-4 h-4" /></div>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-20">Results will be shown here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
