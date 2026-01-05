import Link from "next/link";
import { IconBrandX, IconBrandLinkedin } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-black text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center gap-3">
          {/* (Optional) Add your logo here for left alignment if desired */}
          {/* <span className="rounded-full bg-gradient-to-tr from-neutral-600 to-black text-white px-3 py-2 mr-2 font-bold text-lg">P</span> */}
          <span>
            © {new Date().getFullYear()} ProDevScore. All rights reserved.
          </span>
        </div>
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          {/* <Link href="/" className="hover:text-white transition-colors">
            Privacy Policy
          </Link> */}
        </nav>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* GitHub Icon */}
          <a
            href="https://github.com/jugalmahida"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.29 3.44 9.78 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.6-4.03-1.6-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3.01-.4s2.05.13 3.01.4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58C20.57 22.08 24 17.58 24 12.3c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {/* Twitter Icon */}
          <a
            href="https://x.com/JugalMahida07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <IconBrandX />
          </a>
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/jugal-mahida"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C3.34 3.5 2 4.85 2 6.49c0 1.62 1.31 2.96 2.96 2.96h.04c1.67 0 2.98-1.34 2.98-2.96C7.98 4.85 6.64 3.5 4.98 3.5zM2.4 8.99h5.2v12.5H2.4v-12.5zM9.6 8.99h4.98v1.69h.07c.69-1.3 2.37-2.66 4.88-2.66 5.22 0 6.18 3.44 6.18 7.91v9.56h-5.17v-8.48c0-2.03-.04-4.64-2.82-4.64-2.83 0-3.26 2.2-3.26 4.48v8.64H9.6v-12.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
