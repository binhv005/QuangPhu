import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Database } from 'lucide-react';

export default function AdminLeadsModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/consultations');
      const data = await res.json();
      if (data && data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceLabels = {
    'xe-nghi-truong': 'Khối xe nghi trượng A05-A80',
    'tuong-bac-ho': 'Tượng chân dung Bác Hồ',
    'tuong-tho': 'Tượng chân dung thờ',
    'qua-tang': 'Quà tặng mỹ thuật',
    'cong-trinh-khac': 'Công trình khác'
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={22} color="var(--color-red-rich)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-red-rich)' }}>
              Danh Sách Yêu Cầu Tư Vấn & Báo Giá (MongoDB)
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={fetchLeads}
              className="btn btn-outline-gold"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              title="Làm mới"
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span>Tải lại</span>
            </button>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="admin-modal-body">
          {loading && leads.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Đang tải dữ liệu từ MongoDB...</p>
          ) : leads.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có yêu cầu tư vấn nào được ghi nhận.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Họ & Tên</th>
                    <th>Số điện thoại</th>
                    <th>Loại dịch vụ</th>
                    <th>Nội dung yêu cầu</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td style={{ whiteSpace: 'nowrap', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(lead.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--color-red-rich)' }}>{lead.fullName}</td>
                      <td>
                        <a href={`tel:${lead.phone}`} style={{ color: 'var(--color-gold-bright)', fontWeight: 600 }}>
                          {lead.phone}
                        </a>
                      </td>
                      <td>{serviceLabels[lead.serviceType] || lead.serviceType}</td>
                      <td style={{ maxWidth: '280px' }}>{lead.requirement}</td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: lead.status === 'new' ? '#850c1b' : '#2e7d32',
                          color: '#fff'
                        }}>
                          {lead.status === 'new' ? 'Mới nhận' : lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
