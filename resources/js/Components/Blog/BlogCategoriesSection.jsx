export default function BlogCategoriesSection({ activeCategory, setActiveCategory }) {
    const categories = [
        {
            id: 'all',
            name: 'All Articles'
        },
        {
            id: 'selling-tips',
            name: 'Selling Tips'
        },
        {
            id: 'market-insights',
            name: 'Market Insights'
        },
        {
            id: 'home-improvement',
            name: 'Home Improvement'
        },
        {
            id: 'investment',
            name: 'Real Estate Investment'
        },
        {
            id: 'success-stories',
            name: 'Success Stories'
        }
    ];

    return (
        <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="flex md:flex-wrap overflow-x-auto md:justify-center items-center gap-4 pb-2 scrollbar-hide">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full transition-all duration-200 flex-shrink-0 whitespace-nowrap ${
                                activeCategory === category.id
                                    ? 'bg-[#03407F] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
