import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Code, Brain, Languages } from 'lucide-react';
import { mockData } from '../mock';

const SkillsSection = () => {
  const { skills } = mockData;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technical proficiencies and specialized knowledge acquired through years of research and practice
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg">
                  <Code className="h-6 w-6 text-purple-400" />
                </div>
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skills.technical.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-sm text-purple-400">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg">
                  <Brain className="h-6 w-6 text-cyan-400" />
                </div>
                Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {skills.specializations.map((spec, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-colors justify-center py-2"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg">
                  <Languages className="h-6 w-6 text-purple-400" />
                </div>
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-gray-300 font-medium">{language.name}</span>
                    <Badge 
                      className={`${
                        language.level === 'Expert' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-cyan-600 text-white'
                      }`}
                    >
                      {language.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">3+</div>
            <div className="text-gray-400">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">8+</div>
            <div className="text-gray-400">Technical Skills</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">6+</div>
            <div className="text-gray-400">Specializations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
            <div className="text-gray-400">Certifications</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;