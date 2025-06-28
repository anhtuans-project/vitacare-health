# Hướng Dẫn Deploy VitaCare.health

## 🚀 Deploy Frontend lên Vercel

### Bước 1: Chuẩn bị Frontend
```bash
cd frontend
npm install
npm run build
```

### Bước 2: Deploy lên Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng ký/Đăng nhập với GitHub
3. Click "New Project"
4. Import repository từ GitHub
5. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Bước 3: Cấu hình Environment Variables
Trong Vercel Dashboard > Project Settings > Environment Variables:
```
VITE_API_BASE=https://vitacare-backend.onrender.com/api
```

### Bước 4: Cấu hình Custom Domain
1. Vào Project Settings > Domains
2. Thêm domain: `vitacare.health`
3. Cấu hình DNS records theo hướng dẫn của Vercel

---

## 🔧 Deploy Backend lên Render (Miễn phí)

### Bước 1: Chuẩn bị Backend
```bash
cd backend
npm install
```

### Bước 2: Tạo file render.yaml
```yaml
services:
  - type: web
    name: vitacare-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: GEMINI_API_KEY
        sync: false
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
```

### Bước 3: Deploy lên Render
1. Truy cập [render.com](https://render.com)
2. Đăng ký/Đăng nhập với GitHub
3. Click "New Web Service"
4. Connect repository
5. Cấu hình:
   - **Name**: `vitacare-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Bước 4: Cấu hình Environment Variables
Trong Render Dashboard > Environment:
```
NODE_ENV=production
GEMINI_API_KEY=AIzaSyBjSTPo1V55NXSzSzcQr2lnD-H_D4s0v6I
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📱 Deploy Admin Panel lên Vercel

### Bước 1: Chuẩn bị Admin
```bash
cd admin
npm install
npm run build
```

### Bước 2: Deploy lên Vercel
1. Tạo project mới trên Vercel
2. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Bước 3: Cấu hình Environment Variables
```
VITE_API_BASE=https://vitacare-backend.onrender.com/api
```

---

## 🌐 Cấu hình DNS cho vitacare.health

### Bước 1: Mua Domain
1. Mua domain `vitacare.health` từ nhà cung cấp (Namecheap, GoDaddy, etc.)
2. Truy cập DNS settings

### Bước 2: Cấu hình DNS Records
```
Type: A
Name: @
Value: 76.76.19.34 (Vercel IP)

Type: CNAME
Name: www
Value: vitacare.vercel.app
```

### Bước 3: Verify Domain
1. Trong Vercel Dashboard > Domains
2. Thêm domain: `vitacare.health`
3. Follow verification instructions

---

## 🔒 Bảo mật và SSL

### SSL Certificate
- Vercel tự động cung cấp SSL cho custom domains
- Render cũng cung cấp SSL tự động

### Environment Variables
- Không commit API keys vào code
- Sử dụng environment variables cho tất cả sensitive data

---

## 📊 Monitoring và Analytics

### Vercel Analytics
1. Enable Vercel Analytics trong project settings
2. Track performance và user behavior

### Error Monitoring
1. Setup error tracking với Sentry hoặc LogRocket
2. Monitor API errors và performance

---

## 🚀 Final URLs

Sau khi deploy thành công:
- **Frontend**: https://vitacare.health
- **Backend API**: https://vitacare-backend.onrender.com
- **Admin Panel**: https://vitacare-admin.vercel.app

---

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Errors**: Đảm bảo backend cho phép requests từ frontend domain
2. **Environment Variables**: Kiểm tra tất cả env vars đã được set
3. **Build Errors**: Kiểm tra dependencies và build commands
4. **API Timeouts**: Tăng timeout settings nếu cần

### Support:
- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com 