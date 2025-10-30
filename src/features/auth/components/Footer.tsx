import type { ClassName } from '../../../common/props/ClassNameInterface';

export const Footer = ({ className = '' }: ClassName) => {
  return (
    <footer className={`flex ${className}`}>
      <div className="mx-auto">© Powered by Lisoft</div>
    </footer>
  );
};
