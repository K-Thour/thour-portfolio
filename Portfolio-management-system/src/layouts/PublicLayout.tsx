import utils from "../utils/index";
import { AppBackground } from "../components/common/background/AppBackground";
import PublicHeader from "./PublicHeader";
import Footer from "./footer/Footer";

const { cn } = utils.tailwindUtils;

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-full text-foreground overflow-hidden">
      <AppBackground />
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ">
        <PublicHeader
          className={cn(
            "fixed top-0 right-0 py-2 transition-all duration-300 z-40 pl-5 w-[calc(100%-80px)] min-w-screen",
          )}
        />
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 mb-16 mt-30">{children}</div>
          <Footer
            className={cn(
              "fixed bottom-0 right-0 py-2 transition-all duration-300 z-40 pl-5",
              "left-0",
            )}
          />
        </main>
      </div>
    </div>
  );
}

export default PublicLayout;
