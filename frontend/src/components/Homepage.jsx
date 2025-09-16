import React, { useState, useEffect } from 'react';
import { ChevronDown, Star, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import ConsultationSection from './ConsultationSection';

const Homepage = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'blog', 'skills', 'consultation', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <BlogSection />
        <SkillsSection />
        <ConsultationSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;