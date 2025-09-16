#!/usr/bin/env python3
"""
Backend API Testing Suite for Arshi Rastogi Portfolio
Tests all backend endpoints with proper data validation
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"
print(f"🔗 Testing API at: {API_BASE}")

class APITester:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.results = []
    
    def test_endpoint(self, method, endpoint, data=None, expected_status=200, test_name="", is_file_download=False):
        """Test an API endpoint and validate response"""
        url = f"{API_BASE}{endpoint}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, timeout=10)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            # Check status code
            if response.status_code == expected_status:
                self.passed += 1
                status = "✅ PASS"
                self.results.append({
                    "test": test_name or f"{method} {endpoint}",
                    "status": "PASS",
                    "response_code": response.status_code,
                    "response_data": "File download" if is_file_download else (response.json() if response.content else None)
                })
            else:
                self.failed += 1
                status = "❌ FAIL"
                self.results.append({
                    "test": test_name or f"{method} {endpoint}",
                    "status": "FAIL",
                    "expected_code": expected_status,
                    "actual_code": response.status_code,
                    "response_data": response.text[:500] if response.content else None
                })
            
            print(f"{status} {test_name or f'{method} {endpoint}'} - Status: {response.status_code}")
            
            # Print response for debugging
            if response.content and not is_file_download:
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            elif is_file_download:
                print(f"   Response: File download ({len(response.content)} bytes)")
            
            return response
            
        except requests.exceptions.RequestException as e:
            self.failed += 1
            status = "❌ ERROR"
            self.results.append({
                "test": test_name or f"{method} {endpoint}",
                "status": "ERROR",
                "error": str(e)
            })
            print(f"{status} {test_name or f'{method} {endpoint}'} - Error: {e}")
            return None
    
    def print_summary(self):
        """Print test summary"""
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total}")
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"Success Rate: {(self.passed/total*100):.1f}%" if total > 0 else "0%")
        
        if self.failed > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.results:
                if result["status"] in ["FAIL", "ERROR"]:
                    print(f"  - {result['test']}")
                    if "error" in result:
                        print(f"    Error: {result['error']}")
                    elif "actual_code" in result:
                        print(f"    Expected: {result['expected_code']}, Got: {result['actual_code']}")

def main():
    """Run all backend API tests"""
    print("🚀 Starting Arshi Rastogi Portfolio Backend API Tests")
    print(f"⏰ Test started at: {datetime.now()}")
    
    tester = APITester()
    
    # Test 1: Health Check
    print(f"\n📋 Testing Health Check Endpoint")
    tester.test_endpoint("GET", "/health", test_name="Health Check")
    
    # Test 2: Contact Form Submission
    print(f"\n📋 Testing Contact Form Endpoint")
    contact_data = {
        "name": "Arjun Sharma",
        "email": "arjun.sharma@example.com",
        "subject": "Career Guidance Inquiry",
        "message": "Hi Arshi, I'm a physics graduate interested in transitioning to data science. Could you help me understand the key skills I need to develop?"
    }
    tester.test_endpoint("POST", "/contact", data=contact_data, test_name="Contact Form Submission")
    
    # Test 3: Blog Posts
    print(f"\n📋 Testing Blog Posts Endpoint")
    tester.test_endpoint("GET", "/blog/posts", test_name="Get Blog Posts")
    
    # Test 4: Projects
    print(f"\n📋 Testing Projects Endpoint")
    tester.test_endpoint("GET", "/projects", test_name="Get Projects")
    
    # Test 5: Testimonials
    print(f"\n📋 Testing Testimonials Endpoint")
    tester.test_endpoint("GET", "/testimonials", test_name="Get Testimonials")
    
    # Test 6: Consultation Packages
    print(f"\n📋 Testing Consultation Packages Endpoint")
    tester.test_endpoint("GET", "/consultation/packages", test_name="Get Consultation Packages")
    
    # Test 7: Consultation Booking
    print(f"\n📋 Testing Consultation Booking Endpoint")
    booking_data = {
        "client_name": "Priya Patel",
        "client_email": "priya.patel@example.com",
        "package_id": 1,
        "payment_method": "stripe",
        "amount": 30,
        "currency": "USD"
    }
    tester.test_endpoint("POST", "/consultation/book", data=booking_data, test_name="Consultation Booking")
    
    # Test 8: Root endpoint
    print(f"\n📋 Testing Root API Endpoint")
    tester.test_endpoint("GET", "/", test_name="API Root")
    
    # Test 9: CV Download
    print(f"\n📋 Testing CV Download Endpoint")
    tester.test_endpoint("GET", "/cv/download", test_name="CV Download")
    
    # Additional validation tests
    print(f"\n📋 Testing Error Handling")
    
    # Test invalid contact form data
    invalid_contact = {
        "name": "",  # Invalid: empty name
        "email": "invalid-email",  # Invalid: bad email format
        "subject": "Test",
        "message": "Test message"
    }
    tester.test_endpoint("POST", "/contact", data=invalid_contact, expected_status=422, test_name="Invalid Contact Data")
    
    # Test invalid consultation booking
    invalid_booking = {
        "client_name": "Test User",
        "client_email": "test@example.com",
        "package_id": 999,  # Invalid: non-existent package
        "payment_method": "stripe",
        "amount": 30,
        "currency": "USD"
    }
    tester.test_endpoint("POST", "/consultation/book", data=invalid_booking, expected_status=400, test_name="Invalid Package ID")
    
    # Test non-existent blog post
    tester.test_endpoint("GET", "/blog/posts/non-existent-slug", expected_status=404, test_name="Non-existent Blog Post")
    
    # Print final summary
    tester.print_summary()
    
    # Return exit code based on test results
    return 0 if tester.failed == 0 else 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)