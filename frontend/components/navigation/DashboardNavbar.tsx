"use client"

import {SignOutButton} from "@/components/navigation/SignOutButton";
import {useState} from "react"
import {X, Menu, PanelTopOpen, PanelTopClose} from 'lucide-react'
import Image from "next/image"
import Link from 'next/link';
import {usePathname} from "next/navigation";
import TopicSidebar from "@/components/practice-sidebar/TopicSidebar";

export default function DashboardNavbar() {
    const [open, setOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    const pathname = usePathname();
    const isPractice = pathname.startsWith("/dashboard/practice");


    return(
        <nav className=" fixed left-0 top-0 z-50 bg-primary w-full">
            <div className="max-w-6xl mx-auto px-2 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">

                    {/* Logo and Website Title */}
                    <div className="flex flex-row gap-x-1 items-center">
                        <Image src="/dashboard_logo1.svg" alt="Elevate Learning" width={32} height={32} className="w-10 h-10 hidden md:block"/>
                        {isPractice && (
                            <button className="md:hidden p-1 text-white font-bold hover:text-accent hover:scale-115 text-xl cursor-pointer"
                                    onClick={() => {
                                        setOpenSidebar((prev) => !prev);
                                        setOpen(false)
                                    }}
                            >
                                {/* Checks to see if the mobileMenu is open */}
                                {openSidebar ?
                                    (
                                        <PanelTopClose className="w-4 h-4"/>
                                    ) : (
                                        <PanelTopOpen className="w-4 h-4"/>
                                )}
                            </button>
                        )}
                        <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white whitespace-nowrap">Elevate Learning</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:text-sm lg:gap-x-6 md:gap-x-4 pt-2 items-center">
                        <Link href="/dashboard" className="text-white text-xs sm:text-sm md:text-base font-semibold hover:text-accent hover:scale-115 transition-all">Home</Link>
                        <Link href="/dashboard/practice" className="text-white text-xs sm:text-sm md:text-base font-semibold hover:text-accent hover:scale-115 transition-all">Practice</Link>
                        <Link href="#progress" className="text-white text-xs sm:text-sm md:text-base font-semibold hover:text-accent hover:scale-115 transition-all">Progress</Link>
                        <Link href="#quiz" className="text-white text-xs sm:text-sm md:text-base font-semibold hover:text-accent hover:scale-115 transition-all">Quiz</Link>
                        <Link href="#profile" className="text-white text-xs sm:text-sm md:text-base font-semibold hover:text-accent hover:scale-115 transition-all">Profile</Link>
                        <SignOutButton className="rounded-btn text-lg h-8 border-3 bg-white text-primary font-semibold"/>
                    </div>

                    {/* Hamburger Menu */}
                    <button className="md:hidden p-2 text-white font-semibold hover:text-accent hover:font-semibold hover:scale-110 text-xl cursor-pointer"
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
                <div className="md:hidden top-full left-0 w-full bg-secondary shadow-md animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col items-end p-4 space-y-3 text-xs font-semibold ">
                        <Link href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="block text-main hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Home
                        </Link>

                        <Link href="/dashboard/practice"
                            onClick={() => setOpen(false)}
                            className="block text-main hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Practice
                        </Link>

                        <Link href="#progress"
                            onClick={() => setOpen(false)}
                            className="block text-main hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Progress
                        </Link>

                        <Link href="#quiz"
                            onClick={() => setOpen(false)}
                            className="block text-main hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Quiz
                        </Link>

                        <Link href="#profile"
                            onClick={() => setOpen(false)}
                            className="block text-main hover:text-accent origin-right hover:scale-110 transition-all"
                        >
                            Profile
                        </Link>

                        <div className="w-24 flex items-end ">
                            <SignOutButton className="rounded-btn bg-primary text-white text-lg h-8 font-semibold"/>
                        </div>
                    </div>
                </div>
            }

            {/* Mobile Sidebar */}
            {openSidebar &&
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-in slide-in-from-top transition-all duration-300">
                    <div className="flex justify-center py-4">
                        <TopicSidebar/>
                    </div>
                </div>
            }

        </nav>
    )
}