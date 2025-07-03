import Image from 'next/image';

const Spinner = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-white backdrop-blur-sm flex-col'>
      <Image
        src='/favicon.ico'
        alt='Loading...'
        width={48}
        height={48}
        className='animate-spin'
        unoptimized
      />
      <p className='mt-12 text-xl font-bold text-green-600'>Loading...</p>
    </div>
  );
};
export default Spinner;
