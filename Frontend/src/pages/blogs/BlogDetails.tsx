
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import AnimatedContent from "../../components/animated-content";
import { useState, useEffect } from "react";
import axios from "axios";

// Define Interface matching the Backend Data
interface BackendBlog {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  category: string[];
  featured: boolean;
  contentBody?: {
    introduction: string;
    keyTakeaways: string[];
    elaborated: string;
    quote: string;
    conclusion: string;
  };
}

export default function BlogDetails() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BackendBlog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
                setPost(res.data);
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setError("Blog post not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">{error || "Blog Post Not Found"}</h1>
                <Link to="/blogs" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <article className="max-w-4xl mx-auto px-4 md:px-8">
                <AnimatedContent>
                    <Link 
                        to="/blogs" 
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to all posts</span>
                    </Link>

                    <div className="space-y-6 mb-12 text-center">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {post.category.map((cat, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 font-urbanist leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-600 pb-8 border-b border-gray-100 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-slate-500" />
                                </div>
                                <span className="font-medium text-slate-900">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-lg mb-12 bg-slate-50 max-w-xl mx-auto h-[300px]">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="prose prose-base prose-slate max-w-none">
                        <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Description</h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
                            {post.description}
                        </p>
                        
                        {/* Full content from data */}
                        <div className="space-y-6 text-gray-600">
                            {post.contentBody?.introduction && (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Introduction</h3>
                                    <p>{post.contentBody.introduction}</p>
                                </>
                            )}

                            {post.contentBody?.keyTakeaways && post.contentBody.keyTakeaways.length > 0 && (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Key Takeaways</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {post.contentBody.keyTakeaways.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {post.contentBody?.elaborated && (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Detailed Insights</h3>
                                    <p>{post.contentBody.elaborated}</p>
                                </>
                            )}

                            {post.contentBody?.quote && (
                                <blockquote className="border-l-4 border-teal-500 pl-4 italic my-8 text-slate-700 bg-slate-50 py-4 pr-4 rounded-r-lg">
                                    "{post.contentBody.quote}"
                                </blockquote>
                            )}

                            {post.contentBody?.conclusion && (
                                <>
                                    <h3 className="text-lg font-bold text-slate-800 mt-8 mb-3">Conclusion</h3>
                                    <p>{post.contentBody.conclusion}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Tags or Metadata */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Tag className="w-4 h-4" />
                            <span className="text-sm font-medium">Topics:</span>
                            <div className="flex flex-wrap gap-2">
                                {post.category.map((cat, idx) => (
                                    <span key={idx} className="text-sm hover:text-teal-600 cursor-pointer transition-colors">
                                        #{cat}{idx < post.category.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </article>
        </div>
    );
}
