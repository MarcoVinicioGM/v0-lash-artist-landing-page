"use client";

import React from "react"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ShoppingBag, Menu, ChevronRight, MapPin, Mail, Instagram } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services", hasSubmenu: true },
    { href: "#shop", label: "Shop", hasSubmenu: true },
    { href: "#bridal", label: "Bridal", hasSubmenu: false },
    { href: "/education", label: "Education", hasSubmenu: false, isPage: true },
    { href: "#gallery", label: "Gallery", hasSubmenu: false },
    { href: "#contact", label: "Contact", hasSubmenu: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsSheetOpen(false);
    
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
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
    }, 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSheetOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Logo - Centered on mobile */}
        <Link 
          href="/" 
          className="absolute left-1/2 -translate-x-1/2 font-serif text-xl font-bold tracking-wide md:static md:translate-x-0"
        >
          AMOR GLAM
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 md:inline-flex"
          >
            <Link href="#services">Book</Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF69B4] text-[10px] font-medium text-white">
              0
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Sheet Menu - Slides from Left */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-[85%] max-w-sm bg-white p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="font-serif text-lg font-normal tracking-wide">
              Menu
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 font-serif text-base transition-colors hover:bg-zinc-50"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 font-serif text-base transition-colors hover:bg-zinc-50"
                    >
                      {link.label}
                      {link.hasSubmenu && (
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                      )}
                    </a>
                  )}
                </SheetClose>
              ))}
            </nav>
            
            {/* Studio Info */}
            <div className="mt-8 border-t border-zinc-100 px-6 pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Studio Info
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  <span>New Orleans & Metairie, LA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Mail className="h-4 w-4 text-zinc-400" />
                  <a href="mailto:hello@amorglambeauty.com" className="hover:text-black">
                    hello@amorglambeauty.com
                  </a>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="mt-6 flex gap-3">
                <a
                  href="https://instagram.com/amorglambeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://tiktok.com/@amorglambeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/amorglambeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-[#FF69B4] hover:text-white"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <SheetFooter className="border-t p-6">
            <div className="flex w-full flex-col gap-3">
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-black/90"
                >
                  <a
                    href="#shop"
                    onClick={(e) => handleNavClick(e, "#shop")}
                  >
                    Shop Products
                  </a>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-black/90"
                >
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "#services")}
                  >
                    Book Now
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
