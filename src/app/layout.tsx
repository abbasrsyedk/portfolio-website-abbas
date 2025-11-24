import "./globals.css";
import Navbar from "../components/Navbar"; // adjust path if needed

export const metadata = {
  title: "Abbas Portfolio",
  description: "Showcase of my biking, projects, and life journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Main content (hero flows behind navbar, no gaps) */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        {/* <footer className="bg-neutral-950 text-gray-400 py-6 text-center text-sm border-t border-gray-800">
          © {new Date().getFullYear()} Abbas — Built with Next.js, TailwindCSS
        </footer> */}
      </body>
    </html>
  );
}
