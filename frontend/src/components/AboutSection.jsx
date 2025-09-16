import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, GraduationCap, Briefcase, Award } from 'lucide-react';
import { mockData } from '../mock';

const AboutSection = () => {
  const { about, education } = mockData;

  return (
    <section id="about" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={about.image}
                  alt="Arshi Rastogi"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-600/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-600/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {about.bio}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {about.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-purple-400" />
            Education
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xl font-semibold text-purple-400 group-hover:text-cyan-400 transition-colors">
                        {edu.degree}
                      </h4>
                      <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                        {edu.grade}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-gray-300">
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-400">{edu.location}</p>
                      <p className="text-sm text-purple-400">{edu.period}</p>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;