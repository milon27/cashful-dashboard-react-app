
import { getDocs } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { StateContext } from '../../../utils/context/MainContext';
import { Collections } from '../../../utils/firebase/Collections';
import { createCollection } from '../../../utils/firebase/config';
import { Level } from '../../../utils/interface/Models';
import Main from '../../layout/dashboard/Main';
import Title from '../../layout/form/Title';
import RequestSection from './RequestSection';
import UpcomingOrHistory from './UpcomingOrHistory';

// Page
const AdminHome = () => {
    const { setLevels } = useContext(StateContext)
    useEffect(() => {
        const load = async () => {
            const levelColRef = createCollection<Level>(Collections.LEVEL)
            const data = await getDocs(levelColRef)
            const tst = data.docs.map(item => {
                return {
                    ...item.data(),
                    id: item.id
                }
            })
            setLevels(tst)
        }
        load()
    }, [])
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
