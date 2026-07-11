import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, SetState] = useState('Login');
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const [image, SetImage] = useState(false);


    const [istextdatasubmitted, SetIsTextDataSubmitted] = useState(false);

    const { SetShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state === "Sign Up" && !istextdatasubmitted) {
           return SetIsTextDataSubmitted(true);
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    SetShowRecruiterLogin(false)
                    navigate('/dashboard')

                } else {
                    toast.error(data.message)
                }

            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    SetShowRecruiterLogin(false)
                    navigate('/dashboard')

                } else {
                    toast.error(data.message)
                }
            }


        } catch (errror) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])


    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-xl text-neutral-700 font-medium'>Recruiter {state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>
                {state === 'Sign Up' && istextdatasubmitted
                    ? <>
                        <div className='flex items-center gap-4 my-4'>
                            <label htmlFor='image'>
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area}></img>
                                <input onChange={e => SetImage(e.target.files[0])} type='file' id='image' hidden />
                            </label>
                            <p>upload Company <br /> logo</p>
                        </div>
                    </>
                    : <>
                        {state != 'Login' && (
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} />
                                <input className='outline-none text-sm' onChange={e => SetName(e.target.value)} value={name} type="text" placeholder="Company name" required />
                            </div>
                        )}

                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} />
                            <input className='outline-none text-sm' onChange={e => SetEmail(e.target.value)} value={email} type="email" placeholder="Email id" required />
                        </div>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} />
                            <input className='outline-none text-sm' onChange={e => SetPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                        </div>

                    </>
                }
                {state === "Login" &&
                    <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>}


                <button type="submit" className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                    {state === 'Login' ? 'login' : istextdatasubmitted ? 'create account' : 'next'}
                </button>
                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => SetState('Sign Up')}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer' onClick={() => SetState('Login')}>Login</span></p>
                }

                <img onClick={(e) => SetShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} />

            </form>

        </div>
    )
}

export default RecruiterLogin
