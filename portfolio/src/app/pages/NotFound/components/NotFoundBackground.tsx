import { CodeRain } from '../../../components/CodeRain';
import { LightBackground } from './LightBackground';

interface NotFoundBackgroundProps {
  isDark: boolean;
}

export function NotFoundBackground({ isDark }: NotFoundBackgroundProps) {
  if (isDark) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <CodeRain />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }
  return <LightBackground />;
}
