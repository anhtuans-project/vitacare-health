#!/bin/bash

echo "🚀 Starting VitaCare.health Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "✅ Prerequisites check passed"

# Build Frontend
print_status "Building Frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    npm run build
    if [ $? -eq 0 ]; then
        print_status "✅ Frontend built successfully"
    else
        print_error "❌ Frontend build failed"
        exit 1
    fi
else
    print_error "❌ Frontend dependencies installation failed"
    exit 1
fi
cd ..

# Build Admin
print_status "Building Admin Panel..."
cd admin
npm install
if [ $? -eq 0 ]; then
    npm run build
    if [ $? -eq 0 ]; then
        print_status "✅ Admin panel built successfully"
    else
        print_error "❌ Admin panel build failed"
        exit 1
    fi
else
    print_error "❌ Admin dependencies installation failed"
    exit 1
fi
cd ..

# Test Backend
print_status "Testing Backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    print_status "✅ Backend dependencies installed"
else
    print_error "❌ Backend dependencies installation failed"
    exit 1
fi
cd ..

print_status "🎉 All builds completed successfully!"
echo ""
print_warning "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy Frontend to Vercel: https://vercel.com"
echo "3. Deploy Backend to Render: https://render.com"
echo "4. Deploy Admin to Vercel: https://vercel.com"
echo "5. Configure custom domain: vitacare.health"
echo ""
print_status "See DEPLOYMENT_GUIDE.md for detailed instructions" 