import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-500">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-amber-500">
                  Dining
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-500">
                  Meetings & Events
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-amber-500">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-amber-500">
                  About Brijwasi
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-amber-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-500">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-amber-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-500">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <address className="not-italic">
              <p className="mb-2">123 Main Street</p>
              <p className="mb-2">New Delhi, India</p>
              <p className="mb-2">Phone: +91 98765 43210</p>
              <p className="mb-4">Email: info@brijwasi.com</p>
            </address>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-amber-500" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-amber-500" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-amber-500" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 hover:text-amber-500" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5 hover:text-amber-500" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Brijwasi Hotel & Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

