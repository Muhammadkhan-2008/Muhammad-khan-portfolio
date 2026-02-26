export const portfolioData = {
  personal: {
    name: "Muhammad Khan",
    headline: "WordPress Developer • Front-End Developer",
    location: "Ghotki, Pakistan",
    phone: "0316 3347485",
    email: "khanmuhammadkolachi390@gmail.com",
    github: "Muhammadkhan-2008",
    linkedin: "muhammad-khan-82677439b",
    summary: "WordPress + frontend focus; fast, responsive, user-friendly sites; WordPress, HTML, CSS, Bootstrap, Tailwind (learning), JavaScript; design-to-code; mobile-first."
  },
  skills: [
    "React", "WordPress", "Elementor", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "Responsive Design", "UI/UX", "Git/GitHub"
  ],
  experience: [
    {
      role: "Frontend Developer Intern",
      company: "CodeAlpha",
      duration: "1 Month",
      description: "Developed responsive frontend components, translated designs into code, and collaborated on modern web interfaces with a focus on mobile-first design."
    },
    {
      role: "WordPress Intern",
      company: "Internee.pk",
      duration: "2 Months",
      description: "Built and customized WordPress themes, managed content, worked heavily with Elementor, and improved site performance and responsiveness."
    },
    {
      role: "Personal Frontend Projects",
      company: "Self",
      duration: "2024–Present",
      description: "Continuous learning and building of purely frontend projects utilizing modern JS frameworks, CSS methodologies, and design principles."
    }
  ],
  projects: [
    {
      slug: "amazing-business-landing-page",
      repo: "amazing-business-landing-page-project",
      title: "Amazing Business Landing",
      hook: "A high-conversion landing page designed for modern businesses. Built to drive engagement and capture leads efficiently.",
      techChoice: "HTML, CSS, Bootstrap for rapid layout structure and reliable responsive behavior across all devices.",
      hardestBug: "Ensuring perfect vertical rhythm and responsive typography across all mobile breakpoints without breaking the complex grid layout.",
      performanceWins: "Achieved a 98/100 Lighthouse performance score by optimizing image assets and eliminating render-blocking CSS.",
      links: { github: "#", live: "#" },
      categories: ["Frontend", "Landing Page"]
    },
    {
      slug: "oxford-university-clone",
      repo: "Oxford-university-clone-of-Front-end-",
      title: "Oxford University Clone",
      hook: "A pixel-perfect frontend clone of the Oxford University website. Focused deeply on semantic HTML and accessibility.",
      techChoice: "Pure HTML/CSS and vanilla JavaScript to deeply understand the DOM structure and traditional styling without relying on heavy frameworks.",
      hardestBug: "Replicating the exact dropdown navigation menu behavior for mobile touch devices and screen readers simultaneously.",
      performanceWins: "Implemented native lazy loading for heavy hero images which cut the initial load time by 40%.",
      links: { github: "#", live: "#" },
      categories: ["Clone", "UI/UX"]
    },
    {
      slug: "advance-calculator",
      repo: "Advance-calculator-",
      title: "Advance Calculator",
      hook: "A fully functional advanced calculator supporting memory and complex operations. Features a sleek, neumorphic-inspired UI.",
      techChoice: "JavaScript for complex mathematical logic and Tailwind CSS for rapid styling and robust interactive states.",
      hardestBug: "Handling edge cases in floating-point math precision and sequential operation chaining in the application state.",
      performanceWins: "Kept the bundle size extremely small (under 50kb) by using vanilla JS instead of importing heavy math libraries.",
      links: { github: "#", live: "#" },
      categories: ["App", "JavaScript"]
    },
    {
      slug: "muhammad-khans-portfolio",
      repo: "Muhammad-khan-s-Portfolio",
      title: "Personal Portfolio v1",
      hook: "My previous personal portfolio showcasing my evolution as a developer. A testament to clean design and functional UI.",
      techChoice: "React and Tailwind CSS to create a reusable component architecture and smooth routing experience.",
      hardestBug: "Implementing a custom scroll-spy navigation that dynamically updates the active link precisely as sections enter the viewport.",
      performanceWins: "Used React Suspense to code-split routes, achieving a near-instant first paint on initial page load.",
      links: { github: "#", live: "#" },
      categories: ["Portfolio", "React"]
    }
  ]
};