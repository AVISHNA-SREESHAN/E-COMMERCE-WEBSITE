# E-COMMERCE-WEBSITE

A modern React-based e-commerce web application with shopping cart functionality, product filtering, and category-based browsing.

## Features

- **Product Catalog**: Browse products from various categories
- **Category Filtering**: Filter products by categories like smartphones, accessories, beauty, electronics, etc.
- **Price Filtering**: Set minimum and maximum price ranges
- **Search Functionality**: Search products by name
- **Shopping Cart**: Add/remove products, update quantities
- **Product Details**: View detailed product information
- **Responsive Design**: Works on desktop and mobile devices
- **Toast Notifications**: User-friendly feedback messages

## Technologies Used

- **React**: Frontend framework
- **React Router**: Navigation and routing
- **React Bootstrap**: UI components and styling
- **Axios**: API calls
- **React Toastify**: Notification system
- **React Icons**: Icon library

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AVISHNA-SREESHAN/E-COMMERCE-WEBSITE.git
cd E-COMMERCE-WEBSITE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
src/
├── COMPONENTS/
│   ├── CartPage.jsx      # Shopping cart page
│   ├── Carts.jsx         # Product listing with filters
│   ├── Home.jsx          # Navigation header
│   ├── ProductDetail.jsx # Individual product details
│   └── Addproduct.jsx    # Add product functionality
├── App.js                # Main app component with routing
└── index.js              # App entry point
```

## API Integration

The application uses the [DummyJSON API](https://dummyjson.com/products) to fetch product data, providing a realistic e-commerce experience with various product categories.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
