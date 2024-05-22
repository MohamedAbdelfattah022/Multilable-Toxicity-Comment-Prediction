"use client"; 
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Sedgwick_Ave_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import axios from "axios";

const font = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="flex justify-end">
          <Textarea
            className="p-4 flex h-36 w-[32rem] resize-none"
            placeholder="Enter Your Comment ..."
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="relative px-8 sm:px-16 md:px-0 md:mx-auto md:max-w-xl w-full lg:mx-0">
          <img
            alt="try-it"
            aria-hidden="true"
            src="/file.png"
            className="absolute w-[6.5rem] left-2/3 -top-0 select-none hidden sm:block"
          />
          <div className="flex justify-end mt-2">
            <Button className="bg-red-600" onClick={handleCheckToxicity}>
              Check Toxicity
            </Button>
          </div>
        </div>
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
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
        )}
      </div>
    </div>
  );
};

export default Hero;
