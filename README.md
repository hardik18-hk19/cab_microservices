# 🚖 Cab Microservices

A comprehensive cab booking platform built with Node.js microservices architecture. This system provides separate services for users, captains (drivers), rides, and an API gateway for routing requests.

## 🏗️ Architecture

This project follows a microservices architecture with the following services:

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   API Gateway   │    │   User Service   │    │ Captain Service  │
│   Port: 3000    │────│   Port: 3001     │    │   Port: 3002     │
└─────────────────┘    └──────────────────┘    └──────────────────┘
         │
         │              ┌──────────────────┐
         └──────────────│  Ride Service    │
                        │   Port: 3003     │
                        └──────────────────┘
```

## 📋 Services Overview

### 🚪 Gateway Service (Port 3000)

- **Purpose**: API Gateway and request routing
- **Technology**: Express.js with HTTP Proxy
- **Routes**:
  - `/user/*` → User Service (3001)
  - `/captain/*` → Captain Service (3002)
  - `/ride/*` → Ride Service (3003)

### 👤 User Service (Port 3001)

- **Purpose**: User authentication and profile management
- **Database**: MongoDB
- **Features**:
  - User registration and login
  - JWT-based authentication
  - Profile management
  - Token blacklisting for logout

### 🚗 Captain Service (Port 3002)

- **Purpose**: Driver/Captain management
- **Database**: MongoDB
- **Features**:
  - Captain registration and login
  - Profile management
  - Availability toggle
  - Authentication middleware

### 🚕 Ride Service (Port 3003)

- **Purpose**: Ride booking and management
- **Database**: MongoDB
- **Features**:
  - Create ride requests
  - Inter-service communication with User Service
  - User authentication via API calls

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES6 Modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **API Gateway**: express-http-proxy
- **Environment**: dotenv
- **Development**: nodemon

## 📁 Project Structure

```
cab_microservices/
├── gateway/
│   ├── app.js
│   └── package.json
├── user/
│   ├── server.js
│   ├── app.js
│   ├── config/db.js
│   ├── controller/user.controller.js
│   ├── middleware/user.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── blacklistToken.model.js
│   ├── routes/user.routes.js
│   └── package.json
├── captain/
│   ├── server.js
│   ├── app.js
│   ├── config/db.js
│   ├── controller/captain.controller.js
│   ├── middleware/captain.middleware.js
│   ├── models/
│   │   ├── captain.model.js
│   │   └── blacklistToken.model.js
│   ├── routes/captain.routes.js
│   └── package.json
├── ride/
│   ├── server.js
│   ├── app.js
│   ├── config/db.js
│   ├── controller/ride.controller.js
│   ├── middleware/auth.middleware.js
│   ├── models/ride.model.js
│   ├── routes/ride.routes.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd cab_microservices
```

2. **Install dependencies for each service**

```bash
# Gateway Service
cd gateway
npm install

# User Service
cd ../user
npm install

# Captain Service
cd ../captain
npm install

# Ride Service
cd ../ride
npm install
```

3. **Environment Configuration**

Create `.env` files in each service directory:

**User Service (.env)**

```env
JWT_SECRET=your_jwt_secret_here
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/cab-microservice
```

**Captain Service (.env)**

```env
JWT_SECRET=your_jwt_secret_here
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/cab-microservice
```

**Ride Service (.env)**

```env
JWT_SECRET=your_jwt_secret_here
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/cab-microservice
BASE_URL=http://localhost:3000
```

4. **Start the services**

Open separate terminals for each service:

```bash
# Terminal 1 - Gateway
cd gateway
npm run dev

# Terminal 2 - User Service
cd user
npm run dev

# Terminal 3 - Captain Service
cd captain
npm run dev

# Terminal 4 - Ride Service
cd ride
npm run dev
```

## 📡 API Endpoints

### User Service (via Gateway: `http://localhost:3000/user`)

| Method | Endpoint    | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| POST   | `/register` | Register new user | No            |
| POST   | `/login`    | User login        | No            |
| POST   | `/logout`   | User logout       | Yes           |
| GET    | `/profile`  | Get user profile  | Yes           |

### Captain Service (via Gateway: `http://localhost:3000/captain`)

| Method | Endpoint               | Description          | Auth Required |
| ------ | ---------------------- | -------------------- | ------------- |
| POST   | `/register`            | Register new captain | No            |
| POST   | `/login`               | Captain login        | No            |
| POST   | `/logout`              | Captain logout       | Yes           |
| GET    | `/profile`             | Get captain profile  | Yes           |
| POST   | `/toggle-availability` | Toggle availability  | Yes           |

### Ride Service (via Gateway: `http://localhost:3000/ride`)

| Method | Endpoint       | Description             | Auth Required |
| ------ | -------------- | ----------------------- | ------------- |
| POST   | `/create-ride` | Create new ride request | Yes           |

## 🔐 Authentication

The system uses JWT-based authentication with the following flow:

1. Users/Captains register or login to receive a JWT token
2. Token is stored in HTTP-only cookies
3. Protected routes verify the token via middleware
4. Inter-service authentication is handled via API calls

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Captain Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isAvailable: Boolean (default: false)
}
```

### Ride Model

```javascript
{
  user: ObjectId (ref: User),
  pickup: String (required),
  destination: String (required),
  status: String (default: 'pending'),
  createdAt: Date (default: now)
}
```

## 🔧 Development

### Running Tests

```bash
npm test
```

### Code Style

- ES6+ modules with import/export
- Async/await for asynchronous operations
- Express.js middleware pattern
- RESTful API design

### Environment Variables

- `JWT_SECRET`: Secret key for JWT token generation
- `MONGO_URL`: MongoDB connection string
- `BASE_URL`: Base URL for inter-service communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure database user has proper permissions

2. **JWT Secret Error**

   - Verify `.env` file exists in service directory
   - Check `JWT_SECRET` is properly set
   - Restart the service after env changes

3. **Service Communication Issues**

   - Ensure all services are running on correct ports
   - Check `BASE_URL` configuration in ride service
   - Verify API gateway routing

4. **Cookie Parser Issues**
   - Ensure `cookie-parser` middleware is installed and configured
   - Check cookie settings in browser developer tools

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using Node.js and Express.js**
