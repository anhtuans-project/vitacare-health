import PropTypes from "prop-types";

const ExportButton = ({
  label = "Export",
  loading = false,
  disabled = false,
  onExport,
}) => {
  const handleClick = () => {
    if (disabled || loading) return;
    if (typeof onExport === "function") onExport();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "1px solid #2A5C20",
        background: loading ? "#2A5C20" : "#2A5C20",
        color: "#ffffff",
        fontWeight: 600,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        transition: "filter 120ms ease",
      }}
    >
      {loading ? "Exporting..." : label}
    </button>
  );
};

ExportButton.propTypes = {
  label: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onExport: PropTypes.func,
};

export default ExportButton;
