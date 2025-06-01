import React, { useCallback, useRef, useState } from "react";

const useMobileNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const menuIcon = useRef(null);
  const mobileIcon = useRef(null);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev);
  }, []);

  return { toggleMobileNav, isMobileNavOpen };
};

export default useMobileNav;
