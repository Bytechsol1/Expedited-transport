"use client";

import { DotField } from "./DotField";

export function DotSeparator() {
  return (
    <div style={{
      position: "relative",
      height: "140px",
      background: "#fff",
      overflow: "hidden",
    }}>
      <DotField
        dotRadius={1.8}
        dotSpacing={18}
        bulgeStrength={60}
        glowRadius={0}
        gradientFrom="#9a9a9a"
        gradientTo="#b8b8b8"
        glowColor="#ffffff"
      />
    </div>
  );
}
