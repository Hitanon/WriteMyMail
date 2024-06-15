import AccountContent from '../components/auth/AccountContent';
import Sidebar from '../components/general/Sidebar';

const Account = () => {

  return (
    <div className='dashboard-page'>
      <Sidebar />
      <div className='dashboard-content'>
        <AccountContent />
      </div>
    </div>
  );
};

export default Account;
