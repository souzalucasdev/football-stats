import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='bg-white text-black p-4 border-b-4 border-black sticky top-0 z-20'>
      <div className='flex justify-between items-center'>
        <Link href='/' aria-label='Change language'>
          <div className='p-2 rounded-full cursor-pointer transition duration-200'>
            <Image
              src='/assets/logo.png'
              alt='Football Stats logo'
              width={70}
              height={70}
            />
          </div>
        </Link>
        <div className='left'></div>
        <ul className='flex justify-between items-center'>
          <li>
            <Link href='/about-us' className='mr-4'>
              About us
            </Link>
          </li>
          <li>
            <Link href='/' aria-label='Change language'>
              <div className='p-2 rounded-full cursor-pointer transition duration-200'>
                <Image
                  src='/assets/globe-icon.svg'
                  alt='Football Stats logo'
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
