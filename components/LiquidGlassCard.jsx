import styles from "./LiquidGlassCard.module.css";

export default function LiquidGlassCard({ children, className = "" }) {
  return (
    <div className={`${styles.GlassContainer} ${className}`}>
      {/* Glass visual layers */}
      <div className={styles.GlassMaterial}>
        <div className={styles.GlassEdgeReflection} />
        <div className={styles.GlassEmbossReflection} />
        <div className={styles.GlassRefraction} />
        <div className={styles.GlassBlur} />
        <div className={styles.BlendLayers} />
        <div className={styles.BlendEdge} />
        <div className={styles.Highlight} />
      </div>

      {/* Content (hard clipped) */}
      <div className={styles.GlassContentWrapper}>
        <div className={styles.GlassContent}>{children}</div>
      </div>
    </div>
  );
}