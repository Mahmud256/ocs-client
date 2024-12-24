import React, { useState } from "react";

const faqs = [
    {
        id: 1,
        question: "What types of cameras do you sell?",
        answer:
            "We sell a wide variety of cameras, including DSLRs, mirrorless cameras, action cameras, and compact point-and-shoot cameras.",
    },
    {
        id: 2,
        question: "Do you offer warranties on your products?",
        answer:
            "Yes, all our products come with manufacturer warranties. Specific terms depend on the brand and model.",
    },
    {
        id: 3,
        question: "How long does shipping take?",
        answer:
            "Shipping usually takes 3-7 business days depending on your location. Expedited shipping options are also available.",
    },
    {
        id: 4,
        question: "Do you provide camera accessories?",
        answer:
            "Yes, we offer a wide range of accessories including tripods, lenses, memory cards, and camera bags.",
    },
    {
        id: 5,
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards, PayPal, and bank transfers. Cash on delivery is available in select locations.",
    },
];

const FAQs = () => {
    const [open, setOpen] = useState(null);

    const toggleFAQ = (id) => {
        setOpen(open === id ? null : id);
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Frequently Asked Questions
                </h2>
                <div className="mt-8 space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md"
                        >
                            <button
                                className="w-full text-left px-6 py-4 flex justify-between items-center"
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <span className="text-lg font-medium text-gray-900">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 transform transition-transform ${open === faq.id ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {open === faq.id && (
                                <div className="px-6 py-4 text-gray-700">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
