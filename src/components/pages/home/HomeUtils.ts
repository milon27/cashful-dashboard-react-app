import { query, where, orderBy, limit, getDocs, QuerySnapshot, WhereFilterOp, startAfter, endBefore, limitToLast, QueryConstraint, updateDoc, getDoc, doc } from "firebase/firestore"
import React from "react"
import { toast } from "react-toastify"
import Define from "../../../utils/Define"
import { Collections } from "../../../utils/firebase/Collections"
import { createCollection, createDoc } from "../../../utils/firebase/config"
import { Level, LoanRequest, STATUS, User } from "../../../utils/interface/Models"

export const initLoadData = async (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    populateData: (data: QuerySnapshot<LoanRequest>) => Promise<void>,
    ...queryConstraints: QueryConstraint[]
) => {
    const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
    const lrQuery = query<LoanRequest>(lrColRef, ...queryConstraints, orderBy("loanDate", "desc"), limit(Define.PAGE_SIZE))
    const data = await getDocs<LoanRequest>(lrQuery)
    //console.log("------", data.docs);
    if (!data.empty) {
        setPage(1)
        populateData(data)
    } else {
        toast("No More Data Available!")
    }
}

//return string [] of user id
export const searchUser = async (search: string): Promise<string[]> => {
    //get other info
    const userColRef = createCollection<User>(Collections.USER)
    const usersData = await getDocs(query<User>(userColRef, where("firstName", "==", search)))
    if (!usersData.empty) {
        return usersData.docs.map(item => item.id)
    } else {
        return []
    }
}

export const searchData = async (
    populateData: (data: QuerySnapshot<LoanRequest>) => Promise<void>,
    ...queryConstraints: QueryConstraint[]
) => {
    const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
    const lrQuery = query<LoanRequest>(lrColRef, ...queryConstraints)
    const data = await getDocs<LoanRequest>(lrQuery)
    //console.log("------", data.docs);
    populateData(data)
}


export const paginateNext = async (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    populateData: (data: QuerySnapshot<LoanRequest>) => Promise<void>,
    requests: LoanRequest[],
    ...queryConstraints: QueryConstraint[]
) => {
    const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
    const lrQuery = query<LoanRequest>(lrColRef, ...queryConstraints, orderBy("loanDate", "desc"), startAfter(requests[requests.length - 1].loanDate), limit(Define.PAGE_SIZE))
    const data = await getDocs<LoanRequest>(lrQuery)
    if (!data.empty) {
        setPage(page => page + 1)
        populateData(data)
    } else {
        toast("No More Data Available!")
    }
}
//prev
export const paginatePrev = async (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    populateData: (data: QuerySnapshot<LoanRequest>) => Promise<void>,
    requests: LoanRequest[],
    ...queryConstraints: QueryConstraint[]
) => {
    const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
    const lrQuery = query<LoanRequest>(lrColRef, ...queryConstraints, orderBy("loanDate", "desc"), endBefore(requests[0].loanDate), limitToLast(Define.PAGE_SIZE))
    const data = await getDocs<LoanRequest>(lrQuery)
    if (!data.empty) {
        setPage(page => page - 1)
        populateData(data)
    } else {
        toast("No More Data Available!")
    }
}

// populate date

export const URHpopulateData = async (
    data: QuerySnapshot<LoanRequest>,
    levels: Level[],
    setRequests: React.Dispatch<React.SetStateAction<LoanRequest[]>>
) => {
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


// change status

export const onUpdateStatus = async (item: LoanRequest, status: STATUS) => {
    //send to upcoming..
    const yes = confirm("Are you sure you want to change the status to " + status + "?")
    if (yes === true) {
        const lrDocRef = createDoc<LoanRequest>(Collections.LOAN_REQUEST, item.id)
        await updateDoc(lrDocRef, { "loanStatus": status.toString() })
        window.location.reload()
    }
}