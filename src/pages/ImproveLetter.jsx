import Sidebar from '../components/general/Sidebar';
import ImproveLetterContent from '../components/mail/ImproveLetterContent';

const ImproveLetter = () => {

  return (
    <div className='dashboard-page'>
      <Sidebar />
      <div className='dashboard-content'>
        <ImproveLetterContent />
      </div>
    </div>
  );
};

export default ImproveLetter;
