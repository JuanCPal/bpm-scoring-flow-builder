import { FaCog } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function ProcesoSimpleNode({ data, selected }) {
  return (
    <div
      style={{
        width: data?.width ?? 100,
        height: data?.height ?? 80,
        background: "rgba(37, 99, 235, 0.2)", // Azul con transparencia (muy suave)
        border: `2px solid ${selected ? "#024be8" : "#CBD5E1"}`,
        borderRadius: 15,
        boxShadow: selected ? "0 0 0 15px #024be840" : "none",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        textAlign: "center",
        padding: 0,
      }}
      title={data?.parametros?.variable || data?.label}
          
    >
      {/* Ícono central */}
      <FaCog size={28} color="#1e3a8a" className="mt-2" />

      <p className="font-sans font-bold text-blue-800 text-[14px] mt-1">{data?.parametros?.variable || data?.label}</p>

      {/* Texto debajo del ícono */}
      {selected && (
  <div
    style={{
      position: "absolute",
      bottom: 10,
      left: "50%",
      top: 45,
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",
      pointerEvents: "none",
    }}
  > </div>
    )}
 

      

      {/* Handlers en los 4 lados */}
      <Handle id="ct1" type="target" position={Position.Top} style={handleStyle}/>
                <Handle id="ct2" type="target" position={Position.Left} style={handleStyle}  />
                <Handle id="ct3" type="target" position={Position.Right} style={handleStyle} />
                <Handle id="ct4" type="target" position={Position.Bottom} style={handleStyle}  />
                <Handle id="cs1" type="source" position={Position.Right} style={handleStyle} />
                <Handle id="cs2" type="source" position={Position.Bottom}  style={handleStyle} />
                <Handle id="cs3" type="source" position={Position.Top} style={handleStyle} />
                <Handle id="cs4" type="source" position={Position.Left} style={handleStyle} />
    </div>
  );
}

const handleStyle = {
  background: "#1e3a8a",
  border: "1px solid #1e3a8a",
  width: 8,
  height: 8,
  borderRadius: "70%",
};