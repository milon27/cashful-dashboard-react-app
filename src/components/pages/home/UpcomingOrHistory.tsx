import React, { useState } from 'react'
import Define from '../../../utils/Define'
import MyPagination from '../../layout/common/Pagination'
import MySelect from '../../layout/form/MySelect'
import Spacing from '../../layout/form/Spacing'
import Table from '../../layout/form/Table'
import Title from '../../layout/form/Title'

export default function UpcomingOrHistorySection({ title }: { title: string }) {
    const [page, setPage] = useState(1)
    return (
        <div className='my-4'>
            <Title text={title} isSubtitle />
            <Spacing />
            <Table
                header="Status,Due Date,Loan Date,First Name,Last Name,Level,Term,Amount,Interest,Total,Options"
                items={[
                    {
                        status: "Due",
                        duedate: "4 Apr 2022",
                        date: "4 Apr 2022",
                        fname: "Moses",
                        lname: "Kenwood",
                        level: "level 1",
                        term: "31 days",
                        amount: Define.CURRENCY + "400",
                        interest: "20%",
                        total: Define.CURRENCY + "480",
                        option: <MySelect
                            label='Update'
                            labelAsFirst
                            name=''
                            options={[
                                { title: "Paid", value: "paid" },
                                { title: "Defaulted", value: "defaulted" },
                            ]}
                            hideLabel
                            full_width={true}
                            onChange={(e) => {
                                console.log(e.target);
                            }}
                        />
                    }, {
                        status: "OverDue",
                        duedate: "4 Apr 2022",
                        date: "4 Apr 2022",
                        fname: "Moses",
                        lname: "Kenwood",
                        level: "level 1",
                        term: "31 days",
                        amount: Define.CURRENCY + "400",
                        interest: "20%",
                        total: Define.CURRENCY + "480",
                        option: <MySelect
                            label='Update'
                            labelAsFirst
                            name=''
                            options={[
                                { title: "Paid", value: "paid" },
                                { title: "Defaulted", value: "defaulted" },
                            ]}
                            hideLabel
                            onChange={(e) => {
                                console.log(e.target);
                            }}
                        />
                    }
                ]}
                hideOption={true}
            />
            <Spacing />
            <MyPagination page={page} setPage={setPage} current_length={2} />
        </div>
    )
}
