import stripe
import logging
from typing import Dict, Optional
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class PaymentService:
    def __init__(self, stripe_secret_key: Optional[str] = None):
        if stripe_secret_key:
            stripe.api_key = stripe_secret_key
        else:
            # Mock mode for development
            logger.warning("Payment service initialized in mock mode")
    
    async def create_stripe_checkout_session(self, booking_data: Dict) -> Dict:
        """Create Stripe checkout session for consultation booking"""
        try:
            # Mock Stripe session creation for now
            mock_session = {
                "id": f"cs_mock_{booking_data['id']}",
                "url": f"https://checkout.stripe.com/pay/mock_session_{booking_data['id']}",
                "payment_status": "open"
            }
            
            logger.info(f"Created mock Stripe session for booking {booking_data['id']}")
            return {
                "success": True,
                "session_id": mock_session["id"],
                "checkout_url": mock_session["url"]
            }
            
        except Exception as e:
            logger.error(f"Failed to create Stripe session: {str(e)}")
            raise HTTPException(status_code=500, detail="Payment session creation failed")
    
    async def create_paypal_order(self, booking_data: Dict) -> Dict:
        """Create PayPal order for consultation booking"""
        try:
            # Mock PayPal order creation
            mock_order = {
                "id": f"paypal_mock_{booking_data['id']}",
                "approval_url": f"https://www.paypal.com/checkoutnow?token=mock_{booking_data['id']}",
                "status": "CREATED"
            }
            
            logger.info(f"Created mock PayPal order for booking {booking_data['id']}")
            return {
                "success": True,
                "order_id": mock_order["id"],
                "approval_url": mock_order["approval_url"]
            }
            
        except Exception as e:
            logger.error(f"Failed to create PayPal order: {str(e)}")
            raise HTTPException(status_code=500, detail="PayPal order creation failed")
    
    async def verify_stripe_payment(self, session_id: str) -> Dict:
        """Verify Stripe payment completion"""
        try:
            # Mock payment verification
            logger.info(f"Verifying mock Stripe payment: {session_id}")
            return {
                "success": True,
                "payment_status": "completed",
                "payment_id": session_id
            }
            
        except Exception as e:
            logger.error(f"Failed to verify Stripe payment: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def verify_paypal_payment(self, order_id: str) -> Dict:
        """Verify PayPal payment completion"""
        try:
            # Mock payment verification
            logger.info(f"Verifying mock PayPal payment: {order_id}")
            return {
                "success": True,
                "payment_status": "completed",
                "payment_id": order_id
            }
            
        except Exception as e:
            logger.error(f"Failed to verify PayPal payment: {str(e)}")
            return {"success": False, "error": str(e)}

    def get_consultation_packages(self) -> Dict:
        """Get consultation package details with pricing"""
        return {
            1: {
                "title": "Career Guidance Session",
                "duration": "60 minutes",
                "price_usd": 30,
                "price_inr": 2500,
                "description": "Personalized career counseling for astronomy and data science paths"
            },
            2: {
                "title": "Technical Mentoring",
                "duration": "60 minutes",
                "price_usd": 60,
                "price_inr": 5000,
                "description": "Deep-dive technical guidance on data science projects and methodologies"
            },
            3: {
                "title": "Curriculum Development",
                "duration": "90 minutes",
                "price_usd": 80,
                "price_inr": 6700,
                "description": "Custom curriculum design consultation for educational institutions and programs"
            }
        }