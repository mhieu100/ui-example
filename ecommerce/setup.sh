#!/bin/bash

echo "🚀 Setting up E-Commerce React Application..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOL
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development

# Payment Configuration (for future use)
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# App Configuration
REACT_APP_NAME=ShopHub
REACT_APP_VERSION=1.0.0
EOL
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 To start the development server:"
echo "   npm start"
echo ""
echo "🏗️ To build for production:"
echo "   npm run build"
echo ""
echo "📱 The app will be available at: http://localhost:3000"