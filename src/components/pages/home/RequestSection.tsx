import React, { useContext, useEffect, useState } from 'react'
import Define from '../../../utils/Define'
import { Level, LoanRequest, User } from '../../../utils/interface/Models'
import MyPagination from '../../layout/common/Pagination'
import Button from '../../layout/form/Button'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'
import { createCollection, createDoc } from '../../../utils/firebase/config'
import { Collections } from '../../../utils/firebase/Collections'
import { getDocs, getDoc, query, where, Query } from 'firebase/firestore'
import { StateContext } from '../../../utils/context/MainContext'

export default function RequestSection() {
    const [requests, setRequests] = useState<LoanRequest[]>([])
    const { levels } = useContext(StateContext)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const load = async () => {
            const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
            const lrQuery = query<LoanRequest>(lrColRef, where("loanStatus", "==", "pending"))
            const data = await getDocs<LoanRequest>(lrQuery)
            setRequests([])
            data.docs.forEach(async (doc) => {
                //get other info
                const userDocRef = createDoc<User>(Collections.USER, doc.data().userId)
                const user = await getDoc(userDocRef)

                const levelArray = levels.filter(item => {
                    const lAmount = parseInt(doc.data().loanAmount)
                    if (item.min >= lAmount && item.max <= lAmount) {
                        return true;
                    } else {
                        return false;
                    }
                })

                const levelData = levelArray[0]

                const obj = {
                    ...doc.data(),
                    id: doc.id,
                    firstName: user.data()?.firstName,
                    lastName: user.data()?.lastName,
                    level: levelData?.name + "",
                    interest: levelData?.interest * 100 + "%"
                } as LoanRequest
                setRequests(old => {
                    return [...old, obj]
                })
            })
        }
        if (levels.length > 0)
            load()
    }, [levels.length])

    //console.log("here we go: ", requests);


    return (
        <div className='my-4'>
            <Title text='Requests' isSubtitle />
            <Spacing />
            <Table
                header="Date,First Name,Last Name,Level,Term,Amount,Interest,Total,Options"
                items={[
                    ...requests.map((item, i) => {
                        console.log();

                        return {
                            date: item?.loanDate.split(" ")[0],
                            fname: item?.firstName,
                            lname: item?.lastName,
                            level: item?.level,
                            term: item.paymentTime + "days",
                            amount: Define.CURRENCY + item.loanAmount,
                            interest: item.interest,
                            total: Define.CURRENCY + item.totalRepayable,
                            option: <div className='flex gap-2'>
                                <Button onClick={() => { }}>Approve</Button>
                                <Button seconday onClick={() => { }}>Reject</Button>
                            </div>
                        }
                    })
                ]}
                hideOption={true}
            />
            <Spacing />
            <MyPagination page={page} setPage={setPage} current_length={requests.length} />
        </div>
    )
}
