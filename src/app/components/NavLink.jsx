const NavLink = ({ href, title }) => {
    const handleClick = (e) => {
      e.preventDefault();
      
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 100;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 second animation
        let start = null;

        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing function for smooth acceleration/deceleration
          const ease = percentage < 0.5 
            ? 4 * percentage * percentage * percentage 
            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
            
          window.scrollTo(0, startPosition + (distance * ease));
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
      }
    };

    return (
      <a 
        href={href}
        onClick={handleClick}
        className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white cursor-pointer">
          {title}
      </a>
    )
}

export default NavLink;