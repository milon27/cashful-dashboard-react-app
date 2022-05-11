import React, { useState } from 'react'
import MyCard from '../../layout/common/MyCard'
import Button from '../../layout/form/Button'
import Spacing from '../../layout/form/Spacing'
import Title from '../../layout/form/Title'
import AccountDetailModal from './AccountDetailModal'
import { iUserInfo } from './Accounts'
import DocBox from './DocBox'
import UserBasicInfo from './UserBasicInfo'

interface iAccountInfo {
    info: iUserInfo
    setInfo: React.Dispatch<React.SetStateAction<iUserInfo>>
}
export default function AccountInfo({ info, setInfo }: iAccountInfo) {
    const [show, setShow] = useState(false)
    //const [_id, setId] = useState("")
    if (info.firstName == undefined) {
        return <></>
    }

    return (
        <MyCard>
            <Title text='Account Information' />
            <Spacing />
            <UserBasicInfo title1='First Name' value1={info.firstName || "-"} title2='Last Name' value2={info.lastName || "-"} />
            <UserBasicInfo title1='Date of Birth' value1={info.dob || "-"} title2='Gender' value2={info.gender || "-"} />
            <UserBasicInfo title1='Mobile Number' value1={info.mobileNumber || "-"} title2='Address' value2={info.address || "-"} />
            <Spacing />
            <Button fullWidth onClick={() => {
                setShow(true)
                //setId(info.id)
            }}>View Account Information</Button>
            <AccountDetailModal info={info} show={show} setShow={setShow} />
            <Spacing />
            <Title text='User documents' />
            <Spacing />
            <DocBox id={info.id} url={info.doc.bankStatement.url} status={info.doc.bankStatement.status} infoKey="bankStatement" />
            <DocBox id={info.id} url={info.doc.idCard.url} status={info.doc.idCard.status} infoKey="idCard" />
            <DocBox id={info.id} url={info.doc.proofOfAddress.url} status={info.doc.proofOfAddress.status} infoKey="proofOfAddress" />
        </MyCard>
    )
}
