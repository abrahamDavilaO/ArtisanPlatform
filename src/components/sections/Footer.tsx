

const footerLinks = {
    shop: [
        { label: "Muebles", href: "#furniture" },
        { label: "Arte", href: "#art" },
        { label: "Iluminación", href: "#" },
        { label: "Accesorios", href: "#" },
    ],
    help: [
        { label: "Envíos", href: "#" },
        { label: "Devoluciones", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Contacto", href: "#contact" },
    ],
    company: [
        { label: "Sobre Nosotros", href: "#about" },
        { label: "Showrooms", href: "#" },
        { label: "Carreras", href: "#" },
        { label: "Prensa", href: "#" },
    ],
};

const socialLinks = [
    {
        name: "Instagram",
        href: "#",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
        ),
    },
    {
        name: "Pinterest",
        href: "#",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.657-.895 3.023-2 3.708V19l-2-1-2 1v-3.292C9.895 15.023 9 13.657 9 12z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/17gPmRBMVZ/",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
];

export function Footer() {
    return (
        <footer id="contact" className="bg-neutral-900 text-neutral-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                            ARTISAN
                        </h3>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Elegancia atemporal para espacios únicos
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-amber-600 transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Comprar</h4>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-amber-600 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Ayuda</h4>
                        <ul className="space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-amber-600 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Empresa</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-amber-600 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-500">
                        &copy; {new Date().getFullYear()} ARTISAN. Todos los derechos
                        reservados.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-neutral-500 hover:text-amber-600 transition-colors">
                            Privacidad
                        </a>
                        <a href="#" className="text-neutral-500 hover:text-amber-600 transition-colors">
                            Términos
                        </a>
                        <a href="#" className="text-neutral-500 hover:text-amber-600 transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
