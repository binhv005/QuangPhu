import React from 'react';
import TypewriterText from './TypewriterText';

export default function Process() {
  const steps = [
    { num: '01', title: 'Tư vấn', desc: 'Tiếp nhận nhu cầu, ý tưởng và yêu cầu chi tiết của sản phẩm.' },
    { num: '02', title: 'Thiết kế', desc: 'Tư vấn hình thức, kích thước, chất liệu và lập phương án thực hiện tối ưu.' },
    { num: '03', title: 'Chế tác', desc: 'Tiến hành gia công cơ khí, đúc tạo hình, chạm khắc thủ công tinh xảo.' },
    { num: '04', title: 'Hoàn thiện', desc: 'Xử lý bề mặt, phủ màu bảo vệ, kiểm tra chất lượng và thần thái tác phẩm.' },
    { num: '05', title: 'Vận chuyển', desc: 'Đóng gói quy chuẩn an toàn, vận chuyển chuyên dụng và hỗ trợ lắp đặt.' },
    { num: '06', title: 'Bàn giao', desc: 'Nghiệm thu thực tế, bàn giao đúng hẹn và thực hiện chính sách bảo hành.' }
  ];

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              segments={[
                { text: 'QUY TRÌNH CHẾ TÁC ', className: '', lineBreak: false },
                { text: 'TRỌN GÓI', className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            Chuyên nghiệp – Minh bạch – Hiệu quả trong từng công đoạn từ phác thảo ý tưởng đến bàn giao thành phẩm.
          </p>
        </div>

        <div className="process-layout-grid">
          <div className="process-timeline">
            {steps.map((s, idx) => (
              <div
                className="process-step-card reveal-up"
                data-delay={idx * 80}
                key={s.num}
              >
                <div className="process-step-badge">{s.num}</div>
                <h4 className="process-step-title">{s.title}</h4>
                <p className="process-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="process-media reveal-right" data-delay="150">
            <div className="process-img-frame">
              <img src="/assets/images/quy-trinh-han.jpg" alt="Quy trình chế tác hàn cơ khí mỹ thuật" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

