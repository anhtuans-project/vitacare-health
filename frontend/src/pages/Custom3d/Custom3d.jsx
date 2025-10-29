import { useMemo, useState } from "react";
import CharacterViewer from "../../components/Custom3dGroup/CharacterViewer";
import ClothingPanel from "../../components/Custom3dGroup/ClothingPanel";
import "./Custom3d.css";

const Custom3d = () => {
  // const [selectedOptionId, setSelectedOptionId] = useState("shirt-basic");
  // const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [exporting, setExporting] = useState(false);

  // const clothingOptions = useMemo(
  //   () => [
  //     {
  //       id: "shirt-basic",
  //       label: "Basic Shirt",
  //       thumbnailSrc: "/thumbnails/shirt_basic.png",
  //     },
  //     {
  //       id: "shirt-oversize",
  //       label: "Oversize",
  //       thumbnailSrc: "/thumbnails/shirt_oversize.png",
  //     },
  //     {
  //       id: "hoodie",
  //       label: "Hoodie",
  //       thumbnailSrc: "/thumbnails/hoodie.png",
  //     },
  //     {
  //       id: "jacket",
  //       label: "Jacket",
  //       thumbnailSrc: "/thumbnails/jacket.png",
  //     },
  //   ],
  //   []
  // );

  const handleExport = async () => {
    setExporting(true);
    try {
      // Placeholder: integrate real export later
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="custom3d-container">
      <div className="custom3d-viewer">
        <CharacterViewer /* in future: pass {selectedOptionId, primaryColor} */
        />
      </div>
      <aside className="custom3d-panel">
        {/* <ClothingPanel
          title="Tùy chỉnh trang phục"
          options={clothingOptions}
          selectedId={selectedOptionId}
          onSelect={setSelectedOptionId}
          colorValue={primaryColor}
          onColorChange={setPrimaryColor}
          onExport={handleExport}
          exportLoading={exporting}
        /> */}
      </aside>
    </div>
  );
};

export default Custom3d;
