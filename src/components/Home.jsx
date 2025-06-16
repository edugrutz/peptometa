import React from 'react'
import logo from '../media/logo.png'

const Home = () => {
return (
    <div className='container mt-5 d-flex align-items-center' style={{ justifyContent: 'flex-start' }}>
        <img
            src={logo}
            alt="PeptoMeta Logo"
            style={{ maxWidth: '10%', height: 'auto', marginRight: '1rem' }}
        />
        <div>
            <h1 className='display-3'>PeptoMeta</h1>
            <p>Tool for visualizing <strong>anticancer</strong> and <strong>antimicrobial</strong> peptides extracted from ancient DNA metagenomes.</p>
        </div>
    </div>
)
}

export default Home
