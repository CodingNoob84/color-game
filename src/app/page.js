import ClientContainer from "@/components/ClientContainer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="max-w-screen h-screen bg-black">
      <NavBar />
      <ClientContainer />
    </main>
  );
}
