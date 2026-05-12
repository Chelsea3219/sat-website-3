"use client"

import { useState } from "react"
import {ChevronRight, ChevronDown} from "lucide-react";
import Link from "next/link"
import "../../styles/topic-sidebar.css"
import {usePathname} from "next/navigation";
import TopicSidebar from "@/components/practice-sidebar/TopicSidebar";


// Handles rendering and recursion
export default function TopicSidebarItem({item, defaultOpen = false,}: any) {
    const [open, setOpen] = useState(defaultOpen)
    const pathname = usePathname()

    const hasChildren = item.children && item.children.length > 0

    // ROOT NODES (Reading / Math)
    if (item.title === "Reading" || item.title === "Math") {
        return (
            <div className="mb-4">
                {item.children?.map((child: any, index: number) => (
                    <TopicSidebarItem key={index} item={child} />
                ))}
            </div>
        )
    }

    // BRANCH NODE
    if (hasChildren) {

        return (
            <div className="sidebar-item">
                <div
                    className="sidebar-subtitle flex items-center gap-1 cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <div>
                        {open ? <ChevronDown /> : <ChevronRight />}
                    </div>

                    <span>{item.title}</span>
                </div>

                {open && (
                    <div>
                        {item.children.map((child: any, index: number) => (
                            <TopicSidebarItem key={index} item={child} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // LEAF NODE
    return (
        <div className="sidebar-leaf ml-4">
            {item.path ? (
                <Link
                    href={item.path}
                    className={
                    pathname === item.path
                        ? "text-accent font-semibold" : "text-slate-900 hover:text-accent hover:font-semibold transition-colors"
                    }
                >
                    {item.title}
                </Link>
            ) : (
                <span className="text-slate-900">{item.title}</span>
            )}
        </div>
    )
}