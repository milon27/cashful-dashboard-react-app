import React, { useState } from 'react'
import MyCard from '../../layout/common/MyCard'
import MyPagination from '../../layout/common/Pagination'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'

export default function AccountList() {
    const [page, setPage] = useState(1)
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
                    header="First Name,Last Name,Account Status"
                    items={[
                        {
                            fname: "Moses",
                            lname: "Kenwood",
                            status: "Pending"
                        }
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
                    header="First Name,Last Name,Account Status"
                    items={[
                        {
                            fname: "Moses",
                            lname: "Kenwood",
                            status: "Verified"
                        }
                    ]}
                    hideOption={true}
                />
                <Spacing />
                <MyPagination page={page} setPage={setPage} current_length={2} />
            </div>
        </MyCard>
    )
}
