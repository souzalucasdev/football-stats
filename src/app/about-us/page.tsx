import Image from 'next/image';
import BackButton from '@/components/BackButton';

export default function AboutUsPage() {
  return (
    <div className='relative p-4 min-h-screen bg-white'>
      <BackButton />
      <div className='flex flex-col min-h-screen w-full flex justify-center items-center py-12'>
        <div className='bg-white w-[80vw] rounded-xl shadow-md flex flex-col justify-center items-center mb-12'>
          <h2 className='p-4 text-3xl font-bold mb-4 text-center text-custom-green-500'>
            Who we are
          </h2>
          <section className='p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8'>
            <div className='md:w-1/2 text-black'>
              <p className='text-lg leading-relaxed'>
                Were passionate football enthusiasts who decided to channel our
                love for the sport into building something meaningful.{' '}
                <strong>Football Stats</strong> started as a portfolio project —
                a way for us to practice and showcase our skills while focusing
                on something we genuinely enjoy: football.
                <br />
                Were not ruling out growing this project further. With the
                massive global interest in football, theres a lot of potential
                here — and a lot more wed love to share. Whether youre here to
                check match times or follow your favorite league, were glad you
                stopped by.
              </p>
            </div>

            <div className='md:w-1/2 w-full'>
              <Image
                src='/assets/about-us-1.jpg'
                alt='Team building Football Stats'
                width={500}
                height={500}
                className='rounded-[16px] object-cover w-full h-auto'
              />
            </div>
          </section>
        </div>
        <div className='bg-white w-[80vw] rounded-xl shadow-md flex flex-col justify-center items-center'>
          <h2 className='p-4 text-3xl font-bold mb-4 text-center text-custom-green-500'>
            What we do
          </h2>
          <section className='p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8'>
            <div className='md:w-1/2 w-full'>
              <Image
                src='/assets/about-us-2.jpg'
                alt='Team building Football Stats'
                width={500}
                height={500}
                className='rounded-[16px] object-cover w-full h-auto'
              />
            </div>
            <div className='md:w-1/2 text-black'>
              <p className='text-lg leading-relaxed'>
                Our main goal was to create a clean and functional page to
                display upcoming matches from the top European leagues. But as
                any football fan knows, once youre in, its hard to stop. From
                match schedules to results, league tables, and beyond, theres an
                entire universe of data and stories waiting to be explored.
                <br />
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
