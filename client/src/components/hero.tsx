"use client";
import React, { useState } from "react";
import { CheckCheck } from "lucide-react";
import axios from "axios";
import { Textarea } from "./ui/textarea";
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCheckToxicity = async () => {
    try {
      const result = await axios.post("http://localhost:5000/predict/", {
        input: comment,
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error checking toxicity:", error);
      setResponse(null);
    }
  };

  const parseResponse = (response: string) => {
    const lines = response.split("\n").filter(line => line.trim() !== "");
    return lines.map(line => {
      const [label, value] = line.split(": ");
      return { label, value: value === "True" };
    });
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center max-w-7xl mx-auto h-full py-32 px-10 gap-x-28">
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
            <Button className="bg-red-600" onClick={handleCheckToxicity}>
              Check Toxicity
            </Button>
          </div>
          </div>
          <div className="h-36 mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
            {response ? (
              <div className="w-full h-full overflow-y-auto p-4 ">
                <h2 className="text-2xl mb-4">Response:</h2>
                <table className="min-w-full bg-white">
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
                        <td className="py-2 px-4 border-b border-gray-200">{value ? "True" : "False"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              "Results will be shown here"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
