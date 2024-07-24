# Ahmed Maghraby Portfolio Project

Welcome to my interactive portfolio! This project showcases my skills and projects using a modern and dynamic web interface built with Next.js and TypeScript. Below, you'll find details about the technologies and libraries used, as well as how to set up and run the project locally.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic Particle Backgrounds**: Eye-catching particle effects using `tsparticles`.
- **Smooth Animations**: Professional transitions powered by GSAP and Framer Motion.
- **Responsive Design**: Optimized for all devices.
- **Project Showcase**: Detailed sections for each project with descriptions and links.
- **Interactive Contact Section**: Easy-to-use animated contact form.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) 
- **JavaScript Library**: [React](https://reactjs.org/) 
- **TypeScript**: [TypeScript](https://www.typescriptlang.org/) 
- **Animations**:
  - [GSAP](https://greensock.com/gsap/)
  - [GSAP Trial](https://greensock.com/trial/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Scroller Motion](https://www.npmjs.com/package/scroller-motion) 
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
- **Firebase**: [Firebase](https://firebase.google.com/)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ahmedmaghraby/ahmed-maghraby-portfolio.git
    cd ahmed-maghraby-portfolio
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Build the project for production:
    ```bash
    npm run build
    ```

2. Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

3. Start the production server:
    ```bash
    npm start
    ```

## Project Structure

    ├── public/                # Public assets
    ├── src/
    │   ├── animations/        # Animation-related component
    │   ├── assets/            # Static assets used in the application
    │   ├── components/        # React components
    │   ├── helper/            # Helper functions and utilities
    │   ├── sections/          # Sections of the application (likely about section)
    │   ├── service/           # Service-related code (likely interacting with Firebase).
    │   └── types/             # TypeScript type definitions
    ├── .eslintrc.js           # ESLint configuration
    ├── .prettierrc            # Prettier configuration
    ├── next.config.js         # Next.js configuration
    ├── firebase.json          # hosting configuration file.
    ├── config.json            # Firebase configuration file.
    ├── tailwind.config.js     # Tailwind CSS configuration file
    ├── package.json           # NPM scripts and dependencies
    └── README.md              # Project documentation

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or feedback! Thank you for visiting my portfolio project.
