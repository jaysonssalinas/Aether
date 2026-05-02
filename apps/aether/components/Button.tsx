import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
}

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #ff1493 0%, #ff4081 40%, #6a4c93 100%)',
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    background: '#111111',
    color: '#f5f5f0',
    border: '1px solid #1e1e1e',
  },
  outline: {
    background: 'transparent',
    color: '#f5f5f0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  ghost: {
    background: 'transparent',
    color: '#999999',
    border: 'none',
  },
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center rounded-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${sizes[size]} ${className}`;

  const style = {
    ...styles[variant],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    letterSpacing: '0.05em',
    fontFamily: "'Inter', sans-serif",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        style={style}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
