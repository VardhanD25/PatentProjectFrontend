// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import profile from "./pic.jpg";
import { useAuthContext } from '../hooks/useAuthContext'; // Import the useAuthContext hook

const Home = () => {
    const { user } = useAuthContext(); // Check if the user is logged in
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (user) {
            navigate("/userinput"); // Navigate to user input if logged in
        } else {
            navigate("/login"); // Redirect to login if not logged in
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-brand-light font-poppins">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/path-to-your-hero-image.jpg')` }}>
                <div className="absolute inset-0 bg-sky-950 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
                    <div className="text-center text-white max-w-2xl animate-fadeIn">
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Optimize Your Material Selection</h1>
                        <p className="text-xl md:text-2xl mb-6">
                            Utilize our Compactness Calculator to make informed decisions in your engineering projects.
                        </p>
                        <button
                            onClick={handleGetStarted} // Button calls handleGetStarted function
                            className="inline-block px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:bg-brand-dark transition transform hover:-translate-y-1 hover:shadow-2xl duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-grow p-8 bg-gradient-to-b from-brand-light to-brand-primary-light">
                <div className="max-w-6xl mx-auto grid gap-16">
                    {/* Welcome Section */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border hover:shadow-2xl transition duration-300">
                        <h2 className="text-3xl font-bold mb-4 text-brand-dark hover:text-brand-primary transition duration-300">
                            Welcome to the Compactness Calculator
                        </h2>
                        <p className="text-lg text-gray-700">
                            This calculator is designed to help you assess the compactness of various materials, providing insights 
                            into their properties and usability in different applications. Whether you're an engineer, designer, or researcher, our tool simplifies complex calculations to enhance your projects.
                        </p>
                    </div>

                    {/* About the Founder Section */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300">About the Founder</h2>
                        <div className="flex flex-col md:flex-row items-center">
                            <img 
                                src={profile} 
                                alt="Mangesh Patwardhan" 
                                className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-6 object-cover shadow-md" 
                            />
                            <p className="text-lg text-gray-700">
                                Created by Mangesh Patwardhan, a passionate engineer dedicated to enhancing material science and 
                                engineering tools. With a vision to simplify complex calculations, this calculator is a 
                                result of extensive research and practical applications. Mangesh believes in empowering professionals with accurate and user-friendly tools to drive innovation.
                            </p>
                        </div>
                    </div>

                    {/* Logic Behind the Calculator Section */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300">Logic Behind the Calculator</h2>
                        <p className="text-lg text-gray-700">
                            The compactness calculator utilizes a well-defined formula based on the volume and mass of materials 
                            to provide accurate compactness ratios. This tool is beneficial for engineers, designers, and 
                            researchers looking to optimize material selection in their projects. By inputting specific parameters, users receive precise metrics that aid in decision-making and material assessment.
                        </p>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-brand-lighter hover:shadow-2xl transition duration-300 text-center">
                            <div className="mb-4">
                                <svg className="w-12 h-12 mx-auto text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {/* Example Icon */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
                            <p className="text-gray-700">
                                Navigate through our calculator with ease, thanks to an intuitive and clean design.
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-brand-lighter hover:shadow-2xl transition duration-300 text-center">
                            <div className="mb-4">
                                <svg className="w-12 h-12 mx-auto text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {/* Example Icon */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4m-6 4h-5a3 3 0 01-3-3V5a3 3 0 013-3h5a3 3 0 013 3v4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
                            <p className="text-gray-700">
                                Rely on precise metrics derived from robust formulas to make informed decisions.
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-brand-lighter hover:shadow-2xl transition duration-300 text-center">
                            <div className="mb-4">
                                <svg className="w-12 h-12 mx-auto text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {/* Example Icon */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
                            <p className="text-gray-700">
                                Easily integrate our calculator into your existing workflows and tools.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-brand-primary text-white rounded-xl shadow-lg p-12 text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Projects?</h2>
                        <p className="text-lg mb-8">
                            Sign up now to access the Compactness Calculator and start making data-driven decisions today.
                        </p>
                        <a
                            href="/signup"
                            className="inline-block px-8 py-3 bg-white text-brand-primary font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-2xl duration-300"
                        >
                            Sign Up Now
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-brand-dark text-white py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Compactness Calculator. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="/privacy" className="hover:text-brand-primary transition duration-300">Privacy Policy</a>
                            <a href="/terms" className="hover:text-brand-primary transition duration-300">Terms of Service</a>
                            <a href="/contact" className="hover:text-brand-primary transition duration-300">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
