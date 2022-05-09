import React from 'react'
import { useParams } from 'react-router-dom';
import Main from '../../layout/dashboard/Main';

export default function EditBackground() {
    let { id } = useParams();
    return (
        <Main>EditBackground {id}</Main>
    )
}
