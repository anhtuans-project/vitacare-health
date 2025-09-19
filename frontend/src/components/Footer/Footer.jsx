import React from "react";
import "./Footer.css";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            VitaCare không chỉ là một ứng dụng, mà là cầu nối giữa trí tuệ cổ
            truyền và sức mạnh của AI hiện đại, với mục tiêu giúp bạn chủ động
            lắng nghe cơ thể, sống khỏe và bền vững từ bên trong.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/vitacarefu.2025">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com/">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com/">
              <img src={assets.linkedin_icon} alt="Linkedin" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Tìm hiểu thêm </h2>
          <ul>
            <li>Trang chủ </li>
            <li>Về chúng tôi </li>
            <li>Giao hàng </li>
            <li>Chính sách & Bảo mật </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Liên hệ trực tiếp </h2>
          <ul>
            <li>0356286562 </li>
            <li>vitacare.official@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © vitacare.com</p>
    </div>
  );
};

export default Footer;
