"use client";

import { FaCircle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const HANDLE_SIZE = 8;

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const palette = isDark
    ? {
        background: "rgba(34, 197, 94, 0.16)",
        border: selected ? "#86efac" : "#4ade80",
        shadow: "0 0 0 12px rgba(74, 222, 128, 0.2)",
        icon: "rgba(134, 239, 172, 0.65)",
        text: "#dcfce7",
        handleBackground: "#4ade80",
        handleBorder: "#86efac",
      }
    : {
        background: "rgba(220, 252, 231, 0.65)",
        border: selected ? "#15803d" : "#16a34a",
        shadow: "0 0 0 12px rgba(34, 197, 94, 0.18)",
        icon: "rgba(17, 168, 0, 0.5)",
        text: "#15803d",
        handleBackground: "#ffffff",
        handleBorder: "#11a800",
      };

  return (
    <div className="relative w-15 h-15">
      <div
        className="absolute inset-0 rounded-md backdrop-blur-md"
        style={{
          transform: "rotate(45deg)",
          background: palette.background,
          border: `1px solid ${palette.border}`,
          boxShadow: selected ? palette.shadow : "none",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <FaCircle className="text-[20px]" style={{ color: palette.icon }} />
        <span className="ml-1.5" style={{ color: palette.text }}>XOR</span>
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

function getHandleStyle(palette) {
  return {
    background: palette.handleBackground,
    border: `1px solid ${palette.handleBorder}`,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
  };
}
