import { CSSProperties, useState } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";


import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiTableBold } from "react-icons/pi";
import { client } from "../../constants/urlPath";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

import axiosInterceptor from "../../utils/axiosInterceptor";


const SqlEditor: React.FC = () => {

  const navigate = useNavigate();
 
  // Dragging
  const dragThreshold = 100; // Drag distance to hide the component
  const [allOptionsOpen, setAllOptionsOpen] = useState<boolean>(false);

  // useSpring to control smooth vertical translation
  const [{ y }, api] = useSpring(() => ({ y: 1000 }));

  // useDrag to manage dragging behavior
  const bind = useDrag(
    ({ down, movement: [, elementScrolled], cancel }) => {
      // Cancel drag if the threshold is crossed and hide component

      if (elementScrolled > dragThreshold) {
        api.start({ y: 1000 }); // Move out of view smoothly
        cancel && cancel(); // Stop further dragging
        setTimeout(() => {
          setAllOptionsOpen(false);
        }, 300);
        return;
      }
      // Set the y translation based on drag position, reset when released
      api.start({ y: down ? elementScrolled : 0, immediate: down });
    },
    { axis: "y" } // Restrict drag to vertical axis
  );

  const draggableDivStyle: CSSProperties = {
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
  };

  const handleReset = () => {
    api.start({ y: 10 }); // Reset x and y to their initial position
    setAllOptionsOpen(true);
  };



  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [errorString, setErrorString] = useState<string>("")
  const [dataKeys, setDataKeys] = useState<any[]>([]);

  const [initialSearch, setInitialSearch] = useState(0)

  let lines:string = Array(30).fill("\n").join("")

  const [sqlQuery, setSqlQuery] = useState<string>("-- SELECT * FROM users;" + lines);
  const handleSqlQueryChange = (value: string) => {
    setSqlQuery(value);
  };


  const fetchData = () => {
    const query = sqlQuery.trim().replaceAll(";", "")

    setLoading(true)
    axiosInterceptor({
      url:"/analytics/execute-select-query",
      method:"post",
      data:{string:query}
    }).then(res=>{
      const result = res?.data || []
      setData(result)
      setErrorString("")
      setInitialSearch(1)
      setDataKeys(Object.keys(result?.[0] || {}))

      handleReset()
      setLoading(false)
    }).catch(err=>{
      setErrorString(err?.message ?? "Some unknown error")
      setInitialSearch(-1)
      
      handleReset()
      setLoading(false)
    })
  }



  return (
    <div className="w-full h-screen">
            <div className=" mb-2 pt-2 px-1 flex justify-between items-center font-bold text-lg bg-transparent">
              <span className="flex items-inline">
                <IoArrowBack
                  className="text-2xl me-8 z-10"
                  onClick={() => navigate(client.dashboard, { replace: true })}
                />
                <span className="text-xl">SQL Editor</span>
              </span>

              {loading ? (<div className="spinner-border spinner-border-sm text-black me-2"></div>) : (
                  <span className="flex">

                    {initialSearch !== 0 && (
                      <PiTableBold className={`text-2xl me-4 text-${initialSearch < 0 ? "red":"green"}-400`}
                      onClick={handleReset}
                      />
                    )}

                    <AiFillThunderbolt className="text-2xl ms-2 me-2 text-yellow-400"
                    onClick={fetchData}
                    />
                  </span>
              )}
            </div>

      <CodeMirror
        value={sqlQuery}
        onChange={handleSqlQueryChange}
        extensions={[sql()]}
        style={{
          width: "100%",
          height: "100%",
          fontSize: "16px",
        }}
      />

     {/* All Options Sections START */}
     {allOptionsOpen && (
            <animated.div
              {...bind()}
              className="absolute overflow-y-auto bottom-0 h-5/6 w-full rounded-t-2xl bg-white z-10 border-t-8  border-x-4 p-3"
              style={{
                ...draggableDivStyle,
                y /*bind y animation value to the div*/,
              }}
            >
            
              <h4 className="font-extrabold">Response</h4>
              {Boolean(errorString) && (
                <p className="text-red-700">{errorString}</p>
              )}


<div className="w-full overflow-x-auto overflow-y-auto shadow-md rounded-lg">
  <table className="w-full border-collapse">
    <thead className="bg-gray-100 border-b-2 border-gray-200">
      <tr>
        {dataKeys.map((header) => (
          <th 
            key={header} 
            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            {header.charAt(0).toUpperCase() + header.slice(1)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item, index) => (
        <tr 
          key={index} 
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          {dataKeys.map((header) => (
            <td 
              key={header} 
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {!Boolean(item[header]) ? (
                <span>NULL</span>
              ) : (
                <span>{item[header]}</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

            </animated.div>
          )}
        {/* All Options Sections END */}

    </div>
  );
};

export default SqlEditor;
