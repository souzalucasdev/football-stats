import LeaguesDisplayer from '@/components/LeaguesDisplayer';
import MainContainer from './MainContainer';
import HomeTitle from './HomeTitle';
const Hero = () => {
  return (
    <MainContainer>
      <HomeTitle />
      <LeaguesDisplayer />
    </MainContainer>
  );
};

export default Hero;
