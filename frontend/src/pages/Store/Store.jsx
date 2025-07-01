// Store.js (đọc CSV + ảnh + tên + phân trang + tìm kiếm + popup chi tiết)

import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Store.css";

const Store = () => {
  const [herbList, setHerbList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHerb, setSelectedHerb] = useState(null);
  const itemsPerPage = 12;

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
            className={`pagination-number ${
              currentPage === page ? "active" : ""
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
      <h1>Danh sách dược liệu</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm tên dược liệu..."
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
                onClick={() => setSelectedHerb(herb)}
              >
                <div className="product-image">
                  {image ? (
                    <img src={image} alt={name || "Dược liệu"} />
                  ) : (
                    <div className="image-placeholder" />
                  )}
                </div>
                <h3>{name || "Không tên"}</h3>
              </div>
            );
          })
        ) : (
          <p>Không tìm thấy dược liệu phù hợp.</p>
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

      {selectedHerb && (
        <div className="modal" onClick={() => setSelectedHerb(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedHerb["Tên dược liệu"]}</h2>
            <img
              src={selectedHerb["Link ảnh"]}
              alt={selectedHerb["Tên dược liệu"]}
              style={{ maxWidth: "100%", marginBottom: "10px" }}
            />
            <p><strong>Mô tả cây:</strong> {selectedHerb["Mô tả cây"] || "Chưa có."}</p>
            <p><strong>Sinh thái:</strong> {selectedHerb["Sinh thái"] || "Chưa có."}</p>
            <p><strong>Phân bố:</strong> {selectedHerb["Phân bố"] || "Chưa có."}</p>
            <p><strong>Bộ phận dùng:</strong> {selectedHerb["Bộ phận dùng"] || "Chưa có."}</p>
            <p><strong>Công dụng:</strong> {selectedHerb["Công dụng"] || "Chưa có."}</p>
            <button onClick={() => setSelectedHerb(null)} style={{ marginTop: "10px" }}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
