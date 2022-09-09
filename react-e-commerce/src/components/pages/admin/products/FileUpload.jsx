import React from 'react'
import axios from 'axios'
const api_url = 'http://localhost:8000/api'

// resizer
import Resize from 'react-image-file-resizer'

// redux
import { useSelector } from 'react-redux'

// antd
import { Avatar, Badge } from 'antd'
import { toast } from 'react-toastify'
// import { UserOutlined } from '@ant-design/icons'

const FileUpload = ({loading, setLoading, products, setProducts}) => {
    const { user } = useSelector((state) =>({...state}))

    const handleFile = (e) => {
        const files = e.target.files
        if(files){
            setLoading(true)

            let allFileUpload = products.images

            for(let i=0; i < files.length; i++){
                console.log(files[i])
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(`${api_url}/upload/images`, {
                            images: uri
                        },{
                            headers:{
                                accesstoken: user.token
                            }
                        }).then(res => {
                            setLoading(false)
                            allFileUpload.push(res.data)
                            console.log(allFileUpload)
                            setProducts({...products, images: allFileUpload})
                        }).catch(err => {
                            setLoading(false)
                            console.log(err.response)
                        })
                    },
                    "base64"
                )
            }
        }
    }

    const handleRemove = (public_id) => {
        setLoading(true)
        console.log(public_id)
        const img = products.images
        axios.post(`${api_url}/remove/images`,{public_id},{
            headers:{
                accesstoken: user.token
            }
        }).then(res => {
            setLoading(false)

            let filterImg = img.filter(item => {
                return item.public_id !== public_id
            })

            setProducts({...products, images: filterImg})

            console.log(res.data)
            toast.success("Image has been removed",{
                theme: "dark"
            })
        }).catch(err => {
            setLoading(false)

            toast.error(err.response)
            toast.error("Can not remove image",{
                theme: "dark"
            })
        })
    }

    return (
        <>
            
            <div className="row">
                {products.images && products.images.map(item => 
                <div className='col-md-3'>
                    <span className="avatar-item">
                        <Badge count={"X"} style={{cursor: 'pointer'}} onClick={()=>handleRemove(item.public_id)}>
                            <Avatar src={item.url} shape="square" size={130}/>
                        </Badge>
                    </span>
                </div>
                )}
            </div>
            <hr />
            <label htmlFor='img' className='btn btn-danger fw-bold mt-2'>
                Choose Images
                <input
                    type="file"
                    name="images" 
                    hidden
                    id="img" 
                    className="form-control"
                    multiple
                    accept='image/*'
                    onChange={handleFile}
                />
            </label>
        </>
    )
}

export default FileUpload