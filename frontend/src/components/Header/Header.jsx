import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='header'>
            <div className='header-contents'>
                {/* <h2>
                    <span><i className="fas fa-coins"></i> Chiêu tài</span> <br />
                    <span><i className="fas fa-gem"></i> Hút lộc</span> <br />
                    <span><i className="fas fa-yin-yang"></i> Vạn sự bình an</span> */}
                    {/* <span> Chiêu tài</span> <br />
                    <span> Hút lộc</span> <br />
                    <span> Vạn sự bình an</span> */}
                {/* </h2> */}
                {/* <button onClick={() => navigate('/store')}>Tra cứu thành phần thuốc</button> */}
            </div>
        </div>
    )
}

export default Header
