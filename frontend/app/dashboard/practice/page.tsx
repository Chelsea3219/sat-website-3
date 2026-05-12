import TopicSidebar from "@/components/practice-sidebar/TopicSidebar";

export default function Page() {
    return (
        <div className="flex h-screen pt-18 gap-8 px-8 py-4 overflow-hidden">
            <aside className="hidden md:block fixed">
                <TopicSidebar/>
            </aside>

            <div>

            </div>
        </div>
    )
}