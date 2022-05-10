import { documentId, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Define from '../../../utils/Define'
import { Collections } from '../../../utils/firebase/Collections'
import { createCollection, createDoc } from '../../../utils/firebase/config'
import Helper from '../../../utils/Helper'
import { iUser, User, UserDoc } from '../../../utils/interface/Models'
import Main from '../../layout/dashboard/Main'
import AccountInfo from './AccountInfo'
import AccountList from './AccountList'


export interface iUserInfo {
    id: string,
    firstName?: string,
    lastName?: string,
    dob?: string,
    address?: string,
    mobileNumber?: string,
    gender?: string,
    doc: UserDoc
}

// Page
export default function Accounts() {
    const [info, setInfo] = useState<iUserInfo>({} as iUserInfo)

    const [pendingList, setPendingList] = useState<iUserInfo[]>([])
    const [approvedList, setApprovedList] = useState<unknown[]>([])
    const [last, setLast] = useState("")

    useEffect(() => {
        const load = async () => {
            const docColRef = createCollection<UserDoc>(Collections.USER_DOC)
            const q1 = query(docColRef, where("bankStatement.status", "==", "pending"))
            const q2 = query(docColRef, where("idCard.status", "==", "pending"))
            const q3 = query(docColRef, where("proofOfAddress.status", "==", "pending"))

            const q4 = query(docColRef,
                where("bankStatement.status", "==", "approved"),
                where("idCard.status", "==", "approved"),
                where("proofOfAddress.status", "==", "approved"),
                orderBy(documentId()),
                limit(Define.PAGE_SIZE)
            )

            const [d1, d2, d3, d4] = await Promise.all([getDocs(q1), getDocs(q2), getDocs(q3), getDocs(q4)])
            const pendingDuplist = [] as iUserInfo[]

            let approvedUserId = new Set()

            if (!d1.empty) {
                d1.docs.forEach(item => {
                    pendingDuplist.push({
                        id: item.id,
                        doc: item.data()
                    })
                })
            }
            if (!d2.empty) {
                d2.docs.forEach(item => {
                    pendingDuplist.push({
                        id: item.id,
                        doc: item.data()
                    })
                })
            }
            if (!d3.empty) {
                d3.docs.forEach(item => {
                    pendingDuplist.push({
                        id: item.id,
                        doc: item.data()
                    })
                })
            }
            // filter duplicate pending doc list without name
            const pendingUserlist: iUserInfo[] = Helper.uniqueArray(pendingDuplist as any[], "id")

            // load first name and last name
            const pendingUserlistWithFL = await Promise.all(pendingUserlist.map(async itm => {
                const userData = await getDoc<User>(createDoc(Collections.USER, itm.id))
                return {
                    ...itm,
                    firstName: userData.data()?.firstName,
                    lastName: userData.data()?.lastName,
                    address: userData.data()?.address,
                    dob: userData.data()?.dob,
                    mobileNumber: userData.data()?.mobileNumber,
                    gender: userData.data()?.gender,
                } as iUserInfo
            }))

            //console.log("pendingUserlistWithFL=", JSON.stringify(await Promise.all(pendingUserlistWithFL)));

            setPendingList(pendingUserlistWithFL)
            //===========================================================================================
            // done
            //===========================================================================================
            if (!d4.empty) {
                d4.docs.forEach(item => {
                    approvedUserId.add(item.id)
                })
                const approved = [...approvedUserId]
                //setApprovedList(approved)
                if (approved.length === Define.PAGE_SIZE) {
                    setLast(approved.pop() as string || "")
                }
            }
        }
        load()
    }, [])


    const loadNext = async () => {
        if (last === "") {
            toast("No Next Page Available")
            return;
        }
        const docColRef = createCollection<UserDoc>(Collections.USER_DOC)

        const q = query(docColRef,
            where("bankStatement.status", "==", "approved"),
            where("idCard.status", "==", "approved"),
            where("proofOfAddress.status", "==", "approved"),
            orderBy(documentId()),
            startAfter(last),
            limit(Define.PAGE_SIZE)
        )
        const userData = await getDocs(q)
        if (!userData.empty) {
            if (userData.docs.length === Define.PAGE_SIZE) {
                setLast(userData.docs.map(item => item.id).pop() as string || "")
            }
            console.log("next page: ", userData.docs.map(item => item.id));
        } else {
            console.log("no next");
        }
    }

    return (
        <Main title='Accounts'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='col-span-1'>
                    <AccountList pendingList={pendingList} reviewedList={[]} setInfo={setInfo} />
                    <button onClick={() => {
                        loadNext()
                    }}>view more</button>
                </div>
                <div className='col-span-1'>
                    <AccountInfo info={info} setInfo={setInfo} />
                </div>
            </div>
        </Main>
    )
}
