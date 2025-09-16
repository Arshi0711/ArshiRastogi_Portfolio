import requests
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.emergent.sh/v1"
        
    async def send_contact_form_email(self, contact_data: Dict) -> bool:
        """Send contact form notification email to Arshi"""
        try:
            email_content = f"""
New Contact Form Submission

From: {contact_data['name']} ({contact_data['email']})
Subject: {contact_data['subject']}

Message:
{contact_data['message']}

---
Sent from Arshi Rastogi Portfolio Website
"""
            
            payload = {
                "to": "shranviras007@gmail.com",
                "subject": f"New Contact: {contact_data['subject']}",
                "body": email_content,
                "from_name": "Arshi Portfolio Website"
            }
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            # Using a mock email API call for now - will be replaced with actual Emergent API
            logger.info(f"Sending contact form email to shranviras007@gmail.com")
            logger.info(f"Subject: {payload['subject']}")
            logger.info(f"From: {contact_data['name']} ({contact_data['email']})")
            
            # Simulate successful email sending
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact form email: {str(e)}")
            return False
    
    async def send_consultation_booking_email(self, booking_data: Dict) -> bool:
        """Send consultation booking confirmation email"""
        try:
            email_content = f"""
New Consultation Booking

Client: {booking_data['client_name']} ({booking_data['client_email']})
Package: {booking_data['package_type']}
Amount: ${booking_data['amount']} {booking_data['currency']}
Payment Status: {booking_data['payment_status']}

Booking ID: {booking_data['id']}
Date: {booking_data['created_at']}

---
Next Steps: Client will receive Calendly link to schedule the session.
"""
            
            payload = {
                "to": "shranviras007@gmail.com",
                "subject": f"New Consultation Booking - {booking_data['package_type']}",
                "body": email_content,
                "from_name": "Arshi Portfolio Website"
            }
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            logger.info(f"Sending consultation booking email")
            logger.info(f"Client: {booking_data['client_name']}")
            logger.info(f"Package: {booking_data['package_type']}")
            
            # Simulate successful email sending
            return True
            
        except Exception as e:
            logger.error(f"Failed to send consultation booking email: {str(e)}")
            return False
    
    async def send_client_confirmation_email(self, client_email: str, booking_data: Dict) -> bool:
        """Send confirmation email to client"""
        try:
            email_content = f"""
Thank you for booking a consultation with Arshi Rastogi!

Booking Details:
- Package: {booking_data['package_type']}
- Amount: ${booking_data['amount']} {booking_data['currency']}
- Booking ID: {booking_data['id']}

Next Steps:
1. You will receive a Calendly link shortly to schedule your session
2. Please check your email for the scheduling link
3. If you have any questions, reply to this email

Looking forward to our session!

Best regards,
Arshi Rastogi
Data Scientist | Astronomer | Career Consultant
"""
            
            payload = {
                "to": client_email,
                "subject": "Consultation Booking Confirmed - Arshi Rastogi",
                "body": email_content,
                "from_name": "Arshi Rastogi"
            }
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            logger.info(f"Sending client confirmation email to {client_email}")
            
            # Simulate successful email sending
            return True
            
        except Exception as e:
            logger.error(f"Failed to send client confirmation email: {str(e)}")
            return False