"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronRight,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Heart,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS, BOOKING_LINKS, CONTACT_LINKS } from "@/lib/constants";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Optimized Scroll Handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services", hasSubmenu: true, isPage: true },
    { href: "/shop", label: "Shop", hasSubmenu: false, isPage: true },
    { href: "/bridal", label: "Bridal", hasSubmenu: false, isPage: true },
    { href: "/education", label: "Education", hasSubmenu: false, isPage: true },
    { href: "/gallery", label: "Gallery", hasSubmenu: false, isPage: true },
    { href: "/faq", label: "FAQ", hasSubmenu: false, isPage: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsSheetOpen(false);

      if (pathname !== "/") {
        router.push("/" + href);
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden -ml-2"
          onClick={() => setIsSheetOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 font-serif text-xl font-bold tracking-widest text-black md:static md:translate-x-0 transition-all",
            isScrolled ? "text-lg" : "text-xl"
          )}
        >
          AMOR GLAM
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-zinc-600 transition-colors hover:text-black hover:underline underline-offset-4 decoration-[#FF69B4]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-zinc-600 transition-colors hover:text-black hover:underline underline-offset-4 decoration-[#FF69B4] cursor-pointer"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Book Now Button */}
        <div className="flex items-center gap-2">
          <Button 
            asChild
            className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none text-[10px] sm:text-xs font-semibold px-3 sm:px-5 py-1 sm:py-1.5 h-8 sm:h-9"
          >
            <a href={BOOKING_LINKS.general} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          side="left" 
          className="w-[85%] max-w-sm p-0 flex flex-col bg-white group"
          data-bridal-nav={pathname === "/bridal" ? "true" : "false"}
        >
          <SheetHeader className="border-b px-6 py-6 text-left relative">
            <SheetTitle className="font-serif text-xl font-bold tracking-widest">
              AMOR GLAM
            </SheetTitle>
            {pathname === "/bridal" && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#FF69B4]">
                <Heart className="h-6 w-6 fill-[#FF69B4]/20" />
              </div>
            )}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-lg px-6 py-4 text-base font-medium transition-colors hover:bg-zinc-50"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between rounded-lg px-6 py-4 text-base font-medium transition-colors hover:bg-zinc-50 cursor-pointer"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </a>
                  )}
                </SheetClose>
              ))}
            </nav>
          </div>

          <div className="mt-auto border-t bg-zinc-50 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <MapPin className="h-4 w-4 text-[#FF69B4]" />
                <span>3110 David Dr. Metairie, LA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Mail className="h-4 w-4 text-zinc-400" />
                <a href={CONTACT_LINKS.email} className="hover:text-black">
                  {SOCIAL_LINKS.email}
                </a>
              </div>
              <div className="flex gap-3 mt-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
              <div className="flex gap-3 mt-2">
                <Link href="/link-in-bio" className="text-zinc-400 hover:text-[#FF69B4]">
                  <LinkIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
