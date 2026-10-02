import React from 'react';
import { Award, Hammer, PackageCheck } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function Capabilities() {
  return (
    <section className="section capabilities-section" id="capabilities">
      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              segments={[
                { text: 'NĂNG LỰC ĐƯỢC KIỂM CHỨNG ', className: '', lineBreak: false },
                { text: 'QUA THỰC TIỄN', className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            Khẳng định uy tín qua các công trình quy mô lớn, đáp ứng tiêu chuẩn khắt khe về kỹ thuật và mỹ thuật.
          </p>
        </div>

        <div className="cap-grid">
          <div className="cap-card reveal-up" data-delay="0">
            <div className="cap-icon-box">
              <Award size={28} />
            </div>
            <h3 className="cap-title">KINH NGHIỆM ĐẠI LỄ QUỐC GIA</h3>
            <p className="cap-desc">
              Trực tiếp sản xuất và thi công thành công các <span className="cap-highlight">khối xe nghi trượng A05 – A80</span> phục vụ các đại lễ trang trọng cấp quốc gia.
            </p>
          </div>

          <div className="cap-card reveal-up" data-delay="140">
            <div className="cap-icon-box">
              <Hammer size={28} />
            </div>
            <h3 className="cap-title">TAY NGHỀ ĐIÊU LUYỆN</h3>
            <p className="cap-desc">
              Kết hợp cơ khí chính xác với nghệ thuật tạo hình, đảm bảo chuẩn mực tỷ lệ nhân trắc học và <span className="cap-highlight">thần thái sống động</span>.
            </p>
          </div>

          <div className="cap-card reveal-up" data-delay="280">
            <div className="cap-icon-box">
              <PackageCheck size={28} />
            </div>
            <h3 className="cap-title">TIẾN ĐỘ TRỌN GÓI</h3>
            <p className="cap-desc">
              Quy trình khép kín: <br />
              <span className="cap-highlight">Tư vấn → Thiết kế 3D → Chế tác → Hoàn thiện → Bàn giao</span> tận nơi đúng tiến độ cam kết.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
