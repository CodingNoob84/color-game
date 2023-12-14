import ClientContainer from "@/components/ClientContainer";

export default function Home() {
  return (
    <main className="max-w-screen h-screen bg-black">
      <div className="fixed top-0 h-16 z-10 w-full bg-slate-400">
        <div>Color Sequence Game</div>
      </div>
      <ClientContainer />
    </main>
  );
}
