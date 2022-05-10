import { Timestamp } from 'firebase/firestore';
export interface iUser {
    email: string,
    password: string
}
// laod request
export class LoanRequest {
    id: string
    loanDate: string
    userId: string
    firstName: string//user col
    lastName: string//user col
    level: string //level col
    interest: string//level col
    paymentTime: string // term in day(7 days)
    loanAmount: string //loanAmount
    totalRepayable: string //total

    loanStatus: string

    constructor(obj: Partial<LoanRequest>) {
        this.id = obj.id!
        this.loanDate = obj.loanDate!
        this.userId = obj.userId!
        this.firstName = obj.firstName!
        this.lastName = obj.lastName!
        this.level = obj.level!
        this.paymentTime = obj.paymentTime!
        this.loanAmount = obj.loanAmount!
        this.interest = obj.interest!
        this.totalRepayable = obj.totalRepayable!

        this.loanStatus = obj.loanStatus!
    }
}

// user
export interface User {
    id: string
    firstName: string
    lastName: string
    dob: string,
    address: string,
    mobileNumber: string,
    gender?: string,
}

export interface UserDoc {
    id: string //user id
    bankStatement: {
        status: string
        url: string
    }
    idCard: {
        status: string
        url: string
    }
    proofOfAddress: {
        status: string
        url: string
    }
}

// level
export interface Level {
    id: string
    name: string
    interest: number
    min: number
    max: number
}

// status

export enum STATUS {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    paid = "paid",
    defaulted = "defaulted",
}