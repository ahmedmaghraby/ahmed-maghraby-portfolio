import ProjectCard from "./ProjectCard";
import { ProjectProps } from "../../types/project";
import React, { useEffect, useState } from "react";
import getProjects from "../../service/GetProjectDetails";
import { lex } from "../../helper/lex";
import AnimatedTitle from "../../animations/AnimatedTitle";

const ProjectGrid = () => {
  const [projects, setProjects] = useState<any>([]);
  useEffect(() => {
    getProjects("projects").then(({ result, error }) => {
      if (error) {
        console.log(error);
      } else {
        const res = result?.sort((a, b) => {
          if (Number(a.sortId) > Number(b?.sortId)) {
            return 1;
          } else {
            return -1;
          }
        });
        setProjects(res ? res : []);
      }
    });
  }, []);

  return (
    <>
      <div className="flex justify-center gap-16 mb-10 md:mb-16 lg:mb-20 ">
        <AnimatedTitle
          text={"Selected Work!"}
          className={` ${lex.className} text-center text-lg font-light text-t-color md:text-xl lg:text-4xl`}
          wordSpace={"mr-[8px]"}
          charSpace={"mr-[0.001em]"}
        />
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2">
        {projects.map((project: ProjectProps, index: number) => (
          <>
            <ProjectCard
              id={index}
              key={project.id}
              name={project.name}
              description={project.description}
              github={project.github}
              demo={project.demo}
              image={project.image}
              available={project.available}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default ProjectGrid;
