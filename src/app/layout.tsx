import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <div style={{display:"flex",flexDirection:"row"}}>
          <Sidebar />
          <div className="min-w-[90%] max-w-[90%]">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-zinc-900">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
