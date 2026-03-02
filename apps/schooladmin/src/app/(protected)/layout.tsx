import ProtectedLayout from "@/layout/protected"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectedLayout>{children}</ProtectedLayout>
    )
}

export default Layout