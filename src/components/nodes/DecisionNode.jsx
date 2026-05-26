import { FaCircle, FaPlus, FaPlusCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { AiOutlineClose, AiOutlineDotChart } from "react-icons/ai";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const HANDLE_SIZE = 8;
const COMMON_STYLE = {
  background: "#fff",
  border: "1px solid #11a800",
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

export function DecisionNode({ data, selected }) {  
  return (
    <div
      className="relative w-15 h-15"
      style={{ borderColor: selected ? "#11a800" : "#94A3B8" }}
    >
      {/* Rotated rhombus */}
      <div className="absolute inset-0 bg-green-100/20 backdrop-blur-md border border-green-600 rounded-md" style={{ transform: "rotate(45deg)" }} />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaCircle className="text-[20px] text-[#11a80080]"/>
        <span className="text-[#11a800] ml-1.5"> XOR</span>
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
