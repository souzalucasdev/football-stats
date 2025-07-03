import React, { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <section className='px-6 md:px-20 lg:px-60 py-12 text-center w-full bg-white min-h-screen'>
      {children}
    </section>
  );
};

export default MainContainer;
