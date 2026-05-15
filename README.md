# TradeBlazer - Campus Student Marketplace

A modern peer-to-peer marketplace platform designed for university students to buy, sell, and trade products within their campus community. Built with React, Django, and Docker.

## Project Overview

TradeBlazer is a full-stack web application that connects students in a secure, trusted environment to buy and sell products. The platform features real-time messaging, product discovery, user profiles, and admin oversight.

**Problem Solved:** Students struggle to find trusted sellers and products within their campus community.

**Solution:** A dedicated, verified marketplace where students can connect directly with peers.

## Key Features

### User Features
- **Secure Authentication**: JWT-based authentication with email verification
- **User Profiles**: Complete profile management with profile picture upload
- **Product Posting**: Easy product listing with images, descriptions, and categories
- **Search & Filter**: Real-time search and category-based product discovery
- **Direct Chat**: Buyer-seller communication through built-in messaging system
- **Product Management**: Edit, delete, and manage your listings
- **Responsive Dashboard**: View all available products and sellers

### Admin Features
- **User Management**: Monitor all users and their profiles
- **Platform Oversight**: View all products and transactions
- **Content Moderation**: Manage problematic listings and handle disputes
- **Analytics**: Track platform activity and user engagement

### Technical Features
- **Docker Containerization**: Easy deployment with Docker Compose
- **Real-time Updates**: Hot reload for development
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Security**: CORS protection, JWT tokens, password hashing

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - REST API
- **JWT Authentication** - Secure token-based auth
- **MySQL 8.0** - Database
- **Redis** - Caching (optional)

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server/reverse proxy

## Project Structure

```
tradeblazer/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API services
│   │   ├── context/         # React Context
│   │   └── styles/          # CSS files
│   ├── Dockerfile           # Frontend container config
│   └── package.json         # Dependencies
├── backend/                  # Django application
│   ├── apps/
│   │   ├── users/           # User management
│   │   ├── posts/           # Product posts
│   │   ├── chat/            # Messaging
│   │   └── ...
│   ├── config/              # Django settings
│   ├── manage.py            # Django CLI
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend container config
│   └── .env                 # Environment variables
├── nginx/
│   └── default.conf         # Nginx configuration
├── docker-compose.yml       # Docker Compose config
└── README.md                # This file
```

## Getting Started

### Prerequisites
- Docker & Docker Compose installed
- Git
- No need to install Node.js or Python separately (they're in the containers)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tradeblazer
```

2. **Start the application with Docker Compose**
```bash
docker compose up --build
```

This will:
- Build frontend and backend images
- Start all services: Frontend, Backend, MySQL, Redis, Nginx
- Seed the database with initial data

3. **Run migrations** (first time only)
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic --noinput
```

4. **Create a superuser** (for admin access)
```bash
docker compose exec backend python manage.py createsuperuser
```

5. **Access the application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin
- **Nginx Proxy**: http://localhost

### Stop the application
```bash
docker compose down
```

## Usage

### User Registration
1. Click "Register" on the login page
2. Fill in your details: Name, Email, Student ID, Department, Phone, Address, Password
3. Password will be verified (must match confirmation, minimum 6 characters)
4. Account created successfully

### Login
1. Enter your email and password
2. Receive JWT access token
3. Redirected to dashboard

### Post a Product
1. Navigate to your profile
2. Click "+ Add Product"
3. Fill in: Title, Description, Price, Category, and upload product image
4. Click "Post Product"

### Browse & Search
1. View all products on the dashboard
2. Use search bar to find specific items
3. Filter by category
4. Click on product to see details and seller info

### Message a Seller
1. Click on a product
2. View seller information
3. Navigate to Chat
4. Send message directly to seller

### Edit Your Profile
1. Go to Profile page
2. Click "Edit Profile"
3. Update information, upload profile picture
4. Click "Save Changes"

## Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Stateless authentication
- **CORS Protection**: Only allowed domains can access API
- **Email Verification**: Verify user email on registration
- **User Authorization**: Only users can modify their own data
- **Admin Oversight**: Admins can moderate content

## API Endpoints

### Authentication
- `POST /api/register/` - Register new user
- `POST /api/login/` - Login user
- `POST /api/token/refresh/` - Refresh JWT token

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details
- `PATCH /api/users/{id}/` - Update user profile

### Products
- `GET /api/posts/` - List all products
- `GET /api/posts/{id}/` - Get product details
- `POST /api/posts/` - Create product
- `PATCH /api/posts/{id}/` - Update product
- `DELETE /api/posts/{id}/` - Delete product

### Chat
- `GET /api/chat/` - Get messages
- `POST /api/chat/` - Send message
- `GET /api/chat/{conversation_id}/` - Get conversation

## Testing

Run backend tests:
```bash
docker compose exec backend python manage.py test
```

## Troubleshooting

### Port already in use
```bash
# Change ports in docker-compose.yml or stop other services
docker compose down
docker compose up
```

### Database connection error
```bash
# Check MySQL is running
docker compose logs mysql

# Restart database
docker compose restart mysql
```

### Image not uploading
```bash
# Ensure media directory exists
docker compose exec backend mkdir -p /var/www/media/profiles

# Check permissions
docker compose exec backend chmod -R 755 /var/www/media
```

### Frontend not updating
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Restart frontend container
docker compose restart frontend
```

## Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=mysql
DB_PORT=3306
DB_NAME=tradeblazer
DB_USER=tradablazer_user
DB_PASSWORD=tradeblazer123
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=*
```

## Deployment

### Production Checklist
- [ ] Set `DEBUG=False` in Django settings
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Use environment variables for secrets
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure email backend for notifications
- [ ] Set up automated backups for MySQL
- [ ] Enable rate limiting on API
- [ ] Monitor logs and performance
- [ ] Set up CI/CD pipeline

### Deploy with Docker
```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Run production containers
docker compose -f docker-compose.prod.yml up -d
```

## Documentation

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com/)
- [JWT Authentication](https://jwt.io/)

## Team

- **John Dalisay** - Project Lead, Backend Development, Authentication, API Development
- **Shandie Brillantes** - Admin Features, Frontend Features
- **Syntyche Carnaje** - Profile Management, Frontend Features
- **Cypress Bullo** - Profile Management, Frontend Features
- **Jomari Arsula** - Support and Settings, Frontend Features

## License

This project is developed for educational purposes at [University of Science and Technology of Southern Philippines].

## Learning Outcomes

Through this project, the team learned:
- Full-stack web development with React and Django
- RESTful API design
- Database modeling and optimization
- Docker and containerization
- Real-time messaging systems
- JWT authentication
- Responsive web design
- Agile development practices
- Team collaboration and version control

## Future Enhancements

- [ ] Payment gateway integration (e-wallet, credit card, Stripe)
- [ ] Review and rating system for buyers/sellers
- [ ] Advanced matching algorithm
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Seller analytics dashboard
- [ ] Automated recommendation system
- [ ] Video chat for product negotiation
- [ ] Social features (follow sellers, wishlist)
- [ ] Multi-language support

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review project documentation
3. Check Django/React official docs
4. Contact team members

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Active Development
