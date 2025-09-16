import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Filter } from 'lucide-react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${BACKEND_URL}/api/projects`);
        
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || []);
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of data science projects, astronomy research, and analytical solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  : 'border-purple-400 text-purple-400 hover:bg-purple-400/10'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                <Badge 
                  className="absolute top-4 left-4 bg-purple-600/90 text-white"
                >
                  {project.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-cyan-400/50 text-cyan-400 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="border-gray-500 text-gray-400 text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full transition-all duration-300 group"
                    onClick={() => {
                      // Mock click handler - will be replaced with actual project links
                      console.log(`Opening project: ${project.title}`);
                    }}
                  >
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              // Mock handler for viewing all projects
              console.log('View all projects');
            }}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;