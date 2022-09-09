import React from 'react'
// antd
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

const { Meta } = Card;

const AdminProductCard = ({product, handleDelete}) => {

    const {_id, title, desc, images} = product

    return (
        <>
            <Card
                className='p-1'
                hoverable
                style={{ width: "100%" }}
                cover={
                    <img
                        alt={title}
                        src={images && images.length ? images[0].url : ""}
                    />
                }
                actions={[
                        
                            <Link to={`/admin/product/update/${_id}`}>
                                <EditOutlined style={{ color: '#f7c305' }} key="edit" />
                            </Link>,
                            <DeleteOutlined onClick={() => handleDelete(_id)} style={{ color: 'red' }} key="delete" />
                        
                    ]}
                >
                <Meta
                    title={title}
                    description={desc}
                    style={{whiteSpace:"nowrap"}}
                />
            </Card>
        </>
    )
}

export default AdminProductCard