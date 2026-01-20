"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ShoppingBag,
  Menu,
  ChevronRight,
  MapPin,
  Mail,
  Instagram,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    { href: "#shop", label: "Shop", hasSubmenu: true },
    { href: "#bridal", label: "Bridal", hasSubmenu: false },
    { href: "/education", label: "Education", hasSubmenu: false, isPage: true },
    { href: "#gallery", label: "Gallery", hasSubmenu: false },
    { href: "/faq", label: "FAQ", hasSubmenu: false, isPage: true },
    { href: "#contact", label: "Contact", hasSubmenu: false },
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

        {/* Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-zinc-800 hover:text-[#FF69B4]">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF69B4] text-[10px] font-bold text-white">
              0
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-[85%] max-w-sm p-0 flex flex-col bg-white">
          <SheetHeader className="border-b px-6 py-6 text-left">
            <SheetTitle className="font-serif text-xl font-bold tracking-widest">
              AMOR GLAM
            </SheetTitle>
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
                <span>New Orleans & Metairie, LA</span>
              </div>
              <div className="flex gap-4 mt-2">
                <a href="https://instagram.com" className="text-zinc-400 hover:text-[#FF69B4]">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="mailto:hello@amorglambeauty.com" className="text-zinc-400 hover:text-[#FF69B4]">
                  <Mail className="h-5 w-5" />
                </a>
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
