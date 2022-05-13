import { where, getDoc, QuerySnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../../utils/context/MainContext'
import Define from '../../../utils/Define'
import { Collections } from '../../../utils/firebase/Collections'
import { createDoc } from '../../../utils/firebase/config'
import { LoanRequest, STATUS, User } from '../../../utils/interface/Models'
import FbPaginate from '../../layout/common/FbPaginate'
import MySelect from '../../layout/form/MySelect'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'
import { initLoadData, onUpdateStatus, paginateNext, paginatePrev, URHpopulateData } from './HomeUtils'
import { parseISO, addDays, isPast } from 'date-fns'
import Helper from '../../../utils/Helper'

interface iUp {
    upComing?: boolean
    searching?: boolean
    initList?: LoanRequest[]
}

export default function UpcomingOrHistorySection({ upComing = true, searching = false, initList = [] }: iUp) {
    const [page, setPage] = useState(1)
    const [requests, setRequests] = useState<LoanRequest[]>([])
    const { levels } = useContext(StateContext)

    //serach result
    useEffect(() => {
        if (levels.length > 0 && searching == true) {
            setRequests([...initList])
        }
    }, [initList])

    // init
    useEffect(() => {
        if (levels.length > 0 && searching == false) {
            initLoadData(setPage, populateData,
                where("loanStatus", 'in', upComing ? [STATUS.approved] : [STATUS.paid, STATUS.defaulted, STATUS.approved, STATUS.rejected])
            )
        }
    }, [levels])

    const populateData = async (data: QuerySnapshot<LoanRequest>) => {
        URHpopulateData(data, levels, setRequests);
    }

    const next = () => {
        paginateNext(setPage, populateData, requests, where("loanStatus", 'in', upComing ? [STATUS.approved] : [STATUS.paid, STATUS.defaulted, STATUS.approved, STATUS.rejected]))
    }

    const prev = () => {
        paginatePrev(setPage, populateData, requests, where("loanStatus", 'in', upComing ? [STATUS.approved] : [STATUS.paid, STATUS.defaulted, STATUS.approved, STATUS.rejected]))
    }

    return <>
        {!searching && <div className="my-4">
            <Title text={upComing ? "Upcoming" : "History"} isSubtitle />
        </div>}

        <Spacing />
        <Table
            header="Status,Due Date,Loan Date,First Name,Last Name,Level,Term,Amount,Interest,Total,Options"
            items={[
                ...requests.map((item, i) => {
                    let state = ""
                    if (upComing) {
                        state = Helper.upperCase(item?.loanStatus) + ` & ${isPast(addDays(parseISO(item?.loanDate), parseInt(item.paymentTime))) ? "OverDue" : "Due"}`
                    } else {
                        state = Helper.upperCase(item?.loanStatus)
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
                            defaultValue={(item?.loanStatus == STATUS.paid.toString() || STATUS.defaulted.toString() ? item?.loanStatus : undefined)}
                            options={[
                                { title: "Paid", value: STATUS.paid },
                                { title: "Defaulted", value: STATUS.defaulted },
                            ]}
                            hideLabel
                            full_width={true}
                            onChange={(value) => {
                                //console.log(value);
                                onUpdateStatus(item, value as any)
                            }}
                        />
                    }
                })
            ]}
            hideOption={true}
        />
        <Spacing />
        {
            !searching && <FbPaginate page={page} setPage={setPage} current_length={requests.length} next={next} prev={prev} />
        }
    </>
}
