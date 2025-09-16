import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { mockData } from '../mock';
import Header from './Header';
import Footer from './Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the blog post by slug
  const post = mockData.blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header activeSection="blog" scrollToSection={() => {}} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-8 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Blog Post Header */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-600 text-white">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden">
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              {/* Mock blog content based on the post topic */}
              <div className="space-y-6 text-gray-300 leading-relaxed">
                {post.slug === 'breaking-into-data-science-physics-graduates' && (
                  <>
                    <h2 className="text-2xl font-bold text-purple-400 mt-8 mb-4">The Physics to Data Science Transition</h2>
                    <p>Making the leap from physics to data science can seem daunting, but the analytical skills you've developed as a physics graduate are incredibly valuable in the data science field. In this comprehensive guide, I'll share the essential steps and insights from my own journey transitioning from radio astronomy research to data science consulting.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">1. Leverage Your Physics Background</h3>
                    <p>Your physics education has already given you a strong foundation in mathematical thinking, statistical analysis, and problem-solving. These are exactly the skills that employers look for in data scientists. The key is learning to apply these skills to business problems rather than scientific research questions.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">2. Master the Essential Tools</h3>
                    <p>While you may already know Python or MATLAB from your physics work, you'll need to become proficient in data science-specific libraries like pandas, scikit-learn, and matplotlib. I recommend starting with practical projects that interest you rather than just following tutorials.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">3. Build a Portfolio</h3>
                    <p>Create projects that demonstrate your ability to work with real-world data. My crop production analysis and hospitality analytics projects were instrumental in showcasing my skills to potential employers. Choose projects that align with industries you're interested in.</p>
                  </>
                )}
                
                {post.slug === 'understanding-radio-astronomy-career-opportunities' && (
                  <>
                    <h2 className="text-2xl font-bold text-purple-400 mt-8 mb-4">What is Radio Astronomy?</h2>
                    <p>Radio astronomy is the study of celestial objects through their radio wave emissions. Unlike optical astronomy, radio telescopes can observe the universe 24/7, regardless of weather conditions or daylight. This field has been responsible for some of the most significant discoveries in astrophysics, from pulsars to the cosmic microwave background.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">Career Paths in Radio Astronomy</h3>
                    <p>There are several exciting career paths available in radio astronomy, from research positions at observatories like Jodrell Bank to data analysis roles at institutions worldwide. My own experience at the University of Manchester working on the L-Band All Sky Survey opened doors to both academic and industry opportunities.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">Skills You'll Develop</h3>
                    <p>Radio astronomy develops crucial skills in signal processing, statistical analysis, and big data handling. These skills are highly transferable to industries like telecommunications, finance, and technology. The data analysis techniques I learned processing radio telescope data have been invaluable in my data science consulting work.</p>
                  </>
                )}
                
                {/* Default content for other posts */}
                {!['breaking-into-data-science-physics-graduates', 'understanding-radio-astronomy-career-opportunities'].includes(post.slug) && (
                  <>
                    <p>This is a comprehensive exploration of the topic, drawing from my experience in both astronomy research and data science consulting. The intersection of these fields offers unique insights that can benefit both aspiring scientists and data professionals.</p>
                    
                    <h2 className="text-2xl font-bold text-purple-400 mt-8 mb-4">Key Insights</h2>
                    <p>Through my work at institutions like the University of Manchester and various data science projects, I've learned that the most valuable skill is the ability to ask the right questions and approach complex problems systematically.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mt-6 mb-3">Practical Applications</h3>
                    <p>Whether you're analyzing galaxy merger data or predicting customer churn, the fundamental approach remains the same: understand your data, choose the right analytical methods, and communicate your findings effectively.</p>
                  </>
                )}
              </div>

              {/* Call to Action */}
              <div className="bg-gray-800/50 rounded-xl p-8 mt-12 text-center border border-gray-700">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  Want Personalized Guidance?
                </h3>
                <p className="text-gray-300 mb-6">
                  If you found this article helpful and want personalized advice for your career journey, consider booking a consultation with me.
                </p>
                <Button 
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('consultation');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-full"
                >
                  Schedule a Consultation
                </Button>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;