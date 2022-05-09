import React from 'react'
import Button from '../../layout/form/Button'

export default function DocBox() {
    return (
        <div className='flex gap-8 justify-start items-center mb-8'>
            <div className='p-2 bg-gray-200 rounded-md'>
                <img src="" alt="" width={120} height={120} className='object-cover rounded-md' />
            </div>
            <div className='flex flex-col gap-2'>
                <Button onClick={() => { }}>Approve</Button>
                <Button seconday onClick={() => { }}>Reject</Button>
                <p className='text-sm text-gray-700'><b>Status</b>: Approved</p>
            </div>
        </div>
    )
}
