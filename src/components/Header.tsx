import { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <h1 className="text-center text-4xl text-gray-900">Book Reviews</h1>
      {children}
    </div>
  );
};

export default Header;
