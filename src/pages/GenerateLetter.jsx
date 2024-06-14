import Sidebar from '../components/general/Sidebar';
import GenerateLetterContent from '../components/mail/GenerateLetterContent';

const GenerateLetter = () => {

  return (
    <div className='dashboard-page'>
      <Sidebar />
      <div className='dashboard-content'>
        <GenerateLetterContent />
      </div>
    </div>
  );
};

export default GenerateLetter;
