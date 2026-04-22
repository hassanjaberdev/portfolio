import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  updated_at: string;
  fork: boolean;
  private: boolean;
};

type PortfolioRepo = Repo & {
  image: string | null;
};

function extractFirstUrl(text?: string | null): string | null {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s)]+/);
  return match ? match[0] : null;
}

function getFallbackImage(repoName: string) {
  return `https://source.unsplash.com/800x600/?technology,code,${encodeURIComponent(
    repoName
  )}`;
}

function normalizeReadmeImageUrl(
  imageUrl: string,
  username: string,
  repo: string
) {
  if (!imageUrl) return null;

  // Absolute URL
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Relative paths from README -> convert to raw GitHub URL
  const cleaned = imageUrl.replace(/^\.?\//, "");
  return `https://raw.githubusercontent.com/${username}/${repo}/main/${cleaned}`;
}

async function getReadmeImage(username: string, repo: string) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${username}/${repo}/main/README.md`
    );

    if (!res.ok) return null;

    const text = await res.text();

    // أول صورة markdown: ![alt](url)
    const markdownMatch = text.match(/!\[.*?\]\((.*?)\)/);
    if (markdownMatch?.[1]) {
      return normalizeReadmeImageUrl(markdownMatch[1], username, repo);
    }

    // أو أول صورة HTML: <img src="...">
    const htmlMatch = text.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlMatch?.[1]) {
      return normalizeReadmeImageUrl(htmlMatch[1], username, repo);
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch README image for ${repo}:`, error);
    return null;
  }
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<PortfolioRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        setError("");

        const username = "hassanjaberdev";

        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data: Repo[] = await res.json();

        const filtered = data
          .filter((repo) => !repo.private && !repo.fork)
          .filter((repo) => repo.topics?.includes("add-to-portfolio"))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );

        const reposWithImages: PortfolioRepo[] = await Promise.all(
          filtered.map(async (repo) => {
            const image = await getReadmeImage(username, repo.name);

            return {
              ...repo,
              image,
            };
          })
        );

        setRepos(reposWithImages);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Projects"
          heading="Selected Work"
          subtext="A selection of projects pulled directly from GitHub."
        />

        {loading && (
          <p className="font-grotesk text-slate-400 text-center">
            Loading projects...
          </p>
        )}

        {error && (
          <p className="font-grotesk text-red-400 text-center">{error}</p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="font-grotesk text-slate-400 text-center">
            No projects found yet. Add the topic{" "}
            <span className="text-cyan-400">add-to-portfolio</span> to your
            GitHub repositories.
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => {
              const visibleTopics =
                repo.topics?.filter((topic) => topic !== "add-to-portfolio") ||
                [];

              const liveUrl = repo.homepage || extractFirstUrl(repo.description);

              return (
                <motion.article
                  key={repo.id}
                  aria-label={repo.name}
                  className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/25 transition-colors overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-800/40">
                    <ImageWithFallback
                      src={repo.image || getFallbackImage(repo.name)}
                      alt={`Cover image for ${repo.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-cyan-50 transition-colors leading-snug break-words">
                      {repo.name}
                    </h3>

                    <p className="font-grotesk text-xs text-slate-400 leading-relaxed flex-1">
                      {repo.description || "No description available."}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {visibleTopics.map((topic) => (
                        <span
                          key={topic}
                          className="font-grotesk text-[10px] px-2 py-0.5 rounded border border-slate-700/80 text-slate-500"
                        >
                          {topic}
                        </span>
                      ))}

                      {!visibleTopics.length && repo.language && (
                        <span className="font-grotesk text-[10px] px-2 py-0.5 rounded border border-slate-700/80 text-slate-500">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {liveUrl ? (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${repo.name}`}
                          className="font-grotesk flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-300 border border-slate-700/80 rounded-lg hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                        >
                          Live
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="font-grotesk flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-600 border border-slate-800/80 rounded-lg cursor-not-allowed">
                          No Live Demo
                        </div>
                      )}

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${repo.name}`}
                        className="font-grotesk flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-400 border border-slate-700/80 rounded-lg hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}