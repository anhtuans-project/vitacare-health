// Store.js (đọc CSV + ảnh + tên + phân trang + tìm kiếm + popup chi tiết)

import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Store.css";
import CharacterViewer from "../../components/Custom3dGroup/CharacterViewer";
import { getModelImage } from '../../assets/assets.js';
import qrImage from "/src/assets/QR.png";

const Store = () => {
  const [herbList, setHerbList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [show3d, setShow3d] = useState(false);
  const itemsPerPage = 12;
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetch("/duoclieu_30_chitiet.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        setHerbList(parsed.data);
      })
      .catch((error) => {
        console.error("Lỗi khi đọc CSV:", error);
      });
  }, []);

  const filteredHerbs = herbList.filter((herb) =>
    herb["Tên dược liệu"]
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHerbs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHerbs.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    range.forEach((page, index) => {
      if (page === "...") {
        pages.push(
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        );
      } else {
        pages.push(
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`pagination-number ${currentPage === page ? "active" : ""
              }`}
          >
            {page}
          </button>
        );
      }
    });

    return pages;
  };

  return (
    <div className="store-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Danh sách model</h1>
        {/* <button onClick={() => setShow3d(true)} className="open-3d-button">Xem mô hình 3D</button> */}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm tên model..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div className="products-grid">
        {currentItems.length > 0 ? (
          currentItems.map((herb, index) => {
            const name = herb["Tên dược liệu"]?.trim();
            const image = herb["Link ảnh"]?.trim();
            return (
              <div
                key={index}
                className="product-card"
                onClick={() => {
                  setSelectedHerb(herb);
                  setShow3d(true);
                }}
              >
                <div className="product-image">
                  <img
                    src={getModelImage(name)}
                    alt={name || "Model 3D"}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = getModelImage('default'); // Use default image
                    }}
                  />
                </div>
                <h3>{name || "Không tên"}</h3>
              </div>
            );
          })
        ) : (
          <p>Không tìm thấy model phù hợp.</p>
        )}
      </div>

      {filteredHerbs.length > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo; Trước
          </button>

          <div className="pagination-numbers">{renderPagination()}</div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Tiếp &raquo;
          </button>
        </div>
      )}

      {/* Product click now opens 3D viewer with description below */}

      {show3d && (
        <div className="modal" onClick={() => { setShow3d(false); setSelectedHerb(null); }}>
          <div className="modal-content modal-3d" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h2 style={{ margin: 0 }}>{selectedHerb ? selectedHerb["Tên dược liệu"] : "Mô hình 3D"}</h2>
              <button onClick={() => { setShow3d(false); setSelectedHerb(null); }}>Đóng</button>
            </div>

            <div style={{ width: "100%", height: "60vh" }}>
              <CharacterViewer
                modelFile={
                  selectedHerb
                    ? (selectedHerb["Model"] || selectedHerb["Model file"] || selectedHerb["ModelFile"] || selectedHerb["3D Model"] || selectedHerb["model"] || "scene.gltf")
                    : "scene.gltf"
                }
                height="60vh"
              />
            </div>

            <div style={{ marginTop: 12 }}>
              {selectedHerb && (
                <div className="popup-overlay" onClick={() => setSelectedHerb(null)}>
                  <div className="popup" onClick={(e) => e.stopPropagation()}>
                    {(
                      <>
                        <p><strong>Mô tả:</strong> {selectedHerb["Mô tả cây"] || "Chưa có."}</p>
                        {/* <p><strong>Giá niêm yết:</strong> {selectedHerb["Sinh thái"] || "Chưa có."}</p> */}
                        {/* <p><strong>Phân bố:</strong> {selectedHerb["Phân bố"] || "Chưa có."}</p>
                  <p><strong>Bộ phận dùng:</strong> {selectedHerb["Bộ phận dùng"] || "Chưa có."}</p>
                  <p><strong>Công dụng:</strong> {selectedHerb["Công dụng"] || "Chưa có."}</p> */}
                      </>
                    )}
                    {/* <button onClick={() => setShowQR(true)}>Mã QR</button> */}
                    {/* <button onClick={() => setSelectedHerb(null)}>Đóng</button> */}
                  </div>
                </div>
              )}

              {/* 👉 Thêm đoạn này ngay dưới popup ở trên */}
              {showQR && (
                <div className="qr-overlay" onClick={() => setShowQR(false)}>
                  <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
                    <img src={qrImage} alt="Mã QR" className="qr-image" />
                    <button onClick={() => setShowQR(false)}>Đóng</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;

