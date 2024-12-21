import { useState } from 'react';
import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';
const VITE_web3forms_Token = import.meta.env.VITE_web3forms_Token;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('access_key', VITE_web3forms_Token); // Use env variable
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out. I will get back to you soon.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Submission failed');
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'There was an issue sending your message. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="py-12">
            <div className="max-w-3xl mx-auto p-4 border shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white via-gray-100 to-gray-200">
                <h1 className="text-4xl text-center font-bold pb-4 text-[#15295f]">
                    Contact Me
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-base font-semibold">Message</label>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border p-2"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="font-semibold px-5 py-2 rounded-md transition duration-300 bg-[#1e90ff] text-white"
                    >
                        Send Message
                    </button>
                </form>
                <div className="text-center mt-8 flex justify-center">
                    <a
                        href="https://github.com/Mahmud256"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub size="2em" className="mr-4" />
                    </a>
                    <a
                        href="https://www.facebook.com/profile.php?id=100010396957638"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <FaFacebook size="2em" className="mr-4" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mahmudul-hasan-sarkar-2b93581a6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size="2em" className="mr-4" />
                    </a>
                    <a href="mailto:mahmud474849@gmail.com" aria-label="Email">
                        <FaEnvelope size="2em" className="mr-4" />
                    </a>
                </div>
                <aside className="text-center py-10">
                    <p className="text-[#39464d]">© Developed by Mahmudul Hasan Sarkar</p>
                </aside>
            </div>
        </div>
    );
};

export default Contact;
