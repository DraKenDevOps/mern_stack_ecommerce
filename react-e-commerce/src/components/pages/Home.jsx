import React from 'react'
import { Container } from 'react-bootstrap'
import NewProduct from './home/NewProduct'
import BestSeller from './home/BestSeller'
import Footer from '../layouts/Footer'



const Home = () => {
    return (
        <>
            <Container>
                <div className="px-4 py-5 my-5 text-center">
                    <img className="d-block mx-auto mb-3" src="/src/assets/images/heroeslogo.png" alt="heroeslogo" width={500}/>
                    <h1 className="display-5 fw-bold text-danger">KO - GAMING</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-danger btn-lg px-4 gap-3 fw-bold">About</button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4 fw-bold">Contact</button>
                        </div>
                    </div>
                </div>
                <h4 className="text-danger text-center p- my-5 display-4 jumbotron">New Product</h4>
                <NewProduct />
                <h4 className="text-danger text-center p- my-5 display-4 jumbotron">Best Seller</h4>
                <BestSeller/>
            </Container>
            <Footer/>
        </>
    )
}

export default Home