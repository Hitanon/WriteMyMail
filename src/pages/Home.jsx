import HomeHeader from '../components/general/HomeHeader';
import Sidebar from '../components/general/Sidebar';

const Home = () => {

  return (
    <div className='dashboard-page'>
      <Sidebar />
      <div className='dashboard-content'>
        <HomeHeader />
      </div>
    </div>
  );
};

export default Home;
