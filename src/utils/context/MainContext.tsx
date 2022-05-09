import axios from 'axios'
import React, { createContext, FC, useState } from 'react'
import { iUser } from '../interface/Models'

interface iState {
    user?: iUser | null
    setUser: React.Dispatch<React.SetStateAction<iUser | undefined | null>>
}

export const StateContext = createContext<iState>({} as iState)


const MainContext: FC = (props) => {
    const [user, setUser] = useState<iUser | undefined | null>(undefined) //undefined means loading | null means not logged in

    const global_state: iState = {
        user, setUser
    }

    return (
        <StateContext.Provider value={global_state}>
            {props.children}
        </StateContext.Provider>
    )
}

export default MainContext
