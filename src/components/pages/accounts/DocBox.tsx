import React from 'react'
import Button from '../../layout/form/Button'
import { UserDoc } from '../../../utils/interface/Models'
import { updateDoc } from 'firebase/firestore'
import { Collections } from '../../../utils/firebase/Collections'
import { createDoc } from '../../../utils/firebase/config'

interface iDocBox {
    id: string
    status: string
    url: string
    infoKey: string
}
export default function DocBox({ id, status, url, infoKey }: iDocBox) {

    const onUpdateStatus = async (_status: "pending" | "approved") => {
        //send to upcoming..
        const yes = confirm("Are you sure you want to change the status to " + _status + "?")
        if (yes === true) {
            console.log(Collections.USER_DOC, id);

            const docRef = createDoc<UserDoc>(Collections.USER_DOC, id)
            await updateDoc(docRef, { [`${infoKey}.status`]: _status.toString() })
            window.location.reload()
        }
    }

    return (
        <div className='flex gap-8 justify-start items-center mb-8'>
            <div className='p-2 bg-gray-200 rounded-md'>
                <img src={url} alt="" width={120} height={120} className='object-cover rounded-md' />
            </div>
            <div className='flex flex-col gap-2'>
                <Button onClick={() => { onUpdateStatus("approved") }}>Approve</Button>
                <Button seconday onClick={() => { onUpdateStatus("pending") }}>Reject</Button>
                <p className='text-sm text-gray-700'><b>Status</b>: {status}</p>
            </div>
        </div>
    )
}
