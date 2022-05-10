import React, { useEffect, useState } from 'react'
import MyCard from '../../layout/common/MyCard'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'
import { iUserInfo } from './Accounts'

interface iAccountList {
    pendingList: iUserInfo[]
    reviewedList: iUserInfo[]
    setInfo: React.Dispatch<React.SetStateAction<iUserInfo>>
}

export default function AccountList({ pendingList = [], setInfo, reviewedList = [] }: iAccountList) {

    return (
        <MyCard>
            <div className='flex flex-col md:flex-row gap-2 justify-between items-center'>
                <Title text='Overview' />
                <input type="text" className='px-5 py-1 border border-gray-400 rounded-full' placeholder='Search Users' />
            </div>
            <Spacing />
            <Spacing />
            <Spacing />
            <div>
                <Title text='Pending Review' isSubtitle />
                <Spacing />
                <Table
                    noShadow={true}
                    header="First Name,Last Name,Account Status,View"
                    items={[
                        ...pendingList.map(item => {
                            return {
                                fname: item.firstName + "",
                                lname: item.lastName,
                                status: "pending",
                                btn: <><button onClick={() => {
                                    setInfo(item)
                                }}>View</button></>
                            }
                        })
                    ]}
                    hideOption={true}
                />
            </div>
            <Spacing />
            <Spacing />
            <div>
                <Title text='Reviewed' isSubtitle />
                <Spacing />
                <Table
                    noShadow={true}
                    header="First Name,Last Name,Account Status,View"
                    items={[
                        ...reviewedList.map(item => {
                            return {
                                fname: item.firstName + "",
                                lname: item.lastName,
                                status: "reviewd",
                                btn: <><button onClick={() => {
                                    setInfo(item)
                                }}>View</button></>
                            }
                        })
                    ]}
                    hideOption={true}
                />
                <Spacing />
            </div>
        </MyCard>
    )
}
