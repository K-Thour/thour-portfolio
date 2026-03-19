import { useAppSelector } from "../../../hooks/useRedux";
import { Toaster } from "./toaster";

export function AppToaster() {
  const theme = useAppSelector((state) => state.theme.theme);
  return <Toaster theme={theme} />;
}
