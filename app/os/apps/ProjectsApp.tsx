'use client';

import { useEffect, useState } from 'react';
import getProjects from '../../service/GetProjectDetails';
import { ProjectProps } from '../../types/project';

export default function ProjectsApp() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProjectProps | null>(null);

  useEffect(() => {
    getProjects('projects').then(({ result }) => {
      if (result) setProjects(result as ProjectProps[]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#06090f' }}>
        <div className="font-mono text-center space-y-2">
          <div
            className="inline-block w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'rgba(245,211,147,0.4)', borderTopColor: 'transparent' }}
          />
          <div style={{ fontSize: 11, color: 'rgba(74,243,255,0.4)', letterSpacing: '0.4em' }}>
            FETCHING PROJECTS
          </div>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="h-full flex flex-col" style={{ background: '#06090f' }}>
        {/* Back button */}
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 px-4 py-3 font-mono transition-colors duration-150"
          style={{
            fontSize: 11,
            color: 'rgba(74,243,255,0.6)',
            borderBottom: '1px solid rgba(245,211,147,0.08)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(74,243,255,0.9)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(74,243,255,0.6)';
          }}
        >
          ‹ Back to Projects
        </button>

        {/* Detail */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'none' }}>
          {selected.image && (
            <div
              className="w-full rounded-lg overflow-hidden"
              style={{
                height: 160,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h2 className="font-mono font-bold" style={{ fontSize: 18, color: '#f5d393' }}>
            {selected.name}
          </h2>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            {selected.description}
          </p>

          {selected.techNames?.length > 0 && (
            <div>
              <div
                className="font-mono mb-2 tracking-widest uppercase"
                style={{ fontSize: 10, color: 'rgba(245,211,147,0.4)' }}
              >
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.techNames.map(tech => (
                  <span
                    key={tech}
                    className="font-mono px-2.5 py-0.5 rounded"
                    style={{
                      fontSize: 11,
                      color: 'rgba(74,243,255,0.7)',
                      background: 'rgba(74,243,255,0.07)',
                      border: '1px solid rgba(74,243,255,0.15)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {selected.github && (
              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-mono py-2 rounded-lg text-center transition-all duration-150"
                style={{
                  fontSize: 12,
                  color: 'rgba(245,211,147,0.8)',
                  background: 'rgba(245,211,147,0.07)',
                  border: '1px solid rgba(245,211,147,0.15)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,211,147,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,211,147,0.07)';
                }}
              >
                GitHub ↗
              </a>
            )}
            {selected.demo && (
              <a
                href={selected.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-mono py-2 rounded-lg text-center transition-all duration-150"
                style={{
                  fontSize: 12,
                  color: 'rgba(74,243,255,0.8)',
                  background: 'rgba(74,243,255,0.07)',
                  border: '1px solid rgba(74,243,255,0.15)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(74,243,255,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(74,243,255,0.07)';
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#06090f', scrollbarWidth: 'none' }}>
      <div className="p-5 space-y-3">
        <div
          className="font-mono tracking-widest uppercase mb-4"
          style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
        >
          {projects.length} Projects
        </div>

        {projects.length === 0 ? (
          <div
            className="font-mono text-center py-16"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}
          >
            No projects found.
          </div>
        ) : (
          projects.map(project => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="w-full text-left rounded-xl p-4 transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(245,211,147,0.05)';
                el.style.borderColor = 'rgba(245,211,147,0.15)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono font-bold" style={{ fontSize: 14, color: '#f5d393' }}>
                  {project.name}
                </h3>
                {!project.available && (
                  <span
                    className="font-mono px-2 py-0.5 rounded shrink-0"
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,95,87,0.7)',
                      background: 'rgba(255,95,87,0.08)',
                      border: '1px solid rgba(255,95,87,0.15)',
                    }}
                  >
                    private
                  </span>
                )}
              </div>
              <p
                className="mt-1 line-clamp-2"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
              >
                {project.description}
              </p>
              {project.techNames?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techNames.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="font-mono px-2 py-0.5 rounded"
                      style={{
                        fontSize: 10,
                        color: 'rgba(74,243,255,0.55)',
                        background: 'rgba(74,243,255,0.05)',
                        border: '1px solid rgba(74,243,255,0.1)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techNames.length > 4 && (
                    <span
                      className="font-mono px-2 py-0.5 rounded"
                      style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}
                    >
                      +{project.techNames.length - 4}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
