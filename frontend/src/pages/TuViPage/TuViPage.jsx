import React, { useState } from "react";
import "./TuViPage.css"; // Import your CSS styles

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api"; // Use environment variable

function TuViPage() {
  const [activeTab, setActiveTab] = useState("info");
  const [userInfo, setUserInfo] = useState({
    birthYear: "",
    gender: "",
    name: "",
    symptoms: "", // Triệu chứng làm sáng
    sleepHabits: "", // Thói quen & thể chất
    preferences: "", // Hỏi đáp
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeUser = async () => {
    if (!userInfo.name || !userInfo.birthYear) {
      setError("Vui lòng nhập đầy đủ họ tên và năm sinh");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/analyze-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthYear: parseInt(userInfo.birthYear),
          name: userInfo.name,
          gender: userInfo.gender || undefined,
          symptoms: userInfo.symptoms || undefined,
          sleepHabits: userInfo.sleepHabits || undefined,
          preferences: userInfo.preferences || undefined,
        }),
      });

      const data = await response.json();
      setAnalysis(data.data);
      setActiveTab("analysis");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="tab-nav">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          📝 Thông Tin
        </button>
        <button
          className={activeTab === "analysis" ? "active" : ""}
          onClick={() => setActiveTab("analysis")}
        >
          🔍 Phân Tích
        </button>
      </nav>

      <main className="app-main">
        {error && <div className="error-message">⚠️ {error}</div>}

        {activeTab === "info" && (
          <div className="tab-content">
            <div className="user-info-form">
              <h2>Thông Tin Cá Nhân</h2>

              <div className="form-group">
                <label>Họ Và Tên *</label>
                <input
                  type="text"
                  min="1900"
                  max="2100"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </div>

              <div className="form-group">
                <label>Giới tính</label>
                <select
                  value={userInfo.gender}
                  onChange={(e) =>
                    setUserInfo((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>

              <div className="form-group">
                <label>Năm sinh *</label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={userInfo.birthYear}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      birthYear: e.target.value,
                    }))
                  }
                  placeholder="Ví dụ: 2001"
                />
              </div>

              <div className="form-group">
                <label>Triệu Chứng Lâm Sàng</label>
                <textarea
                  value={userInfo.symptoms}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      symptoms: e.target.value,
                    }))
                  }
                  placeholder="Mất ngủ..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Thói Quen & Thể Chất</label>
                <textarea
                  value={userInfo.sleepHabits}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      sleepHabits: e.target.value,
                    }))
                  }
                  placeholder="Ngủ lúc 1h sáng..."
                  rows="3"
                />
              </div>


              <div className="form-group">
                <label>Hỏi đáp</label>
                <textarea
                  value={userInfo.preferences}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      preferences: e.target.value,
                    }))
                  }
                  placeholder="Hãy chia sẻ vấn đề bạn đang gặp phải hoặc những điều bạn muốn biết thêm..."
                  rows="3"
                />
              </div>

              <button
                className="analyze-btn"
                onClick={analyzeUser}
                disabled={loading || !userInfo.birthYear}
              >
                {loading ? "⏳ Đang phân tích..." : "🔍 Phân Tích"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "analysis" && analysis && (
          <div className="analysis-result">
            <div className="basic-info">
              <h3>Thông Tin</h3>
              <p>Họ và tên: {analysis.name}</p>
              <p>Năm sinh: {analysis.birthYear}</p>
            </div>
            <div className="detailed-analysis">
              <h3>Kết Quả Phân Tích</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>{analysis.detailedAnalysis}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TuViPage;
