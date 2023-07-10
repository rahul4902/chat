import React, {
    useState
} from 'react'
import {
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom'
import {
    apiCall
} from '../helpers/api';
import {
    backendUrl
} from '../utils/constants';
import {
    toast
} from 'react-toastify';
import {
    isLogin
} from '../utils/auth';

const Login = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    async function submitHandler(e) {
        e.preventDefault()
        setError(null);
        try {
            const resData = await apiCall(backendUrl + '/users/login', {
                method: 'post',
                data: formData,
            });
            if (resData) {
                localStorage.setItem('userInfo', JSON.stringify(resData.data));
                localStorage.setItem('_token', JSON.stringify(resData.data._token));
                toast.success('Login successfully!');
                navigate('/');
            }
        } catch (error) {
            setError(error);
        }
    }
    return ( <
        div >
        <
        section className = "signin-area signin-one" >
        <
        div className = "container" >
        <
        div className = "row justify-content-center" >
        <
        div className = "col-lg-5" >
        <
        form action = "#"
        onSubmit = {
            submitHandler
        } >
        <
        div className = "signin-form form-style-two rounded-buttons" >
        <
        div className = "row" >
        <
        div className = "col-md-12" >
        <
        div className = "form-input" >
        <
        label > Your account will be under this email < /label> <
        div className = "input-items default" >
        <
        input type = "text"
        placeholder = "Email"
        onChange = {
            (e) => {
                setFormData({
                    ...formData,
                    email: e.target.value
                })
            }
        }
        /> <
        i className = "lni lni-envelope" > < /i> <
        /div> <
        label className = 'invalid-feedback nameError' > {
            error?.email ? error.email : ''
        } < /label> <
        /div>

        <
        /div> <
        div className = "col-md-12" >
        <
        div className = "form-input" >
        <
        label > Password
        for your account < /label> <
        div className = "input-items default" >
        <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => {
                setFormData({
                    ...formData,
                    password: e.target.value
                })
            }
        }
        /> <
        i className = "lni lni-key" > < /i> <
        /div> <
        label className = 'invalid-feedback nameError' > {
            error?.password ? error.password : ''
        } < /label> <
        /div> <
        /div> <
        div className = "col-md-6" >
        <
        div className = "form-input rounded-buttons" >
        <
        button className = "btn btn-round primary-btn"
        type = "submit" >
        Sign In!
        <
        /button> <
        /div>

        <
        /div> <
        div className = "col-md-6" >
        <
        div className = "form-input rounded-buttons" >
        <
        Link to = "/register"
        className = "btn btn-round primary-btn-outline"
        type = "submit" >
        Sign Up <
        /Link> <
        /div>

        <
        /div> <
        div className = "col-md-12" >
        <
        div className = "form-input text-center" >
        <
        p className = "text" >
        By signing in you agree with the <
        a href = "javascript:void(0)" > Terms and Conditions < /a>
        and <
        a href = "javascript:void(0)" > Privacy < /a> <
        /p> <
        /div>

        <
        /div> <
        /div> <
        /div>

        <
        /form> <
        /div> <
        /div>

        <
        /div>

        <
        /section> <
        /div>
    )
}

export default Login