import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='w-full border-t border-black bg-white text-black py-6'>
      <div className='max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Football Stats. All rights reserved.
        </p>
        <div className='flex space-x-4 mt-2 md:mt-0'>
          <Link href='/about-us' className='hover:underline text-sm'>
            About
          </Link>
          <Link
            href='mailto:souzalucas.dev@gmail.com'
            className='hover:underline text-sm'
          >
            Contact
          </Link>
          <Link
            href='https://github.com/souzalucasdev/football-stats'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline text-sm'
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
