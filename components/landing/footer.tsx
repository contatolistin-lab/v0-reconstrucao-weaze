import Link from 'next/link'
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube 
} from 'lucide-react'

const footerLinks = {
  produto: [
    { label: 'Recursos', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Integrações', href: '/integrations' },
    { label: 'Changelog', href: '/changelog' },
  ],
  empresa: [
    { label: 'Sobre', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Contato', href: '/contact' },
  ],
  recursos: [
    { label: 'Documentação', href: '/docs' },
    { label: 'Guias', href: '/guides' },
    { label: 'API', href: '/api' },
    { label: 'Status', href: '/status' },
  ],
  legal: [
    { label: 'Privacidade', href: '/privacy' },
    { label: 'Termos', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'LGPD', href: '/lgpd' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/weaze', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/weaze', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/weaze', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@weaze', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
                <span className="text-lg font-bold text-white">W</span>
              </div>
              <span className="text-xl font-bold tracking-tight">WEAZE</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A plataforma white-label para marcas que querem criar comunidades 
              engajadas e monetizáveis.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            <div>
              <h3 className="text-sm font-semibold">Produto</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.produto.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Empresa</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Recursos</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.recursos.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WEAZE. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com{' '}
            <span className="text-primary" aria-label="amor">
              ♥
            </span>{' '}
            no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
