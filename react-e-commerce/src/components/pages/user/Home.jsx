import React from 'react'
import { Row } from 'react-bootstrap'
import MenubarUser from '../../layouts/MenubarUser'

const Home = () => {
  return (
    <Row>
      <div className="col-md-2 pe-lg-0 pe-md-0">
        <MenubarUser/>
      </div>
      <div className="col-md-10 pe-lg-0">
        <h1>Home</h1>
      </div>
    </Row>
  )
}

export default Home