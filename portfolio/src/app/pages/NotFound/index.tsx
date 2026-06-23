import { useNavigate } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { NotFoundBackground } from './components/NotFoundBackground';
import { ErrorIcon } from './components/ErrorIcon';
import { ErrorTitle } from './components/ErrorTitle';
import { ErrorMessage } from './components/ErrorMessage';
import { ActionButtons } from './components/ActionButtons';
import { NavigationSuggestions } from './components/NavigationSuggestions';
import { ErrorCode } from './components/ErrorCode';

export function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === 'avengers';
  const navigate = useNavigate();

  const handleNavigateHome = () => navigate('/');
  const handleGoBack = () => navigate(-1);
  const handleNavigate = (path: string) => navigate(path);

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      }`}
    >
      <NotFoundBackground isDark={isDark} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center py-20 flex flex-col items-center">
        <ErrorIcon isDark={isDark} />
        <ErrorTitle isDark={isDark} />
        <ErrorMessage isDark={isDark} />
        <ActionButtons
          isDark={isDark}
          onNavigateHome={handleNavigateHome}
          onGoBack={handleGoBack}
        />
        <NavigationSuggestions isDark={isDark} onNavigate={handleNavigate} />
        <ErrorCode isDark={isDark} />
      </div>
    </div>
  );
}
