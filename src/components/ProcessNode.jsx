import { FaCog } from "react-icons/fa";
import {
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

export function ProcessNode({ data, selected }) {
  const isDroppable = !!data?.isDroppable;
  return (
    <div
      style={{
        width: data?.width ?? 320,
        height: data?.height ?? 220,
        borderRadius: 14,
        padding: 8,
        background: isDroppable ? "#DBEAFE" : "#F8FAFC",
        border: `2px solid ${selected ? "#2563EB" : isDroppable ? "#60A5FA" : "#94A3B8"}`,
        boxSizing: "border-box",
      }}
    >
      <div className="bg-[#F8FAFC]/10 backdrop-blur-md gap-2 items-center">
      <div className="flex">
        <FaCog className="mr-2" />
        <strong>{data?.parametros?.proceso || data?.label}</strong>
      </div>
        
        <span style={{ marginLeft: 8, color: "#475569", fontSize: 12 }}>
          Variables: {data?.children?.length ?? 0}
        </span>
      </div>

      <Handle id="t" type="target" position={Position.Top} style={handleStyle} />
      <Handle id="l" type="target" position={Position.Left} style={handleStyle} />
      <Handle id="r" type="target" position={Position.Right} style={handleStyle} />
      <Handle id="b" type="target" position={Position.Bottom} style={handleStyle}/>

      <Handle id="s-r" type="source" position={Position.Right} style={handleStyle}/>
      <Handle id="s-b" type="source" position={Position.Bottom} style={handleStyle}/>
      <Handle id="s-t" type="source" position={Position.Top} style={handleStyle}/>
      <Handle id="s-l" type="source" position={Position.Left} style={handleStyle}/>
    </div>
  );

}

  const handleStyle = {
  background: '#fff',
  border: '1px solid #1e3a8a',
  width: 8,
  height: 8
};