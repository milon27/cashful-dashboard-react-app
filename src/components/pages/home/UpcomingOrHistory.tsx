import { where, getDoc, QuerySnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../../utils/context/MainContext'
import Define from '../../../utils/Define'
import { Collections } from '../../../utils/firebase/Collections'
import { createCollection, createDoc } from '../../../utils/firebase/config'
import { LoanRequest, User } from '../../../utils/interface/Models'
import FbPaginate from '../../layout/common/FbPaginate'
import MyPagination from '../../layout/common/Pagination'
import MySelect from '../../layout/form/MySelect'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'
import { initLoadData, paginateNext, paginatePrev } from './HomeUtils'
import { parseISO, addDays, isPast } from 'date-fns'

export default function UpcomingOrHistorySection({ upComing = true }: { upComing?: boolean }) {
    const [page, setPage] = useState(1)
    const [requests, setRequests] = useState<LoanRequest[]>([])
    const { levels } = useContext(StateContext)

    // init
    useEffect(() => {
        if (levels.length > 0)
            initLoadData(setPage, populateData,
                where("loanStatus", 'in', upComing ? ['approved'] : ['paid', 'defaulted', 'approved', 'rejected'])
            )
    }, [levels])

    const populateData = async (data: QuerySnapshot<LoanRequest>) => {
        setRequests([])
        data.docs.forEach(async (doc) => {
            //get other info
            const userDocRef = createDoc<User>(Collections.USER, doc.data().userId)
            const user = await getDoc(userDocRef)

            const levelArray = levels.filter(item => {
                const lAmount = parseInt(doc.data().loanAmount)
                if (item.min <= lAmount && lAmount <= item.max) {
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

    const next = () => {
        paginateNext(setPage, populateData, requests, where("loanStatus", 'in', upComing ? ['approved'] : ['paid', 'defaulted', 'approved', 'rejected']))
    }

    const prev = () => {
        paginatePrev(setPage, populateData, requests, where("loanStatus", 'in', upComing ? ['approved'] : ['paid', 'defaulted', 'approved', 'rejected']))
    }

    return (
        <div className='my-4'>
            <Title text={upComing ? "Upcoming" : "History"} isSubtitle />
            <Spacing />
            <Table
                header="Status,Due Date,Loan Date,First Name,Last Name,Level,Term,Amount,Interest,Total,Options"
                items={[
                    ...requests.map((item, i) => {
                        let state = ""
                        if (upComing) {
                            state = item?.loanStatus + ` & ${isPast(addDays(parseISO(item?.loanDate), parseInt(item.paymentTime))) ? "OverDue" : "Due"}`
                        } else {
                            state = item?.loanStatus
                        }
                        return {
                            status: state,
                            duedate: addDays(parseISO(item?.loanDate), parseInt(item.paymentTime)).toISOString().split("T")[0],
                            date: item?.loanDate.split(" ")[0],
                            fname: item?.firstName,
                            lname: item?.lastName,
                            level: item?.level,
                            term: item.paymentTime + "days",
                            amount: Define.CURRENCY + item.loanAmount,
                            interest: item.interest,
                            total: Define.CURRENCY + item.totalRepayable,
                            option: <MySelect
                                label='Update'
                                labelAsFirst
                                name=''
                                options={[
                                    { title: "Paid", value: "paid" },
                                    { title: "Defaulted", value: "defaulted" },
                                ]}
                                hideLabel
                                full_width={true}
                                onChange={(e) => {
                                    console.log(e.target);
                                }}
                            />
                        }
                    })
                ]}
                hideOption={true}
            />
            <Spacing />
            <FbPaginate page={page} setPage={setPage} current_length={requests.length} next={next} prev={prev} />
        </div>
    )
}

