import footerLinks from "@/lib/footerLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-100/90 py-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-900 px-4">
        <div>
          <h2 className="font-semibold text-lg">Creative Market</h2>
          <p className="mt-4 text-gray-600">
            Accelerate your projects with millions of ready-to-use products.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              aria-label="dribble"
              className="text-gray-500 hover:text-gray-800"
            >
              🌍
            </a>
            <a
              href="#"
              aria-label="pinterest"
              className="text-gray-500 hover:text-gray-800"
            >
              📌
            </a>
            <a
              href="#"
              aria-label="facebook"
              className="text-gray-500 hover:text-gray-800"
            >
              👍
            </a>
            <a
              href="#"
              aria-label="twitter"
              className="text-gray-500 hover:text-gray-800"
            >
              🐦
            </a>
            <a
              href="#"
              aria-label="instagram"
              className="text-gray-500 hover:text-gray-800"
            >
              📷
            </a>
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h2 className="font-semibold text-lg">{section.title}</h2>
            <ul className="mt-4 space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
