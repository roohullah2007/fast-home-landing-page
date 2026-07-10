export default function MapSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Visit our office in downtown Dallas or contact us to schedule a meeting at your property.
                    </p>
                </div>
                
                <div className="rounded-lg overflow-hidden shadow-lg h-[500px]">
                    {/* This is a placeholder for the map. In a real application, you would use Google Maps or another mapping service */}
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107159.72581529436!2d-96.8622631781254!3d32.820353099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9918e993c711%3A0xa9073cfe8bb9b1bb!2sDallas%2C%20TX%2075201!5e0!3m2!1sen!2sus!4v1591648152518!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
