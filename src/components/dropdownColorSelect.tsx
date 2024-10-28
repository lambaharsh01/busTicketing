import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface searchProp {
  options: Option[];
  busColor?:string;
  placeholder?:()=>string;
  onSelect: (perameter: string) => void;
}

const DropdownColorSelect: React.FC<searchProp> = ({
  options = [],
  busColor="white",
  placeholder =()=>"Select",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption:string = placeholder();
  const selectOptions:Option[] =options;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-select")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdownsearch flex items-center justify-center font-ubuntu">
      <div className="options w-full">
        <div
          className="dropdown-select w-full px-3 py-2.5 border rounded-lg shadow-md cursor-pointer"
          style={{backgroundColor:busColor}}
          onClick={toggleDropdown}
        >
          <span className={`font-medium text-${busColor==="white" ? "slate-500" : "white"}`}>
            {selectedOption}
          </span>
        </div>
        <div className="relative">
          {isOpen && (
            <div className="dropdown-select opacity-100 absolute px-2 left-0 top-0 w-full bg-white shadow-md border rounded-lg z-10 transition-all scrolMaxHeight300">
              <ul className="ps-2.5 mt-3">
                {selectOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`py-1.5 ps-1 font-medium mb-3 rounded-md pointers text-white`}
                    style={{backgroundColor:option.value}}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownColorSelect;
