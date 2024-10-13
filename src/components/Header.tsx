import { ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 pb-4 flex justify-between">
      <h1 className="text-center text-4xl text-gray-900 sticky top-6 max-sm:text-3xl">
        Book Reviews
      </h1>
      {children}
    </div>
  );
};

export default Header;
