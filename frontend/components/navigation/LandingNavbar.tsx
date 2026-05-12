"use client"

import {SignInButton, SignUpButton} from "@clerk/nextjs";
import {useState} from "react"
import {X, Menu} from 'lucide-react'
import Image from "next/image"
import Link from 'next/link';

export default function LandingNavbar() {
    const [open, setOpen] = useState(false)
    return(
        <nav className=" fixed left-0 top-0 z-50 bg-white w-full">
            <div className="max-w-6xl mx-auto px-2 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">

                    {/* Logo and Website Title */}
                    <div className="flex flex-row gap-x-1 items-center">
                        <Image src="/landingpage_logo.svg" alt="Elevate Learning" width={32} height={32} className="w-10 h-10"/>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-main whitespace-nowrap">Elevate Learning</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:text-sm lg:gap-x-6 md:gap-x-2 pt-2 items-center">
                        <Link href="#home" className="text-main font-semibold hover:text-accent hover:scale-115 transition-all cursor-pointer">Home</Link>
                        <Link href="#about" className="text-main font-semibold hover:text-accent hover:scale-115 transition-all cursor-pointer">About</Link>
                        <Link href="#testimonials" className="text-main font-semibold hover:text-accent hover:scale-115 transition-all cursor-pointer">Testimonials</Link>
                        <Link href="#contact-us" className="text-main font-semibold hover:text-accent hover:scale-115 transition-all cursor-pointer whitespace-nowrap">Contact Us</Link>
                    </div>

                    {/* Login and Register */}
                    <div className="hidden md:flex flex-row md:text-sm gap-x-2 pt-2 items-center">
                        <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                            <button className="rounded-btn text-md h-7 border-3 border-primary text-primary">
                                Login
                            </button>
                        </SignInButton>
                        <SignUpButton mode="redirect">
                            <button className="rounded-btn text-md h-7 border-3 border-primary bg-primary text-white">
                                Register
                            </button>
                        </SignUpButton>
                    </div>


                    {/* Hamburger Menu */}
                    <button className="md:hidden p-2 text-slate-900 font-semibold hover:text-accent hover:font-semibold hover:scale-110 text-xl cursor-pointer"
                            onClick={() => setOpen((prev) => !prev)}
                    >
                        {/* Checks to see if the mobileMenu is open */}
                        {open ? ( <X className="w-6 h-6"/>) : (
                            <Menu className="w-6 h-6"/>
                            )}
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            {open &&
                <div className="md:hidden top-full left-0 w-full border-t-2 border-primary bg-white shadow-md animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col items-end p-4 space-y-3 text-xs font-semibold ">
                        <Link href="#home"
                            onClick={() => setOpen(false)}
                            className="block text-slate-900 hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Home
                        </Link>

                        <Link href="#about"
                            onClick={() => setOpen(false)}
                            className="block text-slate-900 hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            About
                        </Link>

                        <Link href="#testimonials"
                            onClick={() => setOpen(false)}
                            className="block text-slate-900 hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Testimonials
                        </Link>

                        <Link href="#contact"
                            onClick={() => setOpen(false)}
                            className="block text-slate-900 hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Contact Us
                        </Link>

                        <div className="flex flex-col items-end gap-y-3 w-24">
                            <SignInButton>
                                <button className="rounded-btn text-sm h-8 border-3 border-primary text-primary">
                                    Login
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="rounded-btn text-sm h-8 border-3 border-primary bg-primary text-white">
                                    Register
                                </button>
                            </SignUpButton>
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}