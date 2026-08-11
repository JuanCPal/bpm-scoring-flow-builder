"use client";

import { FaCog } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function ProcesoSimpleNode({ data, selected }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const palette = isDark
    ? {
        text: "#dbe5fb",
        icon: selected ? "#b7cdfa" : "#8eaef0",
        background: "rgba(61, 95, 156, 0.24)",
        border: selected ? "#8eaef0" : "#546a86",
        shadow: "0 0 0 10px rgba(78, 116, 191, 0.22)",
        handleBackground: "#678edc",
        handleBorder: "#8eaef0",
      }
    : {
        text: "#2747a3",
        icon: selected ? "#3057cc" : "#1e3a8a",
        background: "rgba(37, 99, 235, 0.2)",
        border: selected ? "#2563eb" : "#6f83a3",
        shadow: "0 0 0 10px rgba(37, 99, 235, 0.2)",
        handleBackground: "#345ccf",
        handleBorder: "#345ccf",
      };

  return (
    <div
      style={{
        width: data?.width ?? 90,
        height: data?.height ?? 80,
        background: palette.background,
        border: `2px solid ${palette.border}`,
        borderRadius: 15,
        scale: `${selected ? 1.3 : 1.1 }`,
        transition: "all 0.4s ease",
        boxShadow: selected ? palette.shadow : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        textAlign: "center",
        padding: 8,
        color: palette.text,
      }}
      className="font-sans font-bold"
    >
      <FaCog size={28} style={{ color: palette.icon }} />

      <div
        style={{
          fontSize: 13,
          marginTop: 6,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "90%",
        }}
      >
        {data?.parametros?.proceso || data?.parametros?.variable || data?.nombre || data?.label}
      </div>

      <Handle id="ct1" type="target" position={Position.Top} style={getHandleStyle(palette)} />
      <Handle id="ct2" type="target" position={Position.Left} style={getHandleStyle(palette)} />
      <Handle id="ct3" type="target" position={Position.Right} style={getHandleStyle(palette)} />
      <Handle id="ct4" type="target" position={Position.Bottom} style={getHandleStyle(palette)} />
      <Handle id="cs1" type="source" position={Position.Right} style={getHandleStyle(palette)} />
      <Handle id="cs2" type="source" position={Position.Bottom} style={getHandleStyle(palette)} />
      <Handle id="cs3" type="source" position={Position.Top} style={getHandleStyle(palette)} />
      <Handle id="cs4" type="source" position={Position.Left} style={getHandleStyle(palette)} />
    </div>
  );
}

function getHandleStyle(palette) {
  return {
    background: palette.handleBackground,
    border: `1px solid ${palette.handleBorder}`,
    width: 8,
    height: 8,
    borderRadius: "50%",
  };
}
