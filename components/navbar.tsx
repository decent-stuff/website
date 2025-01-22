import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { AuthButtons } from "@/components/auth-buttons"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-lg z-50 py-4 px-6 sm:px-8 md:px-12 lg:px-24 xl:px-36 flex justify-between items-center transition-all duration-300">
            {/* Logo */}
            <h1 className="whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-wide">
                Decent Cloud
            </h1>

            {/* Navigation Links */}
            <nav
                className="hidden text-sm md:flex items-center text-white text-base sm:text-base md:text-base lg:text-lg xl:text-xl font-medium tracking-wide sm:tracking-normal">
                <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6 xl:space-x-8">
                    <li>
                        <Link href="#features" className="hover:text-blue-400 transition duration-300 whitespace-nowrap">
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href="#info" className="hover:text-blue-400 transition duration-300 whitespace-nowrap">
                            Learn More
                        </Link>
                    </li>
                    <li>
                        <Link href="#benefits" className="hover:text-blue-400 transition duration-300 whitespace-nowrap">
                            Benefits
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://github.com/decent-stuff/decent-cloud"
                            className="flex items-center gap-1 sm:gap-2 hover:text-blue-400 transition duration-300 whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub}/>
                            GitHub
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:block">
                <AuthButtons/>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button className="text-white focus:outline-none" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-12 right-0 bg-black/90 backdrop-blur-md w-full h-screen md:hidden flex flex-col items-center gap-6 py-16 text-white text-xl transition-all duration-300 ${
                    isMenuOpen ? 'block' : 'hidden'
                }`}
            >
                <Link href="#features" className="hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
                    Features
                </Link>
                <Link href="#info" className="hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
                    Learn More
                </Link>
                <Link href="#benefits" className="hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
                    Benefits
                </Link>
                <Link
                    href="https://github.com/decent-stuff/decent-cloud"
                    className="flex items-center gap-2 hover:text-blue-400 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faGithub} />
                    GitHub
                </Link>
                <AuthButtons />
            </div>
        </header>
    );
};

export default Navbar;
