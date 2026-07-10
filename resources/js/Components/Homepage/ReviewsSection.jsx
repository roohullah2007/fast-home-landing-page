export default function ReviewsSection({ embedCode }) {
    // If no embed code is provided, don't render anything
    if (!embedCode || embedCode.trim() === '') {
        return null;
    }

    return (
        <section className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="text-left md:text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#03407F] mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it - hear from homeowners who have successfully sold their properties with us.
                    </p>
                </div>

                {/* TrustIndex or other review platform embed code */}
                <div
                    className="reviews-embed-container"
                    dangerouslySetInnerHTML={{ __html: embedCode }}
                />
            </div>
        </section>
    );
}
