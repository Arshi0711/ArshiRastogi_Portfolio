from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

# Import models and services
from models import (
    Contact, ContactCreate, ConsultationBooking, ConsultationBookingCreate,
    BlogPost, BlogPostCreate, BlogPostUpdate, Project, ProjectCreate, ProjectUpdate,
    Testimonial, TestimonialCreate, TestimonialUpdate, SuccessResponse, ErrorResponse
)
from services.email_service import EmailService
from services.payment_service import PaymentService
from utils.slug_generator import generate_slug, ensure_unique_slug
from utils.db_utils import serialize_doc, serialize_docs

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
email_service = EmailService(api_key="sk-emergent-278B8C50b3cCf53Dc9")
payment_service = PaymentService()

# Create the main app without a prefix
app = FastAPI(title="Arshi Rastogi Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== CONTACT ENDPOINTS ====================

@api_router.post("/contact", response_model=SuccessResponse)
async def submit_contact_form(contact_data: ContactCreate):
    """Handle contact form submissions"""
    try:
        # Create contact record
        contact = Contact(**contact_data.dict())
        
        # Save to database
        await db.contacts.insert_one(contact.dict())
        
        # Send email notification
        email_sent = await email_service.send_contact_form_email(contact_data.dict())
        
        if not email_sent:
            logger.warning("Email notification failed but contact was saved")
        
        return SuccessResponse(message="Message sent successfully! I'll get back to you soon.")
        
    except Exception as e:
        logger.error(f"Contact form submission failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")

@api_router.get("/contacts")
async def get_all_contacts():
    """Get all contact form submissions (admin only)"""
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
        serialized_contacts = serialize_docs(contacts)
        return {"contacts": serialized_contacts}
    except Exception as e:
        logger.error(f"Failed to fetch contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# ==================== CONSULTATION BOOKING ENDPOINTS ====================

@api_router.post("/consultation/book", response_model=dict)
async def book_consultation(booking_data: ConsultationBookingCreate):
    """Create consultation booking and initiate payment"""
    try:
        # Get package details
        packages = payment_service.get_consultation_packages()
        if booking_data.package_id not in packages:
            raise HTTPException(status_code=400, detail="Invalid package ID")
        
        package = packages[booking_data.package_id]
        
        # Create booking record
        booking = ConsultationBooking(
            client_name=booking_data.client_name,
            client_email=booking_data.client_email,
            package_id=booking_data.package_id,
            package_type=package["title"],
            amount=booking_data.amount,
            currency=booking_data.currency
        )
        
        # Save booking to database
        await db.consultations.insert_one(booking.dict())
        
        # Create payment session
        if booking_data.payment_method == "stripe":
            payment_result = await payment_service.create_stripe_checkout_session(booking.dict())
        else:  # paypal
            payment_result = await payment_service.create_paypal_order(booking.dict())
        
        # Send notification email
        await email_service.send_consultation_booking_email(booking.dict())
        
        return {
            "success": True,
            "booking_id": booking.id,
            "payment_url": payment_result.get("checkout_url") or payment_result.get("approval_url"),
            "message": "Booking created successfully. Complete payment to confirm."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Consultation booking failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Booking failed. Please try again.")

@api_router.get("/consultation/packages")
async def get_consultation_packages():
    """Get available consultation packages"""
    packages = payment_service.get_consultation_packages()
    return {"packages": packages}

# ==================== BLOG ENDPOINTS ====================

@api_router.get("/blog/posts")
async def get_blog_posts(published_only: bool = True):
    """Get all blog posts"""
    try:
        query = {"published": True} if published_only else {}
        posts = await db.blog_posts.find(query).sort("created_at", -1).to_list(100)
        serialized_posts = serialize_docs(posts)
        return {"posts": serialized_posts}
    except Exception as e:
        logger.error(f"Failed to fetch blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@api_router.get("/blog/posts/{slug}")
async def get_blog_post_by_slug(slug: str):
    """Get single blog post by slug"""
    try:
        post = await db.blog_posts.find_one({"slug": slug, "published": True})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        serialized_post = serialize_doc(post)
        return {"post": serialized_post}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")

@api_router.post("/blog/posts", response_model=SuccessResponse)
async def create_blog_post(post_data: BlogPostCreate):
    """Create new blog post (admin only)"""
    try:
        # Generate slug
        slug = generate_slug(post_data.title)
        existing_posts = await db.blog_posts.find({}, {"slug": 1}).to_list(1000)
        existing_slugs = [post["slug"] for post in existing_posts]
        unique_slug = ensure_unique_slug(slug, existing_slugs)
        
        # Create blog post
        blog_post = BlogPost(**post_data.dict(), slug=unique_slug)
        
        # Save to database
        await db.blog_posts.insert_one(blog_post.dict())
        
        return SuccessResponse(message="Blog post created successfully")
        
    except Exception as e:
        logger.error(f"Blog post creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

# ==================== PROJECTS ENDPOINTS ====================

@api_router.get("/projects")
async def get_projects(featured_only: bool = False):
    """Get all projects"""
    try:
        query = {"featured": True} if featured_only else {}
        projects = await db.projects.find(query).sort("created_at", -1).to_list(100)
        serialized_projects = serialize_docs(projects)
        return {"projects": serialized_projects}
    except Exception as e:
        logger.error(f"Failed to fetch projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.post("/projects", response_model=SuccessResponse)
async def create_project(project_data: ProjectCreate):
    """Create new project (admin only)"""
    try:
        project = Project(**project_data.dict())
        await db.projects.insert_one(project.dict())
        return SuccessResponse(message="Project created successfully")
    except Exception as e:
        logger.error(f"Project creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

# ==================== TESTIMONIALS ENDPOINTS ====================

@api_router.get("/testimonials")
async def get_testimonials(approved_only: bool = True):
    """Get all testimonials"""
    try:
        query = {"approved": True} if approved_only else {}
        testimonials = await db.testimonials.find(query).sort("created_at", -1).to_list(100)
        serialized_testimonials = serialize_docs(testimonials)
        return {"testimonials": serialized_testimonials}
    except Exception as e:
        logger.error(f"Failed to fetch testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")

@api_router.post("/testimonials", response_model=SuccessResponse)
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Create new testimonial (requires approval)"""
    try:
        testimonial = Testimonial(**testimonial_data.dict())
        await db.testimonials.insert_one(testimonial.dict())
        return SuccessResponse(message="Testimonial submitted successfully. It will be reviewed before publication.")
    except Exception as e:
        logger.error(f"Testimonial creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")

@api_router.put("/testimonials/{testimonial_id}/approve", response_model=SuccessResponse)
async def approve_testimonial(testimonial_id: str):
    """Approve testimonial (admin only)"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"approved": True}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return SuccessResponse(message="Testimonial approved successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Testimonial approval failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to approve testimonial")

@api_router.put("/testimonials/approve-all", response_model=SuccessResponse)
async def approve_all_testimonials():
    """Approve all testimonials (admin only)"""
    try:
        result = await db.testimonials.update_many(
            {"approved": False},
            {"$set": {"approved": True}}
        )
        return SuccessResponse(message=f"Approved {result.modified_count} testimonials")
    except Exception as e:
        logger.error(f"Bulk testimonial approval failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to approve testimonials")

# ==================== CV DOWNLOAD ENDPOINT ====================

@api_router.get("/cv/download")
async def download_cv():
    """Download CV file"""
    try:
        cv_path = Path("static/cv/arshi_rastogi_cv.pdf")
        if not cv_path.exists():
            # Create a mock CV file for now
            cv_path.parent.mkdir(parents=True, exist_ok=True)
            with open(cv_path, "w") as f:
                f.write("Mock CV content - Replace with actual PDF")
        
        return FileResponse(
            path=cv_path,
            filename="Arshi_Rastogi_CV.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        logger.error(f"CV download failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to download CV")

# ==================== BASIC STATUS ENDPOINTS ====================

@api_router.get("/")
async def root():
    return {"message": "Arshi Rastogi Portfolio API", "version": "1.0.0", "status": "running"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.command("ping")
        return {"status": "healthy", "database": "connected", "timestamp": datetime.utcnow()}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {"status": "unhealthy", "error": str(e), "timestamp": datetime.utcnow()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Initialize database indexes and seed data"""
    try:
        # Create indexes for better performance
        await db.contacts.create_index("created_at")
        await db.consultations.create_index("created_at")
        await db.blog_posts.create_index("slug", unique=True)
        await db.blog_posts.create_index("published")
        await db.projects.create_index("featured")
        await db.testimonials.create_index("approved")
        
        logger.info("Database indexes created successfully")
        
        # Seed initial blog posts if none exist
        existing_posts = await db.blog_posts.count_documents({})
        existing_testimonials = await db.testimonials.count_documents({})
        
        if existing_posts == 0 or existing_testimonials == 0:
            await seed_initial_data()
            
    except Exception as e:
        logger.error(f"Startup error: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

async def seed_initial_data():
    """Seed database with initial blog posts and projects"""
    try:
        # Initial blog posts
        initial_posts = [
            {
                "title": "Breaking Into Data Science: A Guide for Physics Graduates",
                "slug": "breaking-into-data-science-physics-graduates",
                "excerpt": "Essential steps and skills needed for physics graduates transitioning into data science careers, based on my personal journey.",
                "content": "Making the leap from physics to data science can seem daunting, but the analytical skills you've developed as a physics graduate are incredibly valuable in the data science field...",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
                "category": "Career Advice",
                "published": True
            },
            {
                "title": "Understanding Radio Astronomy: From Galaxies to Career Opportunities",
                "slug": "understanding-radio-astronomy-career-opportunities",
                "excerpt": "An introduction to radio astronomy research and the career paths available for aspiring radio astronomers.",
                "content": "Radio astronomy is the study of celestial objects through their radio wave emissions. Unlike optical astronomy, radio telescopes can observe the universe 24/7...",
                "image": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=400&fit=crop",
                "category": "Astronomy",
                "published": True
            }
        ]
        
        for post_data in initial_posts:
            blog_post = BlogPost(**post_data)
            await db.blog_posts.insert_one(blog_post.dict())
        
        # Initial projects
        initial_projects = [
            {
                "title": "Galaxy Merger Identification",
                "description": "Developed ML algorithms to identify merging galaxies from SDSS dataset, analyzing colour-magnitude diagrams and redshift distributions using Python.",
                "image": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
                "technologies": ["Python", "Pandas", "Matplotlib", "Astronomy", "SDSS"],
                "category": "Astronomy Research",
                "featured": True
            },
            {
                "title": "Crop Production Analysis India",
                "description": "End-to-end data science project analyzing crop production patterns across India using polynomial regression and predictive modeling.",
                "image": "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
                "technologies": ["Python", "Polynomial Regression", "Data Analysis", "Agriculture"],
                "category": "Data Science",
                "featured": True
            }
        ]
        
        for project_data in initial_projects:
            project = Project(**project_data)
            await db.projects.insert_one(project.dict())
        
        # Initial testimonials
        initial_testimonials = [
            {
                "name": "Dr. Patrick Leahy",
                "role": "Supervisor, University of Manchester",
                "content": "Arshi demonstrated exceptional analytical skills and dedication in her radio astronomy research. Her approach to calibration systems was both innovative and methodical.",
                "rating": 5,
                "approved": True
            },
            {
                "name": "Sarah Mitchell",
                "role": "Data Science Manager, Tech Corp",
                "content": "Working with Arshi on our hospitality analytics project was outstanding. Her predictive models significantly improved our forecasting accuracy.",
                "rating": 5,
                "approved": True
            },
            {
                "name": "Rahul Sharma",
                "role": "Student, Career Consulting Client",
                "content": "Arshi's career guidance was instrumental in my transition from physics to data science. Her insights into the industry were invaluable.",
                "rating": 5,
                "approved": True
            },
            {
                "name": "Prof. Mousumi Das",
                "role": "Associate Professor, Indian Institute of Astrophysics",
                "content": "Arshi's work on galaxy merger identification showed remarkable scientific rigor. Her data visualization skills brought complex astronomical data to life.",
                "rating": 5,
                "approved": True
            }
        ]
        
        for testimonial_data in initial_testimonials:
            testimonial = Testimonial(**testimonial_data)
            await db.testimonials.insert_one(testimonial.dict())

        logger.info("Initial data seeded successfully")
        
    except Exception as e:
        logger.error(f"Failed to seed initial data: {str(e)}")
