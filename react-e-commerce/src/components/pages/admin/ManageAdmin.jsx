import React,{useState, useEffect} from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';

import { usersList, changeStatus, changeRole, deleteUser, resetPassword } from '../../services/users'

// AntD
import { Switch, Select, Tag, Modal, Input } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// redux
import { useSelector } from 'react-redux'

// moment
// import moment from 'moment'
import moment from 'moment/min/moment-with-locales'

const ManageAdmin = () => {
    // access user data in redux
    const user = useSelector((state) =>({...state}))

    // store data from server 
    const [data, setData] = useState([]);

    // state for modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // state for store data to delete
    const [values, setValues] = useState({
        id: '',
        password: ''
    });

    const [role, setRole] = useState([])

    // filter
    const [selectData, setSelectData] = useState([])

    // instant page load
    useEffect(() => {
        loadData(user.user.token)
    },[])

    // instant page load function
    const loadData = (accesstoken) => {
        usersList(accesstoken).then(users => {
            setData(users.data)
            setSelectData(users.data)
            const dataRole = [...new Set(users.data.map(r => r.role))]
            setRole(dataRole)
        }).catch(err => {
            console.log(err.response)
        })
    }

    // change status
    const handleOnChange = (e, id) => {
        const value = {
            id:id,
            status:e
        }
        changeStatus(user.user.token, value).then(res => {
            console.log(res.data)
            loadData(user.user.token)
        }).catch(err => {
            console.log(err.response)
        })
    }

    // change role
    const handleChangeRole = (e, id) => {
        let value = {
            id:id,
            role:e
        }
        changeRole(user.user.token, value).then(res => {
            console.log(res.data)
            loadData(user.user.token)
        }).catch(err => {
            console.log(err.response)
        })
    }

    // delete user
    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this')){
            deleteUser(user.user.token, id).then((res) => {
                console.log(res.data)
                loadData(user.user.token)
            }).catch(err => {
                console.log(err.response)
            })
        }
    }

    // Modal
    const showModal = (id) => {
        setIsModalVisible(true);
        setValues({...values, id:id});
    };
    
    const handleChangePassword = (e) => {
        setValues({...values, [e.target.name]:e.target.value});
    }

    const handleOk = () => {
        setIsModalVisible(false);
        resetPassword(user.user.token, values.id, {values}).then(res => {
            console.log(res.data)
            loadData(user.user.token)
        }).catch(err => {
            console.log(err.response)
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelectRole = (e) => {
        const filt = e.target.value
        if(filt == "all"){
            setSelectData(data)
        } else {
            const filter = data.filter((item, index) => {
                return item.role == filt
            })
            setSelectData(filter)
        }
    }

    return (
        <>
            <Row>
                <div className="col-md-2 pe-lg-0 pe-md-0">
                    <MenubarAdmin/>
                </div>
                <div className="col p-2">
                    <h1 className='text-danger text-center'>Users Management</h1>

                    <select onChange={handleSelectRole}>
                        <option value="all">All</option>
                        {role.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))}
                    </select>

                    <div className="table-responsive mt-2">
                        <Table striped hover variant="dark">
                            <thead>
                                <tr className="text-danger">
                                    <th>#</th>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th width={100}>Role</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectData.map((item, index) => (
                                    <tr>
                                        <td>{index+1}.</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td width={100}>
                                            <Select style={{width: '100px'}} value={item.role} onChange={(e) => handleChangeRole(e, item._id)}>
                                                {role.map((role, index) => (
                                                    <Select.Option value={role} key={index}>
                                                        {role == 'admin' ? <Tag color="geekblue">{role}</Tag> : <Tag color="red">{role}</Tag>}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>
                                            {<Switch checked={item.status} onChange={(e) => handleOnChange(e, item._id)}/>}
                                        </td>
                                        <td>
                                            {moment(item.createdAt).locale('lo').format('DD/MM/YYYY, LTS')}
                                        </td>
                                        <td>
                                            {moment(item.updatedAt).locale('lo').startOf(item.updatedAt).fromNow()} |&nbsp;
                                            {moment(item.updatedAt).startOf(item.updatedAt).fromNow()}
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-sm btn-warning pt-0 pb-2 pe-2 me-2" onClick={() => showModal(item._id)}>
                                                <EditOutlined />
                                            </button>
                                            <button type="button" className="btn btn-sm btn-danger pt-0 pb-2 pe-2" onClick={() => handleDelete(item._id)}>
                                                <DeleteOutlined />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Row>
            <Modal title="Edit User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
                <Input type="password" name="password" size="large" placeholder="Enter password" onChange={handleChangePassword}/>
            </Modal>
        </>
    )
}

export default ManageAdmin