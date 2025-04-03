import Link from 'next/link'
import { InstagramIcon, LinkedinIcon, MailIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">Made by ©nemesios</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="w-6 h-6 hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="w-6 h-6 hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sec.juventudes.itapissuma@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary transition-colors"
          >
            <MailIcon className="w-6 h-6 mr-1" />
            <span className="text-sm">Fale conosco</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
