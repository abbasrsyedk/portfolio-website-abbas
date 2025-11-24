import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function BlogPost({ params }) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), "src/data/blog", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const html = marked(content);

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{data.date}</p>

      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
