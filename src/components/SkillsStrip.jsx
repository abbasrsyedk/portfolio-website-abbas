// src/components/SkillsStrip.jsx
export default function SkillsStrip(){
  const skills = ["React","TypeScript","Next.js","Tailwind","Testing","CI/CD"];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map(s => (
        <span key={s} className="px-3 py-1 border rounded-md text-sm text-gray-200 border-neutral-700 bg-neutral-800/40">{s}</span>
      ))}
    </div>
  );
}
