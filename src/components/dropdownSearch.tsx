import React, { useEffect, useState } from "react";
import { setBusRouteInfo, setBusStop } from "../utils/setLocalStorage";
import { busRouteInterface } from "../constants/interfaces";
import { toast } from "react-toastify";

interface Option {
  value: string;
  label: string;
}

interface searchProp {
  options: Option[];
  placeholder?: string;
  onSelect: (perameter: Option) => void;
  showCustom?: boolean;
  src?: string;
}

const DropdownSearch: React.FC<searchProp> = ({
  options = [],
  placeholder = "Select",
  onSelect,
  showCustom = false,
  src = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>({
    value: "",
    label: placeholder,
  });
  const selectOptions: Option[] = options;

  const [countinueLoading, setCountinueLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [customValue, setCustomValue] = useState<string>("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectionActivate = (option: Option) => {
    setCountinueLoading(false);

    setSelectedOption(option);
    setIsOpen(false);

    setCustomValue("");
    setSearchTerm("");
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleSelect = (option: Option, custom: boolean) => {
    setCountinueLoading(true);

    if (!custom) {
      selectionActivate(option);
      return;
    }

    switch (src) {
      case "routes":
        let busRoute: busRouteInterface = {
          route: option.value,
          terminalA: "Select later",
          terminalB: "Select later",
        };
        setBusRouteInfo(busRoute)
          .then((res) => {
            toast.success("Bus Routes info has been saved");
            selectionActivate(option);
          })
          .catch((err) => {
            toast.error(err.message);
            setCountinueLoading(false);
          });

        break;
      case "stops":
        let busStop: string = option.value;

        setBusStop(busStop)
          .then((res) => {
            toast.success("Bus Stop info has been saved");
            selectionActivate(option);
          })
          .catch((err) => {
            toast.error(err.message);
            setCountinueLoading(false);
          });

        break;
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
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={`py-1.5 hover:bg-gray-100 rounded-md pointers font-medium ${
                      selectedOption?.value === option.value
                        ? "headerCayanText font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleSelect(option, false)}
                  >
                    {option.label}
                  </li>
                ))}
                {showCustom && (
                  <li className="flex justify-between">
                    <input
                      type="text"
                      placeholder="Enter Custom Value"
                      className="w-8/12 p-2 border mt-1 border-gray-400 rounded focus:border-teal-500"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                    />
                    <span className="ps-2 w-4/12">
                    <button
                      className="w-100 p-2 border mt-1 rounded text-white cayanBackground font-semibold"
                      onClick={() =>
                        handleSelect(
                          {
                            value: customValue,
                            label: customValue,
                          },
                          true
                        )
                      }
                      disabled={countinueLoading}
                    >
                      {countinueLoading ? (
                        <div className="spinner-border spinner-border-sm text-white"></div>
                      ) : (
                        <span>Add</span>
                      )}
                    </button>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownSearch;
