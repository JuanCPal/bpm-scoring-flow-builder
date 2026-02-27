import { FaCircle, FaPlus, FaPlusCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const HANDLE_SIZE = 8;
const COMMON_STYLE = {
  background: "#767975",
  border: "1px solid #767975",
  width: HANDLE_SIZE,
  height: HANDLE_SIZE,
};

const handlePositions = [
  { id: "t", type: "target", pos: Position.Top, style: { top: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "r", type: "target", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "b", type: "target", pos: Position.Bottom, style: { bottom: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "l", type: "target", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)" } },

  { id: "s-t", type: "source", pos: Position.Top, style: { top: "-14px", left: "50%", transform: "translateX(-50%)", border: "1px solid #108a03" } },
  { id: "s-r", type: "source", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "s-b", type: "source", pos: Position.Bottom, style: { bottom: "-14px", left: "50%", transform: "translateX(-50%)" } },
  { id: "s-l", type: "source", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)", border: "1px solid #108a03" } },
];

const handlePositionsAnd = [
  
  { id: "r", type: "target", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  
  { id: "l", type: "target", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)" } },
  
  { id: "s-r", type: "source", pos: Position.Right, style: { right: "-14px", top: "50%", transform: "translateY(-50%)" } },
  { id: "s-l", type: "source", pos: Position.Left, style: { left: "-14px", top: "50%", transform: "translateY(-50%)", border: "1px solid #108a03" } },
];

export function orNode({ data, selected }) {
  return (
    <div
      className={`relative w-15 h-15 ${selected ? "border-[#94A3B8]" : "border-[#94A3B8]" }`}
    >
      {/* Rotated rhombus */}
      <div className={`absolute inset-0 bg-gray-500/20 backdrop-blur-md border-2 rounded-md ${selected ? "border-[#565657be] shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-[#94A3B8]" }`} style={{ transform: "rotate(45deg)" }} />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaCircle className={`text-[20px] ${selected ? "text-[#302f2fc7]" : "text-[#14141463]"}`}/>
        <span className={`${selected ? "text-gray-800" : "text-gray-700"} ml-1.5`}>{data?.nombre || "OR"}</span>
      </div>

      {/* Handles (target + source) */}
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
    <div
      className="relative w-15 h-15"
      style={{ borderColor: selected ? "#11a800" : "#94A3B8" }}
    >
      {/* Rotated rhombus */}
      <div className={`absolute inset-0 bg-gray-500/20 backdrop-blur-md border-2 rounded-md ${selected ? "border-[#565657be] shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-[#94A3B8]" }`} style={{ transform: "rotate(45deg)" }} />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaTimesCircle className={`text-[20px] ${selected ? "text-[#302f2fc7]" : "text-[#14141463]"}`}/>
        <span className={`${selected ? "text-gray-800" : "text-gray-700"} ml-1.5`}>{data?.nombre || "XOR"}</span>
      </div>

      {/* Handles (target + source) */}
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
    <div
      className="relative w-15 h-15"
      style={{ borderColor: selected ? "#11a800" : "#94A3B8" }}
    >
      {/* Rotated rhombus */}
      <div className={`absolute inset-0 bg-gray-500/20 backdrop-blur-md border-2 rounded-md ${selected ? "border-[#565657be] shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-[#94A3B8]" }`} style={{ transform: "rotate(45deg)" }} />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaPlusCircle className={`text-[20px] ${selected ? "text-[#302f2fc7]" : "text-[#14141463]"}`}/>
        <span className={`${selected ? "text-gray-800" : "text-gray-700"} ml-1.5`}>{data?.nombre || "AND"}</span>
      </div>

      {/* Handles (target + source) */}
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