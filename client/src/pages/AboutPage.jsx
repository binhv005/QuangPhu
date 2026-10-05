import React, { useEffect } from 'react';
import TypewriterText from '../components/TypewriterText';
import LeadershipSection from '../components/LeadershipSection';
import PartnerMarquee from '../components/PartnerMarquee';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEn = lang === 'en';

  return (
    <div className="page-wrapper about-editorial-page subpage-content">
      <div className="container about-editorial-container">
        <div className="about-editorial-grid">
          {/* Left Column: Big Title + Stylized Brand Emblem */}
          <div className="about-editorial-left reveal-left">
            <div className="about-editorial-hero-title">
              <TypewriterText
                key={`about-hero-typewriter-${lang}`}
                segments={[
                  { text: isEn ? 'We are' : 'Chúng tôi là', className: 'about-hero-weare', lineBreak: false },
                  { text: isEn ? 'Quang Phu' : 'Quảng Phú', className: 'about-hero-brandname', lineBreak: true }
                ]}
                speed={75}
                startDelay={200}
                showCursor={true}
                hideCursorOnComplete={false}
              />
            </div>

            {/* Brand Logo (Tightly Cropped Transparent PNG) */}
            <div className="about-brand-emblem-wrap">
              <img
                src="/assets/images/about-logo.webp"
                alt="Logo Quảng Phú"
                className="about-brand-emblem-img"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Core Values */}
          <div className="about-editorial-right reveal-right" data-delay="100">
            {/* Top Introductory Paragraph */}
            <div className="about-editorial-lead">
              <p>
                {isEn ? (
                  <>
                    As a leading prestigious enterprise in the field of artistic mechanical engineering and large-scale monument crafting, with core expertise in design, manufacturing, and installation of diverse projects such as: National Ceremony Parade Vehicles (A05 – A80), Historical Monuments, Busts of President Ho Chi Minh, Ancestral Portrait Statues, High-end gold-plated corporate art gifts... ensuring mechanical precision and profound artistic depth. <strong>QUANG PHU ARTISTIC MECHANICAL</strong> proudly establishes a solid position in the nationwide artistic engineering industry, creating distinguished impressions through uniqueness in every past, present, and future endeavor.
                  </>
                ) : (
                  <>
                    Là đơn vị uy tín hàng đầu trong lĩnh vực cơ khí mỹ thuật và chế tác công trình quy mô, với định hướng trọng tâm cũng là thế mạnh – thiết kế, sản xuất và thi công các dự án đa dạng như: Khối xe Nghi trượng phục vụ Đại lễ Quốc gia (A05 – A80), Tượng đài lịch sử, Tượng chân dung Chủ tịch Hồ Chí Minh, Tượng thờ gia tiên truyền thần, Quà tặng mỹ thuật mạ vàng cao cấp cho các doanh nghiệp, tập đoàn lớn... đảm bảo tính chuyên nghiệp, chuẩn xác cơ học và chiều sâu nghệ thuật đặc sắc ấn tượng. <strong>CƠ KHÍ MỸ THUẬT QUẢNG PHÚ</strong> tự hào đã kiến tạo một vị thế vững chắc trong ngành cơ khí nghệ thuật cả nước, tạo nên những dấu ấn qua sự khác biệt ở mỗi công trình đã, đang và sẽ thực hiện.
                  </>
                )}
              </p>
            </div>

            {/* Manifesto Quote / Mission Heading */}
            <h2 className="about-editorial-manifesto">
              {isEn
                ? 'Success is a journey, not a destination — that has always been our guiding principle.'
                : 'Thành công là một hành trình chứ không phải đích đến, đó luôn là tiêu chí của chúng tôi.'}
            </h2>

            {/* 3 Core Value Statements */}
            <div className="about-editorial-values">
              {isEn ? (
                <>
                  <p className="about-value-p">
                    The difference lies in truly <strong>UNDERSTANDING</strong> our clients and partners, delivering not just what you <strong>WANT</strong>, but genuinely what you <strong>NEED</strong>: optimal engineering solutions, absolute structural safety, and timeless aesthetic value.
                  </p>
                  <p className="about-value-p">
                    The difference lies in our contemporary <strong>EXPRESSION</strong> and modernized manufacturing workflows, applying CNC laser cutting and precision casting while preserving traditional artistic soul.
                  </p>
                  <p className="about-value-p">
                    The difference lies in the <strong>DEDICATION</strong> of our team of master artisans and engineers, capable of creating national-scale masterpieces with exact timelines and immaculate quality.
                  </p>
                </>
              ) : (
                <>
                  <p className="about-value-p">
                    Sự khác biệt nằm ở cảm quan <strong>THẤU HIỂU</strong> khách hàng, đối tác, mang lại không chỉ điều quý vị <strong>MUỐN</strong> mà thực chất cái quý vị <strong>CẦN</strong>: một giải pháp kỹ thuật tối ưu, kết cấu chịu lực an toàn tuyệt đối và tính thẩm mỹ trường tồn.
                  </p>
                  <p className="about-value-p">
                    Sự khác biệt nằm ở hình thức <strong>THỂ HIỆN</strong>, tổ chức và thực hiện quy trình chế tác mới mẻ, ứng dụng công nghệ cắt gọt laser CNC và đúc cơ khí chính xác, phù hợp với xu thế thời đại nhưng vẫn vẹn nguyên các giá trị truyền thống và thần thái tác phẩm.
                  </p>
                  <p className="about-value-p">
                    Sự khác biệt nằm ở <strong>TÂM HUYẾT</strong> của ekip nghệ nhân và kỹ sư thực hiện, có năng lực tạo nên những công trình nghệ thuật mang tầm vóc quốc gia với tiến độ chuẩn xác và chất lượng hoàn hảo.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section (Ban Lãnh đạo) */}
      <LeadershipSection />

      {/* Our Valued Clients Marquee Strip above Footer */}
      <PartnerMarquee
        showTitle={true}
        title={isEn ? 'Our Valued Clients' : 'Khách hàng & Đối tác tiêu biểu'}
        subtitle={
          isEn
            ? 'Proud to be a trusted partner of ministries, state agencies, and prominent nationwide corporations'
            : 'Tự hào đồng hành cùng các Bộ Ban Ngành, cơ quan đoàn thể và các tập đoàn lớn trên toàn quốc'
        }
      />
    </div>
  );
}
