# Backend Development Contracts for Arshi Rastogi Portfolio

## API Contracts Overview

### Base URL: `/api`
All backend routes must be prefixed with `/api` to comply with Kubernetes ingress rules.

## 1. Contact Form API

### Endpoint: `POST /api/contact`
**Purpose**: Handle contact form submissions and send emails

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Integration**:
- Replace mock form submission in `ContactSection.jsx`
- Use Emergent LLM key for email delivery
- Send emails to: shranviras007@gmail.com

## 2. Consultation Booking API

### Endpoint: `POST /api/consultation/book`
**Purpose**: Handle consultation booking with payment integration

**Request Body**:
```json
{
  "packageId": "number (1, 2, or 3)",
  "clientName": "string (required)",
  "clientEmail": "string (required)",
  "paymentMethod": "string (stripe/paypal)",
  "amount": "number",
  "currency": "string (USD/INR)"
}
```

**Response**:
```json
{
  "success": true,
  "paymentUrl": "string (Stripe/PayPal checkout URL)",
  "bookingId": "string"
}
```

**Integration**:
- Replace mock payment flow in `ConsultationSection.jsx`
- Integrate with Stripe + PayPal
- After successful payment, integrate with Calendly
- Send booking confirmation to: shranviras007@gmail.com

## 3. Blog Management API

### Get All Posts: `GET /api/blog/posts`
**Response**:
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "content": "string",
      "author": "string",
      "date": "string (ISO date)",
      "readTime": "string",
      "image": "string (URL)",
      "category": "string",
      "published": "boolean"
    }
  ]
}
```

### Get Single Post: `GET /api/blog/posts/:slug`
### Create Post: `POST /api/blog/posts` (Admin only)
### Update Post: `PUT /api/blog/posts/:id` (Admin only)
### Delete Post: `DELETE /api/blog/posts/:id` (Admin only)

**Integration**:
- Replace mock blog data in `BlogSection.jsx` and `BlogPost.jsx`
- Implement basic CMS functionality for Arshi to manage posts

## 4. Projects Management API

### Get All Projects: `GET /api/projects`
**Response**:
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string (URL)",
      "technologies": ["string"],
      "category": "string",
      "link": "string (optional)",
      "featured": "boolean"
    }
  ]
}
```

### CRUD operations for project management

**Integration**:
- Replace mock projects data in `ProjectsSection.jsx`

## 5. Testimonials Management API

### Get All Testimonials: `GET /api/testimonials`
**Response**:
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "content": "string",
      "rating": "number (1-5)",
      "approved": "boolean"
    }
  ]
}
```

**Integration**:
- Replace mock testimonials in `TestimonialsSection.jsx`
- Allow new testimonial submissions

## 6. CV Download API

### Endpoint: `GET /api/cv/download`
**Purpose**: Serve CV file for download

**Response**: File stream (PDF)

**Integration**:
- Replace mock CV download in `ContactSection.jsx`
- Store CV file in backend and serve it

## MongoDB Models Required

### 1. Contact Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date,
  responded: Boolean
}
```

### 2. Consultation Model
```javascript
{
  clientName: String,
  clientEmail: String,
  packageType: String,
  amount: Number,
  currency: String,
  paymentStatus: String,
  paymentId: String,
  calendlyEventId: String,
  scheduledDate: Date,
  createdAt: Date
}
```

### 3. BlogPost Model
```javascript
{
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  image: String,
  category: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Project Model
```javascript
{
  title: String,
  description: String,
  image: String,
  technologies: [String],
  category: String,
  link: String,
  featured: Boolean,
  createdAt: Date
}
```

### 5. Testimonial Model
```javascript
{
  name: String,
  role: String,
  content: String,
  rating: Number,
  approved: Boolean,
  createdAt: Date
}
```

## Frontend Integration Points

### Files to Update:
1. `ContactSection.jsx` - Replace mock form submission
2. `ConsultationSection.jsx` - Replace mock booking flow
3. `BlogSection.jsx` - Fetch real blog posts
4. `BlogPost.jsx` - Fetch individual blog post content
5. `ProjectsSection.jsx` - Fetch real projects
6. `TestimonialsSection.jsx` - Fetch real testimonials

### Mock Data Removal:
- Remove or replace all data from `mock.js`
- Keep basic structure for fallback/loading states

## Third-Party Integrations

### 1. Email Service (using Emergent LLM key):
- Contact form submissions
- Consultation booking confirmations
- Send to: shranviras007@gmail.com

### 2. Payment Processing:
- Stripe integration for card payments
- PayPal integration for PayPal payments
- Support both USD and INR currencies

### 3. Calendly Integration:
- After successful payment, redirect to Calendly
- Integration with booking system

## Environment Variables Needed

```
# Already configured - DO NOT MODIFY
MONGO_URL=existing_mongo_connection
DB_NAME=existing_db_name

# New variables to add
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
CALENDLY_ACCESS_TOKEN=...
EMERGENT_LLM_KEY=... (for email service)
```

## Implementation Priority

1. **Phase 1**: Contact form + Email integration
2. **Phase 2**: Blog management system
3. **Phase 3**: Consultation booking + Payment
4. **Phase 4**: Projects & Testimonials CRUD
5. **Phase 5**: CV download functionality

## Testing Requirements

- Test all API endpoints with proper error handling
- Ensure email delivery works correctly
- Test payment flow end-to-end
- Verify frontend-backend integration
- Test responsive design with real data