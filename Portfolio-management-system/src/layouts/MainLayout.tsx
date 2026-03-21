import utils from "../utils/index";
import { useState } from "react";
import DynamicNavbar from "../components/common/navbar/navbar";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import { useLocation } from "react-router-dom";
import { getNavItems } from "../components/common/navbar/config";
import { AppBackground } from "../components/common/background/AppBackground";

const { cn } = utils.tailwindUtils;

interface MainlayoutProps {
  children: React.ReactNode;
}

function Mainlayout({ children }: MainlayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hideSidebarRoutes = ["/profile", "/settings"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  const navItems = getNavItems();

  return (
    <div className="flex min-h-screen text-foreground">
      <AppBackground />
      {!shouldHideSidebar && (
        <DynamicNavbar isOpen={isOpen} setIsOpen={setIsOpen} items={navItems} />
      )}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          !shouldHideSidebar ? (isOpen ? "md:ml-64" : "md:ml-20") : "",
        )}
      >
        <Header
          className={cn(
            "fixed top-0 right-0 py-2 transition-all duration-300 z-40 pl-5 w-[calc(100%-80px)]",
            !shouldHideSidebar
              ? isOpen
                ? "md:w-[calc(100%-256px)]"
                : "md:w-[calc(100%-80px)]"
              : "",
          )}
        />
        <main className="flex-1 p-5 overflow-y-auto flex flex-col">
          <div className="flex-1 mt-16 mb-16">{children}</div>
          {!shouldHideSidebar && (
            <Footer
              className={cn(
                "fixed bottom-0 right-0 py-2 transition-all duration-300 z-40 pl-5",
                isOpen ? "md:left-64" : "md:left-20",
                "left-0",
              )}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Mainlayout;
