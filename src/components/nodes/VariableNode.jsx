"use client";

import { HiPuzzle } from "react-icons/hi";
import { useTheme } from "next-themes";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function VariableNode({ data, selected }) {
  const { resolvedTheme } = useTheme();
  const label = data?.parametros?.variable || data?.label;
  const isDark = resolvedTheme === "dark";

  const palette = isDark
    ? {
        text: "#dbe5fb",
        icon: selected ? "#b7cdfa" : "#8eaef0",
        background: "rgba(61, 95, 156, 0.24)",
        border: selected ? "#8eaef0" : "#546a86",
        shadow: "0 0 0 10px rgba(78, 116, 191, 0.22)",
        handleBackground: "#8eaef0",
        handleBorder: "#b7cdfa",
      }
    : {
        text: "#2747a3",
        icon: selected ? "#3057cc" : "#406ff0",
        background: "rgba(59, 130, 246, 0.12)",
        border: selected ? "#406ff0" : "#9aabc7",
        shadow: "0 0 0 10px rgba(64, 111, 240, 0.22)",
        handleBackground: "#5d8dff",
        handleBorder: "#406ff0",
      };

  return (
    <div
      className="border-2 rounded-2xl flex items-center justify-center gap-1.5 font-sans font-bold text-[12px] transition-all duration-300"
      style={{
        width: data?.width ?? 90,
        height: data?.height ?? 52,
        color: palette.text,
        background: palette.background,
        borderColor: palette.border,
        boxShadow: selected ? palette.shadow : "none",
        position: "relative",
        boxSizing: "border-box",
        padding: "6px 8px",
      }}
    >
      <HiPuzzle size={18} style={{ color: palette.icon }} />

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "80%",
        }}
        title={label}
      >
        {label}
      </div>

      <Handle id="vt1" type="target" position={Position.Top} style={getHandleStyle(palette)} />
      <Handle id="vs1" type="source" position={Position.Bottom} style={getHandleStyle(palette)} />
      <Handle id="vl1" type="target" position={Position.Left} style={getHandleStyle(palette)} />
      <Handle id="vr1" type="source" position={Position.Right} style={getHandleStyle(palette)} />
    </div>
  );
}

function getHandleStyle(palette) {
  return {
    width: 8,
    height: 8,
    background: palette.handleBackground,
    border: `1px solid ${palette.handleBorder}`,
    borderRadius: "50%",
  };
}
