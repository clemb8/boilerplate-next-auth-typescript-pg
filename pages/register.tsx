import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import Values from '../types/Auth';

type ErrorRegister = {
  username: Boolean,
  password: Boolean,
  service: Boolean
}

const Register: NextPage = () => {

  let initErrors = { username: false, password: false, service: false }
  const ERRORS_FORM = {
    username: 'Your username must contains 3 character',
    password: 'Your password must be...',
    service: 'Something went wrong, try to refresh the page'
  }

  const regPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)])(?=.{8,})");

  const [values, setValues] = useState<Values>({username: "", password: ""});
  const [errors, setErrors] = useState<ErrorRegister>(initErrors);
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();
  
  const setValueUsername = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setValues({...values, username: newValue});
  }

  const validateUsername = () => {
    values.username.length < 3 ? setErrors({...errors, username: true}) : setErrors({...errors, username: false});
  }

  const setValuePassword = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setValues({...values, password: newValue});
  }

  const validatePassword = () => {
    regPassword.test(values.password) ? setErrors({...errors, password: false}) : setErrors({...errors, password: true});
  }

  const registerUser = async (username: string, password: string) => {
    let res = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    });
    console.log(res);
    return res;
  }

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    const result = await registerUser(values.username, values.password);
    result.status === 201 ? router.push('/') : setErrors({...errors, service: true});
    setLoading(false);
    console.log(result);
  }

  return (
    <>
      <main>  
        <div className="content">
          <div className="container">
            <div className="contents">
              <div className="form-block">
                <div className="header-form">
                  <h3>Register to <strong>Test</strong></h3>
                  <p className="mb-4">Register in the Application</p>
                </div>
                <form action="#" method="post">
                  {errors.service ? <p className='authError'>{ERRORS_FORM.service}</p> : null}
                  <div className="form-group">
                    {errors.username ? <p className='authError'>{ERRORS_FORM.username}</p> : null}
                    <input className='input form-control' type="text" onBlur={validateUsername} onChange={setValueUsername} value={values.username} />
                    <label className='label'>Email</label>
                  </div>
                  <div className="form-group">
                    {errors.password ? <p className='authError'>{ERRORS_FORM.password}</p> : null}
                    <input className='input form-control' type="password" onBlur={validatePassword} onChange={setValuePassword} value={values.password} />
                    <label className='label'>Password</label>
                  </div>
                  <div className="action-form">
                    {
                      errors.username || errors.password || values.username === "" || values.password === "" ?
                      <button type="submit" value="Log In" className="btn btn-pill" disabled>Register</button> :
                      <button type="submit" value="Log In" className="btn btn-pill" onClick={register}>Register</button>
                    }
                  </div>
                </form>
                </div>
              </div>
          </div>
        </div>
      </main>
      {
        loading ? <Spinner></Spinner> : <></>
      }
    </>
  )
}

export default Register