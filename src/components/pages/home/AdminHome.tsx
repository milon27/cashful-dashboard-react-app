
import { getDocs, QuerySnapshot, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../utils/context/MainContext';
import { Collections } from '../../../utils/firebase/Collections';
import { createCollection } from '../../../utils/firebase/config';
import { Level, LoanRequest, STATUS } from '../../../utils/interface/Models';
import Main from '../../layout/dashboard/Main';
import Title from '../../layout/form/Title';
import RequestSection from './RequestSection';
import UpcomingOrHistory from './UpcomingOrHistory';
import { Modal, Button } from '@milon27/react-modal'
import UpcomingOrHistorySection from './UpcomingOrHistory';
import { searchUser, searchData, URHpopulateData } from './HomeUtils';
// Page
const AdminHome = () => {
    const { setLevels, levels } = useContext(StateContext)
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [requests, setRequests] = useState<LoanRequest[]>([])


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

    const doSearch = async () => {
        if (search.length == 0) {
            return;
        }
        setSearching(true)
        // get the user first
        const userIdArr = await searchUser(search)
        searchData(searchPopulateData, where("userId", "in", userIdArr), where("loanStatus", "!=", STATUS.pending))
    }

    const searchPopulateData = async (data: QuerySnapshot<LoanRequest>) => {
        URHpopulateData(data, levels, setRequests);
    }

    return (
        <Main title="Dashaboard">
            <div className='flex flex-row  justify-between items-center gap-2'>
                <Title text='Overview' />
                <input onKeyUp={(e) => {
                    e.preventDefault()
                    if (e.key === "Enter") {
                        doSearch()
                    }
                }}
                    value={search} onChange={(e) => setSearch(e.target.value.trim())}
                    type="text" className='px-3 py-2 border border-gray-400 rounded-full' placeholder='Search Users' />
            </div>
            <RequestSection />
            <UpcomingOrHistory upComing />
            <UpcomingOrHistory upComing={false} />
            {/* serch modal */}
            <Modal
                title={`searching for ${search}`}
                show={searching}
                setShow={setSearching}
                footer={
                    <><Button onClick={() => setSearching(false)} title="Close" /></>
                }
            >
                <UpcomingOrHistorySection searching={true} upComing={false} initList={requests} />
            </Modal>
        </Main>
    )
}

export default AdminHome
