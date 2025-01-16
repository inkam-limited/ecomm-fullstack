import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import DigigoLogo from "./logo";

export default function Footer() {
  return (
    <footer className="container text-slate-950 py-12 border-t border-slate-800/25">
      <div className=" px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link className="flex items-center space-x-2" href="#">
              <DigigoLogo width={120} height={60} showAnimation={true} />
            </Link>
            <p className="text-sm/relaxed">
              Digigo is a platform that allows you to create and sell digital
              products and services. It is a complete solution for businesses
              looking to grow their online presence and reach a wider audience.
            </p>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Digigo</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm hover:underline" href="/terms">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline" href="/refund-policy">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline" href="#">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact us</h3>
            <div className="space-y-2 text-sm">
              <p>Rupsha Tower, Plot-07</p>
              <p>Banani B/A, Dhaka-1213</p>
              <div>
                <span className="font-semibold">Phone:</span> +880 1754-015254
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <Link
                  className="hover:underline"
                  href="mailto:support@digigo.studio"
                >
                  support@digigo.studio
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-white p-2 rounded-lg text-blue-700 hover:bg-gray-100 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-lg text-blue-700 hover:bg-gray-100 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-lg text-blue-700 hover:bg-gray-100 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
