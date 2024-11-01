import { useEffect } from "react";

const useClickOutside = (className:string, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const elements = document.querySelectorAll("."+className);
      const clickedOutside = Array.from(elements).every(
        (element) => !element.contains(event.target as Node)
      );

      if (clickedOutside) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [callback, className]);
};

export default useClickOutside;
