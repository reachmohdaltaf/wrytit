import DashboardNavbar from "@/components/layout/DashboardNavbar";
import NextTopLoader from "nextjs-toploader";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <NextTopLoader
        color="#000"
        initialPosition={0.08}
        crawlSpeed={300}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <DashboardNavbar />
      <main className="">{children}</main>
    </div>
  );
}
