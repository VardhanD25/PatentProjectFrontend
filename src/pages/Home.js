import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-8">
                <section className="mb-12">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Compactness Calculator</h1>
                    <p className="text-lg text-gray-700">
                        This calculator is designed to help you assess the compactness of various materials, providing insights 
                        into their properties and usability in different applications.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">About the Founder</h2>
                    <p className="text-lg text-gray-700">
                        Created by Mangesh Patwardhan, a passionate engineer dedicated to enhancing material science and 
                        engineering tools. With a vision to simplify complex calculations, this calculator is a 
                        result of extensive research and practical applications.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Logic Behind the Calculator</h2>
                    <p className="text-lg text-gray-700">
                        The compactness calculator utilizes a well-defined formula based on the volume and mass of materials 
                        to provide accurate compactness ratios. This tool is beneficial for engineers, designers, and 
                        researchers looking to optimize material selection in their projects.
                    </p>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} Compactness Calculator. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
