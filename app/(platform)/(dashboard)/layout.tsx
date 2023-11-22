import Navbar from "./_components/navbar"

const DashboardOrganization = ({ children }:{ children: React.ReactNode }) => {
  return (
    <div className="h-full">
        {/* Navbar */}
        <Navbar/>
        {/* Body */}
        { children }
        {/* Footer */}
    </div>
  )
}

export default DashboardOrganization