import React from 'react';
import { ZoomIn } from 'lucide-react';

/**
 * AlternatingBentoGrid renders image gallery cards in an alternating bento layout:
 * - Cluster A (Pattern 1): 3 squares top-left + 1 tall right + 1 big 2x2 bottom-left + 1 landscape center + 2 bottom rects
 * - Cluster B (Pattern 2): 1 tall left + 3 squares top-right + 1 wide landscape center + 1 tall right + 1 wide bottom-left + 1 square bottom-center
 */
export default function AlternatingBentoGrid({
  items = [],
  onItemClick,
  renderItemOverlay
}) {
  // Chunk items into groups of 8
  const clusters = [];
  const chunkSize = 8;

  for (let i = 0; i < items.length; i += chunkSize) {
    clusters.push(items.slice(i, i + chunkSize));
  }

  const handleCardClick = (item, globalIndex) => {
    if (onItemClick) {
      onItemClick(item, globalIndex);
    }
  };

  return (
    <div className="alternating-bento-wrapper">
      {clusters.map((clusterItems, clusterIdx) => {
        const isPatternA = clusterIdx % 2 === 0;
        const clusterClass = isPatternA ? 'bento-cluster-a' : 'bento-cluster-b';

        return (
          <div
            key={`cluster-${clusterIdx}`}
            className={`bento-cluster ${clusterClass} reveal-up`}
            data-delay={clusterIdx * 100}
          >
            {clusterItems.map((item, itemIdx) => {
              const globalIndex = clusterIdx * chunkSize + itemIdx;
              const itemPositionClass = `bento-item-${itemIdx + 1}`;

              return (
                <div
                  key={item.id || globalIndex}
                  className={`bento-card ${itemPositionClass}`}
                  onClick={() => handleCardClick(item, globalIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item, globalIndex)}
                  title={item.title || item.caption || 'Xem chi tiết'}
                >
                  <img
                    src={item.src || item.image}
                    alt={item.title || item.caption || `Ảnh ${globalIndex + 1}`}
                    loading="lazy"
                    className="bento-card-img"
                  />

                  {renderItemOverlay ? (
                    renderItemOverlay(item, globalIndex)
                  ) : (
                    <div className="bento-card-overlay">
                      {item.title && <h3 className="bento-card-title">{item.title}</h3>}
                      {item.caption && <p className="bento-card-caption">{item.caption}</p>}
                      <div className="bento-card-zoom-badge">
                        <ZoomIn size={18} color="#ffffff" />
                        <span>Phóng to</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
