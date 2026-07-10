import { Link } from '@inertiajs/react';

export default function FeaturedPostSection() {
    const featuredPost = {
        id: 1,
        title: "5 Things to Know Before Selling Your Home to a Cash Buyer",
        excerpt: "Thinking about selling your home for cash? Here are five important considerations that every homeowner should know before accepting a cash offer.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
        category: "Selling Tips",
        author: "Michael Roberts",
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "June 10, 2025",
        readTime: "8 min read"
    };

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Featured Article</h2>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-[#03407F] text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                                {featuredPost.category}
                            </span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className="text-gray-500 text-xs sm:text-sm">{featuredPost.date}</span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className="text-gray-500 text-xs sm:text-sm">{featuredPost.readTime}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                            {featuredPost.title}
                        </h3>

                        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                            {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center mb-4 sm:mb-6">
                            <img
                                src={featuredPost.authorImage}
                                alt={featuredPost.author}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 object-cover"
                            />
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                {featuredPost.author}
                            </span>
                        </div>

                        <Link
                            href={`/blog/${featuredPost.id}`}
                            className="inline-block bg-[#03407F] text-white font-bold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-md hover:bg-[#02356b] transition-colors duration-200"
                        >
                            Read Article
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
