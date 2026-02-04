// src/components/Footer.jsx
export default function Footer(){
  return (
    <footer className="py-8 text-center text-sm text-gray-500">
      <div>&copy; {new Date().getFullYear()} Abbas R S K - <a href="https://github.com/abbasrsyedk" className="underline">GitHub</a> - <a href="https://www.linkedin.com/in/your-linkedin" className="underline">LinkedIn</a></div>
    </footer>
  );
}
