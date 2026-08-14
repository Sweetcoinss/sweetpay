export default function Paid() {
return (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <div
      dir="rtl"
      style={{
        background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
        borderRadius: '28px',
        padding: '52px 44px',
        maxWidth: '460px',
        width: '90%',
        boxShadow: '0 24px 70px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(34,197,94,0.3)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '22px',
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
      }}
    >
      <div style={{
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 30px rgba(34,197,94,0.5), 0 0 0 8px rgba(34,197,94,0.12)',
        fontSize: '42px',
        color: '#fff',
        fontWeight: 900,
        lineHeight: 1,
      }}>
        ✓
      </div>

      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 900,
        color: '#14532d',
        margin: 0,
        lineHeight: 1.3,
        letterSpacing: '-0.4px',
      }}>
        تم الدفع بنجاح
      </h2>

      <div style={{
        width: '56px',
        height: '3.5px',
        borderRadius: '99px',
        background: 'linear-gradient(90deg, #22c55e, #16a34a)',
      }} />

      <p style={{
        fontSize: '1.05rem',
        color: '#166534',
        margin: 0,
        lineHeight: 1.9,
        fontWeight: 500,
      }}>
        تم استلام دفعتكم بنجاح.
        <br />
        <span style={{ color: '#14532d', fontWeight: 800, fontSize: '1.1rem' }}>
          يرجى الانتظار حتى يتم قبول طلبكم
        </span>
        <br />
        وسيتم إخطاركم فور الموافقة عليه.
      </p>

      <div style={{
        padding: '12px 32px',
        background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.15))',
        border: '1.5px solid rgba(34,197,94,0.4)',
        borderRadius: '99px',
        fontSize: '0.9rem',
        color: '#15803d',
        fontWeight: 700,
        letterSpacing: '0.4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>✅</span>
        الدفع مؤكد · قيد المراجعة
      </div>
    </div>
  </div>
);
}
