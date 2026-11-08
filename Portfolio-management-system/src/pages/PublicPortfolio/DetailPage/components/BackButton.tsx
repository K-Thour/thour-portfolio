import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  isDark?: boolean;
}

export function BackButton(_props: BackButtonProps = {}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/publicPortfolio/overviewPage");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-4 py-2 my-4 rounded-xl text-sm font-medium border border-border/40 bg-card/75 backdrop-blur-md text-foreground hover:bg-accent/60 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-xs"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
}

