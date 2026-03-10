import { FaCircle, FaPlus, FaPlusCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const HANDLE_SIZE = 8;
const COMMON_STYLE = {
  background: "#ca8a04",
  border: "2px solid #ca8a04",
  width: HANDLE_SIZE,
  height: HANDLE_SIZE,
};

const handlePositions = [
  { id: "t", type: "target", pos: Position.Top, style: { top: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "r", type: "target", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "b", type: "target", pos: Position.Bottom, style: { bottom: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "l", type: "target", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)" } },

  { id: "s-t", type: "source", pos: Position.Top, style: { top: "-14px", left: "50%", transform: "translateX(-50%)", border: "1px solid #ca8a04" } },
  { id: "s-r", type: "source", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "s-b", type: "source", pos: Position.Bottom, style: { bottom: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "s-l", type: "source", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)", border: "1px solid #ca8a04" } },
];

const handlePositionsAnd = [

  { id: "r", type: "target", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },

  { id: "l", type: "target", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)" } },

  { id: "s-r", type: "source", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "s-l", type: "source", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)", border: "1px solid #ca8a04" } },
];

export function orNode({ data, selected }) {
  return (
    <div className="relative w-15 h-15" title="OR">
      
      {/* Rombo */}
      <div
        className={`
          absolute inset-0 border-2 rounded-md backdrop-blur-md transition-all duration-500
          
          bg-yellow-400/25 border-yellow-500
          dark:bg-amber-400/20 dark:border-amber-400
          
          ${
            selected
              ? "border-amber-700 dark:border-amber-500 shadow-[0_0_0_10px_rgba(202,138,4,0.25)] dark:shadow-[0_0_0_10px_rgba(251,191,36,0.25)]"
              : ""
          }
        `}
        style={{
          transform: "rotate(45deg)"
        }}
      />

      {/* Icono */}
      <div className="absolute inset-[12px]">

        <FaCircle
          className={`
            text-[35px] transition-colors
            text-amber-600
            dark:text-amber-200
            ${selected ? "text-amber-700 dark:text-amber-100" : ""}
          `}
        />
        
        {selected && (
          <p className="
            font-sans font-bold text-[12px] w-30 mt-8 -ml-10 text-center
            text-yellow-700
            dark:text-yellow-200
          ">
            {data?.parametros?.variable || data?.label}
          </p>
        )}

      </div>

      {/* Handles */}
      {handlePositions.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...COMMON_STYLE, ...style }}
        />
      ))}

    </div>
  );
}

export function xorNode({ data, selected }) {
  return (
    <div className="relative w-15 h-15">
      
      {/* Rombo */}
      <div
        className={`
          absolute inset-0 border-2 rounded-md backdrop-blur-md transition-all duration-500
          
          bg-yellow-400/25 border-yellow-500
          dark:bg-amber-400/20 dark:border-amber-400
          
          ${
            selected
              ? "border-amber-700 dark:border-amber-500 shadow-[0_0_0_15px_rgba(202,138,4,0.25)] dark:shadow-[0_0_0_15px_rgba(251,191,36,0.25)]"
              : ""
          }
        `}
        style={{
          transform: "rotate(45deg)"
        }}
      />

      {/* Icono */}
      <div className="absolute inset-[12px]">

        <FaTimesCircle
          className={`
            text-[35px] transition-colors
            text-amber-700
            dark:text-amber-200
            ${selected ? "text-amber-900 dark:text-amber-100" : ""}
          `}
        />

        {selected && (
          <p className="
            font-sans font-bold text-[12px] w-30 mt-8 -ml-10 text-center
            text-yellow-700
            dark:text-yellow-200
          ">
            {data?.parametros?.variable || data?.label}
          </p>
        )}

      </div>

      {/* Handles */}
      {handlePositions.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...COMMON_STYLE, ...style }}
        />
      ))}

    </div>
  );
}

export function andNode({ data, selected }) {
  return (
    <div className="relative w-15 h-15">
      
      {/* Rombo */}
      <div
        className={`
          absolute inset-0 border-2 rounded-md backdrop-blur-md transition-all duration-500
          
          bg-yellow-400/35 border-yellow-700
          dark:bg-amber-400/20 dark:border-amber-400
          
          ${selected 
            ? "border-amber-700 dark:border-amber-500 shadow-[0_0_0_15px_rgba(180,83,9,0.25)] dark:shadow-[0_0_0_15px_rgba(251,191,36,0.25)]"
            : ""
          }
        `}
        style={{
          transform: "rotate(45deg)"
        }}
      />

      {/* Icono */}
      <div className="absolute inset-[12px]">

        <FaPlusCircle
          className={`
            text-[35px] transition-colors
            text-amber-800
            dark:text-amber-200
            ${selected ? "text-amber-900 dark:text-amber-100" : ""}
          `}
        />

        {selected && (
          <p className="
            font-sans font-bold text-[12px] w-30 mt-7 -ml-10 text-center
            text-yellow-700
            dark:text-yellow-200
          ">
            {data?.parametros?.variable || data?.label}
          </p>
        )}

      </div>

      {/* Handles */}
      {handlePositionsAnd.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...COMMON_STYLE, ...style }}
        />
      ))}

    </div>
  );
}