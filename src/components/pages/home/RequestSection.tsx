import React, { useState } from 'react'
import Define from '../../../utils/Define'
import MyPagination from '../../layout/common/Pagination'
import Button from '../../layout/form/Button'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'

export default function RequestSection() {
    const [page, setPage] = useState(1)
    return (
        <div className='my-4'>
            <Title text='Requests' isSubtitle />
            <Spacing />
            <Table
                header="Date,First Name,Last Name,Level,Term,Amount,Interest,Total,Options"
                items={[
                    {
                        date: "4 Apr 2022",
                        fname: "Moses",
                        lname: "Kenwood",
                        level: "level 1",
                        term: "31 days",
                        amount: Define.CURRENCY + "400",
                        interest: "20%",
                        total: Define.CURRENCY + "480",
                        option: <div className='flex gap-2'>
                            <Button onClick={() => { }}>Approve</Button>
                            <Button seconday onClick={() => { }}>Reject</Button>
                        </div>
                    }, {
                        date: "4 Apr 2022",
                        fname: "Moses",
                        lname: "Kenwood",
                        level: "level 1",
                        term: "31 days",
                        amount: Define.CURRENCY + "400",
                        interest: "20%",
                        total: Define.CURRENCY + "480",
                        option: <div className='flex gap-2'>
                            <Button onClick={() => { }}>Approve</Button>
                            <Button seconday onClick={() => { }}>Reject</Button>
                        </div>
                    }
                ]}
                hideOption={true}
            />
            <Spacing />
            <MyPagination page={page} setPage={setPage} current_length={2} />
        </div>
    )
}
