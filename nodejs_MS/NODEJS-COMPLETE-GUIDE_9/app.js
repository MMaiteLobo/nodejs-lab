const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MongoStore = require('connect-mongo');

const MONGODB_URI =
  'mongodb+srv://mai_:1234qwer@cluster0.yu6rkqe.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Session middleware must come before multer and CSRF
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      dbName: 'shop',
      collectionName: 'sessions',
      ttl: 60 * 60 * 24, // 1 día
      touchAfter: 24 * 3600 // Solo actualizar la sesión después de 24 horas
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(flash());

// CSRF protection for routes that don't handle file uploads
app.use((req, res, next) => {
  // Skip CSRF for routes that handle file uploads
  if (req.path === '/admin/add-product' && req.method === 'POST') {
    return next();
  }
  if (req.path === '/admin/edit-product' && req.method === 'POST') {
    return next();
  }
  
  // Apply CSRF protection for other routes
  csrfProtection(req, res, next);
});

app.use((req, res, next) => {
  try {
    res.locals.isAuthenticated = req.session && req.session.isLoggedIn;
    // Generate CSRF token only if CSRF protection is applied
    if (req.csrfToken) {
      res.locals.csrfToken = req.csrfToken();
    } else {
      res.locals.csrfToken = '';
    }
    next();
  } catch (error) {
    console.log('CSRF Token generation error:', error);
    res.locals.isAuthenticated = false;
    res.locals.csrfToken = '';
    next();
  }
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session || !req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

// Multer middleware will be applied in admin routes after CSRF

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

// CSRF error handler
app.use((error, req, res, next) => {
  if (error.code === 'EBADCSRFTOKEN') {
    console.log('CSRF Token validation failed');
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
    console.log('Body:', req.body);
    
    // For API requests, return JSON error
    if (req.xhr || req.path.startsWith('/api/')) {
      return res.status(403).json({ error: 'CSRF token validation failed' });
    }
    
    // For regular requests, redirect to login with error message
    if (req.flash) {
      req.flash('error', 'CSRF token validation failed. Please try again.');
    }
    return res.redirect('/login');
  }
  next(error);
});

app.use((error, req, res, next) => {
  console.log('=== ERROR HANDLING MIDDLEWARE ===');
  console.log('Error:', error);
  console.log('Error message:', error.message);
  console.log('Error stack:', error.stack);
  
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session && req.session.isLoggedIn,
    csrfToken: res.locals.csrfToken,
    error: error
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
