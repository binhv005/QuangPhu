import React from 'react';
import TypewriterText from './TypewriterText';

export default function Customers() {
  const topCustomers = [
    {
      title: 'Cơ quan & Ban tổ chức Đại lễ',
      desc: 'Sản xuất xe nghi trượng, tượng Bác Hồ và quà tặng đối ngoại cho các sự kiện chính trị cấp quốc gia và địa phương.',
      img: '/assets/images/khach-hang-co-quan.jpg'
    },
    {
      title: 'Di tích & Cơ sở Tôn giáo',
      desc: 'Chế tác tượng danh nhân, tượng thờ tâm linh, đồ đồng mỹ nghệ theo đúng quy chuẩn kiến trúc và di sản.',
      img: '/assets/images/khach-hang-di-tich.jpg'
    },
    {
      title: 'Gia đình & Dòng họ',
      desc: 'Đúc tượng chân dung thờ phụng ông bà, cha mẹ với độ truyền thần cao, trang nghiêm và bền đẹp trường tồn.',
      img: '/assets/images/tuong-tho.jpg'
    }
  ];

  const bottomCustomers = [
    {
      title: 'Doanh nghiệp & Tập đoàn',
      desc: 'Chế tác quà tặng mỹ nghệ mạ vàng độc bản, tượng biểu trưng thương hiệu và kỷ niệm chương sang trọng.',
      img: '/assets/images/gallery-cham-dong.jpg'
    }
  ];

  return (
    <section className="section customers-section" id="customers">
      <div className="container">
        <div className="section-header-center reveal-up">
          <h2 className="section-title">
            <TypewriterText
              segments={[
                { text: 'ĐỐI TƯỢNG ', className: '', lineBreak: false },
                { text: 'KHÁCH HÀNG', className: 'gold-text', lineBreak: true }
              ]}
              speed={36}
            />
          </h2>
          <p className="section-subtitle">
            Chúng tôi tự hào là đối tác tin cậy của các tổ chức nhà nước, cộng đồng tôn giáo, gia đình và doanh nghiệp.
          </p>
        </div>

        <div className="customers-grid-top">
          {topCustomers.map((c, i) => (
            <div
              className="customer-card reveal-up"
              data-delay={i * 120}
              key={i}
            >
              <div className="customer-img-box">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="customer-body">
                <h3 className="customer-title">{c.title}</h3>
                <p className="customer-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="customers-grid-bottom">
          {bottomCustomers.map((c, i) => (
            <div
              className="customer-card reveal-up"
              data-delay={i * 140 + 100}
              key={i}
            >
              <div className="customer-img-box">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="customer-body">
                <h3 className="customer-title">{c.title}</h3>
                <p className="customer-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
