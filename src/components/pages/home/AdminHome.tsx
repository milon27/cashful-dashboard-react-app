
import Main from '../../layout/dashboard/Main';
import Title from '../../layout/form/Title';
import RequestSection from './RequestSection';
import UpcomingOrHistory from './UpcomingOrHistory';

// Page
const AdminHome = () => {

    return (
        <Main title="Dashaboard">
            <div className='flex flex-row  justify-between items-center gap-2'>
                <Title text='Overview' />
                <input type="text" className='px-3 py-2 border border-gray-400 rounded-full' placeholder='Search Users' />
            </div>
            <RequestSection />
            <UpcomingOrHistory title="Upcoming" />
            <UpcomingOrHistory title="History" />
        </Main>
    )
}

export default AdminHome
