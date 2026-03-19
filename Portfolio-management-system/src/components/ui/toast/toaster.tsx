import { useToast } from "../../../hooks/useToast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastTheme,
} from "./toast";

interface ToasterProps {
  /** Pass the current app theme so toast colours match the active theme */
  theme?: ToastTheme;
}

export function Toaster({ theme = "dark" }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider theme={theme}>
      <ToastViewport>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} id={id} {...props}>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose toastId={id} />
            </Toast>
          );
        })}
      </ToastViewport>
    </ToastProvider>
  );
}
