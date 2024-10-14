import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/copyright", label: "Copyright" },
  ];

  const socialLinks = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { Icon: Mail, info: "support@creativemarket.com" },
    { Icon: Phone, info: "+1 (555) 123-4567" },
    { Icon: MapPin, info: "123 Design Street, Art City, AC 12345" },
  ];

  return (
    <footer className="w-full py-8 md:py-8 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-base font-bold mb-4">Creative Market</h4>
            <p className="text-xs md:text-sm text-gray-800">
              Empowering creatives with high-quality design assets since 2012.
            </p>
            <div className="flex flex-col space-y-2">
              {contactInfo.map(({ Icon, info }, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-xs text-gray-800 break-all">
                    {info}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-xs md:text-sm text-gray-800 hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-xs md:text-sm text-gray-800 hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold mb-4">Stay Connected</h4>
            <p className="text-xs md:text-sm text-gray-800 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-primary/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <div className="mt-6">
              <div className="flex space-x-4 justify-start sm:justify-start">
                {socialLinks.map(({ Icon, href, label }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="text-gray-800 hover:text-primary transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 md:pt-8 border-t border-gray-300 text-center">
          <p className="text-xs md:text-xs text-gray-800">
            © 2024 Creative Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
