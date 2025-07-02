import LeaguesDisplayer from '@/components/LeaguesDisplayer';
const Hero = () => {
  return (
    <section className='px-6 md:px-16 py-12 text-center w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 text-left md:text-center mb-6'>
          Choose a league and dive into the action
        </h1>
      </div>
      <LeaguesDisplayer />
    </section>
  );
};

export default Hero;
