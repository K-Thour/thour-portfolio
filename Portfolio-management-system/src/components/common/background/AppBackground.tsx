import { AvengerBackground } from "./AvengerBackground";
import { LightBackground } from "./LightBackground";
import { useAppSelector } from "../../../hooks/useRedux";

/**
 * Renders the themed animated background (dark = Avenger, light = Ragnarok)
 * as a fixed full-screen layer behind all page content.
 */
export function AppBackground() {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {isDark ? <AvengerBackground /> : <LightBackground />}
    </div>
  );
}
