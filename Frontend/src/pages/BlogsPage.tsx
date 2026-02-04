import { Link } from "react-router-dom";
import AnimatedContent from "../components/animated-content";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

// Define Interface matching the Backend Data
interface BackendBlog {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
  category: string[];
}

export default function BlogsPage() {
    const [allPosts, setAllPosts] = useState<BackendBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
                const data = Array.isArray(res.data) ? res.data : res.data?.blogs ?? [];
                setAllPosts(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setAllPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-teal-50 via-blue-50 to-slate-50 px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-16 border-b border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedContent>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 mb-4">
                            <span className="text-sm font-semibold text-teal-700">Our blog</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
                            Stories and Interviews
                        </h1>
                        <p className="text-lg text-gray-600">
                            Stories, interviews, and updates from the TruQual team.
                        </p>
                    </AnimatedContent>
                </div>
            </section>
 
            {/* All Blog Posts */}
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <AnimatedContent>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 font-urbanist">
                            All blog posts
                        </h2>
                    </AnimatedContent>

                    {allPosts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                            <p className="text-lg font-semibold text-slate-900">No blog posts yet.</p>
                            <p className="mt-2 text-sm text-gray-600">
                                Check back soon for new stories and updates from the TruQual team.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allPosts.map((post, index) => (
                                <AnimatedContent key={post.id} delay={0.05 * index}>
                                    <Link to={`/blogs/${post.id}`} className="block h-full">
                                        <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                            <div className="relative overflow-hidden aspect-video bg-slate-50">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                                    <span className="font-semibold text-slate-900">{post.author}</span>
                                                    <span>•</span>
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4 mb-2">
                                                    <h3 className="text-xl font-bold text-slate-900 transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <ArrowUpRight className="w-5 h-5 text-gray-400 transition-colors shrink-0" />
                                                </div>
                                                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1 line-clamp-2">
                                                    {post.description}
                                                </p>
                                                {/* <div className="flex flex-wrap gap-2 mt-auto">
                                                    {post.category.map((cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div> */}
                                            </div>
                                        </article>
                                    </Link>
                                </AnimatedContent>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
