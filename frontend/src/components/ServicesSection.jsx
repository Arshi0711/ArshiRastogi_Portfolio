import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart3, Telescope, PenTool, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import { mockData } from '../mock';

const ServicesSection = () => {
  const { services } = mockData;

  const iconMap = {
    BarChart3: BarChart3,
    Telescope: Telescope,
    PenTool: PenTool,
    GraduationCap: GraduationCap
  };

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions combining data science expertise with astronomy insights and educational guidance
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <Card key={service.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 group hover:transform hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl group-hover:from-purple-600/30 group-hover:to-cyan-600/30 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-full transition-all duration-300 group"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;