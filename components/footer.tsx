import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="text-center mt-30 py-8 bg-gradient-to-b from-transparent to-black text-white text-sm">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-6 space-y-3 md:space-y-0">

                {/* Logo and Copyright */}
                <div className="text-white/80">
                    © {new Date().getFullYear()} Decent Cloud. All rights reserved.
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/decent-stuff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition duration-300"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} className="h-5 w-5 text-white/70 hover:scale-110 transition-transform duration-200"/>
                    </a>
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="mt-3 border-t border-white/10 pt-2 text-xs text-white/60">
                Built with ❤️ by Decent Cloud Team
            </div>
        </footer>
    );
};

export default Footer;




