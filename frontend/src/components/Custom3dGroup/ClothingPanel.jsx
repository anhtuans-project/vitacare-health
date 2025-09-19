import PropTypes from "prop-types";
import ClothingOption from "./ClothingOption";
import ColorPicker from "./ColorPicker";
import ExportButton from "./ExportButton";

const ClothingPanel = ({
  title = "Customize Outfit",
  options = [],
  selectedId,
  onSelect,
  colorValue = "#ffffff",
  onColorChange,
  onExport,
  exportLoading = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, color: "#111827" }}>{title}</h2>
        <ExportButton onExport={onExport} loading={exportLoading} />
      </div>

      <ColorPicker value={colorValue} onChange={onColorChange} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 12,
        }}
      >
        {options.map((opt) => (
          <ClothingOption
            key={opt.id}
            id={opt.id}
            label={opt.label}
            thumbnailSrc={opt.thumbnailSrc}
            selected={opt.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

ClothingPanel.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      thumbnailSrc: PropTypes.string,
    })
  ),
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  colorValue: PropTypes.string,
  onColorChange: PropTypes.func,
  onExport: PropTypes.func,
  exportLoading: PropTypes.bool,
};

export default ClothingPanel;
