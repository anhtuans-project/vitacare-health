import PropTypes from "prop-types";

const ColorPicker = ({
  label = "Color",
  value,
  disabled = false,
  onChange,
}) => {
  const handleChange = (event) => {
    if (typeof onChange === "function") onChange(event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <label style={{ fontSize: 14, color: "#111827" }}>{label}</label>
      <input
        type="color"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={{
          width: 36,
          height: 36,
          padding: 0,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          background: "#ffffff",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      />
    </div>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default ColorPicker;
