import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Mail, Phone, MapPin, Send, Download, Linkedin, Github, Twitter } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { mockData } from '../mock';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { contact } = mockData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: result.message || "Thank you for your message. I'll get back to you soon!",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.detail || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = () => {
    // Mock CV download
    toast({
      title: "CV Downloaded!",
      description: "Arshi Rastogi's CV has been downloaded to your device.",
    });
    
    // In real implementation, this would download the actual CV file
    console.log('Downloading CV...');
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate or have questions? Let's start a conversation about your data science or astronomy journey
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">{contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">{contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-300">{contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                Connect With Me
              </h3>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full"
                  onClick={() => window.open(contact.linkedIn, '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white rounded-full"
                  onClick={() => window.open(contact.github, '_blank')}
                >
                  <Github className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full"
                  onClick={() => window.open(contact.twitter, '_blank')}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* CV Download */}
            <div>
              <Button 
                onClick={handleDownloadCV}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-400">
                Send a Message
              </CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and I'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-400"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-400 resize-none"
                    placeholder="Tell me about your project, questions, or how I can help you..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;