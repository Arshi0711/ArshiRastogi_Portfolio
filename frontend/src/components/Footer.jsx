import React from 'react';
import { Separator } from './ui/separator';
import { Heart, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  const { contact } = mockData;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Data Science Consulting',
    'Astronomy Career Guidance',
    'Technical Writing',
    'Online Tutoring'
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Arshi Rastogi
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Data Scientist, Astronomer, and Career Consultant helping professionals navigate the intersection of science and technology.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => window.open(contact.linkedIn, '_blank')}
                className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
              </button>
              
              <button
                onClick={() => window.open(contact.github, '_blank')}
                className="p-2 bg-gray-800 hover:bg-cyan-600 rounded-full transition-colors"
              >
                <Github className="h-5 w-5 text-gray-300 hover:text-white" />
              </button>
              
              <button
                onClick={() => window.open(contact.twitter, '_blank')}
                className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-cyan-400">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">{contact.email}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300 text-sm">{contact.phone}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">{contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Arshi Rastogi. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            Made with 
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            for advancing STEM careers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;