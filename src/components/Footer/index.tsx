import Link from 'next/link'
import { Instagram, Linkedin, MailIcon } from 'lucide-react'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">Formação Municipal</h2>
            <p className="mt-1 text-sm text-slate-400">
              Capacitando o futuro da nossa cidade.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-slate-400 transition-all duration-300 hover:text-white hover:scale-110" />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-slate-400 transition-all duration-300 hover:text-white hover:scale-110" />
            </Link>
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sec.juventudes.itapissuma@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-400 transition-colors duration-300 hover:text-white"
            >
              <MailIcon className="mr-2 h-6 w-6" />
              <span className="text-sm font-medium">Fale conosco</span>
            </Link>
          </div>
        </div>

        <hr className="my-6 border-slate-800" />
        <div className="text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Nemesios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
