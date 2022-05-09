import React from 'react'
import MyCard from '../../layout/common/MyCard'
import Button from '../../layout/form/Button'
import Spacing from '../../layout/form/Spacing'
import Title from '../../layout/form/Title'
import DocBox from './DocBox'
import UserBasicInfo from './UserBasicInfo'

export default function AccountInfo() {
    return (
        <MyCard>
            <Title text='Account Information' />
            <Spacing />
            <UserBasicInfo title1='First Name' value1='Anna' title2='Last Name' value2='Moore' />
            <UserBasicInfo title1='Date of Birth' value1='12 March 1994' title2='Gender' value2='Male' />
            <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
            <Spacing />
            <Button fullWidth onClick={() => { }}>View Account Information</Button>
            <Spacing />
            <Title text='User documents' />
            <Spacing />
            <DocBox />
            <DocBox />
            <DocBox />
        </MyCard>
    )
}
