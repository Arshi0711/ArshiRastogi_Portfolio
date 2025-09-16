import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../mock';

const TestimonialsSection = () => {
  const { testimonials } = mockData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            What colleagues, clients, and students say about working with me
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <Quote className="h-12 w-12 text-purple-400/30" />
            </div>
            
            <CardContent className="p-12 text-center">
              <div className="space-y-8">
                {/* Stars Rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic font-medium">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-400">
                    <AvatarFallback className="bg-purple-600 text-white">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-purple-400">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-400">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* All Testimonials Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`bg-gray-800/30 border-gray-700 cursor-pointer transition-all duration-300 hover:border-purple-400/50 ${
                index === currentIndex ? 'border-purple-400 bg-gray-800/50' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-6 text-center">
                <Avatar className="h-12 w-12 mx-auto mb-4">
                  <AvatarFallback className="bg-cyan-600 text-white text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h4 className="font-semibold text-sm text-purple-400 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-gray-400 mb-3">
                  {testimonial.role}
                </p>
                
                <div className="flex justify-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;