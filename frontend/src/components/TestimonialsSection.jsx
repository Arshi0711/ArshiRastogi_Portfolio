import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${BACKEND_URL}/api/testimonials`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Testimonials loaded:', data.testimonials);
          setTestimonials(data.testimonials || []);
          setCurrentIndex(0); // Reset to first testimonial
        } else {
          throw new Error('Failed to fetch testimonials');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % testimonials.length;
        console.log('Next testimonial:', prev, '->', newIndex);
        return newIndex;
      });
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => {
        const newIndex = (prev - 1 + testimonials.length) % testimonials.length;
        console.log('Prev testimonial:', prev, '->', newIndex);
        return newIndex;
      });
    }
  };

  // Auto-play testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const currentTestimonial = testimonials.length > 0 ? testimonials[currentIndex] || testimonials[0] : null;

  // If no testimonials, show placeholder
  if (loading) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
          </div>
          <div className="text-center py-12">
            <p className="text-gray-300">No testimonials available yet.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for client feedback!</p>
          </div>
        </div>
      </section>
    );
  }

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
        {testimonials.length > 0 && (
          <>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 relative overflow-hidden">
                <div className="absolute top-6 left-6">
                  <Quote className="h-12 w-12 text-purple-400/30" />
                </div>
                
                <CardContent className="p-12 text-center">
                  <div className="space-y-8">
                    {/* Stars Rating */}
                    <div className="flex justify-center gap-1">
                      {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed italic font-medium">
                      "{currentTestimonial ? currentTestimonial.content : 'Loading testimonial...'}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-purple-400">
                        <AvatarFallback className="bg-purple-600 text-white">
                          {currentTestimonial && currentTestimonial.name ? currentTestimonial.name.split(' ').map(n => n[0]).join('') : 'AR'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-purple-400">
                          {currentTestimonial ? currentTestimonial.name : 'Loading...'}
                        </h4>
                        <p className="text-gray-400">
                          {currentTestimonial ? currentTestimonial.role : 'Client'}
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
                disabled={testimonials.length <= 1}
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
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* All Testimonials Preview */}
        {testimonials.length > 1 && (
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
                      {testimonial?.name?.split(' ').map(n => n[0]).join('') || 'AR'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h4 className="font-semibold text-sm text-purple-400 mb-1">
                    {testimonial?.name || 'Anonymous'}
                  </h4>
                  <p className="text-xs text-gray-400 mb-3">
                    {testimonial?.role || 'Client'}
                  </p>
                  
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonial?.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;