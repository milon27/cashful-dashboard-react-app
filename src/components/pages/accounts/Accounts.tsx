import { documentId, getDoc, getDocs, limit, orderBy, query, QuerySnapshot, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Define from '../../../utils/Define'
import { Collections } from '../../../utils/firebase/Collections'
import { createCollection, createDoc } from '../../../utils/firebase/config'
import Helper from '../../../utils/Helper'
import { User, UserDoc } from '../../../utils/interface/Models'
import Main from '../../layout/dashboard/Main'
import Button from '../../layout/form/Button'
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
    const [approvedList, setApprovedList] = useState<iUserInfo[]>([])
    const [lastID, setLastID] = useState<string | undefined>(undefined)

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
            setPendingList(await getPendingUserList(d1, d2, d3));
            const [mylast, approveList] = await getApprovedList(d4);
            if (approveList) {
                setApprovedList(approveList as iUserInfo[])
            } else {
                toast("No Next Page Available")
            }
            if (mylast !== undefined) {
                setLastID(mylast as string)
            } else {
                setLastID(undefined)
            }
        }
        load()
    }, [])


    const loadNext = async () => {
        if (lastID == undefined) {
            toast("No Next Page Available")
            return;
        }
        const docColRef = createCollection<UserDoc>(Collections.USER_DOC)

        const q = query(docColRef,
            where("bankStatement.status", "==", "approved"),
            where("idCard.status", "==", "approved"),
            where("proofOfAddress.status", "==", "approved"),
            orderBy(documentId()),
            startAfter(lastID),
            limit(Define.PAGE_SIZE)
        )
        const approveUserData: QuerySnapshot<UserDoc> = await getDocs<UserDoc>(q)

        const [mylast, approveList] = await getApprovedList(approveUserData)
        setLastID(mylast as string)
        if (approveList) {
            setApprovedList(approveList as iUserInfo[])
        } else {
            toast("No Next Page Available")
        }
        if (mylast !== undefined) {
            setLastID(mylast as string)
        } else {
            setLastID(undefined)
        }
    }
    console.log("---", lastID);


    return (
        <Main title='Accounts'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='col-span-1'>
                    <AccountList pendingList={pendingList} reviewedList={approvedList} setInfo={setInfo} />
                    {lastID !== undefined && <div className='my-4 flex justify-center'>
                        <Button onClick={() => {
                            loadNext()
                        }}>view more</Button>
                    </div>}
                </div>
                <div className='col-span-1'>
                    <AccountInfo info={info} setInfo={setInfo} />
                </div>
            </div>
        </Main>
    )
}



const getPendingUserList = async (
    d1: QuerySnapshot<UserDoc>,
    d2: QuerySnapshot<UserDoc>,
    d3: QuerySnapshot<UserDoc>
): Promise<iUserInfo[]> => {
    const pendingDuplist = [] as iUserInfo[]

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
    return await getUserData(pendingDuplist);
}


const getApprovedList = async (d4: QuerySnapshot<UserDoc>): Promise<(string | iUserInfo[] | undefined)[]> => {
    const appDuplist = [] as iUserInfo[]
    if (!d4.empty) {
        d4.docs.forEach(item => {
            appDuplist.push({
                id: item.id,
                doc: item.data()
            })
        })
        let lastID = undefined;
        if (appDuplist.length === Define.PAGE_SIZE) {
            lastID = appDuplist[appDuplist.length - 1]?.id;
        }
        const userDataList = await getUserData(appDuplist, false)

        return [lastID, userDataList]
    } else {
        return [undefined, undefined]
    }
}

const getUserData = async (pendingDuplist: iUserInfo[] = [], needUniq = true) => {
    // filter duplicate pending doc list without name
    const pendingUserlist: iUserInfo[] = needUniq ? Helper.uniqueArray(pendingDuplist as any[], "id") : pendingDuplist

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
    return pendingUserlistWithFL
}