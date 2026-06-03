import { Linkedin, Youtube } from 'lucide-react';
import { businessInfo } from '@/data/business';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {businessInfo.name} · Systèmes opérationnels pour solopreneurs et petites équipes
          </p>
          <div className="flex items-center gap-6">
            {businessInfo.socialLinks.linkedin && (
              <a
                href={businessInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {businessInfo.socialLinks.youtube && (
              <a
                href={businessInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
