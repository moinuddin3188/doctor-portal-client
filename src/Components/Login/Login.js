import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Login.css';
import img from '../../images/Group 140.png';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../Firebase/Firebase';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'


firebase.initializeApp(firebaseConfig);

const Login = () => {

    document.title = 'Login';

    const [userState, setUserState] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: ''
    })

    const history = useHistory();
    const location = useLocation();
    let {from} = location.state || { from: {pathname: '/'} };

    const handleBlur = (e) => {
        const newUserInfo = { ...userInfo };
        newUserInfo[e.target.name] = e.target.value;
        setUserInfo(newUserInfo);
    }

    const createAccount = () => {
        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(res => {
                setUserInfo({ ...userInfo, error: '', success: true });
                updateUserName();
                const user = firebase.auth().currentUser;

                    user.sendEmailVerification()
                    .then(function () {
                        setUserState({ 
                            ...userState, 
                            name: user.displayName, 
                            email: user.email, 
                            isEmailVerified: user.emailVerified
                        });
                    }).catch(function (error) {
                        
                    });
            })
            .catch(function (error) {
                const errorMessage = error.message;
                setUserInfo({ ...userInfo, error: errorMessage, success: false });
            });
    }

    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(res => {
                setUserInfo({ ...userInfo, success: true, error: '' });
                const user = firebase.auth().currentUser; console.log(user)
                setUserState({ 
                    ...userState, 
                    name: user.displayName, 
                    email: user.email, 
                    isEmailVerified: user.emailVerified
                });
                getToken();
                if (user.emailVerified) {
                    history.replace(from);
                }
            })
            .catch(function (error) {
                const errorMessage = error.message;
                setUserInfo({ ...userInfo, error: errorMessage, success: false });
            });
    }

    const resetPassword = () => {
        var auth = firebase.auth();
        var emailAddress = userInfo.email;

        auth.sendPasswordResetEmail(emailAddress)
            .then(function () {
                setUserInfo({ ...userInfo, success: true, error: '' })
            }).catch(function (error) {
                setUserInfo({ ...userInfo, success: true, error: error })
            });
    }

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        if (newUser && !forgotPassword) {
            createAccount();
        }
        else if (!newUser && !forgotPassword) {
            signIn();
        }
        else {
            resetPassword();
        }

        setUserState({ ...userState, email: userInfo.email, name: userInfo.name });
    }

    const getToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            // Send token to your backend via HTTPS
            Cookies.set('token', idToken, { expires: 7 })
          }).catch(function(error) {
            // Handle error
          });
    }

    const updateUserName = () => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userInfo.name
        }).then(function () {

        }).catch(function (error) {

        });
    }

    return (
        <div className="login container py-5">
            <div className="row">
                <div className="col-md-6 col-12 d-flex align-items-center">
                    <div className="login-form">
                        <h6 className='text-black-50 text-center'>{newUser ? 'Sign up' : 'Login'}</h6>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder='Name' ref={register({ validate: false })} />}
                            {errors.name && <span>Please enter your name</span>}
                            <br />

                            <input onBlur={handleBlur} type="text" name="email" placeholder='Email' ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                            {errors.email && <span>Please enter a valid email address</span>}
                            <br />

                            <input onBlur={handleBlur} type="password" name="password" placeholder={forgotPassword ? 'Password You Remember' : 'Password'} ref={register({ required: true })} />
                            {errors.password && <span>Password must contain a number</span>}
                            <br />

                            {!newUser && <p onClick={() => setForgotPassword(!forgotPassword)} className='forgot-password mt-1'>{forgotPassword ? 'I can remember it' : 'Forgot your password?'}</p>}
                            {
                                forgotPassword ?
                                    <input type="submit" value='Send Email' />
                                    : <input className={newUser && 'mt-4'} type="submit" value={newUser ? "Sign up" : "Login"} />
                            }
                            {
                                newUser ?
                                    <p className='have-account text-center mt-1 mb-0'>Already have an account? <span onClick={() => setNewUser(false)} className='login-link'>Login</span></p>
                                    : <p onClick={() => setNewUser(true)} className='text-center create-account mt-1'>Create a new account.</p>
                            }
                        </form>
                        <p 
                            className='text-center'>
                            {userInfo.success ? 
                            <span style={{color: 'green', fontSize: '14px'}}>
                                {newUser && 'Login Your Account After verify Your Email. (Check email)'}
                            </span> : 
                            <span>{userInfo.error}</span>}
                        </p>
                        {forgotPassword && userInfo.success && <span className="text-primary text-center">Check your email</span> }
                    </div>
                </div>
                <div className="col-md-6 d-md-block d-none">
                    <img className='w-75' src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;