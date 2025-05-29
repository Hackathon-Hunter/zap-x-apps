# ZapX Wallet 🚀

<p align="center">
  <img src="./assets/images/logo.png" alt="ZapX Logo" width="120" height="120"/>
</p>

<p align="center">
  <strong>A modern crypto wallet for seamless transactions and payments</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.73-blue?style=flat-square&logo=react" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-50.0-black?style=flat-square&logo=expo" alt="Expo"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS"/>
</p>

## 📱 Screenshots

<p align="center">
  <img src="./docs/screenshots/login.png" alt="Login Screen" width="200"/>
  <img src="./docs/screenshots/home.png" alt="Home Screen" width="200"/>
  <img src="./docs/screenshots/qr-scan.png" alt="QR Scanner" width="200"/>
  <img src="./docs/screenshots/transaction.png" alt="Transaction Details" width="200"/>
</p>

## ✨ Features

### 🔐 **Authentication & Security**
- WalletConnect integration for secure wallet connections
- Biometric authentication support
- Multi-layer security protocols
- Session management with automatic timeout

### 💰 **Wallet Management**
- Multi-token support (ETH, BTC, USDT, and more)
- Real-time balance tracking
- Token carousel with live price updates
- Cross-chain compatibility

### 📱 **QR Code Functionality**
- **Scan to Pay**: Camera-based QR code scanning
- **Generate QR**: Dynamic and static QR code generation
- Gallery import for QR codes
- Merchant payment processing

### 🏪 **Dual User Modes**
- **User Mode**: Send, receive, and swap tokens
- **Merchant Mode**: Accept payments and generate QR codes
- Role-based navigation and features

### 💸 **Transaction Management**
- Comprehensive transaction history
- Advanced filtering (date, currency, status)
- Transaction status tracking (Success, Pending, Failed)
- Detailed transaction receipts

### 🎨 **Modern UI/UX**
- Dark theme with crypto-focused design
- Smooth animations with React Native Reanimated
- Gradient effects and glassmorphism
- Responsive design for all screen sizes

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React Native, Expo |
| **Language** | TypeScript |
| **Styling** | TailwindCSS, NativeWind |
| **Navigation** | Expo Router |
| **Animations** | React Native Reanimated |
| **Blockchain** | Viem, WalletConnect |
| **State Management** | Zustand |
| **Storage** | Expo SecureStore, AsyncStorage |
| **Camera/QR** | Expo Camera, React Native QR Code SVG |

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zapx-wallet.git
   cd zapx-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys:
   ```env
   EXPO_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   EXPO_PUBLIC_KEY_PROJECT_ID=your_walletconnect_project_id
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or run on simulator: `npx expo run:ios` / `npx expo run:android`

## 📁 Project Structure

```
zapx-wallet/
├── app/                    # App screens and layouts
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── (user)/            # User-specific screens
│   └── (merchant)/        # Merchant-specific screens
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── icons/            # Icon components
│   └── themed/           # Themed components
├── constants/            # App constants
├── hooks/               # Custom hooks
├── store/              # State management
├── utils/              # Utility functions
└── assets/             # Images, fonts, etc.
```

## 🔧 Configuration

### WalletConnect Setup

1. Get your project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Add it to your `.env` file
3. Configure the provider metadata in `constants/ConnectWallet.ts`

### Alchemy Configuration

1. Create an account at [Alchemy](https://www.alchemy.com/)
2. Create a new app for Sepolia testnet
3. Add your API key to the `.env` file

## 📱 Usage Guide

### For Users

1. **Connect Wallet**: Tap "Continue as User" and connect your wallet
2. **View Balance**: See your token balances on the home screen
3. **Scan to Pay**: Use the QR scanner to pay merchants
4. **Transaction History**: View all your past transactions

### For Merchants

1. **Register**: Tap "Continue as Merchant" and fill in your details
2. **Generate QR**: Create payment QR codes for customers
3. **Track Payments**: Monitor incoming payments and transaction history

## 🎨 Design System

### Colors
- **Primary**: Electric Green (#00ff88)
- **Background**: Deep Black (#0a0a0a)
- **Surface**: Dark Gray variants
- **Text**: White with secondary grays

### Typography
- **Primary**: Geist (Regular, Medium)
- **Monospace**: GeistMono (for numbers and addresses)

### Components
- Gradient borders and backgrounds
- Glassmorphism effects
- Smooth micro-interactions
- Consistent spacing and padding

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Development Build
```bash
npx expo build:android
npx expo build:ios
```

### Production Build
```bash
# Android
eas build --platform android

# iOS  
eas build --platform ios
```

### App Store Deployment
```bash
eas submit --platform ios
eas submit --platform android
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help:

- 📧 Email: support@zapx-wallet.com
- 💬 Discord: [Join our community](https://discord.gg/zapx)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/zapx-wallet/issues)

## 🚨 Security

For security concerns, please email security@zapx-wallet.com instead of using the issue tracker.

## 🏆 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [WalletConnect](https://walletconnect.com/) for wallet integration
- [Alchemy](https://www.alchemy.com/) for blockchain infrastructure
- Our amazing community of contributors

---

<p align="center">
  Made with ❤️ by the ZapX Team
</p>

<p align="center">
  <a href="https://twitter.com/zapx_wallet">Twitter</a> •
  <a href="https://discord.gg/zapx">Discord</a> •
  <a href="https://zapx-wallet.com">Website</a>
</p>
