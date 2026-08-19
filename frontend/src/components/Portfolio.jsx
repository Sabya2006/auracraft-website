import React, { useState } from 'react';
import { Utensils, Building2, Coffee, ExternalLink, Play, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { initialPortfolio } from '../data/mockData';

export default function Portfolio({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? initialPortfolio
    : initialPortfolio.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#060812]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-tag badge-cyan mb-3">
            Proven Industry Client Results
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Showcase of Selected Client Projects
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Explore how we engineered modern web platforms that generated measurable revenue growth for leading restaurants, wholesalers, and cafes.
          </p>
        </div>

        {/* Industry Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl border-white/10">
            {['All', 'Restaurant', 'Wholesaler', 'Cafe'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter === 'All' ? 'All Client Projects' : filter === 'Restaurant' ? 'Restaurants' : filter === 'Wholesaler' ? 'Wholesalers' : 'Cafes'}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel group overflow-hidden border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview & Interactive Play Overlay */}
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1326] via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`badge-tag ${
                    project.category === 'Restaurant' ? 'badge-gold' : project.category === 'Wholesaler' ? 'badge-cyan' : 'badge-emerald'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Live Demo Trigger Button */}
                <button
                  onClick={() => onSelectProject(project)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                >
                  <span className="gradient-btn-gold px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-2xl">
                    <Play className="w-4 h-4 fill-black" />
                    Launch Interactive Demo
                  </span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-2">{project.tagline}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-3 gap-2 bg-[#070a16] p-3 rounded-xl border border-white/5 text-center">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-extrabold text-amber-400">{m.value}</p>
                      <p className="text-[10px] text-gray-400 truncate">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Testimonial Quote */}
                {project.testimonial && (
                  <div className="border-t border-white/10 pt-3 text-xs italic text-gray-300">
                    "{project.testimonial.quote}"
                    <p className="text-[10px] text-amber-400 not-italic font-bold mt-1">
                      — {project.testimonial.author}, {project.testimonial.role}
                    </p>
                  </div>
                )}

                {/* Action Trigger */}
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full bg-white/5 hover:bg-amber-500/20 text-gray-200 hover:text-amber-400 border border-white/10 hover:border-amber-500/40 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Drive Web Prototype</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
