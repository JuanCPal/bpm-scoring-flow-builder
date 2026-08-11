"use client";

import { FaCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const HANDLE_SIZE = 8;

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
  const palette = useGatewayPalette(selected);

  return (
    <div className="relative w-15 h-15" title="OR">
      <div
        className="absolute inset-0 rounded-md backdrop-blur-md transition-all duration-500"
        style={{
          transform: "rotate(45deg)",
          background: palette.background,
          border: `2px solid ${palette.border}`,
          boxShadow: selected ? palette.shadow : "none",
        }}
      />

      <div className="absolute inset-[12px]">
        <FaCircle className="text-[35px] transition-colors" style={{ color: palette.icon }} />
        
        {selected && (
          <p className="font-sans font-bold text-[12px] w-30 mt-8 -ml-10 text-center" style={{ color: palette.label }}>
            {data?.parametros?.variable || data?.label}
          </p>
        )}
      </div>

      {handlePositions.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...getHandleStyle(palette), ...style }}
        />
      ))}
    </div>
  );
}

export function xorNode({ data, selected }) {
  const palette = useGatewayPalette(selected);

  return (
    <div className="relative w-15 h-15">
      <div
        className="absolute inset-0 rounded-md backdrop-blur-md transition-all duration-500"
        style={{
          transform: "rotate(45deg)",
          background: palette.background,
          border: `2px solid ${palette.border}`,
          boxShadow: selected ? palette.shadow : "none",
        }}
      />

      <div className="absolute inset-[12px]">
        <FaTimesCircle className="text-[35px] transition-colors" style={{ color: palette.iconStrong }} />

        {selected && (
          <p className="font-sans font-bold text-[12px] w-30 mt-8 -ml-10 text-center" style={{ color: palette.label }}>
            {data?.parametros?.variable || data?.label}
          </p>
        )}
      </div>

      {handlePositions.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...getHandleStyle(palette), ...style }}
        />
      ))}
    </div>
  );
}

export function andNode({ data, selected }) {
  const palette = useGatewayPalette(selected);

  return (
    <div className="relative w-15 h-15">
      <div
        className="absolute inset-0 rounded-md backdrop-blur-md transition-all duration-500"
        style={{
          transform: "rotate(45deg)",
          background: palette.backgroundStrong,
          border: `2px solid ${palette.borderStrong}`,
          boxShadow: selected ? palette.shadowStrong : "none",
        }}
      />

      <div className="absolute inset-[12px]">
        <FaPlusCircle className="text-[35px] transition-colors" style={{ color: palette.iconStrong }} />

        {selected && (
          <p className="font-sans font-bold text-[12px] w-30 mt-7 -ml-10 text-center" style={{ color: palette.label }}>
            {data?.parametros?.variable || data?.label}
          </p>
        )}
      </div>

      {handlePositionsAnd.map(({ id, type, pos, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={pos}
          className="!absolute"
          style={{ ...getHandleStyle(palette), ...style }}
        />
      ))}
    </div>
  );
}

function useGatewayPalette(selected) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return isDark
    ? {
        background: "rgba(251, 191, 36, 0.16)",
        backgroundStrong: "rgba(251, 191, 36, 0.18)",
        border: selected ? "#fde68a" : "#fbbf24",
        borderStrong: selected ? "#fde68a" : "#fbbf24",
        shadow: "0 0 0 12px rgba(251, 191, 36, 0.22)",
        shadowStrong: "0 0 0 12px rgba(251, 191, 36, 0.22)",
        icon: selected ? "#fef3c7" : "#fde68a",
        iconStrong: selected ? "#fef3c7" : "#fde68a",
        label: "#fef3c7",
        handleBackground: "#fbbf24",
        handleBorder: "#fde68a",
      }
    : {
        background: "rgba(250, 204, 21, 0.24)",
        backgroundStrong: "rgba(250, 204, 21, 0.3)",
        border: selected ? "#a16207" : "#ca8a04",
        borderStrong: selected ? "#92400e" : "#a16207",
        shadow: "0 0 0 12px rgba(202, 138, 4, 0.22)",
        shadowStrong: "0 0 0 12px rgba(180, 83, 9, 0.22)",
        icon: selected ? "#a16207" : "#d97706",
        iconStrong: selected ? "#78350f" : "#92400e",
        label: "#a16207",
        handleBackground: "#ca8a04",
        handleBorder: "#ca8a04",
      };
}

function getHandleStyle(palette) {
  return {
    background: palette.handleBackground,
    border: `2px solid ${palette.handleBorder}`,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
  };
}
