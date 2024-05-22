import Choices from "@/components/choices";
import CommentInput from "@/components/comment-input";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="">
      <Hero />
      {/* <CommentInput /> */}
      </div>
      {/* <SubmitButton /> */}
      {/* <Choices /> */}
      <Footer />
    </div>
  );
}
