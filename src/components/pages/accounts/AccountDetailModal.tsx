import React from 'react'
import { Modal, Button } from '@milon27/react-modal'
import Title from '../../layout/form/Title'
import UserBasicInfo from './UserBasicInfo'
import { useNavigate } from 'react-router-dom'
import URL from '../../../utils/URL'

interface iModal {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AccountDetailModal({ show, setShow }: iModal) {
    const nav = useNavigate()


    

    return (
        <Modal
            title='Account Information'
            show={show}
            setShow={setShow}
            footer={<>
                <Button title='Close' onClick={() => { setShow(false) }} />
            </>}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='col-span-1 border rounded-md p-4'>
                    <div className='flex justify-between items-center gap-2'>
                        <Title isSubtitle text='Background information' />
                        <Button title='Edit' onClick={() => {
                            nav(`${URL.BACKGROUND}/milon27`)
                        }} />
                    </div>
                    <UserBasicInfo title1='First Name' value1='Anna' title2='Last Name' value2='Moore' />
                    <UserBasicInfo title1='Date of Birth' value1='12 March 1994' title2='Gender' value2='Male' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                    <UserBasicInfo title1='Mobile Number' value1='0607069800' title2='Address' value2='58 Arndt Street, Bloemfontein' />
                </div>
                <div className='col-span-1 border rounded-md p-4'>
                    <div className='flex justify-between items-center gap-2'>
                        <Title isSubtitle text='MTN/Bank Account Details' />
                        <Button title='Edit' onClick={() => {
                            nav(`${URL.BANK}/milon27`)
                            // nav(`${URL.MTN}/milon27`)
                        }} />
                    </div>
                    <UserBasicInfo title1='First Name' value1='Anna' title2='Last Name' value2='Moore' />
                </div>
            </div>
        </Modal>
    )
}
