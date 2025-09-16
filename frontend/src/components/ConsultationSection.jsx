import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, DollarSign, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ConsultationSection = () => {
  const [isBookingStarted, setIsBookingStarted] = useState(false);
  const { toast } = useToast();

  const consultationPackages = [
    {
      id: 1,
      title: "Career Guidance Session",
      duration: "60 minutes",
      price: 30,
      priceINR: "₹2,500",
      description: "Personalized career counseling for astronomy and data science paths",
      features: [
        "Career roadmap development",
        "Industry insights and trends",
        "Academic planning advice",
        "Interview preparation tips",
        "Follow-up resources"
      ],
      popular: true
    },
    {
      id: 2,
      title: "Technical Mentoring",
      duration: "60 minutes", 
      price: 60,
      priceINR: "₹5,000",
      description: "Deep-dive technical guidance on data science projects and methodologies",
      features: [
        "Code review and optimization",
        "ML model development guidance",
        "Data analysis best practices",
        "Technical problem solving",
        "Industry tools and frameworks"
      ],
      popular: false
    },
    {
      id: 3,
      title: "Curriculum Development",
      duration: "90 minutes",
      price: 80,
      priceINR: "₹6,700",
      description: "Custom curriculum design consultation for educational institutions and programs",
      features: [
        "Course structure development",
        "Learning objectives design",
        "Assessment strategy planning",
        "Educational standards alignment",
        "Implementation roadmap"
      ],
      popular: false
    }
  ];

  const handleBookConsultation = async (packageInfo) => {
    setIsBookingStarted(true);
    
    try {
      // First, collect client information (in a real app, this would be a modal/form)
      const clientName = prompt("Please enter your full name:");
      const clientEmail = prompt("Please enter your email address:");
      
      if (!clientName || !clientEmail) {
        toast({
          title: "Booking Cancelled",
          description: "Name and email are required to proceed with booking.",
          variant: "destructive"
        });
        setIsBookingStarted(false);
        return;
      }

      toast({
        title: "Booking Started!",
        description: `Creating booking for ${packageInfo.title} - $${packageInfo.price}`,
      });

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/consultation/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          package_id: packageInfo.id,
          payment_method: "stripe", // Default to Stripe
          amount: packageInfo.price,
          currency: "USD"
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Booking Created!",
          description: "Redirecting to payment...",
        });
        
        // In a real implementation, redirect to payment URL
        setTimeout(() => {
          toast({
            title: "Payment Processing",
            description: "You will be redirected to complete payment and schedule your session.",
          });
        }, 1000);
        
      } else {
        throw new Error(result.detail || 'Failed to create booking');
      }
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBookingStarted(false);
    }
  };

  return (
    <section id="consultation" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule a <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Consultation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get personalized guidance for your career in data science, astronomy, or STEM education
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Consultation Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {consultationPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 group relative ${
                pkg.popular ? 'border-purple-400/50 shadow-lg shadow-purple-400/10' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                  {pkg.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {pkg.description}
                </CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    ${pkg.price} / {pkg.priceINR}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleBookConsultation(pkg)}
                    disabled={isBookingStarted}
                    className={`w-full font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 group ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
                        : 'bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                    }`}
                  >
                    {isBookingStarted ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-400">
            How It Works
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-purple-400">Choose Package</h4>
              <p className="text-sm text-gray-300">Select the consultation type that best fits your needs</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-cyan-400">Secure Payment</h4>
              <p className="text-sm text-gray-300">Pay securely via Stripe or PayPal</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-purple-400">Schedule Time</h4>
              <p className="text-sm text-gray-300">Pick a convenient time using Calendly integration</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-cyan-400">Get Guidance</h4>
              <p className="text-sm text-gray-300">Receive personalized advice and actionable insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;