import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        image: "https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png",
        review:
            "Amazing camera! The image quality is stunning, and the customer service was excellent. Highly recommend this shop!",
        rating: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        image: "https://www.pngarts.com/files/5/Avatar-Face-Transparent.png",
        review:
            "Fast delivery and the camera exceeded my expectations. It’s perfect for my photography needs!",
        rating: 4,
    },
    {
        id: 3,
        name: "Alex Johnson",
        image: "https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png",
        review:
            "Affordable prices and top-notch products. I’ve been shopping here for years and never been disappointed.",
        rating: 5,
    },
    {
        id: 4,
        name: "Emily Brown",
        image: "https://www.shareicon.net/data/512x512/2016/09/15/829471_user_512x512.png",
        review:
            "The variety of cameras available here is impressive, and the staff is always so helpful!",
        rating: 4,
    },
];

const Testimonials = () => {
    return (
        <div className="bg-gray-50 py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    What Our Customers Say
                </h2>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                    <p className="text-yellow-500">
                                        {"★".repeat(testimonial.rating)}
                                        {"☆".repeat(5 - testimonial.rating)}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">{testimonial.review}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Testimonials;
