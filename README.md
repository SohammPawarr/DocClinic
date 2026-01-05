# DocClinic - Homeopathy Clinic Website

A comprehensive web application for Dr. Rajesh Sharma's homeopathic clinic, featuring online appointment booking, patient management, and automated email notifications.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Google OAuth Integration**: Secure authentication using Google Sign-In
- **Appointment Booking**: Online booking system with time slot management
- **Interactive UI Components**: 
  - Hero section with modern design
  - About doctor section with testimonials
  - FAQ system with categorized questions
  - Contact forms and information
  - Live chatbot for basic queries

### Backend (Node.js + Express)
- **RESTful API**: Clean API endpoints for all functionality
- **Email Service**: Automated email notifications using Gmail SMTP
- **JWT Authentication**: Secure user sessions
- **Database**: File-based JSON storage for appointments and users
- **Appointment Management**: CRUD operations with status tracking

### Key Functionality
- **Email Notifications**: 
  - Clinic receives appointment requests with confirm/reject buttons
  - Patients receive booking confirmations and status updates
  - Professional email templates with clinic branding
- **Appointment Status Management**: Pending → Confirmed/Rejected → Completed
- **Guest Booking**: Non-registered users can book appointments
- **Real-time Validation**: Form validation and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Gmail account with App Password
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd doclinic
   ```

2. **Install Dependencies**
   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   BASE_URL=http://localhost:5000
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   
   # Gmail Configuration
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   CLINIC_EMAIL=clinic_email@gmail.com
   ```

4. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend  
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings > Security
   - Select "2-Step Verification" > "App Passwords"
   - Generate password for "Mail" application
3. Use the generated 16-character password in `GMAIL_APP_PASSWORD`

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy Client ID to environment variables

## 📁 Project Structure

```
doclinic/
├── public/                 # Static assets
├── src/                    # React frontend source
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── config.js          # Frontend configuration
├── backend/               # Node.js backend
│   ├── data/             # JSON database files
│   ├── routes/           # API route handlers
│   ├── utils/            # Utility functions
│   └── server.js         # Express server entry
└── build/                # Production build output
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments/book` - Book appointment (authenticated)
- `POST /api/appointments/book-guest` - Book appointment (guest)
- `GET /api/appointments/confirm/:token` - Confirm appointment
- `GET /api/appointments/reject/:token` - Reject appointment

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: ≤ 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: ≥ 1025px

## 🎨 Design Features

- **Color Scheme**: Red (#c41e3a) primary with white/gray accents
- **Typography**: Modern font stack with proper hierarchy
- **Components**: Card-based layouts with subtle shadows
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation support

## 📧 Email Templates

Professional email templates include:
- **Clinic Notifications**: Appointment requests with action buttons
- **Patient Confirmations**: Booking acknowledgments  
- **Status Updates**: Appointment confirmations/rejections
- **Responsive Design**: Email templates work across all clients

## 🔒 Security Features

- JWT token-based authentication
- Google OAuth integration
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Configure environment variables

### Backend Deployment (Render/Heroku)
1. Deploy from GitHub repository
2. Set environment variables
3. Ensure PORT is configured for the hosting service

## 📊 Database Schema

### Users
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string", 
  "phone": "string",
  "picture": "url",
  "googleId": "string",
  "createdAt": "datetime"
}
```

### Appointments
```json
{
  "id": "uuid",
  "confirmationToken": "uuid",
  "userId": "uuid",
  "patientName": "string",
  "patientEmail": "string", 
  "patientPhone": "string",
  "appointmentDate": "date",
  "appointmentTime": "time",
  "healthConcern": "string",
  "symptoms": "string",
  "additionalNotes": "string",
  "preferredDoctor": "string",
  "status": "pending|confirmed|rejected|cancelled|completed",
  "createdAt": "datetime"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍⚕️ About Dr. Rajesh Sharma

Dr. Rajesh Sharma is a qualified homeopathic physician with 29+ years of experience, specializing in classical homeopathy and holistic treatment approaches. The clinic is located in New Delhi, India.

**Contact Information:**
- 📱 Phone: +91 98765 43210, +91 97654 32109
- 📍 Address: 215 Medic Avenue, New Delhi - 110015, India
- 📧 Email: dr.rajeshsharma@gmail.com

---

For support or questions, please contact the development team or create an issue in the repository.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
