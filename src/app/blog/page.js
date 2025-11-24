import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Blog() {
  const postsDir = path.join(process.cwd(), "src/data/blog");
  const files = fs.readdirSync(postsDir);

  const posts = files
    .map((file) => {
      const slug = file.replace(".md", "");
      const fileContent = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(fileContent);
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const [hero, ...rest] = posts;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12">Blog 📝</h1>

      {/* Hero Section */}
      {hero && (
        <Link href={`/blog/${hero.slug}`}>
          <div className="mb-12 cursor-pointer group">
            {hero.cover && (
              <img
                src={hero.cover}
                alt={hero.title}
                className="w-full h-80 object-cover rounded-lg mb-4 group-hover:opacity-90 transition"
              />
            )}
            <h2 className="text-3xl font-bold mb-2 group-hover:text-orange-400">
              {hero.title}
            </h2>
            <p className="text-sm text-gray-400">{hero.date}</p>
            <p className="text-gray-300 mt-2">{hero.excerpt}</p>
          </div>
        </Link>
      )}

      {/* Grid of other posts */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="cursor-pointer bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition shadow-md">
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{post.date}</p>
              <p className="text-sm text-gray-300">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
