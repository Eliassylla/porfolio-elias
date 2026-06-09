import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import heroPortrait from '@/assets/hero-portrait-real.jpg';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCalEmbed } from '@/hooks/useCalEmbed';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

gsap.registerPlugin(SplitText);

// V1 : landing unique. 'Services' est retiré (couvert par la section ci-dessous).
// 'Mes projets' et 'Contact' sont masqués — à réactiver en V2 une fois les pages
// alimentées (DB Supabase pour les projets, Edge Function + Resend pour le contact).
const navLinks: { name: string; href: string }[] = [];

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const isMobile = useIsMobile();
  const cal = useCalEmbed();

  useGSAP(() => {
    if (location.pathname !== '/') return;
    const split = new SplitText(logoRef.current, { type: "chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: -12,
      stagger: 0.03,
      duration: 0.35,
      ease: "power2.out",
      delay: 0.4,
    });
  }, { scope: logoRef, dependencies: [] });

  const isTransparent = location.pathname === '/' && !isScrolled;

  const ProfileAvatarButton = () => (
    <button
      type="button"
      aria-label="Ouvrir la présentation d'Elias"
      onClick={() => setProfileOpen(true)}
      className="rounded-full ring-offset-background transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Avatar className="size-9 border border-border shadow-sm">
        <AvatarImage
          src={heroPortrait}
          alt="Portrait d'Elias"
          className="object-cover object-[50%_15%]"
        />
        <AvatarFallback className="text-xs font-semibold">ES</AvatarFallback>
      </Avatar>
    </button>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'pointer-events-none fixed left-0 right-0 top-0 z-50 px-0 transition-all duration-500 md:px-6',
          isScrolled && 'md:top-4'
        )}
      >
        <div
          className={cn(
            'mx-auto w-full transition-all duration-500',
            isScrolled ? 'md:max-w-5xl' : 'md:max-w-7xl'
          )}
        >
          <div
            className={cn(
              'pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border/60 bg-background/80 px-[15px] backdrop-blur-lg transition-all duration-500 sm:px-6 md:gap-4 md:border-b-0 lg:px-8',
              isScrolled
                ? 'h-14 bg-background/85 shadow-sm md:h-12 md:rounded-xl md:border md:border-border/70 md:px-3 md:shadow-lg'
                : 'h-16 md:bg-background/75 md:shadow-none'
            )}
          >

          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className={cn(
              'text-lg font-bold tracking-tight transition-all duration-300',
              isTransparent
                ? 'text-foreground hover:opacity-80'
                : 'text-foreground hover:text-foreground/80'
            )}
          >
            OpsAgents
          </Link>

          {/* Nav centrée — desktop uniquement */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-300',
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Droite : CTA + ThemeToggle (desktop) / Menu (mobile) */}
          <div className="flex items-start justify-end gap-3 md:items-center">
            <div className="hidden md:flex items-center gap-3">
              <Button {...cal} size="sm" variant="default">
                Demander un audit
              </Button>
              <ProfileAvatarButton />
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Button {...cal} size="sm" variant="default">
                Audit
              </Button>
              <ProfileAvatarButton />
              <ThemeToggle />
            </div>
          </div>

          </div>
      </div>
    </motion.header>

      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={cn(
            "overflow-hidden border-border bg-background p-0",
            isMobile
              ? "max-h-[86svh] rounded-t-lg"
              : "w-[24rem] sm:max-w-md",
          )}
        >
          <div className="flex flex-col gap-6 p-6 pt-10">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 rounded-2xl border border-border shadow-sm">
                  <AvatarImage
                    src={heroPortrait}
                    alt="Portrait d'Elias"
                    className="object-cover object-[50%_15%]"
                  />
                  <AvatarFallback className="text-base font-semibold">ES</AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="text-2xl tracking-tight">
                    Elias Sylla
                  </SheetTitle>
                  <SheetDescription className="mt-1 text-sm leading-6">
                    Consultant en systèmes opérationnels
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                J'aide les indépendants et petites équipes à utiliser des
                systèmes adaptés à leur process métier.
              </p>
              <div className="grid gap-2">
                <div className="rounded-lg border border-border bg-card px-3 py-2 text-foreground">
                  Automatisations simples pour les tâches répétitives.
                </div>
                <div className="rounded-lg border border-border bg-card px-3 py-2 text-foreground">
                  Apps internes pour suivre le travail efficacement.
                </div>
                <div className="rounded-lg border border-border bg-card px-3 py-2 text-foreground">
                  Agents IA cadrés pour produire, trier ou qualifier.
                </div>
              </div>
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={(event) => {
                setProfileOpen(false);
                cal.onClick(event);
              }}
            >
              Demander un audit
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
