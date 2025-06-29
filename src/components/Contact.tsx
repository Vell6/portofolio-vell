
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'john.doe@example.com',
      link: 'mailto:john.doe@example.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'New York, NY',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse hover:animate-bounce transition-all duration-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 hover:opacity-100 hover:scale-150 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-700">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
            Have a project in mind? Let's collaborate and create something amazing together. 
            I'm always excited to work on new challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8 hover:text-blue-400 transition-colors duration-300">Let's Connect</h3>
            
            {contactInfo.map((info, index) => (
              <a
                key={info.title}
                href={info.link}
                className="group flex items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  <info.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">{info.title}</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{info.content}</p>
                </div>
              </a>
            ))}

            {/* CTA */}
            <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <h4 className="text-xl font-bold text-white mb-3 hover:text-blue-300 transition-colors duration-300">Ready to Start a Project?</h4>
              <p className="text-gray-300 mb-4 hover:text-white transition-colors duration-300">
                Let's discuss your ideas and bring them to life with cutting-edge technology and creative design.
              </p>
              <div className="flex space-x-4 items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"></div>
                <span className="text-green-400 font-medium hover:text-green-300 transition-colors duration-300">Available for new projects</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:bg-white/10 transition-all duration-500 focus:outline-none peer group-hover:bg-white/10 group-hover:border-white/30"
                    placeholder="Your Name"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:bg-white/10 transition-all duration-500 focus:outline-none peer group-hover:bg-white/10 group-hover:border-white/30"
                    placeholder="Your Email"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:bg-white/10 transition-all duration-500 focus:outline-none resize-none peer group-hover:bg-white/10 group-hover:border-white/30"
                  placeholder="Your Message"
                ></textarea>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                      Send Message
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
