import DashboardNavbar from '@/components/navigation/DashboardNavbar'

export default function DashboardLayout({children}: { children: React.ReactNode; }) {
    return (
        <div>
            <DashboardNavbar />
            {children}
        </div>
    );
}