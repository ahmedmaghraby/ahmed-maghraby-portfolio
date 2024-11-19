import ProjectGrid from "../components/work/ProjectGrid";
import React from "react";

const Work = () => {
    return (
        <section
            className="relative z-10 flex flex-col items-center justify-center w-full py-16 bg-center bg-cover md:py-20 lg:py-20"
            id="work"
        >

            <ProjectGrid />
        </section>
    );
};

export default Work;
