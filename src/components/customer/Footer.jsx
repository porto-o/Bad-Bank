import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-1">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Bad Bank by Ismael Porto</p>
      </div>
      <div className="container">
        <a
          href="
                    https://github.com/porto-o/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <i className="fab fa-github fa-2x">
            <span className="text-white"> GitHub</span>
          </i>
        </a>
        <a
          href="
                    https://www.linkedin.com/in/ismael-porto/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin fa-2x">
            <span className="text-white"> LinkedIn</span>
          </i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
