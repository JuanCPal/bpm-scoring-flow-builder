import { FaStop } from "react-icons/fa";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

export function FinNode({ data, selected }) {
  return (
    <div
      className={` bg-[#ef444420]
        border-2 
        ${selected ? "border-red-600 dark:border-red-400 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]" : "border-slate-400"}`}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        transition: "all 0.4s ease",
        boxShadow: selected ? "0 0 0 15px #ef444440" : "none",
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <FaStop style={{ color: "#ef4444", fontSize: 20 }} className="ml-3.5 mt-3" />
      {selected && (
        <>
        <p className="font-sans font-bold text-red-800 dark:text-red-400  text-[12px] w-30 mt-4 ml-3.5">{data?.parametros?.variable || data?.label}</p>
        </>
      )}

      {/* Solo salida, porque el inicio no recibe conexiones */}
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
    </div>
  );
}

const handleStyle = {
  background: "#ef4444",
  border: "1px solid #c40808", // rojo más oscuro
  width: 8,
  height: 8,
};