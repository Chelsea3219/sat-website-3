"use client"

import {useState} from "react";

import TopicSidebarItem from "./TopicSidebarItem";
import items from "./TopicSidebarData";
import "../../styles/topic-sidebar.css"

// Handles data and layout
export default function TopicSidebar() {
    const readingTopics = items.filter(item => item.title === "Reading");
    const mathTopics = items.filter(item => item.title === "Math");

    return (
        <div className="sidebar p-4 flex flex-col " style={{ overflowY: 'auto' }}       >
            <div>
                <h1 className="sidebar-title">Reading</h1>
                {readingTopics.map((item, index) => (
                    <TopicSidebarItem key={index} item={item} />
                ))}
            </div>
            <div>
                <h1 className="sidebar-title">Math</h1>
                {mathTopics.map((item, index) => (
                    <TopicSidebarItem key={index} item={item} />
                ))}
            </div>

        </div>
    )
}