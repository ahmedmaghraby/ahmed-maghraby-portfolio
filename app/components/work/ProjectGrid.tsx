import ProjectCard from "./ProjectCard";
import { ProjectProps } from "../../types/project";
import React, { useEffect, useState } from "react";
import getProjects from "../../service/GetProjectDetails";
import { Roboto } from "../../helper/font";
import AnimatedTitle from "../../animations/AnimatedTitle";

const ProjectGrid = () => {
  const [projects, setProjects] = useState<any>([]);
  useEffect(() => {
    getProjects("projects").then(({ result, error }) => {
      if (error) {
        console.log(error);
      } else {
        const res = result;
        console.log(res);

        setProjects(res ? res: []);
      }
    });
  }, []);

  return (
    <>
      <div className="mb-10 flex gap-16 text-[#e4ded7] md:mb-16  lg:mb-20 ">
      <AnimatedTitle
          text={"Selected Work"}
          className={`${Roboto.className} font-light text-lg md:text-xl lg:text-2xl text-t-color}`}

          wordSpace={"mr-[8px]"}
          charSpace={"mr-[0.001em]"}
        />
      </div>

      <div className="grid w-[90%] grid-cols-1 grid-rows-2 gap-y-10 gap-x-6 lg:max-w-[1200px] lg:grid-cols-1">
        {projects.map((project: ProjectProps, index: number) => (
          <ProjectCard
            id={index}
            key={project.id}
            name={project.name}
            description={project.description}
            techNames={project.techNames}
            github={project.github}
            demo={project.demo}
            image={project.image}
            available={project.available}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectGrid;
