import React, { useState } from 'react';
import { register } from '../../services/auth'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const [value, setValue] = useState({
        username: "",
        email: "",
        password: "",
        con_password: ""
    })

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.password !== value.con_password) {
            return MySwal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Password is not macth',
                showConfirmButton: true,
            })
        } else {
            register(value).then((res) => {
                let message = typeof res.response !== "undefined" ? res.response.data.message : res.message;
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: message,
                    showConfirmButton: true,
                })
                return navigate("/login")
            }).catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                return MySwal.fire({
                    icon: 'error',
                    title: 'Failded',
                    text: message,
                    showConfirmButton: true,
                })
            })
        }
    }

    return (
        <>
            <Container>
                <div className="row my-3">
                    <div className="col-lg-6 mx-auto">
                        <div className="card border-secondary">
                            <div className="card-header border-bottom-0">
                                <h2 className="card-title text-secondary fw-bold my-1 text-center">REGISTER</h2>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={handleSubmit}>

                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="text" name="username" className="form-control" id="float1" placeholder="U" onChange={handleChange} />
                                                <label htmlFor="float1">Username</label>
                                            </div>
                                        </div>

                                        <div className="ps-lg-0 col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="email" name="email" className="form-control" id="float3" placeholder="E" onChange={handleChange} />
                                                <label htmlFor="float3">Email</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="password" name="password" className="form-control" id="float2" placeholder="P" onChange={handleChange} />
                                                <label htmlFor="float2">Password</label>
                                            </div>
                                        </div>

                                        <div className="ps-lg-0 col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="password" name="con_password" className="form-control" id="float4" placeholder="CP" onChange={handleChange} />
                                                <label htmlFor="float4">Confirm Password</label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <button disabled={value.password.length < 6} className="btn btn-lg btn-outline-dark text-warning border-2 fw-bold float-end" type="submit">REGISTER</button>
                                        </div>

                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Register