import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface searchProp {
  options: Option[];
  placeholder?: string;
  onSelect: (perameter: Option) => void;
}

const DropdownSearch: React.FC<searchProp> = ({
  options = [],
  placeholder = "Select",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>({
    value: "",
    label: placeholder,
  });
  const [selectOptions] = useState<Option[]>(options);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    if (onSelect) {
      onSelect(option);
    }
  };

  const filteredOptions = selectOptions.filter(
    (selectOptions) =>
      selectOptions.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      selectOptions.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onClick={toggleDropdown}
        >
          <span className="font-medium text-slate-500">
            {selectedOption?.label}
          </span>
        </div>
        <div className="relative">
          {isOpen && (
            <div className="dropdown-select opacity-100 absolute px-2 left-0 top-0 w-full bg-white shadow-md border rounded-lg z-10 transition-all scrolMaxHeight300">
              <div className="flex items-center justify-center m-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border mt-1 border-gray-400 rounded focus:border-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className="ps-2.5">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`py-1.5 hover:bg-gray-100 rounded-md pointers ${
                      selectedOption?.value === option.value
                        ? "headerCayanText font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleSelect(option)}
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

export default DropdownSearch;
