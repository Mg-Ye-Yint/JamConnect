import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <h1> Sports Pair</h1>
      <Footer />
    </main>
  );
}
