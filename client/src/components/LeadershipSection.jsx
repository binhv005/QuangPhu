import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LeadershipSection() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const leaders = [
    {
      id: 1,
      name: isEn ? 'PHAM THI HANG' : 'PHẠM THỊ HẰNG',
      role: isEn ? 'CHAIRWOMAN OF THE BOARD' : 'CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ',
      image: '/assets/images/leader-pham-thi-hang.webp',
      alt: 'Phạm Thị Hằng - Chủ tịch Hội đồng Quản trị',
      layout: 'image-left',
      bullets: isEn
        ? [
            'Bachelor of Business Administration – Thuongmai University',
            'Master of Business Administration – Griggs University, USA',
            'Over 20 years of experience in strategic leadership and executive management across: Tourism, Services, and Event Organization.',
            'Directing major national events for Government Ministries and premier domestic and international corporations.'
          ]
        : [
            'Cử nhân quản trị kinh doanh – Đại học Thương Mại',
            'Thạc sỹ quản trị kinh doanh – Đại học Griggs Hoa Kỳ',
            'Có trên 20 năm kinh nghiệm trong việc định hướng chiến lược và điều hành các mảng việc: Du lịch, Dịch vụ, Tổ chức sự kiện.',
            'Chỉ đạo điều hành chung các sự kiện lớn của Bộ ban ngành Chính phủ và các tập đoàn hàng đầu trong nước và Quốc tế.'
          ],
      quote: isEn
        ? '“I am always driven by passion, relentless dedication to work and creative breakthrough. I constantly strive to bring extraordinary values to myself, to our valued clients, and to the community... I always dedicate my whole heart to inspiring trust and energy to everyone working alongside me on our journey to conquer new milestones for our collective career.”'
        : '“Tôi luôn khát khao, nhiệt huyết đam mê công việc và sáng tạo, tôi vươn mình không ngừng nghỉ để tạo ra những điều tuyệt vời cho mình, cho khách hàng và cho tất cả mọi người... Tôi luôn cháy hết mình để truyền lửa nhiệt huyết lòng tin cậy đến mỗi người sát cánh bên tôi làm việc cùng tôi trên con đường chinh phục thành công cho sự nghiệp của chúng ta.”'
    },
    {
      id: 2,
      name: isEn ? 'HOANG THI MINH THUY' : 'HOÀNG THỊ MINH THÚY',
      role: isEn ? 'DIRECTOR' : 'GIÁM ĐỐC',
      image: '/assets/images/leader-hoang-thi-minh-thuy.webp',
      alt: 'Hoàng Thị Minh Thúy - Giám đốc',
      layout: 'image-right',
      bullets: isEn
        ? [
            'Master of Business Administration at Vietnam National University – Griggs University USA; Bachelor of Economics in Finance & Accounting at Hanoi Thuongmai University.',
            'Over 15 years of specialized expertise in financial training and corporate business consulting.',
            'Over 10 years of executive experience in tourism, high-end services, and national-scale event staging.',
            'Continuous consecutive years collaborating directly with Government Ministries and State Departments.'
          ]
        : [
            'Thạc sỹ Quản trị kinh doanh tại trường Đại học Quốc Gia HN – Đại học Griggs Hoa Kỳ; Cử nhân kinh tế Chuyên ngành Tài chính – Kế toán tại Trường Đại học Thương Mại Hà Nội.',
            'Trên 15 năm kinh nghiệm về đào tạo, huấn luyện chuyên môn Kế toán, Kinh doanh.',
            'Trên 10 năm kinh nghiệm trong lĩnh vực du lịch, dịch vụ, tổ chức sự kiện.',
            'Nhiều năm liên tiếp làm việc với các Bộ ban ngành Chính phủ.'
          ],
      quote: null
    }
  ];

  return (
    <section className="leadership-section reveal-up" id="leadership">
      <div className="container leadership-container">
        {/* Section Headline */}
        <div className="leadership-header">
          <h2 className="leadership-title">
            <span>{isEn ? 'Executive' : 'Ban'}</span>
            <br />
            <span>{isEn ? 'Leadership' : 'Lãnh đạo'}</span>
          </h2>
        </div>

        {/* Leadership List */}
        <div className="leadership-list">
          {leaders.map((leader, idx) => {
            const isImageLeft = leader.layout === 'image-left';

            return (
              <React.Fragment key={leader.id}>
                {/* Center Motif Divider between leaders */}
                {idx > 0 && (
                  <div className="leadership-divider-wrap" aria-hidden="true">
                    <div className="leadership-divider-line" />
                    <div className="leadership-divider-icon">
                      {/* Stylized Red Lotus / Seal Accent */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2C13.5 6 17 8 20 8.5C17 11 15 14 15 18C13 16 11 16 9 18C9 14 7 11 4 8.5C7 8 10.5 6 12 2Z"
                          fill="#e53935"
                        />
                      </svg>
                    </div>
                    <div className="leadership-divider-line" />
                  </div>
                )}

                <article className={`leadership-card ${isImageLeft ? 'layout-img-left' : 'layout-img-right'}`}>
                  {/* Portrait Column */}
                  <div className="leadership-photo-col">
                    <div className="leadership-photo-frame">
                      <img
                        src={leader.image}
                        alt={leader.alt}
                        loading="lazy"
                        className="leadership-photo-img"
                      />
                    </div>
                  </div>

                  {/* Information Column */}
                  <div className="leadership-info-col">
                    <div className="leadership-info-header">
                      <h3 className="leadership-name">{leader.name}</h3>
                      <span className="leadership-role">{leader.role}</span>
                    </div>

                    <ul className="leadership-bullets">
                      {leader.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leadership-bullet-item">
                          {b}
                        </li>
                      ))}
                    </ul>

                    {leader.quote && (
                      <div className="leadership-quote-box">
                        <p className="leadership-quote-text">{leader.quote}</p>
                      </div>
                    )}
                  </div>
                </article>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
