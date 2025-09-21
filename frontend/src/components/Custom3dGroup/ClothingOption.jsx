import PropTypes from "prop-types";
const ClothingOption = ({
  id,
  label,
  thumbnailSrc,
  selected = false,
  disabled = false,
  onSelect,
}) => {
  const handleClick = () => {
    if (disabled) return;
    if (typeof onSelect === "function") onSelect(id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={label}
      disabled={disabled}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: 96,
        padding: 8,
        borderRadius: 12,
        border: selected ? "2px solid #2563eb" : "1px solid #e5e7eb",
        outline: "none",
        background: disabled ? "#f9fafb" : "#ffffff",
        boxShadow: selected ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
      }}
    >
      {thumbnailSrc ? (
        <img
          src={thumbnailSrc}
          alt={label}
          style={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#f3f4f6",
          }}
        />
      ) : (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            border: "1px dashed #d1d5db",
            background: "#f9fafb",
          }}
        />
      )}
      <span
        style={{
          fontSize: 12,
          color: disabled ? "#9ca3af" : "#111827",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </button>
  );
};

export default ClothingOption;

ClothingOption.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  thumbnailSrc: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
};

ClothingOption.defaultProps = {
  thumbnailSrc: "",
  selected: false,
  disabled: false,
  onSelect: undefined,
};
