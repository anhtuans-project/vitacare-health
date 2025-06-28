# 🚀 Quick Deploy Guide - VitaCare.health

## 📋 Checklist trước khi deploy

- [ ] Code đã được push lên GitHub
- [ ] MongoDB Atlas database đã được setup
- [ ] Cloudinary account đã được tạo
- [ ] Stripe account đã được setup (nếu cần)
- [ ] Domain vitacare.health đã được mua

## ⚡ Deploy nhanh (5 phút)

### 1. Frontend (Vercel)
```bash
# 1. Truy cập https://vercel.com
# 2. Import GitHub repo
# 3. Cấu hình:
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist

# 4. Environment Variables:
VITE_API_BASE=https://vitacare-backend.onrender.com/api
```

### 2. Backend (Render)
```bash
# 1. Truy cập https://render.com
# 2. New Web Service
# 3. Connect GitHub repo
# 4. Cấu hình:
Name: vitacare-backend
Environment: Node
Build Command: cd backend && npm install
Start Command: cd backend && npm start

# 5. Environment Variables:
NODE_ENV=production
GEMINI_API_KEY=AIzaSyBjSTPo1V55NXSzSzcQr2lnD-H_D4s0v6I
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 3. Admin Panel (Vercel)
```bash
# 1. Tạo project mới trên Vercel
# 2. Cấu hình:
Root Directory: admin
Framework: Vite
Build Command: npm run build
Output Directory: dist

# 3. Environment Variables:
VITE_API_BASE=https://vitacare-backend.onrender.com/api
```

### 4. Custom Domain
```bash
# 1. Vercel Dashboard > Domains
# 2. Add domain: vitacare.health
# 3. Cấu hình DNS records:
Type: A
Name: @
Value: 76.76.19.34

Type: CNAME
Name: www
Value: vitacare.vercel.app
```

## 🔗 Final URLs
- **Website**: https://vitacare.health
- **API**: https://vitacare-backend.onrender.com
- **Admin**: https://vitacare-admin.vercel.app

## 🆘 Troubleshooting

### Lỗi thường gặp:
1. **CORS Error**: Kiểm tra CORS settings trong backend
2. **Build Failed**: Kiểm tra dependencies và Node.js version
3. **API Timeout**: Tăng timeout settings
4. **Environment Variables**: Đảm bảo tất cả env vars đã được set

### Support:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- MongoDB: https://docs.atlas.mongodb.com

## 📞 Need Help?
Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs trong browser
2. Backend logs trong Render dashboard
3. Build logs trong Vercel dashboard 