export default function LiquidGlassCard({ children, className = "" }) {
  return (
    <div className={`GlassContainer ${className}`}>
      {/* Glass visual layers */}
      <div className="GlassMaterial">
        <div className="GlassEdgeReflection" />
        <div className="GlassEmbossReflection" />
        <div className="GlassRefraction" />
        <div className="GlassBlur" />
        <div className="BlendLayers" />
        <div className="BlendEdge" />
        <div className="Highlight" />
      </div>

      {/* Content (hard clipped) */}
      <div className="GlassContentWrapper">
        <div className="GlassContent">{children}</div>
      </div>
    </div>
  );
}
