import { query, where, orderBy, limit, getDocs, QuerySnapshot, WhereFilterOp, startAfter, endBefore, limitToLast, QueryConstraint } from "firebase/firestore"
import Define from "../../../utils/Define"
import { Collections } from "../../../utils/firebase/Collections"
import { createCollection } from "../../../utils/firebase/config"
import { LoanRequest } from "../../../utils/interface/Models"

export const initLoadData = async (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    populateData: (data: QuerySnapshot<LoanRequest>) => Promise<void>,
    ...queryConstraints: QueryConstraint[]
) => {
    const lrColRef = createCollection<LoanRequest>(Collections.LOAN_REQUEST)
    const lrQuery = query<LoanRequest>(lrColRef, ...queryConstraints, orderBy("loanDate", "desc"), limit(Define.PAGE_SIZE))
    const data = await getDocs<LoanRequest>(lrQuery)
    //console.log("------", data.docs);
    setPage(1)
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
    setPage(page => page + 1)
    populateData(data)

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
    setPage(page => page - 1)
    populateData(data)
}