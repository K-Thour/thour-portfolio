import React, { useMemo } from 'react';

const STATIC_RAIN_COLUMNS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${i * 4.2 + 1}%`,
  duration: `${8 + (i % 7) * 1.5}s`,
  delay: `${(i * 0.35) % 4}s`,
  chars: [
    '0',
    '1',
    '{',
    '}',
    '<',
    '>',
    '/',
    ';',
    ':',
    '=',
    '+',
    '-',
    '*',
    '&',
    '|',
    '%',
    '$',
    '#',
    '@',
    '!',
  ]
    .sort(() => ((i * 7 + 13) % 5) - 2)
    .slice(0, 16)
    .join('\n'),
}));

export const CodeRain: React.FC = React.memo(function CodeRain() {
  const columns = useMemo(() => STATIC_RAIN_COLUMNS, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none select-none motion-reduce:hidden"
    >
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 text-red-500 font-mono text-xs whitespace-pre leading-4 will-change-transform"
          style={{
            left: col.left,
            animation: `coderain-fall ${col.duration} linear ${col.delay} infinite`,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
});
