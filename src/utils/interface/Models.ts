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
    }
}

// user
export interface User {
    id: string
    firstName: string
    lastName: string
}

// level
export interface Level {
    id: string
    name: string
    interest: number
    min: number
    max: number
}