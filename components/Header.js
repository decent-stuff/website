import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          Decent Cloud
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/about" className="text-lg hover:text-gray-300">
            About
          </Link>
          <Link href="/features" className="text-lg hover:text-gray-300">
            Features
          </Link>
          <Link href="/contact" className="text-lg hover:text-gray-300">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
