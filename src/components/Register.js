import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiCall } from '../helpers/api'
import { backendUrl } from '../utils/constants'
import { toast } from 'react-toastify';
const Register = () => {

    const [userInfo, setuserInfo] = useState({});
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    async function submitHandler(e) {
        e.preventDefault();
        setError(null);
        try {
            const resData = await apiCall(backendUrl + '/users/register', {
                method: 'post',
                data: userInfo,
            });
            setResponse(resData);
            toast.success('Registration successfully!');
            setuserInfo({})
        } catch (error) {
            setError(error);
        }

    }

    return (
        <div >
            <section className="signin-area signin-one">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <form action="#" onSubmit={submitHandler}>
                                <div className="signin-form form-style-two rounded-buttons">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>Your account will be under this email</label>
                                                <div className="input-items default">
                                                    <input type="text" placeholder="Email" name='email'
                                                        onChange={(e) => { setuserInfo({ ...userInfo, email: e.target.value }) }}
                                                        value={userInfo.email ? userInfo.email : ''} />
                                                    <i className="lni lni-envelope"></i>
                                                </div>
                                                <label className='invalid-feedback nameError'>{error?.email ? error.email : ''}</label>
                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>
                                                    Name will be used to personalize your experience
                                                </label>
                                                <div className="input-items default">
                                                    <input type="text"
                                                        placeholder="Name" name='name'
                                                        onChange={(e) => { setuserInfo({ ...userInfo, name: e.target.value }) }}
                                                        value={userInfo.name ? userInfo.name : ''} />
                                                    <i className="lni lni-user"></i>
                                                </div>
                                                <label className='invalid-feedback nameError'>{error?.name ? error.name : ''}</label>
                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>Password for your account</label>
                                                <div className="input-items default">
                                                    <input type="password" placeholder="Password" name='password' onChange={(e) => { setuserInfo({ ...userInfo, password: e.target.value }) }} value={userInfo.password ? userInfo.password : ''} />
                                                    <i className="lni lni-key"></i>
                                                </div>
                                                <label className='invalid-feedback nameError'>{error?.password ? error.password : ''}</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input rounded-buttons">
                                                <button
                                                    className="btn btn-round primary-btn"
                                                    type="submit"
                                                >
                                                    Sign Up!
                                                </button>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input rounded-buttons">
                                                <Link to='/login'
                                                    className="btn btn-round primary-btn-outline"
                                                    type="submit"
                                                >
                                                    Sign In
                                                </Link>
                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input text-center">
                                                <p className="text">
                                                    By signing in you agree with the
                                                    <a href="javascript:void(0)">Terms and Conditions</a>
                                                    and
                                                    <a href="javascript:void(0)">Privacy</a>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default Register