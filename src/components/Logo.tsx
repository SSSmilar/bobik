interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-8 h-8 rounded-full border-2 border-primary animate-[spin_3s_linear_infinite]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-primary/20" />
      </div>
    </div>
  );
};

export default Logo;