'use client';

/**
 * Shared page header used across public pages for consistent branding.
 * Renders an optional eyebrow pill, a gradient title, and a subtitle.
 * Uses CSS variables from globals.css so it respects dark/light themes.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  gradientStart = 'var(--primary)',
  gradientEnd = 'var(--secondary)',
  align = 'center',
  icon,
  maxWidth = 640,
  className = '',
  children,
}) {
  const alignClass =
    align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={`page-header ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="section-eyebrow">
          {icon && <span className="text-base leading-none">{icon}</span>}
          {eyebrow}
        </span>
      )}

      {title && (
        <h1
          className="page-header-title"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h1>
      )}

      {subtitle && (
        <p className="page-header-subtitle" style={{ maxWidth }}>
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
