import {
  SiAdobeaftereffects,
  SiAdobefonts,
  SiAstro,
  SiCinema4D,
  SiCplusplus,
  SiFigma,
  SiFramer,
  SiGithub,
  SiGooglechrome,
  SiGooglefonts,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAndroid,
  SiAngular,
  SiApple,
  SiAppstore,
  SiAtlassian,
  SiCss3,
  SiCsharp,
  SiDotnet,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGoogleanalytics,
  SiGraphql,
  SiGulp,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiNuxtdotjs,
  SiNextdotjs,
  SiPostman,
  SiPrisma,
  SiPwa,
  SiReact,
  SiReactquery,
  SiRedux,
  SiStorybook,
  SiStylelint,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiVuetify,
  SiMicrosoftsqlserver,
  SiTailwindcss,
} from "react-icons/si";

const iconData = [
  {
    key: "Adobe After Effects",
    icon: <SiAdobeaftereffects />,
    link: "https://www.adobe.com/products/aftereffects.html",
  },
  {
    key: "Adobe Fonts",
    icon: <SiAdobefonts />,
    link: "https://fonts.adobe.com/",
  },
  { key: "Astro", icon: <SiAstro />, link: "https://astro.build/" },
  {
    key: "Cinema 4D",
    icon: <SiCinema4D />,
    link: "https://www.maxon.net/en/cinema-4d",
  },
  { key: "C++", icon: <SiCplusplus />, link: "https://isocpp.org/" },
  { key: "Figma", icon: <SiFigma />, link: "https://www.figma.com/" },
  { key: "Framer", icon: <SiFramer />, link: "https://www.framer.com/" },
  { key: "Github", icon: <SiGithub />, link: "https://github.com/" },
  {
    key: "Google Chrome",
    icon: <SiGooglechrome />,
    link: "https://www.google.com/chrome/",
  },
  {
    key: "Google Fonts",
    icon: <SiGooglefonts />,
    link: "https://fonts.google.com/",
  },
  {
    key: "Adobe Illustrator",
    icon: <SiAdobeillustrator />,
    link: "https://www.adobe.com/products/illustrator.html",
  },
  {
    key: "Adobe Photoshop",
    icon: <SiAdobephotoshop />,
    link: "https://www.adobe.com/products/photoshop.html",
  },
  { key: "Android", icon: <SiAndroid />, link: "https://www.android.com/" },
  { key: "Angular", icon: <SiAngular />, link: "https://angular.io/" },
  { key: "Apple", icon: <SiApple />, link: "https://www.apple.com/" },
  {
    key: "App Store",
    icon: <SiAppstore />,
    link: "https://www.apple.com/app-store/",
  },
  {
    key: "Atlassian",
    icon: <SiAtlassian />,
    link: "https://www.atlassian.com/",
  },
  {
    key: "CSS3",
    icon: <SiCss3 />,
    link: "https://www.w3.org/Style/CSS/Overview.en.html",
  },
  {
    key: "C#",
    icon: <SiCsharp />,
    link: "https://docs.microsoft.com/en-us/dotnet/csharp/",
  },
  { key: "Dotnet", icon: <SiDotnet />, link: "https://dotnet.microsoft.com/" },
  {
    key: "Firebase",
    icon: <SiFirebase />,
    link: "https://firebase.google.com/",
  },
  { key: "Flutter", icon: <SiFlutter />, link: "https://flutter.dev/" },
  { key: "Git", icon: <SiGit />, link: "https://git-scm.com/" },
  {
    key: "Google Analytics",
    icon: <SiGoogleanalytics />,
    link: "https://analytics.google.com/",
  },
  { key: "GraphQL", icon: <SiGraphql />, link: "https://graphql.org/" },
  { key: "Gulp", icon: <SiGulp />, link: "https://gulpjs.com/" },
  {
    key: "HTML5",
    icon: <SiHtml5 />,
    link: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
  },
  {
    key: "JavaScript",
    icon: <SiJavascript />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { key: "jQuery", icon: <SiJquery />, link: "https://jquery.com/" },
  { key: "Nuxt.js", icon: <SiNuxtdotjs />, link: "https://nuxtjs.org/" },
  { key: "Next.js", icon: <SiNextdotjs />, link: "https://nextjs.org/" },
  { key: "Postman", icon: <SiPostman />, link: "https://www.postman.com/" },
  { key: "Prisma", icon: <SiPrisma />, link: "https://www.prisma.io/" },
  {
    key: "PWA",
    icon: <SiPwa />,
    link: "https://web.dev/progressive-web-apps/",
  },
  { key: "React", icon: <SiReact />, link: "https://reactjs.org/" },
  { key: "React Native", icon: <SiReact />, link: "https://reactnative.dev/" },
  {
    key: "React Query",
    icon: <SiReactquery />,
    link: "https://react-query.tanstack.com/",
  },
  { key: "Redux", icon: <SiRedux />, link: "https://redux.js.org/" },
  {
    key: "Storybook",
    icon: <SiStorybook />,
    link: "https://storybook.js.org/",
  },
  { key: "Stylelint", icon: <SiStylelint />, link: "https://stylelint.io/" },
  {
    key: "TypeScript",
    icon: <SiTypescript />,
    link: "https://www.typescriptlang.org/",
  },
  { key: "Vercel", icon: <SiVercel />, link: "https://vercel.com/" },
  { key: "Vite", icon: <SiVite />, link: "https://vitejs.dev/" },
  { key: "Vue.js", icon: <SiVuedotjs />, link: "https://vuejs.org/" },
  { key: "Vuetify", icon: <SiVuetify />, link: "https://vuetifyjs.com/" },
  {
    key: "Microsoft SQL Server",
    icon: <SiMicrosoftsqlserver />,
    link: "https://www.microsoft.com/en-us/sql-server",
  },
  {
    key: "Tailwind CSS",
    icon: <SiTailwindcss />,
    link: "https://tailwindcss.com/",
  },
];

export default iconData;
export const iconMapper = (tech: string) => {
  const icon = iconData.find((item) => item.key.toLowerCase() === tech.toLowerCase());
  if (icon) {
    return icon;
  } else {
    return {
      key: "Tailwind CSS",
      icon: <SiTailwindcss />,
      link: "https://tailwindcss.com/",
    };
  }
};