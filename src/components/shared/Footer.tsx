import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-cyan-700 px-5 pt-16 pb-8 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="container mx-auto flex w-full flex-col gap-12 lg:gap-16">
        {/* Main Footer */}
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-16">
          {/* Brand */}
          <div className="flex flex-col items-start gap-8 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-start gap-5">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={52}
                height={52}
                className="size-13 object-contain"
              />

              <p className="max-w-md text-lg font-normal leading-6 text-white sm:text-xl">
                All UK Care Services, Jobs, Recruitment & Directories, All in One Platform.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FaFacebookF className="size-5 text-white" />
              </a>

              <a href="#" aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FaInstagram className="size-5 text-white" />
              </a>

              <a href="#" aria-label="LinkedIn" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FaLinkedinIn className="size-5 text-white" />
              </a>

              <a href="#" aria-label="Twitter" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FaTwitter className="size-5 text-white" />
              </a>

              <a href="#" aria-label="YouTube" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                <FaYoutube className="size-5 text-white" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-xl font-semibold leading-7 text-white sm:text-2xl">
              Products
            </h3>

            <nav className="flex flex-col items-start gap-3">
              {["Home", "Find Care", "Jobs", "Agencies", "Marketplace", "Membership", "About"].map((item) => (
                <a key={item} href="#" className="text-base font-normal leading-6 text-gray-200 transition hover:text-white sm:text-lg">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-xl font-semibold leading-7 text-white sm:text-2xl">
              Support
            </h3>

            <nav className="flex flex-col items-start gap-3">
              {["Consultation", "Meet", "Explore Products", "Contact"].map((item) => (
                <a key={item} href="#" className="text-base font-normal leading-6 text-gray-200 transition hover:text-white sm:text-lg">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-start gap-5">
            <h3 className="text-xl font-semibold leading-7 text-white sm:text-2xl">
              Resources
            </h3>

            <nav className="flex flex-col items-start gap-3">
              {["Help Center", "FAQ", "Blog", "Terms of Service", "Privacy Policy"].map((item) => (
                <a key={item} href="#" className="text-base font-normal leading-6 text-gray-200 transition hover:text-white sm:text-lg">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex w-full flex-col gap-6 border-t border-white/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-normal leading-5 text-gray-200 sm:text-base">
            © 2026 All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <a href="#" className="text-sm font-normal leading-5 text-gray-200 transition hover:text-white sm:text-base">
              Privacy Policy
            </a>

            <span className="size-1 rounded-full bg-gray-200" />

            <a href="#" className="text-sm font-normal leading-5 text-gray-200 transition hover:text-white sm:text-base">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;