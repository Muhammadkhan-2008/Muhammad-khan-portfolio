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
      slug: "corporate-wp-solution",
      repo: "corporate-wp-site",
      title: "Corporate WordPress Solution",
      hook: "A high-performance corporate website built with custom WordPress architecture for maximum scalability and speed.",
      techChoice: "WordPress, Elementor Pro, and Custom CSS for a unique brand identity and pixel-perfect responsiveness.",
      hardestBug: "Optimizing the database queries for custom post types while maintaining a sub-1s load time on shared hosting.",
      performanceWins: "Implemented advanced caching and image optimization, achieving a 99/100 Mobile speed score.",
      links: { github: "https://github.com/Muhammadkhan-2008", live: "#" },
      categories: ["WordPress", "Business"]
    },
    {
      slug: "ecommerce-wp-store",
      repo: "wp-ecommerce-store",
      title: "Premium E-commerce Store",
      hook: "A fully functional WooCommerce store with custom checkout flows and dynamic product filtering.",
      techChoice: "WooCommerce, JavaScript, and custom PHP templates to extend standard store functionality.",
      hardestBug: "Syncing real-time inventory levels across multiple product variations without impacting page render speed.",
      performanceWins: "Reduced checkout abandonment by 25% through simplified UI and optimized mobile payment gateways.",
      links: { github: "https://github.com/Muhammadkhan-2008", live: "#" },
      categories: ["WordPress", "E-commerce"]
    },
    {
      slug: "modern-blog-platform",
      repo: "modern-wp-blog",
      title: "Modern Content Platform",
      hook: "A content-first blog platform designed for readability and SEO dominance in competitive niches.",
      techChoice: "Gutenberg blocks and custom Tailwind-infused WordPress theme for lightning-fast content delivery.",
      hardestBug: "Ensuring complex typography remained readable and perfectly aligned across over 50 different device screen sizes.",
      performanceWins: "Achieved 'Passed' status on all Core Web Vitals from day one of launch.",
      links: { github: "https://github.com/Muhammadkhan-2008", live: "#" },
      categories: ["WordPress", "Blog"]
    },
    {
      slug: "real-estate-portal",
      repo: "wp-real-estate",
      title: "Real Estate Property Portal",
      hook: "A dynamic property listing portal with advanced search, map integration, and lead generation systems.",
      techChoice: "WordPress, ACF (Advanced Custom Fields), and Mapbox API for interactive property exploration.",
      hardestBug: "Developing a robust filtering system that handled thousands of properties without refreshing the page.",
      performanceWins: "Used lazy loading for all property gallery images, reducing initial page weight by 3MB.",
      links: { github: "https://github.com/Muhammadkhan-2008", live: "#" },
      categories: ["WordPress", "Portal"]
    }
  ]
};