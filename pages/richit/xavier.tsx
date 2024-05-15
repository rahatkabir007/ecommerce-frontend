import { sendEmailVerification } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SocialLogin } from '../../components/helpers/SocialLogin'
import Header from '../../components/shared/SharedHeader/Header'
import { IUser } from '../../interfaces/models'
import { EcommerceApi } from '../../src/API/EcommerceApi'

import { controller } from '../../src/state/StateController'
import { CookiesHandler } from '../../src/utils/CookiesHandler'

interface Props { }

const xavier: React.FC<Props> = (props) => {
    const router = useRouter();
    const states = useSelector(() => controller.states)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [success, setSuccess] = useState(false);
    const [successText, setSuccessText] = useState('')

    const [errorLogin, setErrorLogin] = useState(false);
    const [errorTextLogin, setErrorTextLogin] = useState('');
    const [successLogin, setSuccessLogin] = useState(false);
    const [successTextLogin, setSuccessTextLogin] = useState('')

    const [sendVerifyText, setSendVerifyText] = useState(false)


    const [loggedinSendVerify, setLoggedinSendVerify] = useState(false)
    const [loggedinSendVerifyText, setLoggedinSendVerifyText] = useState('')

    const [forgerPasEmail, setForgerPasEmail] = useState('');
    useEffect(() => {
        SocialLogin.initFirebase()
    }, [])

    const sendEmailVerify = async () => {
        SocialLogin.sendEmail()
        setErrorLogin(false)
        setSuccessLogin(false)
        setLoggedinSendVerifyText('Verification sent')
    }

    const handleEmailPasswordSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password.length < 6) {
            setError(true)
            setSuccess(false)
            setErrorText('password must be 6 characters minimum')
        }
        else {
            const { res, err } = await SocialLogin.signUpWithEmailPassword(displayName, email, password)
            if (err) {
                setError(true)
                setSuccess(false)
                setErrorText(err)
            }
            else {
                console.log('resooooo', res)
                const token = res?.user?.accessToken;
                const user = res.user
                console.log('use,tok', user?.email);
                console.log('dis', user?.displayName);
                if (token && user?.email) {
                    console.log('enter');
                    const { email } = user
                    const data: Partial<IUser> = {
                        token: token,
                        tokenType: 'email',
                        email: email,
                        avatar: 'https://tinyurl.com/382e6w5t',
                        fullName: displayName,
                        role: 'buyer'
                    }
                    const { res, err } = await EcommerceApi.login(data);
                    if (err) {
                        setError(true)
                        setSuccess(false)
                        setErrorText('Database Server Error')
                        SocialLogin.loginWithEmailPasswordAfterServerError()
                    }
                    else {
                        // CookiesHandler.setAccessToken(res.access_token)
                        // if (res.slug) {
                        //     CookiesHandler.setSlug(res.slug as string)
                        // }
                        SocialLogin.sendEmail()
                        setSendVerifyText(true)
                        setError(false)
                        setSuccess(true)
                        setSuccessText('SignUp Success')
                    }
                    // setLoggedinSendVerify(false)
                    // setSuccessLogin(true)
                    // setSuccessTextLogin('SignIn Success')

                }


            }
            //     else {
            //    console.log('signUpWithEmailPassword',res);
            //                 SocialLogin.sendEmail()
            //                 setSendVerifyText(true)
            //                 setError(false)
            //                 setSuccess(true)
            //                 setSuccessText('SignUp Success')

            //         }

        }

    }

    const handleEmailPasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loginPassword.length === 0) {
            setErrorLogin(true)
            setSuccessLogin(false)
            setErrorTextLogin('password should not be empty')
        }
        else {
            const { res, err } = await SocialLogin.loginWithEmailPassword(loginEmail, loginPassword)
            if (err) {
                setErrorLogin(true)
                setSuccessLogin(false)
                setErrorTextLogin(err)
            }
            else {
                console.log('resss', res)
                setErrorLogin(false)
                if (!res.user.emailVerified) {
                    console.log('kkk');
                    setLoggedinSendVerify(true)
                    setLoggedinSendVerifyText('verify first and login again')
                }
                else {
                    // console.log('resooooo', res)
                    // const token = res?.user?.accessToken;
                    // const user = res.user
                    // console.log('use,tok', user?.email);
                    // console.log('dis', user?.displayName);
                    // if (token && user?.email) {
                    //     console.log('enter');
                    //     const { email } = user
                    //     const { res, err } = await EcommerceApi.login(token, email, displayName, 'https://tinyurl.com/382e6w5t', "email",'buyer');
                    //     if (err) {
                    //         setError(true)
                    //         setSuccess(false)
                    //         setErrorText('Database Server Error')
                    //     }
                    //     else {
                    //         CookiesHandler.setAccessToken(res.access_token)
                    //         if (res.slug) {
                    //             CookiesHandler.setSlug(res.slug as string)
                    //         }
                    //     }

                    // } 
                    if (res.access_token == null) {
                        // console.log('authentication error')
                        setLoggedinSendVerifyText('authentication error')
                    }
                    else {
                        CookiesHandler.setAccessToken(res.access_token)
                        CookiesHandler.setSlug(res.slug as string)
                        setLoggedinSendVerify(false)
                        setSuccessLogin(true)
                        setSuccessTextLogin('SignIn Success')
                    }

                }
            }
        }
    }

    const handleGoogleSignUp = async () => {
        // actions.setDialogLoading(true)
        const { token, user } = await SocialLogin.loginWithGoogle()
        if (token && user?.email && user?.displayName && user?.photoURL) {
            const { email, displayName, photoURL } = user
            // window.smartlook('identify', email);

            const data: Partial<IUser> = {
                token: token,
                tokenType: 'google',
                email: email,
                avatar: photoURL,
                fullName: displayName,
                role: 'buyer'
            }

            const { res, err } = await EcommerceApi.login(data);
            if (err) {
                console.log('Login error', err)
                SocialLogin.loginWithEmailPasswordAfterServerError()
            }
            else {
                if (res.access_token == null) {
                    console.log('authentication error')
                }
                else {
                    CookiesHandler.setAccessToken(res.access_token)
                    if (res.slug) {
                        CookiesHandler.setSlug(res.slug as string)
                        router.push('/')
                    }
                }
                // actions.setSocialPicture(user?.photoURL)
                // localStorage.clear();
                // sessionStorage.clear();
                // setTimeout(() => {
                //     actions.setDialogLoading(false)
                // }, 1000)
                // Todo fix params
                // enqueueSnackbar("Login successful !", { variant: 'success', autoHideDuration: 2000 })
            }

        }

    }


    return (
        <div>
            <div style={{ width: '210px', margin: 'auto' }}>
                <button style={{ height: '50px', width: '100%', borderRadius: '10px', backgroundColor: 'black', color: 'white' }}
                    onClick={() => handleGoogleSignUp()}>
                    Login with Google
                </button>
                <form onSubmit={(e) => handleEmailPasswordSignUp(e)} method="post">
                    <input placeholder='Name'
                        style={{ margin: '10px 0' }}
                        onChange={(e) => { setDisplayName(e.target.value) }}
                    />
                    <input placeholder='Email'
                        style={{ margin: '10px 0' }}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input placeholder='password'
                        type="test"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button type="submit" style={{ backgroundColor: 'blue', borderRadius: '10px', margin: '10px 0', width: '150px', color: 'white' }}>Submit SignUp</button>
                </form>
                {error && <div style={{ color: 'red' }}>{errorText}</div>}
                {/* {success && <div style={{ color: 'black' }}>{successText}</div>} */}
                {sendVerifyText && <div style={{ backgroundColor: 'red', borderRadius: '10px', margin: '10px 0', width: '250px', color: 'white' }}>Signed up & Verification sent </div>}
            </div>
            <div style={{ width: '210px', margin: '10px auto' }}>
                {/* <button style={{ height: '50px', width: '100%', borderRadius: '10px', backgroundColor: 'black', color: 'white' }}
                    onClick={() =>handleGoogleSignUp()}>
                    Login with Google
                </button> */}
                <form onSubmit={(e) => handleEmailPasswordLogin(e)} method="post">
                    <input placeholder='Email'
                        style={{ margin: '10px 0' }}
                        onChange={(e) => { setLoginEmail(e.target.value) }}
                    />
                    <input placeholder='password'
                        type="test"
                        onChange={(e) => { setLoginPassword(e.target.value) }}
                    />
                    <button type="submit" style={{ backgroundColor: 'blue', borderRadius: '10px', margin: '10px 0', width: '150px', color: 'white' }}>Submit SignIn</button>
                </form>
                {errorLogin && <div style={{ color: 'red' }}>{errorTextLogin}</div>}
                {successLogin && <div style={{ color: 'black' }}>{successTextLogin}</div>}
                {loggedinSendVerify && <button type="submit" style={{ backgroundColor: 'blue', borderRadius: '10px', margin: '10px 0', width: '300px', color: 'white' }} onClick={() => { sendEmailVerify() }}>{loggedinSendVerifyText}</button>}

            </div>

            <div>
                <input placeholder='Forget Password Email'
                    style={{ margin: '10px 0' }}
                    onChange={(e) => { setForgerPasEmail(e.target.value) }}
                />
            </div>
            <button type="submit" style={{ backgroundColor: 'blue', borderRadius: '10px', margin: '10px 0', width: '150px', color: 'white' }} onClick={() => { SocialLogin.forgetEmail(forgerPasEmail) }}>Sent Forget Email</button>

        </div>
    )
}


export default xavier

