import { CSSProperties, useState } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidEraser } from "react-icons/bi";
import { LiaThListSolid } from "react-icons/lia";
import { client } from "../../constants/urlPath";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

import axiosInterceptor from "../../utils/axiosInterceptor";
import { toast } from "react-toastify";

const SqlEditor: React.FC = () => {
  const navigate = useNavigate();

  // Dragging
  const dragThreshold = 100; // Drag distance to hide the component
  const [allOptionsOpen, setAllOptionsOpen] = useState<boolean>(false);

  // useSpring to control smooth vertical translation
  const [{ y }, api] = useSpring(() => ({ y: 1000 }));

  const bind = useDrag(
    ({ down, movement: [, elementScrolled], cancel }) => {
      // Close when dragged down sufficiently
      if (!down && elementScrolled > dragThreshold) {
        api.start({ y: 1000 });
        cancel && cancel();
        setTimeout(() => {
          setAllOptionsOpen(false);
        }, 300);
        return;
      }

      // Constrain vertical movement during drag
      api.start({
        y: down ? Math.max(0, elementScrolled) : 0,
        immediate: down,
      });
    },
    { axis: "y" }
  );

  const draggableDivStyle: CSSProperties = {
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
  };

  const handleReset = () => {
    api.start({ y: 70 }); // Reset x and y to their initial position
    setAllOptionsOpen(true);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [errorString, setErrorString] = useState<string>("");
  const [dataKeys, setDataKeys] = useState<any[]>([]);

  const [initialSearch, setInitialSearch] = useState(0);

  let lines: string = Array(24).fill("\n").join("");

  const [sqlQuery, setSqlQuery] = useState<string>(lines);
  const handleSqlQueryChange = (value: string) => {
    setSqlQuery(value);
  };

  const fetchData = () => {
    const query = sqlQuery.trim().replaceAll(";", "").split("\n").filter(elem=> !elem.trim().startsWith("--")).join("\n").trim()

    if(!query){
      toast.error("Query is empty")
      return
    }

    setLoading(true);
    axiosInterceptor({
      url: "/analytics/execute-select-query",
      method: "post",
      data: { string: query },
    })
      .then((res) => {
        const result = res?.data || [];
        setData(result);
        setErrorString("");
        setInitialSearch(1);
        setDataKeys(Object.keys(result?.[0] || {}));

        handleReset();
        setLoading(false);
      })
      .catch((err) => {
        setErrorString(err?.message ?? "Some unknown error");
        setInitialSearch(-1);
        setDataKeys([]);

        handleReset();
        setLoading(false);
      });
  };


  const copyFieldToUserClipBoard = (field:string) => {
    field = field?.toLowerCase() || "";
    navigator.clipboard.writeText(field)

    toast.success("Column Name Copied")
  }

  const copyFieldAndDataToUserClipBoard = (field:string, value:string) => {
    field = field?.toLowerCase() || "";
    const text = field + " = " + value
    navigator.clipboard.writeText(text)

    toast.success("Column Name & Data Copied")
  }

  const [clearQueryConfirmation, setClearQueryConfirmation] = useState(false)

  return (
    <div className="w-full max-h-screen overflow-y-auto">
      <div className="px-1 py-2 flex justify-between items-center font-bold text-lg bg-transparent">
        <span className="flex items-inline">
          <IoArrowBack
            className="text-2xl me-8 z-10"
            onClick={() => navigate(client.dashboard, { replace: true })}
          />
          <span className="text-xl">SQL Editor</span>
        </span>

        {loading ? (
          <div className="spinner-border spinner-border-sm text-black me-2"></div>
        ) : (
          <span className="flex">
            {initialSearch !== 0 && (
              <LiaThListSolid
                className={`text-3xl me-4 ${
                  initialSearch < 0 ? " text-red-400 " : " text-green-400 "
                }`}
                onClick={handleReset}
              />
            )}

            <AiFillThunderbolt
              className="text-3xl ms-2 me-4 text-yellow-400"
              onClick={fetchData}
            />

            <BiSolidEraser
              className="text-3xl ms-2 me-3 text-blue-400"
              onClick={()=>setClearQueryConfirmation(true)}
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
          className="absolute bottom-0 h-5/6 w-full rounded-t-2xl bg-white aThousandZindex border-t-8  border-x-4 pb-5"
          style={{
            ...draggableDivStyle,
            y /*bind y animation value to the div*/,
          }}
        >
          <h4 className="font-extrabold pt-2 ps-3">Response</h4>
          {Boolean(errorString) && (
            <p className="text-red-700">{errorString}</p>
          )}

          {!Boolean(dataKeys.length) && !Boolean(errorString) && (
            <div className="w-full text-center pt-2">No Rows Selected</div>
          )}

          <div className="w-full overflow-x-auto overflow-y-auto shadow-md rounded-lg relative max-h-full">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 border-b-2 border-gray-200 sticky top-0 z-10">
                <tr>
                  {dataKeys.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      onDoubleClick={()=>copyFieldToUserClipBoard((header || ""))}
                    >
                      {header}
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
                        onDoubleClick={()=>copyFieldAndDataToUserClipBoard((header || ""), (item[header] || ""))}
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

      {allOptionsOpen && (
        <div className="max-h-screen overlayWhenViewNavigationIsOpen"></div>
      )}

      {clearQueryConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want to clear the query ?
            </h2>
            <br />
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setClearQueryConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  setSqlQuery(lines)
                  setClearQueryConfirmation(false)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      {/* All Options Sections END */}
    </div>
  );
};

export default SqlEditor;
