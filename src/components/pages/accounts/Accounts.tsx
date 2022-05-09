import React, { useState } from 'react'
import Main from '../../layout/dashboard/Main'
import AccountInfo from './AccountInfo'
import AccountList from './AccountList'

// Page
export default function Accounts() {
    return (
        <Main title='Accounts'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='col-span-1'>
                    <AccountList />
                </div>
                <div className='col-span-1'>
                    <AccountInfo />
                </div>
            </div>
        </Main>
    )
}
