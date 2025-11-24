// src/components/ProjectCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ title, desc, img = "/assets/project-placeholder.png", code, live }) {
  return (
    <article className="bg-neutral-800 p-4 rounded-lg">
      <div className="relative w-full h-40 bg-neutral-700 rounded overflow-hidden">
        <Image src={img} alt={`${title} screenshot`} fill style={{ objectFit: "cover" }} />
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-sm text-gray-300 mt-1">{desc}</p>
      <div className="mt-3 flex gap-3">
        {code && <a href={code} className="text-sm underline">Code</a>}
        {live && <a href={live} className="text-sm underline">Live</a>}
      </div>
    </article>
  );
}
