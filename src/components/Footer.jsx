// components/Footer.js

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div>
          <span>© 2025 Pro DevScore. All rights reserved.</span>
        </div>
        <nav className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/" className="hover:text-white">
            Privacy Policy
          </Link>
        </nav>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 fill-current" /* github icon svg */ />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6 fill-current" /* twitter icon svg */ />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 fill-current" /* linkedin icon svg */ />
          </a>
        </div>
      </div>
    </footer>
  );
}
