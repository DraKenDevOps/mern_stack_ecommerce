// REACT
import React, { useState } from 'react'

// API
import axios from 'axios';
const api_url = 'http://localhost:8000/api'

// SWEETALERT2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// BOOTSTRAP
import { Container } from 'react-bootstrap'

// REDUX
import { useDispatch } from 'react-redux'

// ROUTER
import { useNavigate, useLocation } from 'react-router-dom'

// AntD
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [value, setValue] = useState({
        username: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const roleBaseRedirect = (role) => {
        let intended = location.state
        if(intended){
            navigate(`../${intended}`)
        }else{
            if(role === 'admin'){
                navigate("/admin/home");
            }else{
                navigate("/user/home");
            }
        }
    }

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        await axios.post(`${api_url}/login`, value).then((response) => {
            setLoading(false)
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: response.data.token,
                    username: response.data.payload.user.username,
                    role: response.data.payload.user.role
                }
            })
            
            localStorage.setItem('token', response.data.token)
            roleBaseRedirect(response.data.payload.user.role)

            MySwal.fire({
                icon: 'success',
                title: 'Welcome ' ,
                text: 'Hello, '+response.data.payload.user.username,
                showConfirmButton: true,
            })

        }).catch((err) => {
            setLoading(false)
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            return MySwal.fire({
                icon: 'error',
                title: 'Failded',
                text: message,
                showConfirmButton: true,
            })
        })
    }
    return (
        <>
            <Container>
                
                <div className="row my-3">
                    <div className="col-lg-5 mx-auto">
                        <div className="card border-danger">
                            <div className="card-header border-bottom-0">
                                {
                                    loading ? 
                                    <h2 className="card-title text-danger fw-bold my-1 text-center">Loading...</h2> : <h2 className="card-title text-danger fw-bold my-1 text-center">OVERVERSE</h2>
                                }
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <Input size="large" name="username" placeholder="Username" prefix={<UserOutlined />} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <Input.Password
                                            size="large"
                                            placeholder="Password"
                                            name="password"
                                            prefix={<LockOutlined />}
                                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-outline-dark border-2 text-danger fw-bold float-end">START GAME</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login