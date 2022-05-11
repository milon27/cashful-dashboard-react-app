import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom";
import URL from './../../../utils/URL';
import { StateContext } from './../../../utils/context/MainContext';
import { TypeOnChange } from "../../../utils/interface/CommonInterface";
import logo from '../../../assets/img/logo.png'
import Input from "../../layout/form/Input";
import Button from "../../layout/form/Button";
import { useForm } from 'react-hook-form'
import { iUser } from "../../../utils/interface/Models";
import Define from "../../../utils/Define";
import { toast } from "react-toastify";

const Login = () => {
    const { user: cUser, setUser } = useContext(StateContext)
    const { register, handleSubmit } = useForm<iUser>({
        defaultValues: {
            email: "demo@gmail.com",
            password: "1234567"
        }
    })
    const login = (data: iUser) => {
        if (data.email !== "demo@gmail.com") {
            toast("Wrong password")
            return;
        }
        if (data.password !== "1234567") {
            toast("Wrong password")
            return;
        }
        localStorage.setItem(Define.AUTH_KEY, JSON.stringify(data))
        setUser(data)
    }

    //console.log("cUser", cUser);
    if (cUser?.email) {
        console.log("navigate to home page.....")
        return <Navigate to={URL.HOME} replace={true}></Navigate>
    }

    return (
        <>
            <div className="container m-auto w-11/12 md:w-1/4 h-screen grid grid-cols-1 place-content-center">
                <div className="w-full flex justify-center">
                    <img src={logo} className="w-12 h-12" alt="" />
                </div>

                <form>
                    <Input name="email" type="email" title="Email" register={register("email")} />

                    <Input name="password" type="password" title="Password" register={register("password")} />

                    <Button fullWidth disabled={false} onClick={() => {
                        handleSubmit(login)()
                    }}>Sign In</Button>
                </form>
            </div >
        </>
    )
}

export default Login
