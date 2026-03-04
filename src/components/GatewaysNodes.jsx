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
    <div
      className={`relative w-15 h-15`}
      title="OR"
    >
      {/* Rombus rotado */}
      <div
        className={`absolute inset-0 backdrop-blur-md border-2 rounded-md transition-all
        ${selected
            ? "border-[#ca8a04] shadow-[0_0_0_2px_rgba(202,138,4,0.25)]"
            : "border-[#eab308]"}
        `}
        
        style={{
          transform: "rotate(45deg)",
          backgroundColor: "rgba(250, 204, 21, 0.25)", // amarillo suave
          transition: "all 0.6s ease",
          boxShadow: selected ? "0 0 0 15px #ca8a0450" : "none",
          display: "block",
        }}
      />

      {/* Icono centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaCircle
          className={`text-[35px] transition-colors
            ${selected ? "text-[#b17d0e]" : "text-[#ce7b06]"}`}
        />
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
  const COLORS = {
    bg: "rgba(250,204,21,0.25)",       // amarillo suave
    border: "#eab308",                  // borde normal
    borderSelected: "#ca8a04",          // borde seleccionado
    icon: "#b45309",                     // icono normal
    iconSelected: "#92400e",            // icono seleccionado
  };

  return (
    <div className="relative w-15 h-15">
      {/* Rombus rotado */}
      <div
        className={`absolute inset-0 backdrop-blur-md border-2 rounded-md transition-all`}
        style={{
          transform: "rotate(45deg)",
          backgroundColor: COLORS.bg,
          borderColor: selected ? COLORS.borderSelected : COLORS.border,
          boxShadow: selected ? "0 0 0 15px rgba(202,138,4,0.25)" : "none",
          transition: "all 0.6s ease",
          display: "block",
        }}
      />

      {/* Icono centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaTimesCircle
          className="text-[35px] transition-colors"
          style={{ color: selected ? COLORS.iconSelected : COLORS.icon }}
        />
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
  const COLORS = {
    bg: "rgba(250,204,21,0.35)",       // amarillo un poco más oscuro que XOR
    border: "#ca8a04",
    borderSelected: "#b45309",
    icon: "#92400e",
    iconSelected: "#78350f",
  };

  return (
    <div className="relative w-15 h-15">
      {/* Rombus rotado */}
      <div
        className={`absolute inset-0 backdrop-blur-md border-2 rounded-md transition-all`}
        style={{
          transform: "rotate(45deg)",
          backgroundColor: COLORS.bg,
          borderColor: selected ? COLORS.borderSelected : COLORS.border,
          boxShadow: selected ? "0 0 0 15px rgba(180,83,9,0.25)" : "none",
          transition: "all 0.6s ease",
          display: "block",
        }}
      />

      {/* Icono centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaPlusCircle
          className="text-[35px] transition-colors"
          style={{ color: selected ? COLORS.iconSelected : COLORS.icon }}
        />
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