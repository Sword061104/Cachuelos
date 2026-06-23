import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TrendingUp, Sparkles, Briefcase, CheckCircle, LayoutGrid, Users, ShieldCheck, AlertCircle, LogOut, Trophy, BarChart2, Home, Map, ChevronDown, MapPin, Clock, Navigation, Truck, Dog, Flower2, Package, ShoppingBag, Wrench, BookOpen, ChefHat, Star, Search, RefreshCw, PlusCircle, Tag, DollarSign, Calendar, X, Bell, ThumbsUp, ClipboardList, User, FileText, Heart, Zap, Link2, Camera, Edit3, Save, Compass, Shield, AlertTriangle} from 'lucide-react';

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPA_URL = 'https://nhnrvycafvmmvnpmkuop.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obnJ2eWNhZnZtbXZucG1rdW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzkyNzIsImV4cCI6MjA5MzE1NTI3Mn0.8XvbZfYYbfmL2MOv3BkkgzyySuMnsVYC5dviZkszRJQ';
const sb = createClient(SUPA_URL, SUPA_KEY);const ADMIN_ID = '012c58ca-d03a-4a67-86c0-de1a69c805d7';

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F8FA;color:#111827;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  button{cursor:pointer;border:none;background:none;font-family:inherit}
  input,textarea,select{font-family:inherit}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#F3F4F6}
  ::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:3px}
  .fade-up{animation:fadeUp .35s ease-out both}
  .fade-up-2{animation:fadeUp .35s .08s ease-out both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .card{background:#fff;border-radius:20px;border:1.5px solid #EBEBEB;box-shadow:0 1px 4px rgba(0,0,0,.05),0 4px 16px rgba(0,0,0,.04);transition:border-color .2s,box-shadow .2s,transform .2s}
  .card-hover:hover{border-color:#EA580C;box-shadow:0 6px 28px rgba(234,88,12,.12);transform:translateY(-3px);cursor:pointer}
  .btn{display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;line-height:1}
  .btn-orange{background:#EA580C;color:#fff;display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;border:none;cursor:pointer}
  .btn-orange:hover{background:#C2410C;transform:translateY(-1px);box-shadow:0 4px 14px rgba(234,88,12,.35)}
  .btn-orange:disabled{opacity:.5;transform:none;cursor:not-allowed}
  .btn-outline{background:#fff;color:#374151;border:1.5px solid #E5E7EB;display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;cursor:pointer}
  .btn-outline:hover{border-color:#EA580C;color:#EA580C;background:#FFF7ED}
  .btn-ghost{color:#6B7280;padding:8px 14px;border-radius:12px;display:inline-flex;align-items:center;gap:6px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer}
  .btn-ghost:hover{background:#F3F4F6;color:#111827}
  .btn-green{background:#16A34A;color:#fff;display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;border:none;cursor:pointer}
  .btn-green:hover{background:#15803D}
  .btn-green:disabled{opacity:.5;cursor:not-allowed}
  .btn-blue{background:#2563EB;color:#fff;display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;border:none;cursor:pointer}
  .btn-blue:hover{background:#1D4ED8}
  .btn-blue:disabled{opacity:.5;cursor:not-allowed}
  .btn-red{background:#DC2626;color:#fff;display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:14px;transition:all .18s;font-family:inherit;font-size:14px;padding:10px 20px;border:none;cursor:pointer}
  .btn-red:hover{background:#B91C1C}
  .inp{width:100%;padding:11px 16px;border-radius:14px;border:1.5px solid #E5E7EB;font-size:14px;outline:none;transition:border-color .15s,box-shadow .15s;color:#111827;background:#fff}
  .inp:focus{border-color:#EA580C;box-shadow:0 0 0 3px rgba(234,88,12,.12)}
  .inp::placeholder{color:#9CA3AF}
  .inp-err{border-color:#EF4444 !important}
  .tag{display:inline-flex;align-items:center;gap:5px;border-radius:20px;padding:3px 10px;font-size:12px;font-weight:700}
  .pill-nav{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
  .pill-nav::-webkit-scrollbar{display:none}
  .pill{padding:7px 16px;border-radius:20px;font-size:13px;font-weight:700;transition:all .15s;white-space:nowrap;border:none;cursor:pointer}
  .divider{height:1px;background:#F3F4F6;margin:20px 0}
  @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes notifIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  @media(max-width:640px){.hide-mobile{display:none!important}.grid-jobs{grid-template-columns:1fr!important}}
`;

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CAT = {
  cleaning:    {label:'Limpieza',      emoji:'🧹', icon:'Sparkles',  color:'#0369A1',bg:'#EFF6FF'},
  dog_walking: {label:'Pasear Perros', emoji:'🐕', icon:'Heart',     color:'#92400E',bg:'#FFFBEB'},
  gardening:   {label:'Jardinería',    emoji:'🌱', icon:'Flower2',   color:'#166534',bg:'#F0FDF4'},
  moving:      {label:'Mudanza',       emoji:'🚚', icon:'Truck',     color:'#1E40AF',bg:'#EFF6FF'},
  errands:     {label:'Mandados',      emoji:'🛍', icon:'ShoppingBag',color:'#9D174D',bg:'#FDF2F8'},
  handyman:    {label:'Reparar',       emoji:'🔧', icon:'Wrench',    color:'#374151',bg:'#F3F4F6'},
  tutoring:    {label:'Tutoría',       emoji:'📚', icon:'BookOpen',  color:'#5B21B6',bg:'#F5F3FF'},
  cooking:     {label:'Cocina',        emoji:'👨‍🍳', icon:'ChefHat',   color:'#991B1B',bg:'#FEF2F2'},
  delivery:    {label:'Delivery',      emoji:'📦', icon:'Package',   color:'#92400E',bg:'#FEF3C7'},
  other:       {label:'Otro',          emoji:'✨', icon:'Tag',       color:'#6B7280',bg:'#F9FAFB'},
};

const STATUS = {
  open:        {label:'Disponible',  color:'#16A34A', bg:'#F0FDF4'},
  accepted:    {label:'Aceptado',    color:'#EA580C', bg:'#FFF7ED'},
  in_progress: {label:'En Progreso', color:'#D97706', bg:'#FFFBEB'},
  completed:   {label:'Completado',  color:'#6B7280', bg:'#F8FAFC'},
  cancelled:   {label:'Cancelado',   color:'#DC2626', bg:'#FEF2F2'},
};

// Flujo de 4 pasos
const JOB_STEPS = [
  {key:'open',        label:'Publicado',   icon:'📋'},
  {key:'accepted',    label:'Aceptado',    icon:'🤝'},
  {key:'in_progress', label:'En progreso', icon:'⚡'},
  {key:'completed',   label:'Completado',  icon:'✅'},
]; // iconos se renderizan como Lucide en JobProgressBar

const LIMA = ['Miraflores','San Isidro','Santiago de Surco','San Borja','Magdalena del Mar','Jesús María','Lince','Pueblo Libre','Barranco','La Molina','San Miguel','Surquillo'];
const LIMA_COORDS = {
  'Miraflores':{lat:-12.1191,lng:-77.0286},'San Isidro':{lat:-12.0981,lng:-77.0360},
  'Santiago de Surco':{lat:-12.1549,lng:-76.9926},'San Borja':{lat:-12.1024,lng:-77.0033},
  'Magdalena del Mar':{lat:-12.0925,lng:-77.0722},'Jesús María':{lat:-12.0728,lng:-77.0503},
  'Lince':{lat:-12.0836,lng:-77.0360},'Pueblo Libre':{lat:-12.0742,lng:-77.0630},
  'Barranco':{lat:-12.1442,lng:-77.0219},'La Molina':{lat:-12.0806,lng:-76.9372},
  'San Miguel':{lat:-12.0772,lng:-77.0850},'Surquillo':{lat:-12.1153,lng:-77.0102},
};
// Polígono aproximado que cubre los distritos de Lima Moderna habilitados para publicar
const LIMA_MODERNA_POLYGON = [
  [-12.0583, -77.0951],
  [-12.0546, -76.9604],
  [-12.0646, -76.9478],
  [-12.0826, -76.8930],
  [-12.1131, -76.9718],
  [-12.1581, -76.9790],
  [-12.1584, -77.0926],
];
// Algoritmo ray-casting: ¿el punto (lat,lng) está dentro del polígono?
function isInLimaModerna(lat,lng){
  let inside=false;
  const poly=LIMA_MODERNA_POLYGON;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const[latI,lngI]=poly[i], [latJ,lngJ]=poly[j];
    if(((lngI>lng)!==(lngJ>lng)) && (lat < (latJ-latI)*(lng-lngI)/(lngJ-lngI)+latI)){
      inside=!inside;
    }
  }
  return inside;
}
const SOCIAL_NOTIFS = [
  {name:'Carlos M.',uni:'UPC',earned:'S/ 80',job:'Mudanza en Miraflores',time:'hace 8 min'},
  {name:'Lucía T.',uni:'PUCP',earned:'S/ 50',job:'Limpieza en San Isidro',time:'hace 15 min'},
  {name:'Diego R.',uni:'ULima',earned:'S/ 35',job:'Paseo de perros en Surco',time:'hace 22 min'},
  {name:'Valeria O.',uni:'Científica',earned:'S/ 120',job:'Cocina en Jesús María',time:'hace 31 min'},
  {name:'Andrés P.',uni:'San Marcos',earned:'S/ 45',job:'Delivery en San Borja',time:'hace 40 min'},
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function distKm(a,b){const R=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLon=(b.lng-a.lng)*Math.PI/180;const x=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
function fmtDist(km){return km<1?`${Math.round(km*1000)}m`:`${km.toFixed(1)}km`}
function fmtDate(d){try{return new Date(d).toLocaleDateString('es-PE',{day:'numeric',month:'short'})}catch{return '—'}}

// Calcula las preferencias de un trabajador combinando:
// 1) categorías favoritas marcadas a mano en el perfil (profile.skills)
// 2) categorías y distritos donde ya trabajó antes (historial de jobs completados)
// Devuelve un Set de categorías preferidas y un Set de distritos preferidos.
function getWorkerPreferences(profile, completedJobs){
  const favCats = new Set(profile?.skills || []);
  const histCats = new Set();
  const histDistricts = new Set();
  (completedJobs||[]).forEach(j=>{
    if(j.category) histCats.add(j.category);
    const d = j.district || j.location;
    if(d) histDistricts.add(d);
  });
  // Unión: favoritas manuales + historial real
  const preferredCats = new Set([...favCats, ...histCats]);
  return { preferredCats, histDistricts, favCats, histCats };
}

// Da un puntaje de "qué tan recomendado" es un trabajo para un trabajador,
// basado en si la categoría coincide con sus preferidas y si el distrito
// coincide con donde trabajó antes. Mayor puntaje = más relevante.
function scoreJobForWorker(job, prefs){
  let score = 0;
  if(prefs.favCats.has(job.category)) score += 3;       // marcó esta categoría como favorita
  else if(prefs.histCats.has(job.category)) score += 2; // ya trabajó en esta categoría antes
  const d = job.district || job.location;
  if(d && prefs.histDistricts.has(d)) score += 1;        // ya trabajó en ese distrito antes
  return score;
}

// Carga Leaflet dinámicamente con manejo de error
function loadLeaflet(onOk, onErr){
  if(window.L){onOk();return;}
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(css);
  const s=document.createElement('script');
  s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  s.onload=()=>onOk();
  s.onerror=()=>onErr();
  document.head.appendChild(s);
}

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const CAT_ICONS={Sparkles,Heart,Flower2,Truck,ShoppingBag,Wrench,BookOpen,ChefHat,Package,Tag};
function CatTag({cat}){
  const c=CAT[cat]||CAT.other;
  const Icon=CAT_ICONS[c.icon]||Tag;
  return <span className="tag" style={{background:c.bg,color:c.color,fontWeight:700,fontSize:12,display:'inline-flex',alignItems:'center',gap:4}}>
    <Icon size={11} color={c.color}/>{c.label}
  </span>;
}
function StatusTag({status}){const s=STATUS[status]||STATUS.open;return <span style={{display:'inline-flex',alignItems:'center',gap:4,background:s.bg,color:s.color,borderRadius:20,padding:'3px 10px',fontSize:11,fontWeight:700}}><span style={{width:6,height:6,borderRadius:'50%',background:s.color,display:'inline-block'}}/>{s.label}</span>}
function Avatar({name,size=36,color='#EA580C'}){const init=(name||'?').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();return <div style={{width:size,height:size,borderRadius:'50%',background:color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:size*.38,flexShrink:0}}>{init}</div>}
function Stars({value=0,onRate,size=18}){const[hov,setHov]=useState(0);return <div style={{display:'flex',gap:2}}>{[1,2,3,4,5].map(n=><span key={n} onClick={()=>onRate?.(n)} onMouseEnter={()=>onRate&&setHov(n)} onMouseLeave={()=>onRate&&setHov(0)} style={{fontSize:size,color:n<=(hov||value)?'#F59E0B':'#E5E7EB',cursor:onRate?'pointer':'default',lineHeight:1}}>★</span>)}</div>;}
function VerifiedBadge({status}){if(status==='verified')return <span style={{display:'inline-flex',alignItems:'center',gap:4,background:'#EFF6FF',color:'#1D4ED8',border:'1px solid #BFDBFE',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:700}}><ShieldCheck size={11}/>Verificado</span>;if(status==='reviewing')return <span style={{display:'inline-flex',alignItems:'center',gap:4,background:'#FFFBEB',color:'#92400E',border:'1px solid #FDE68A',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:700}}><AlertCircle size={11}/>En revisión</span>;return <span style={{display:'inline-flex',alignItems:'center',gap:4,background:'#F3F4F6',color:'#6B7280',border:'1px solid #E5E7EB',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:700}}><AlertCircle size={11}/>Sin verificar</span>;}
function RecommendedBadge({reason}){
  return <span className="tag" style={{background:'#F5F3FF',color:'#5B21B6',display:'inline-flex',alignItems:'center',gap:4}}>
    <Star size={11} fill="#5B21B6" color="#5B21B6"/>{reason||'Para ti'}
  </span>;
}
function Toast({msg,type}){return <div style={{position:'fixed',bottom:24,right:24,zIndex:9999,background:type==='error'?'#FEF2F2':'#F0FDF4',border:`1.5px solid ${type==='error'?'#FCA5A5':'#86EFAC'}`,color:type==='error'?'#DC2626':'#16A34A',padding:'14px 20px',borderRadius:16,fontWeight:700,fontSize:14,boxShadow:'0 8px 24px rgba(0,0,0,.12)',animation:'fadeUp .25s ease-out'}}>{msg}</div>}
function Spin(){return <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:60}}><div style={{width:32,height:32,border:'3px solid #F3F4F6',borderTop:'3px solid #EA580C',borderRadius:'50%',animation:'spin 1s linear infinite'}}/></div>}
function Field({label,error,children}){return <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:700,color:'#374151',display:'block',marginBottom:6}}>{label}</label>{children}{error&&<p style={{color:'#EF4444',fontSize:12,marginTop:4,fontWeight:500}}>⚠ {error}</p>}</div>}

// ─── CONFIRM MODAL (de versión A — más limpio) ────────────────────────────────
function ConfirmModal({data,onClose,loading}){
  if(!data)return null;
  useEffect(()=>{
    const handler=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',handler);
    return()=>window.removeEventListener('keydown',handler);
  },[onClose]);
  return(
    <div
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={(e)=>{if(e.target===e.currentTarget)onClose();}}
    >
      <div className="card fade-up" style={{maxWidth:400,width:'100%',padding:32}}>
        <div style={{fontSize:42,textAlign:'center',marginBottom:12}}>{data.icon}</div>
        <h2 style={{fontWeight:800,fontSize:20,textAlign:'center',marginBottom:8,color:'#111827'}}>{data.title}</h2>
        <p style={{color:'#6B7280',fontSize:14,textAlign:'center',lineHeight:1.65,marginBottom:24}}>{data.desc}</p>
        <div style={{display:'flex',gap:10}}>
          <button className="btn-ghost" style={{flex:1,justifyContent:'center',border:'1.5px solid #E5E7EB',borderRadius:12}} onClick={onClose}>Cancelar</button>
          <button className={data.btnClass||'btn-orange'} style={{flex:1,justifyContent:'center'}} onClick={data.onConfirm} disabled={loading}>
            {loading?'⏳ Procesando...':data.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BARRA DE PROGRESO ────────────────────────────────────────────────────────
function JobProgressBar({status, workerFinished}){
  const idx = JOB_STEPS.findIndex(s=>s.key===status);
  if(idx===-1||status==='cancelled')return null;
  return(
    <div style={{background:'#F9FAFB',borderRadius:16,padding:'16px 20px',marginBottom:20}}>
      <div style={{fontSize:12,fontWeight:700,color:'#6B7280',marginBottom:14,textTransform:'uppercase',letterSpacing:1}}>Progreso del trabajo</div>
      <div style={{display:'flex',alignItems:'center'}}>
        {JOB_STEPS.map((step,i)=>{
          const done=i<=idx, active=i===idx;
          const pending=active&&status==='in_progress'&&workerFinished;
          return(
            <div key={step.key} style={{display:'flex',alignItems:'center',flex:i<JOB_STEPS.length-1?1:'unset'}}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:pending?'#D97706':done?'#EA580C':'#E5E7EB',color:done?'#fff':'#9CA3AF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,transition:'all .3s',boxShadow:active?`0 0 0 4px ${pending?'rgba(217,119,6,.2)':'rgba(234,88,12,.2)'}`:''}}>{done&&i<idx?'✓':pending?'⏳':step.icon}</div>
                <span style={{fontSize:10,fontWeight:active?700:500,color:done?'#EA580C':'#9CA3AF',whiteSpace:'nowrap'}}>{pending?'Esperando confirmación':step.label}</span>
              </div>
              {i<JOB_STEPS.length-1&&<div style={{flex:1,height:3,background:i<idx?'#EA580C':'#E5E7EB',margin:'0 4px',marginBottom:22,borderRadius:2,transition:'background .3s'}}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SECURITY BANNER ──────────────────────────────────────────────────────────
function SecurityBanner({onClose}){
  return(
    <div style={{animation:'slideDown .5s ease-out both',background:'linear-gradient(90deg,#ECFDF5,#D1FAE5)',border:'1.5px solid #6EE7B7',borderRadius:14,padding:'12px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
      <div style={{width:36,height:36,borderRadius:10,background:'#16A34A',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <ShieldCheck size={18} color="#fff"/>
      </div>
      <div style={{flex:1}}>
        <span style={{fontWeight:700,fontSize:13,color:'#064E3B'}}>Entorno 100% seguro. </span>
        <span style={{fontSize:13,color:'#065F46'}}>Todos los empleadores verificados con <strong>DNI y RENIEC</strong>. Tu pago está protegido.</span>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center',flexShrink:0}}>
        <span style={{background:'#16A34A',color:'#fff',borderRadius:20,padding:'3px 12px',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',gap:4}}>
          <CheckCircle size={11}/> Pagos protegidos
        </span>
        <button onClick={onClose} style={{color:'#6B7280',fontSize:18,lineHeight:1,padding:'2px 6px',fontWeight:700}}>×</button>
      </div>
    </div>
  );
}

// ─── SOCIAL PROOF ─────────────────────────────────────────────────────────────
function SocialProofNotif(){
  const[visible,setVisible]=useState(false);
  const[idx,setIdx]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setVisible(true),4000);return()=>clearTimeout(t)},[]);
  useEffect(()=>{if(!visible)return;const t=setTimeout(()=>setVisible(false),5000);return()=>clearTimeout(t)},[visible]);
  useEffect(()=>{if(visible)return;const t=setTimeout(()=>{setIdx(i=>(i+1)%SOCIAL_NOTIFS.length);setVisible(true)},12000);return()=>clearTimeout(t)},[visible]);
  if(!visible)return null;
  const n=SOCIAL_NOTIFS[idx];
  return(
    <div style={{position:'fixed',bottom:24,left:24,zIndex:8888,background:'#fff',borderRadius:16,padding:'14px 18px',boxShadow:'0 8px 32px rgba(0,0,0,.14)',border:'1.5px solid #F0F1F3',maxWidth:300,animation:'notifIn .4s ease-out both'}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#EA580C,#F97316)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:15,flexShrink:0}}>{n.name[0]}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:13,color:'#111827'}}>{n.name} · <span style={{color:'#6B7280',fontWeight:500}}>{n.uni}</span></div>
          <div style={{fontSize:12,color:'#6B7280',marginTop:1}}>acaba de ganar <strong style={{color:'#16A34A'}}>{n.earned}</strong></div>
          <div style={{fontSize:11,color:'#9CA3AF',marginTop:1}}>"{n.job}" · {n.time}</div>
        </div>
      </div>
    </div>
  );
}

// ─── MERCADO DE LIMA ──────────────────────────────────────────────────────────
function MercadoSection({jobs}){
  if(!jobs||jobs.length===0)return null;
  const bycat={};
  jobs.forEach(j=>{if(!j.category||!j.price)return;if(!bycat[j.category])bycat[j.category]={sum:0,count:0};bycat[j.category].sum+=j.price;bycat[j.category].count++;});
  const catStats=Object.entries(bycat).map(([k,v])=>({cat:k,avg:Math.round(v.sum/v.count),count:v.count,...(CAT[k]||CAT.other)})).sort((a,b)=>b.count-a.count).slice(0,5);
  const byDist={};
  jobs.filter(j=>j.status==='open').forEach(j=>{
    const d=j.district||j.location;
    if(d)byDist[d]=(byDist[d]||0)+1;
  });
  const topDistricts=Object.entries(byDist).sort((a,b)=>b[1]-a[1]).slice(0,4);
  const weekAgo=new Date(Date.now()-7*24*60*60*1000);
  const completedWeek=jobs.filter(j=>j.status==='completed'&&new Date(j.created_at)>weekAgo).length;
  const avgPrice=jobs.length?Math.round(jobs.reduce((s,j)=>s+(j.price||0),0)/jobs.length):0;
  const maxCount=topDistricts[0]?.[1]||1;
  return(
    <div style={{marginBottom:28}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
        <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',borderRadius:10,padding:8,display:'flex',alignItems:'center',justifyContent:'center'}}><BarChart2 size={18} color="#fff"/></div>
        <div><h2 style={{fontWeight:700,fontSize:17,color:'#111827'}}>Mercado de Lima esta semana</h2><p style={{fontSize:12,color:'#9CA3AF'}}>Datos reales de cachuelos publicados</p></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
        {[{label:'Precio promedio',value:`S/${avgPrice}`,Icon:DollarSign,color:'#EA580C',bg:'#FFF7ED'},{label:'Completados semana',value:completedWeek,Icon:CheckCircle,color:'#16A34A',bg:'#F0FDF4'},{label:'Categorías activas',value:catStats.length,Icon:Tag,color:'#5B21B6',bg:'#F5F3FF'}].map(s=>(
          <div key={s.label} className="card" style={{padding:'14px 16px',textAlign:'center'}}>
            <div style={{background:s.bg,width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px'}}><s.Icon size={18} color={s.color}/></div>
            <div style={{fontSize:20,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:11,color:'#9CA3AF',fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="card" style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,color:'#374151',marginBottom:14}}>💰 Precio promedio por categoría</div>
          {catStats.map(c=>{const maxAvg=catStats[0]?.avg||1;return(
            <div key={c.cat} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}><span style={{fontSize:12,fontWeight:600,color:'#374151'}}>{c.emoji} {c.label}</span><span style={{fontSize:12,fontWeight:700,color:'#EA580C'}}>S/{c.avg}</span></div>
              <div style={{height:6,background:'#F3F4F6',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${(c.avg/maxAvg)*100}%`,background:'linear-gradient(90deg,#EA580C,#F97316)',borderRadius:3,transition:'width .6s ease'}}/></div>
            </div>
          );})}
        </div>
        <div className="card" style={{padding:18}}>
          <div style={{fontWeight:700,fontSize:13,color:'#374151',marginBottom:14}}>📍 Distritos más activos</div>
          {topDistricts.length===0&&<p style={{fontSize:13,color:'#9CA3AF'}}>Sin datos aún</p>}
          {topDistricts.map(([dist,count],i)=>(
            <div key={dist} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:14,fontWeight:800,color:'#EA580C'}}>{i+1}</span><span style={{fontSize:12,fontWeight:600,color:'#374151'}}>{dist}</span></div>
                <span style={{fontSize:11,color:'#6B7280',fontWeight:600}}>{count} trabajo{count>1?'s':''}</span>
              </div>
              <div style={{height:6,background:'#F3F4F6',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${(count/maxCount)*100}%`,background:'linear-gradient(90deg,#3B82F6,#6366F1)',borderRadius:3}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RANKING SEMANAL ──────────────────────────────────────────────────────────
function RankingSection(){
  const[ranking,setRanking]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    (async()=>{
      const weekAgo=new Date(Date.now()-7*24*60*60*1000).toISOString();
      const{data:jobs}=await sb.from('jobs').select('worker_id,worker_name,worker_earnings,price').eq('status','completed').gte('created_at',weekAgo).not('worker_id','is',null);
      const{data:reviews}=await sb.from('reviews').select('reviewed_id,rating');
      if(!jobs){setLoading(false);return}
      const workers={};
      jobs.forEach(j=>{if(!j.worker_id)return;if(!workers[j.worker_id])workers[j.worker_id]={name:j.worker_name||'Trabajador',completados:0,ganado:0,ratings:[]};workers[j.worker_id].completados++;workers[j.worker_id].ganado+=(j.worker_earnings||j.price*0.9||0);});
      (reviews||[]).forEach(r=>{if(workers[r.reviewed_id])workers[r.reviewed_id].ratings.push(r.rating);});
      const list=Object.entries(workers).map(([id,w])=>({id,name:w.name,completados:w.completados,ganado:Math.round(w.ganado),rating:w.ratings.length?w.ratings.reduce((s,r)=>s+r,0)/w.ratings.length:0,score:w.completados*10+(w.ratings.length?w.ratings.reduce((s,r)=>s+r,0)/w.ratings.length*2:0)})).sort((a,b)=>b.score-a.score).slice(0,5);
      setRanking(list);setLoading(false);
    })();
  },[]);
  const medals=['1°','2°','3°','4°','5°'];
  const podiumColors=['linear-gradient(135deg,#F59E0B,#FCD34D)','linear-gradient(135deg,#9CA3AF,#D1D5DB)','linear-gradient(135deg,#D97706,#FDE68A)'];
  return(
    <div style={{marginBottom:28}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
        <div style={{background:'linear-gradient(135deg,#F59E0B,#FCD34D)',borderRadius:10,padding:8,display:'flex',alignItems:'center',justifyContent:'center'}}><Trophy size={18} color="#fff"/></div>
        <div><h2 style={{fontWeight:700,fontSize:17,color:'#111827'}}>Ranking semanal de trabajadores</h2><p style={{fontSize:12,color:'#9CA3AF'}}>Top cachuelers de Lima esta semana 🔥</p></div>
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#FFF7ED,#FFFBEB)',padding:'20px 24px',borderBottom:'1.5px solid #FDE68A'}}>
          <div style={{display:'flex',justifyContent:'center',gap:16,alignItems:'flex-end'}}>
            {ranking.slice(0,3).map((w,i)=>{const order=[1,0,2][i];const h=[80,100,70][i];const realW=ranking[order];if(!realW)return null;return(
              <div key={realW.id} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                <div style={{fontSize:order===0?28:22}}>{medals[order]}</div>
                <div style={{width:order===0?52:42,height:order===0?52:42,borderRadius:'50%',background:podiumColors[order],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:order===0?20:16,boxShadow:'0 4px 12px rgba(0,0,0,.15)'}}>{realW.name[0].toUpperCase()}</div>
                <div style={{fontSize:12,fontWeight:700,color:'#374151',maxWidth:80,textAlign:'center',lineHeight:1.3}}>{realW.name.split(' ')[0]}</div>
                <div style={{height:h,width:56,background:podiumColors[order],borderRadius:'8px 8px 0 0',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:2}}>
                  <span style={{fontSize:13,fontWeight:800,color:'#fff'}}>S/{realW.ganado}</span>
                  <span style={{fontSize:10,color:'rgba(255,255,255,.8)'}}>{realW.completados} works</span>
                </div>
              </div>
            );})}
          </div>
        </div>
        {loading?<Spin/>:ranking.length===0?(
          <div style={{padding:'32px 24px',textAlign:'center',color:'#9CA3AF'}}>
            <div style={{fontSize:36,marginBottom:8}}>🏆</div>
            <p style={{fontWeight:600}}>Aún no hay datos esta semana</p>
            <p style={{fontSize:13,marginTop:4}}>¡Sé el primero en completar un cachuelo!</p>
          </div>
        ):(
          <div style={{padding:'0 24px 16px'}}>
            {ranking.map((w,i)=>(
              <div key={w.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:i<ranking.length-1?'1px solid #F3F4F6':'none'}}>
                <div style={{fontSize:20,width:28,textAlign:'center'}}>{medals[i]}</div>
                <div style={{width:38,height:38,borderRadius:'50%',background:i<3?podiumColors[i]:'#F3F4F6',color:i<3?'#fff':'#374151',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:15}}>{w.name[0].toUpperCase()}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:14,color:'#111827'}}>{w.name}</div>
                  <div style={{display:'flex',gap:10,marginTop:2}}>
                    <span style={{fontSize:12,color:'#6B7280'}}>✅ {w.completados} completados</span>
                    {w.rating>0&&<span style={{fontSize:12,color:'#F59E0B',fontWeight:600}}>★ {w.rating.toFixed(1)}</span>}
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:16,fontWeight:800,color:'#16A34A'}}>S/{w.ganado}</div>
                  <div style={{fontSize:11,color:'#9CA3AF'}}>esta semana</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LEAFLET MAP ──────────────────────────────────────────────────────────────
function LeafletMap({jobs,userPos,onJobClick,selectedId,height=400}){
  const ref=useRef(null),mapRef=useRef(null),mks=useRef([]);
  useEffect(()=>{if(mapRef.current||!ref.current||!window.L)return;const L=window.L,c=userPos?[userPos.lat,userPos.lng]:[-12.0964,-77.0428];const map=L.map(ref.current,{zoomControl:true,attributionControl:false}).setView(c,13);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);mapRef.current=map;return()=>{map.remove();mapRef.current=null};},[]);
  useEffect(()=>{const L=window.L;if(!L||!mapRef.current)return;mks.current.forEach(m=>m.remove());mks.current=[];jobs.forEach(job=>{if(!job.latitude||!job.longitude)return;const c=CAT[job.category]||CAT.other,sel=job.id===selectedId;const icon=L.divIcon({className:'',html:`<div style="background:${sel?'#EA580C':c.color};color:#fff;border-radius:50%;width:${sel?40:32}px;height:${sel?40:32}px;display:flex;align-items:center;justify-content:center;font-size:${sel?17:13}px;box-shadow:0 2px 10px rgba(0,0,0,.25);border:2.5px solid white">${c.emoji}</div>`,iconSize:[sel?40:32,sel?40:32],iconAnchor:[sel?20:16,sel?20:16]});const m=L.marker([job.latitude,job.longitude],{icon}).addTo(mapRef.current).bindPopup(`<div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:160px;padding:4px"><b>${job.title}</b><br><span style="color:#EA580C;font-weight:800;font-size:15px">S/${job.price}</span><br><span style="color:#6B7280;font-size:11px">${job.location}</span></div>`).on('click',()=>onJobClick(job.id));mks.current.push(m);});if(userPos){const icon=window.L.divIcon({className:'',html:`<div style="background:#3B82F6;border-radius:50%;width:14px;height:14px;border:3px solid white;box-shadow:0 0 0 4px rgba(59,130,246,.25)"></div>`,iconSize:[14,14],iconAnchor:[7,7]});mks.current.push(window.L.marker([userPos.lat,userPos.lng],{icon}).addTo(mapRef.current).bindPopup('<b>📍 Tu ubicación</b>'));}},[jobs,userPos,selectedId]);
  return <div ref={ref} style={{width:'100%',height,borderRadius:16}}/>;
}

// ─── LOCATION PICKER ──────────────────────────────────────────────────────────
function LocationPicker({initialCenter, value, onChange}){
  const ref=useRef(null), mapRef=useRef(null), markerRef=useRef(null);
  const[query,setQuery]=useState('');
  const[searching,setSearching]=useState(false);
  const[results,setResults]=useState([]);
  const[noResults,setNoResults]=useState(false);
  const[leafReady,setLeafReady]=useState(!!window.L);
  const[leafErr,setLeafErr]=useState(false);

  // Cargar Leaflet si no está disponible aún
  useEffect(()=>{
    if(!window.L) loadLeaflet(()=>setLeafReady(true),()=>setLeafErr(true));
  },[]);

  // Inicializar mapa cuando Leaflet esté listo
  useEffect(()=>{
    if(mapRef.current||!ref.current||!window.L)return;
    const L=window.L;
    const center=value?[value.lat,value.lng]:[initialCenter.lat,initialCenter.lng];
    const map=L.map(ref.current,{zoomControl:true,attributionControl:false}).setView(center,16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

    const icon=L.divIcon({
      className:'',
      html:`<div style="background:#EA580C;width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.3);border:3px solid white"><div style="transform:rotate(45deg);font-size:16px">📍</div></div>`,
      iconSize:[36,36],
      iconAnchor:[18,36],
    });
    const marker=L.marker(center,{icon,draggable:true}).addTo(map);

    marker.on('dragend',()=>{
      const p=marker.getLatLng();
      reverseGeocode(p.lat,p.lng);
    });
    map.on('click',(e)=>{
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat,e.latlng.lng);
    });

    mapRef.current=map; markerRef.current=marker;

    // Si no hay valor inicial, geocodificar el centro al abrir
    if(!value) reverseGeocode(center[0],center[1]);

    return()=>{map.remove();mapRef.current=null};
  },[leafReady]);

  // Si cambia el centro inicial (ej: usuario cambió de distrito) y aún no hay valor propio
  useEffect(()=>{
    if(!mapRef.current||!markerRef.current)return;
    if(value)return; // ya tiene ubicación elegida, no recentrar
    const c=[initialCenter.lat,initialCenter.lng];
    mapRef.current.setView(c,16);
    markerRef.current.setLatLng(c);
  },[initialCenter]);

  const reverseGeocode=async(lat,lng)=>{
    try{
      const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      const d=await r.json();
      const address=d?.display_name?.split(',').slice(0,3).join(',')||'';
      onChange({lat,lng,address});
    }catch{
      onChange({lat,lng,address:''});
    }
  };

  const normalizeQuery=(q)=>{
    return q
      .replace(/\bavenida\b/gi,'Av.')
      .replace(/\bjir[oó]n\b/gi,'Jr.')
      .replace(/\bcalle\b/gi,'Calle')
      .replace(/\bpasaje\b/gi,'Pje.')
      .replace(/\bjr\.?\b/gi,'Jr.')
      .replace(/\bav\.?\b/gi,'Av.');
  };

  const fetchResults=async(q)=>{
    const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q+', Lima, Peru')}&limit=4&countrycodes=pe`);
    return await r.json();
  };

  const search=async()=>{
    if(!query.trim())return;
    setSearching(true);
    setNoResults(false);
    try{
      const normalized=normalizeQuery(query);
      let d=await fetchResults(normalized);
      if((!d||d.length===0)&&normalized!==query){
        d=await fetchResults(query); // intenta también con el texto original
      }
      if(!d||d.length===0){
        // fallback: quitar números (dirección exacta) y buscar solo la vía
        const withoutNumber=normalized.replace(/\d+/g,'').replace(/\s+/g,' ').trim();
        if(withoutNumber&&withoutNumber!==normalized){
          d=await fetchResults(withoutNumber);
        }
      }
      if(!d||d.length===0){setNoResults(true);}
      setResults(d||[]);
    }catch{setResults([]);setNoResults(true)}
    setSearching(false);
  };

  const selectResult=(r)=>{
    const lat=parseFloat(r.lat), lng=parseFloat(r.lon);
    mapRef.current.setView([lat,lng],16);
    markerRef.current.setLatLng([lat,lng]);
    setResults([]);
    setNoResults(false);
    onChange({lat,lng,address:r.display_name.split(',').slice(0,3).join(',')});
  };

  return(
    <div>
      <div style={{position:'relative',marginBottom:10}}>
        <input
          className="inp"
          placeholder="Buscar dirección (ej: Av. Larco 345, Miraflores)"
          value={query}
          onChange={e=>{setQuery(e.target.value);setNoResults(false);}}
          onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();search()}}}
        />
        <button
          type="button"
          onClick={search}
          disabled={searching}
          style={{position:'absolute',right:6,top:6,bottom:6,background:'#EA580C',color:'#fff',border:'none',borderRadius:10,padding:'0 14px',fontWeight:700,fontSize:13}}
        >
          {searching?'...':'🔍'}
        </button>
        {results.length>0&&(
          <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:'#fff',border:'1.5px solid #E5E7EB',borderRadius:14,boxShadow:'0 8px 24px rgba(0,0,0,.1)',zIndex:1000,overflow:'hidden'}}>
            {results.map((r,i)=>(
              <button key={i} type="button" onClick={()=>selectResult(r)}
                style={{display:'block',width:'100%',textAlign:'left',padding:'10px 14px',fontSize:13,color:'#374151',borderBottom:i<results.length-1?'1px solid #F3F4F6':'none',background:'none',border:'none',cursor:'pointer'}}>
                📍 {r.display_name}
              </button>
            ))}
          </div>
        )}
      </div>
      {noResults&&(
        <div style={{background:'#FFFBEB',border:'1.5px solid #FDE68A',borderRadius:12,padding:'8px 14px',marginBottom:10,fontSize:12,color:'#92400E'}}>
          No encontramos esa dirección exacta. Usa el mapa para marcar la ubicación manualmente.
        </div>
      )}
      {leafErr?(
        <div style={{width:'100%',height:260,borderRadius:16,border:'1.5px solid #FCA5A5',background:'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:'#DC2626'}}>
          <span style={{fontSize:28}}>⚠️</span>
          <span style={{fontWeight:600,fontSize:13}}>No se pudo cargar el mapa</span>
          <span style={{fontSize:12}}>Verifica tu conexión a internet</span>
        </div>
      ):(
        <div ref={ref} style={{width:'100%',height:260,borderRadius:16,border:'1.5px solid #E5E7EB'}}/>
      )}
      <p style={{fontSize:12,color:'#9CA3AF',marginTop:8,display:'flex',alignItems:'center',gap:4}}>
        <Navigation size={12}/> Arrastra el marcador o toca el mapa para ajustar la ubicación exacta
      </p>
      {value?.address&&(
        <div style={{background:'#FFF7ED',border:'1.5px solid #FDBA74',borderRadius:12,padding:'10px 14px',marginTop:8,fontSize:13,color:'#92400E',fontWeight:600}}>
          📍 {value.address}
        </div>
      )}
      {value&&!isInLimaModerna(value.lat,value.lng)&&(
        <div style={{background:'#FEF2F2',border:'1.5px solid #FCA5A5',borderRadius:12,padding:'10px 14px',marginTop:8,fontSize:13,color:'#DC2626',fontWeight:600,display:'flex',alignItems:'flex-start',gap:6}}>
          <AlertCircle size={15} style={{flexShrink:0,marginTop:1}}/>
          <span>Esta ubicación está fuera de Lima Moderna. Por ahora solo aceptamos publicaciones en Miraflores, San Isidro, Surco, San Borja, Magdalena, Jesús María, Lince, Pueblo Libre, Barranco, La Molina, San Miguel y Surquillo.</span>
        </div>
      )}
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function VerificationModal({profile, onClose, onDone, toast}){
  const[step,setStep]=useState('dni'); // 'dni' | 'selfie' | 'done'
  const[dniUrl,setDniUrl]=useState('');
  const[selfieUrl,setSelfieUrl]=useState('');
  const[uploading,setUploading]=useState(false);
  const videoRef=useRef(null);
  const[stream,setStream]=useState(null);

  const startCamera=async()=>{
    try{
      const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});
      setStream(s);
      if(videoRef.current) videoRef.current.srcObject=s;
    }catch(e){toast('No se pudo acceder a la cámara','error');}
  };
  const stopCamera=()=>{
    stream?.getTracks().forEach(t=>t.stop());
    setStream(null);
  };
  useEffect(()=>()=>stopCamera(),[]);

  const capture=async(type)=>{
    if(!videoRef.current) return;
    const canvas=document.createElement('canvas');
    canvas.width=videoRef.current.videoWidth;
    canvas.height=videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current,0,0);
    canvas.toBlob(async(blob)=>{
      setUploading(true);
      const path=`${profile.id}/${type}.jpg`;
      const{error}=await sb.storage.from('verification-docs').upload(path,blob,{upsert:true,contentType:'image/jpeg'});
      if(error){toast('Error al subir imagen','error');setUploading(false);return;}
const{data}=await sb.storage.from('verification-docs').createSignedUrl(path,60*60*24*7); // válido 7 días
       stopCamera();
      if(type==='dni'){setDniUrl(data.signedUrl);setStep('selfie');}
      else{setSelfieUrl(data.signedUrl);setStep('done');}
      setUploading(false);
    },'image/jpeg',0.85);
  };

  const uploadFile=async(e,type)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    setUploading(true);
    const path=`${profile.id}/${type}.jpg`;
    const{error}=await sb.storage.from('verification-docs').upload(path,file,{upsert:true});
    if(error){toast('Error al subir','error');setUploading(false);return;}
    const{data}=await sb.storage.from('verification-docs').createSignedUrl(path,60*60*24*7);
    if(type==='dni'){setDniUrl(data.signedUrl);setStep('selfie');}
    else{setSelfieUrl(data.signedUrl);setStep('done');}
    setUploading(false);
  };

  const submit=async()=>{
    setUploading(true);
    await sb.from('profiles').update({
      dni_photo_url:dniUrl,
      selfie_photo_url:selfieUrl,
      verification_status:'reviewing'
    }).eq('id',profile.id);
    setUploading(false);
    toast('✅ Documentos enviados, pronto te notificamos');
    onDone();
  };

  const stepLabel={'dni':'Foto del DNI','selfie':'Selfie tuya','done':'Listo'}[step];
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>{if(e.target===e.currentTarget){stopCamera();onClose();}}}>
      <div className="card fade-up" style={{maxWidth:440,width:'100%',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#1D4ED8,#3B82F6)',padding:'22px 28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <h2 style={{color:'#fff',fontWeight:800,fontSize:19}}>🛡 Verificar identidad</h2>
              <p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginTop:4}}>Paso: {stepLabel}</p>
            </div>
            <button onClick={()=>{stopCamera();onClose();}} style={{color:'rgba(255,255,255,.8)',fontSize:22}}>×</button>
          </div>
          {/* Progress */}
          <div style={{display:'flex',gap:6,marginTop:16}}>
            {['dni','selfie','done'].map((s,i)=>(
              <div key={s} style={{flex:1,height:4,borderRadius:2,background:['dni','selfie','done'].indexOf(step)>=i?'#fff':'rgba(255,255,255,.3)'}}/>
            ))}
          </div>
        </div>

        <div style={{padding:28}}>
          {step==='done'?(
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:52,marginBottom:12}}>🎉</div>
              <h3 style={{fontWeight:800,fontSize:18,marginBottom:8}}>¡Todo listo!</h3>
              <p style={{color:'#6B7280',fontSize:14,marginBottom:24}}>Revisaremos tus documentos y te confirmaremos en breve.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
                <div style={{borderRadius:12,overflow:'hidden',border:'1.5px solid #E5E7EB'}}><img src={dniUrl} alt="DNI" style={{width:'100%',height:100,objectFit:'cover'}}/><p style={{fontSize:11,color:'#6B7280',textAlign:'center',padding:6}}>DNI</p></div>
                <div style={{borderRadius:12,overflow:'hidden',border:'1.5px solid #E5E7EB'}}><img src={selfieUrl} alt="Selfie" style={{width:'100%',height:100,objectFit:'cover'}}/><p style={{fontSize:11,color:'#6B7280',textAlign:'center',padding:6}}>Selfie</p></div>
              </div>
              <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13}} onClick={submit} disabled={uploading}>{uploading?'⏳ Enviando...':'Enviar para revisión →'}</button>
            </div>
          ):(
            <div>
              <p style={{fontSize:14,color:'#374151',marginBottom:16,lineHeight:1.6}}>
                {step==='dni'?'Toma una foto clara de la parte frontal de tu DNI. Asegúrate que sea legible.':'Mira a la cámara y toma una selfie. Asegúrate que tu cara esté bien iluminada.'}
              </p>
              {/* Preview de cámara */}
              <div style={{borderRadius:16,overflow:'hidden',background:'#F3F4F6',marginBottom:16,position:'relative',minHeight:200}}>
                <video ref={videoRef} autoPlay playsInline muted style={{width:'100%',display:'block',borderRadius:16}}/>
                {!stream&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:'#9CA3AF'}}>
                  <Camera size={36}/>
                  <span style={{fontSize:13}}>Cámara no activa</span>
                </div>}
              </div>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {!stream?(
                  <button className="btn-blue" style={{flex:1,justifyContent:'center'}} onClick={startCamera}><Camera size={15}/>Activar cámara</button>
                ):(
                  <button className="btn-orange" style={{flex:1,justifyContent:'center'}} onClick={()=>capture(step)} disabled={uploading}>{uploading?'⏳ Procesando...':'📸 Capturar'}</button>
                )}
                <label className="btn-outline" style={{flex:1,justifyContent:'center',cursor:'pointer'}}>
                  📁 Subir archivo
                  <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>uploadFile(e,step)} disabled={uploading}/>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function VerificationBanner({status, onStartVerification}){
  if(status==='verified') return null;
  if(status==='reviewing') return(
    <div style={{background:'#FFFBEB',border:'1.5px solid #FDE68A',borderRadius:14,padding:'14px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
      <AlertTriangle size={20} color="#D97706"/>
      <div style={{flex:1}}>
        <span style={{fontWeight:700,fontSize:13,color:'#92400E'}}>Verificación en revisión. </span>
        <span style={{fontSize:13,color:'#6B7280'}}>Estamos revisando tus documentos, te avisaremos pronto.</span>
      </div>
    </div>
  );
  if(status==='rejected') return(
    <div style={{background:'#FEF2F2',border:'1.5px solid #FCA5A5',borderRadius:14,padding:'14px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
      <AlertTriangle size={20} color="#DC2626"/>
      <div style={{flex:1}}>
        <span style={{fontWeight:700,fontSize:13,color:'#991B1B'}}>Verificación rechazada. </span>
        <span style={{fontSize:13,color:'#6B7280'}}>Tus documentos no pudieron ser validados.</span>
      </div>
      <button className="btn-orange" style={{fontSize:12,padding:'7px 14px'}} onClick={onStartVerification}>Reintentar</button>
    </div>
  );
  return(
    <div style={{background:'#EFF6FF',border:'1.5px solid #93C5FD',borderRadius:14,padding:'14px 20px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
      <Shield size={20} color="#2563EB"/>
      <div style={{flex:1}}>
        <span style={{fontWeight:700,fontSize:13,color:'#1E40AF'}}>Verifica tu identidad. </span>
        <span style={{fontSize:13,color:'#6B7280'}}>Necesitas verificarte para publicar o aceptar trabajos.</span>
      </div>
      <button className="btn-orange" style={{fontSize:12,padding:'7px 14px'}} onClick={onStartVerification}>Verificarme →</button>
    </div>
  );
}
function AuthScreen({onAuth}){
  const[mode,setMode]=useState('login');
  const[role,setRole]=useState('trabajador');
  const[step,setStep]=useState(1);
  const[loading,setLoading]=useState(false);
  const[form,setForm]=useState({email:'',password:'',fullName:'',phone:'',dni:''});
  const[errors,setErrors]=useState({});
  const[emailSent,setEmailSent]=useState(false);
  const[acceptedTerms,setAcceptedTerms]=useState(false);
  const[showTerms,setShowTerms]=useState(false);
  const set=(k,v)=>{setForm(p=>({...p,[k]:v}));setErrors(p=>({...p,[k]:''}))};
  const validate=()=>{const e={};if(mode==='register'){if(!form.fullName.trim())e.fullName='Nombre requerido';if(!form.phone.match(/^\d{9}$/))e.phone='Ingresa 9 dígitos';if(form.dni.trim().length<8)e.dni='Mínimo 8 caracteres';}if(!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))e.email='Correo inválido';if(form.password.length<6)e.password='Mínimo 6 caracteres';setErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=async()=>{if(!validate())return;setLoading(true);if(mode==='login'){const{data,error}=await sb.auth.signInWithPassword({email:form.email,password:form.password});if(error){setErrors({email:error.message});setLoading(false);return}onAuth(data.user);}else{const{data,error}=await sb.auth.signUp({email:form.email,password:form.password,options:{data:{full_name:form.fullName,role}}});if(error){setErrors({email:error.message});setLoading(false);return}if(data.user){await sb.from('profiles').upsert({id:data.user.id,full_name:form.fullName,email:form.email,phone:form.phone,dni:form.dni,role,verification_status:'reviewing'});}if(!data.session){setEmailSent(true);setLoading(false);return;}onAuth(data.user);}setLoading(false);};
  const handleGoogle=async()=>{await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin}});};
  const isRegister = mode === 'register';

  // Pantalla de verificación de correo
  if(showTerms) return(
  <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
    onClick={e=>{if(e.target===e.currentTarget)setShowTerms(false)}}>
    <div className="card fade-up" style={{maxWidth:600,width:'100%',maxHeight:'85vh',overflow:'hidden',display:'flex',flexDirection:'column'}}>
      <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',padding:'22px 28px',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
        <div>
<h2 style={{color:'#fff',fontWeight:800,fontSize:19}}>Términos y Condiciones</h2>
          <p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginTop:2}}>Última actualización: 22 de junio de 2026</p>
        </div>
        <button onClick={()=>setShowTerms(false)} style={{color:'rgba(255,255,255,.8)',fontSize:22}}>×</button>
      </div>
      <div style={{overflowY:'auto',padding:28,flex:1,fontSize:13,color:'#374151',lineHeight:1.7}}>
{[
  ['1. Naturaleza del servicio','Cachuelos es un intermediario tecnológico que facilita el contacto entre Empleadores y Trabajadores. No es empleador de los Trabajadores ni garantiza la calidad, legalidad o resultado de los trabajos publicados.'],
  ['2. Registro y elegibilidad','Debes registrarte con información veraz: nombre completo, celular, DNI y correo. Eres responsable de la confidencialidad de tu contraseña y de toda actividad desde tu cuenta.'],
  ['3. Verificación de identidad','Para publicar o aceptar trabajos es obligatorio verificar tu identidad con una foto de tu DNI y una selfie. Las imágenes se almacenan en espacio restringido, visibles solo para ti y el equipo de administración.'],
  ['4. Datos personales','De acuerdo con la Ley N.° 29733, Cachuelos recopila nombre, DNI, teléfono, correo, fotos de verificación y datos de uso, exclusivamente para operar la Plataforma. Tienes derecho a acceder, rectificar y cancelar tus datos.'],
  ['5. Publicación y aceptación de trabajos','Solo usuarios verificados pueden publicar o aceptar trabajos. Cachuelos cobra una comisión del 10% sobre el precio de cada trabajo completado, descontada automáticamente del pago al Trabajador.'],
  ['6. Pagos (modo demo)','El sistema de pagos está en modo de demostración con fines académicos. Ningún cobro real es procesado. Esta sección se actualizará cuando se integre un procesador de pagos real.'],
  ['7. Cancelaciones','El Empleador puede cancelar trabajos en estado Abierto, Aceptado o En progreso. En los dos últimos puede reabrir el trabajo para otro Trabajador o cancelarlo definitivamente.'],
  ['8. Disputas','Cualquier usuario puede reportar problemas mediante el sistema de disputas. Cachuelos actúa como mediador de buena fe pero no garantiza una resolución específica.'],
  ['9. Calificaciones','Las calificaciones enviadas no pueden editarse ni eliminarse para preservar la integridad del sistema de reputación.'],
  ['10. Conducta','Queda prohibido publicar información falsa, suplantar identidades, usar la Plataforma para fines ilegales o acosar a otros usuarios.'],
  ['11. Limitación de responsabilidad','Cachuelos no participa en la ejecución de los trabajos y no será responsable por daños derivados de la relación entre Empleadores y Trabajadores.'],
].map(([titulo,texto])=>(
  <div key={titulo} style={{marginBottom:20}}>
    <div style={{fontWeight:700,color:'#111827',marginBottom:4,fontSize:13}}>{titulo}</div>
    <p style={{textAlign:'left'}}>{texto}</p>
  </div>
))}
      </div>
      <div style={{padding:'16px 28px',borderTop:'1.5px solid #F0F1F3',flexShrink:0}}>
        <button className="btn-orange" style={{width:'100%',justifyContent:'center'}} onClick={()=>{setAcceptedTerms(true);setShowTerms(false);}}>
           Entendido — cerrar
        </button>
      </div>
    </div>
  </div>
);  
  if(emailSent){
    return(
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FEF3E2',padding:20}}>
        <div style={{maxWidth:440,width:'100%',background:'#fff',borderRadius:32,boxShadow:'0 24px 64px rgba(234,88,12,.15)',overflow:'hidden',textAlign:'center'}}>
          <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',padding:'40px 32px'}}>
            <div style={{width:72,height:72,background:'rgba(255,255,255,.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <h1 style={{color:'#fff',fontWeight:800,fontSize:24,marginBottom:6}}>Revisa tu correo</h1>
            <p style={{color:'rgba(255,255,255,.85)',fontSize:14}}>Te enviamos un link de confirmación</p>
          </div>
          <div style={{padding:'32px 28px'}}>
            <div style={{background:'#FFF7ED',border:'1.5px solid #FDBA74',borderRadius:16,padding:'16px 20px',marginBottom:24}}>
              <p style={{fontSize:14,color:'#92400E',fontWeight:600,marginBottom:4}}>📧 Correo enviado a:</p>
              <p style={{fontSize:15,color:'#EA580C',fontWeight:700}}>{form.email}</p>
            </div>
            <div style={{textAlign:'left',marginBottom:24}}>
              {[
                'Abre tu Gmail o correo',
                'Busca el correo de Cachuelos',
                'Haz clic en el link de confirmación',
                'Vuelve aquí e inicia sesión',
              ].map((step,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                  <div style={{width:28,height:28,borderRadius:'50%',background:'#FFF7ED',border:'2px solid #EA580C',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,color:'#EA580C',flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:14,color:'#374151'}}>{step}</span>
                </div>
              ))}
            </div>
            <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15,marginBottom:12}}
              onClick={()=>{setEmailSent(false);setMode('login');setStep(1);}}>
              Ya confirmé — Iniciar sesión →
            </button>
            <p style={{fontSize:12,color:'#9CA3AF'}}>¿No llegó el correo? Revisa tu carpeta de spam o <button onClick={()=>setEmailSent(false)} style={{color:'#EA580C',fontWeight:600,background:'none',border:'none',cursor:'pointer',fontSize:12}}>vuelve a intentarlo</button></p>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FEF3E2',padding:'20px 20px 40px'}}>
      <div style={{maxWidth:440,width:'100%',background:'#fff',borderRadius:32,boxShadow:'0 24px 64px rgba(234,88,12,.15)',overflow:'hidden'}}>

        {/* HEADER — solo visible en login */}
        {!isRegister&&(
          <div style={{background:'#FEF3E2',textAlign:'left'}}>
            {/* Texto — limpio, sin imagen encima */}
            <div style={{padding:'28px 28px 12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:8}}>
                <div style={{width:52,height:52,background:'#EA580C',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div style={{position:'relative',display:'inline-block'}}>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:44,fontWeight:800,color:'#EA580C',letterSpacing:'-1.5px',lineHeight:1}}>Cachuelos</span>
                  <span style={{position:'absolute',top:4,right:-3,width:10,height:10,background:'#EA580C',borderRadius:'50%',border:'2.5px solid white'}}/>
                </div>
              </div>
              <p style={{fontWeight:700,fontSize:15,color:'#1F2937',marginBottom:3}}>Trabajos rápidos en Lima Moderna</p>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:14,lineHeight:1.5}}>Encuentra chambas por horas, fines de semana y freelance.</p>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#fff',border:'1.5px solid #E5E7EB',borderRadius:20,padding:'5px 14px',fontSize:12,color:'#374151',fontWeight:600}}>
                🛡️ Empleadores verificados con DNI
              </div>
            </div>
            {/* Imagen fluida debajo — sin gap */}
            <div style={{width:'100%',lineHeight:0,marginTop:0}}>
              <img src="/Inicio.png" alt="Cachuelos" style={{width:'100%',display:'block',objectFit:'cover',objectPosition:'center 45%',maxHeight:260}}/>
            </div>
          </div>
        )}

        {/* FORMULARIO */}
        <div style={{padding:'24px 28px',textAlign:'left'}}>
          {/* Tabs — solo visibles en login y registro paso 2 */}
          {(!isRegister || step===2) && (
          <div style={{display:'flex',background:'#F3F4F6',borderRadius:14,padding:3,marginBottom:24}}>
            {[['login','Iniciar sesión'],['register','Registrarse']].map(([m,l])=>(
              <button key={m} onClick={()=>{setMode(m);setErrors({});setStep(1)}} style={{flex:1,padding:'9px',borderRadius:11,fontWeight:700,fontSize:13,background:mode===m?'#fff':'transparent',color:mode===m?'#EA580C':'#6B7280',boxShadow:mode===m?'0 1px 4px rgba(0,0,0,.08)':'none',border:'none',cursor:'pointer'}}>{l}</button>
            ))}
          </div>
          )}

          {/* REGISTRO paso 1 */}
          {mode==='register'&&step===1&&(
            <div className="fade-up">
              {/* Hero con imagen de fondo */}
              {/* Hero — fondo beige unificado con la imagen */}
              <div style={{
                margin:'-24px -28px 20px -28px',
                background:'#FEF0DC',
                paddingTop:24,
                paddingLeft:28,
                paddingRight:28,
                paddingBottom:0,
                lineHeight:'normal',
              }}>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                  <div style={{width:44,height:44,background:'#EA580C',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div style={{position:'relative',display:'inline-block'}}>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:38,fontWeight:800,color:'#EA580C',letterSpacing:'-1px',lineHeight:1}}>Cachuelos</span>
                    <span style={{position:'absolute',top:3,right:-3,width:9,height:9,background:'#EA580C',borderRadius:'50%',border:'2px solid white'}}/>
                  </div>
                </div>
                <p style={{fontSize:13,color:'#6B7280',marginBottom:0}}>Crea tu cuenta y empieza en minutos</p>
                <div style={{margin:'0 -28px',lineHeight:0}}>
                  <img src="/Registro1.png" alt="Registro" style={{width:'100%',display:'block',objectFit:'cover',objectPosition:'center 55%',maxHeight:320,verticalAlign:'bottom'}}/>
                </div>
              </div>
              {/* Opciones con imagen circular */}
              <h2 style={{fontWeight:800,fontSize:18,marginBottom:4}}>¿Cómo quieres empezar?</h2>
              <p style={{color:'#9CA3AF',fontSize:13,marginBottom:16}}>Elige tu rol en Cachuelos</p>
              {[
                ['trabajador','Busco trabajo','Encuentra cachuelos cerca de ti y gana dinero','/Registro2.png'],
                ['empleador','Quiero contratar ayuda','Publica tareas y encuentra trabajadores rápido','/Registro3.png'],
              ].map(([r,title,sub,img])=>(
                <button key={r} onClick={()=>{setRole(r);setStep(2)}}
                  style={{width:'100%',background:role===r?'#FFF7ED':'#FAFAFA',border:`2px solid ${role===r?'#EA580C':'#E5E7EB'}`,borderRadius:18,padding:'14px 16px',textAlign:'left',marginBottom:12,cursor:'pointer',display:'flex',gap:14,alignItems:'center',transition:'all .15s'}}>
                  <img src={img} alt={title} style={{width:64,height:64,borderRadius:'50%',objectFit:'cover',flexShrink:0,background:'#FEE9D6'}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:15,color:'#111827'}}>{title}</div>
                    <div style={{fontSize:12,color:'#9CA3AF',marginTop:3,lineHeight:1.4}}>{sub}</div>
                  </div>
                  <span style={{color:role===r?'#EA580C':'#D1D5DB',fontSize:20,fontWeight:700}}>›</span>
                </button>
              ))}
              <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15,marginTop:8}} onClick={()=>setStep(2)}>
                Continuar →
              </button>

              <p style={{textAlign:'center',fontSize:13,color:'#9CA3AF',marginTop:12}}>
                ¿Ya tienes cuenta? <button onClick={()=>{setMode('login');setErrors({});setStep(1)}} style={{color:'#EA580C',fontWeight:700,fontSize:13,background:'none',border:'none',cursor:'pointer'}}>Inicia sesión</button>
              </p>
            </div>
          )}

          {/* REGISTRO paso 2 */}
          {mode==='register'&&step===2&&(
            <div className="fade-up">
              <button onClick={()=>setStep(1)} style={{color:'#9CA3AF',fontSize:13,marginBottom:16,fontWeight:600,padding:0,cursor:'pointer'}}>← Volver</button>
              <h2 style={{fontWeight:800,fontSize:20,marginBottom:20}}>Tus datos</h2>
              {[['fullName','Nombre completo','Juan Pérez','text'],['phone','Celular','999 999 999','tel'],['dni','DNI','12345678','text'],['email','Correo','tu@correo.com','email'],['password','Contraseña','Mínimo 6 caracteres','password']].map(([k,label,ph,type])=>(
                <Field key={k} label={label+'  *'} error={errors[k]}>
                  <input className={`inp ${errors[k]?'inp-err':''}`} type={type} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)}/>
                </Field>
              ))}
              <div style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:16,marginTop:4}}>
            <input
            type="checkbox"
            id="acceptTerms"
           checked={acceptedTerms}
           onChange={e=>setAcceptedTerms(e.target.checked)}
          style={{marginTop:3,width:16,height:16,accentColor:'#EA580C',cursor:'pointer',flexShrink:0}}
          />
          <label htmlFor="acceptTerms" style={{fontSize:13,color:'#374151',lineHeight:1.5,cursor:'pointer'}}>
          Acepto los{' '}
         <button type="button" onClick={()=>setShowTerms(true)} style={{color:'#EA580C',fontWeight:700,textDecoration:'underline',background:'none',border:'none',cursor:'pointer',padding:0,fontSize:13}}>
      Términos y Condiciones
           </button>{' '}
        de Cachuelos, incluyendo el tratamiento de mis datos personales y la verificación de identidad con DNI y selfie.
             </label>
             </div>
              <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15,marginTop:4}} onClick={handleSubmit} disabled={loading||!acceptedTerms}>{loading?'⏳ Creando cuenta...':'Crear cuenta →'}</button>
            </div>
          )}

          {/* LOGIN */}
          {mode==='login'&&(
            <div className="fade-up">
              <Field label="Correo *" error={errors.email}><input className={`inp ${errors.email?'inp-err':''}`} type="email" placeholder="tu@correo.com" value={form.email} onChange={e=>set('email',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()}/></Field>
              <Field label="Contraseña *" error={errors.password}><input className={`inp ${errors.password?'inp-err':''}`} type="password" placeholder="Tu contraseña" value={form.password} onChange={e=>set('password',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()}/></Field>
              <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15,marginBottom:8}} onClick={handleSubmit} disabled={loading}>{loading?'⏳ Entrando...':'Entrar →'}</button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({page,nav,profile,onSignOut}){
  const isEmp=profile?.role==='empleador';
  return(
    <nav style={{background:'#fff',borderBottom:'1.5px solid #F0F1F3',position:'sticky',top:0,zIndex:200}}>
      <div style={{padding:'0 32px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>nav('home')} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
          <div style={{background:'#EA580C',width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(234,88,12,.3)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style={{position:'relative',display:'inline-block'}}>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:22,fontWeight:800,color:'#EA580C',letterSpacing:'-0.5px'}}>Cachuelos</span>
              <span style={{position:'absolute',top:2,right:-1,width:7,height:7,background:'#EA580C',borderRadius:'50%',border:'2px solid white'}}/>
            </span>
          <span style={{background:'#FFF7ED',color:'#EA580C',border:'1px solid #FDBA74',borderRadius:20,fontSize:11,fontWeight:700,padding:'2px 10px'}}>Lima</span>
        </button>
        <div style={{display:'flex',gap:2,alignItems:'center'}}>
          <button className="btn-ghost hide-mobile" onClick={()=>nav('home')} style={{color:page==='home'?'#EA580C':'#6B7280',background:page==='home'?'#FFF7ED':'transparent',display:'flex',alignItems:'center',gap:6}}>
            <Home size={16}/> Inicio
          </button>
          {!isEmp&&<button className="btn-ghost hide-mobile" onClick={()=>nav('map')} style={{display:'flex',alignItems:'center',gap:6}}>
            <Map size={16}/> Mapa
          </button>}
          <button className="btn-ghost hide-mobile" onClick={()=>nav('my-jobs')} style={{color:page==='my-jobs'?'#EA580C':'#6B7280',display:'flex',alignItems:'center',gap:6}}>
            <Briefcase size={16}/> Mis trabajos
          </button>
          <button className="btn-ghost hide-mobile" onClick={()=>nav('profile',{pid:null})} style={{display:'flex',alignItems:'center',gap:7,background:'#F9FAFB',border:'1.5px solid #E5E7EB',borderRadius:20,padding:'5px 12px 5px 6px'}}>
            <Avatar name={profile?.full_name} size={26}/>
            <span style={{fontSize:13,color:'#374151',fontWeight:600,maxWidth:90,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{profile?.full_name?.split(' ')[0]||'Perfil'}</span>
            <ChevronDown size={14} color="#9CA3AF"/>
          </button>
          {isEmp&&<button className="btn-orange" onClick={()=>nav('post-job')} style={{fontSize:13,padding:'8px 16px',marginLeft:4}}>+ Publicar</button>}
          {profile?.id===ADMIN_ID&&<button className="btn-ghost" onClick={()=>nav('admin')} style={{color:'#7C3AED',fontSize:13}}>🛡 Admin</button>}
          <button className="btn-ghost" onClick={onSignOut} title="Salir" style={{color:'#9CA3AF'}}>
            <LogOut size={16}/>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
function JobCard({job,nav,delay=0,dist,recommended,recReason}){
  return(
    <div className="card card-hover fade-up" style={{padding:20,animationDelay:`${delay*40}ms`,textAlign:'left',border:recommended?'1.5px solid #C4B5FD':undefined}} onClick={()=>nav('job',{jid:job.id})}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
        <div style={{flex:1,minWidth:0,textAlign:'left'}}>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8}}><CatTag cat={job.category}/><StatusTag status={job.status}/>{recommended&&<RecommendedBadge reason={recReason}/>}</div>
          <h3 style={{fontWeight:600,fontSize:14,color:'#374151',lineHeight:1.45,marginBottom:3,textAlign:'left'}}>{job.title}</h3>
          <p style={{fontSize:12,color:'#9CA3AF',textAlign:'left',display:'flex',alignItems:'center',gap:4}}><Users size={11}/>por {job.poster_name}</p>
        </div>
        <div style={{textAlign:'right',marginLeft:14,flexShrink:0}}>
          <div style={{fontSize:20,fontWeight:700,color:'#EA580C'}}>S/{job.price}</div>
          <div style={{fontSize:11,color:'#9CA3AF'}}>{job.estimated_hours}h est.</div>
        </div>
      </div>
      <p style={{fontSize:13,color:'#111827',fontWeight:600,lineHeight:1.6,marginBottom:12,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden',textAlign:'left'}}>{job.description}</p>
      <div style={{display:'flex',alignItems:'center',gap:10,fontSize:12,color:'#9CA3AF',flexWrap:'wrap'}}>
        <span style={{display:'flex',alignItems:'center',gap:4}}><MapPin size={11}/>{job.location}</span>
        <span style={{display:'flex',alignItems:'center',gap:4}}><Clock size={11}/>{fmtDate(job.created_at)}</span>
        {job.schedule_start&&<span style={{display:'flex',alignItems:'center',gap:4,color:'#EA580C',fontWeight:700}}><Clock size={11}/>{job.schedule_start.slice(0,5)}{job.schedule_end?`—${job.schedule_end.slice(0,5)}`:''}</span>}
        {dist!=null&&<span style={{color:'#EA580C',fontWeight:700,marginLeft:'auto',display:'flex',alignItems:'center',gap:4}}><Navigation size={11}/>{fmtDist(dist)}</span>}
      </div>
    </div>
  );
}

// ─── RECOMENDADOS PARA TI ────────────────────────────────────────────────────
// Sección destacada que aparece arriba del feed del trabajador, mostrando
// los trabajos que más calzan con su historial y categorías favoritas.
function RecommendedSection({jobs, prefs, nav}){
  const recommended = jobs
    .map(j=>({...j, _score: scoreJobForWorker(j, prefs)}))
    .filter(j=>j._score>0)
    .sort((a,b)=>b._score-a._score)
    .slice(0,4);

  if(recommended.length===0) return null;

  return(
    <div className="fade-up-2" style={{marginBottom:28}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
        <div style={{background:'linear-gradient(135deg,#7C3AED,#A78BFA)',borderRadius:10,padding:8,display:'flex',alignItems:'center',justifyContent:'center'}}><Compass size={18} color="#fff"/></div>
        <div>
          <h2 style={{fontWeight:700,fontSize:17,color:'#111827'}}>Recomendados para ti</h2>
          <p style={{fontSize:12,color:'#9CA3AF'}}>Según tus trabajos anteriores y tus categorías favoritas</p>
        </div>
      </div>
      <div className="grid-jobs" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
        {recommended.map((job,i)=>{
          const reason = prefs.favCats.has(job.category)
            ? '★ Favorita'
            : (job.district||job.location)&&prefs.histDistricts.has(job.district||job.location)
              ? 'Cerca de ti'
              : 'Ya hiciste esto';
          return <JobCard key={job.id} job={job} nav={nav} delay={i} recommended recReason={reason}/>;
        })}
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({profile,nav,toast,onStartVerification}){
  const[jobs,setJobs]=useState([]);
  const[allJobs,setAllJobs]=useState([]);
  const[myCompletedJobs,setMyCompletedJobs]=useState([]);
  const[loading,setLoading]=useState(true);
  const[search,setSearch]=useState('');
  const[cat,setCat]=useState('all');
  const[userPos,setUserPos]=useState(null);
  const[geoL,setGeoL]=useState(false);
  const[mapView,setMapView]=useState(false);
  const[leafOk,setLeafOk]=useState(!!window.L);
  const[leafErr,setLeafErr]=useState(false);
  const[selId,setSelId]=useState(null);
  const[showBanner,setShowBanner]=useState(false);
  useEffect(()=>{
  if(profile?.verification_status==='verified') setShowBanner(true);
  else setShowBanner(false);
  },[profile]);
  const isEmp=profile?.role==='empleador';

useEffect(()=>{
  if(profile?.verification_status==='verified') setShowBanner(true);
},[profile?.verification_status]);
  useEffect(()=>{
    fetchJobs();
    loadLeaflet(()=>setLeafOk(true),()=>setLeafErr(true));
    // Si es trabajador, traemos su historial de trabajos completados
    // para poder calcular sus preferencias (categorías y distritos)
    if(!isEmp&&profile?.id){
      sb.from('jobs').select('category,district,location').eq('worker_id',profile.id).eq('status','completed')
        .then(({data})=>setMyCompletedJobs(data||[]));
    }
  },[]);

  // Preferencias del trabajador: combina categorías marcadas como favoritas (profile.skills)
  // con el historial real de trabajos completados (categorías + distritos)
  const prefs = getWorkerPreferences(profile, myCompletedJobs);

  const fetchJobs=async()=>{
    setLoading(true);
    const{data:open}=await sb.from('jobs').select('*').eq('status','open').order('created_at',{ascending:false});
    const{data:all}=await sb.from('jobs').select('*').order('created_at',{ascending:false});
    setJobs(open||[]);setAllJobs(all||[]);setLoading(false);
  };

  // ── TIEMPO REAL en HomePage: actualizar lista cuando cambia un job ────────
  useEffect(()=>{
    const channel = sb.channel('home-jobs')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs',
      }, () => {
        // Re-fetch silencioso sin mostrar spinner
        sb.from('jobs').select('*').eq('status','open').order('created_at',{ascending:false})
          .then(({data})=>setJobs(data||[]));
        sb.from('jobs').select('*').order('created_at',{ascending:false})
          .then(({data})=>setAllJobs(data||[]));
      })
      .subscribe();
    return () => { sb.removeChannel(channel); };
  },[]);

  const getGeo=()=>{setGeoL(true);navigator.geolocation?.getCurrentPosition(p=>{setUserPos({lat:p.coords.latitude,lng:p.coords.longitude});setGeoL(false);toast('📍 Ubicación obtenida')},()=>{setUserPos({lat:-12.1219,lng:-77.0234});setGeoL(false);toast('📍 Usando Lima centro')});};
  const filtered=jobs.filter(j=>{const q=search.toLowerCase();return(!q||j.title?.toLowerCase().includes(q)||j.description?.toLowerCase().includes(q)||j.location?.toLowerCase().includes(q))&&(cat==='all'||j.category===cat)}).map(j=>({...j,dist:userPos&&j.latitude&&j.longitude?distKm(userPos,{lat:j.latitude,lng:j.longitude}):null})).sort((a,b)=>{
    // Si el usuario activó "cerca de mí", la cercanía manda
    if(a.dist!=null&&b.dist!=null) return a.dist-b.dist;
    // Si no, priorizamos por preferencias del trabajador (categoría/distrito ya trabajado)
    if(!isEmp){
      const sa=scoreJobForWorker(a,prefs), sb_=scoreJobForWorker(b,prefs);
      if(sa!==sb_) return sb_-sa;
    }
    return 0;
  });

  if(isEmp){
    const myJobs=allJobs.filter(j=>j.poster_id===profile.id);
    return(
      <div className="fade-up">
       {profile&&<VerificationBanner status={profile?.verification_status} onStartVerification={onStartVerification}/>}
        {/* Hero empleador */}
        <div style={{position:'relative',background:'#FEF3E2',borderRadius:24,marginBottom:24,overflow:'hidden',display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:280}}>
          <div style={{padding:'40px 40px',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',zIndex:2,alignItems:'flex-start'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(234,88,12,.12)',color:'#EA580C',padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:700,marginBottom:16}}>
              <Briefcase size={13}/> Panel de Empleador · Lima Moderna
            </div>
            <h1 style={{fontSize:'clamp(22px,2.5vw,36px)',fontWeight:800,lineHeight:1.15,letterSpacing:'-1px',marginBottom:12,color:'#111827',textAlign:'left'}}>
              Encuentra al trabajador<br/><span style={{color:'#EA580C'}}>perfecto para tu tarea</span>
            </h1>
            <p style={{color:'#6B7280',fontSize:14,lineHeight:1.65,marginBottom:20,textAlign:'left'}}>Publica un cachuelo y recibe ayuda en Miraflores, San Isidro, Surco y más.</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button className="btn-orange" style={{fontSize:14,padding:'11px 22px'}} onClick={()=>nav('post-job')}>+ Publicar trabajo</button>
            </div>
          </div>
          <div style={{position:'relative',zIndex:1}}>
            <img src="/Hero.png" alt="Cachuelos" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, #FFF3DF 0%, rgba(255,243,223,0.45) 8%, rgba(255,243,223,0) 22%)',pointerEvents:'none',zIndex:2}}/>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:24}}>
          {[{icon:<Briefcase size={20} color="#EA580C"/>,label:'Mis publicaciones',value:myJobs.length,bg:'#FFF7ED'},{icon:<CheckCircle size={20} color="#16A34A"/>,label:'Completados',value:myJobs.filter(j=>j.status==='completed').length,bg:'#F0FDF4'},{icon:<Users size={20} color="#5B21B6"/>,label:'En progreso',value:myJobs.filter(j=>['in_progress','accepted'].includes(j.status)).length,bg:'#F5F3FF'}].map(s=>(
            <div key={s.label} className="card" style={{padding:'18px 20px',display:'flex',alignItems:'center',gap:12}}>
              <div style={{background:s.bg,borderRadius:12,padding:10,flexShrink:0}}>{s.icon}</div>
              <div><div style={{fontSize:22,fontWeight:700,lineHeight:1}}>{s.value}</div><div style={{fontSize:12,color:'#6B7280',fontWeight:500,marginTop:3}}>{s.label}</div></div>
            </div>
          ))}
        </div>
        <MercadoSection jobs={allJobs}/>
        {myJobs.length===0?(
          <div style={{textAlign:'center',padding:'48px 20px',background:'#fff',borderRadius:20,border:'1.5px dashed #FDBA74'}}>
            <div style={{fontSize:44,marginBottom:12}}>📋</div>
            <p style={{fontWeight:600,fontSize:17,marginBottom:6}}>Aún no has publicado trabajos</p>
            <button className="btn-orange" style={{marginTop:8}} onClick={()=>nav('post-job')}>+ Publicar mi primer trabajo</button>
          </div>
        ):(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <h2 style={{fontWeight:700,fontSize:18}}>Mis publicaciones <span style={{color:'#EA580C'}}>({myJobs.length})</span></h2>
              <button className="btn-orange" style={{fontSize:13,padding:'8px 16px'}} onClick={()=>nav('post-job')}>+ Nuevo</button>
            </div>
            <div className="grid-jobs" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
              {myJobs.map((job,i)=><JobCard key={job.id} job={job} nav={nav} delay={i}/>)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return(
    <div>
{showBanner&&profile?.verification_status==='verified'&&<SecurityBanner onClose={()=>setShowBanner(false)}/>}
       {profile&&<VerificationBanner status={profile?.verification_status} onStartVerification={onStartVerification}/>}
      {/* HERO — un solo contenedor, sin divisiones, imagen con overlay suave */}
      <div className="fade-up" style={{position:'relative',background:'#FEF3E2',borderRadius:24,marginBottom:28,overflow:'hidden',display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:320}}>
        {/* Texto izquierda */}
        <div style={{padding:'44px 40px',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',zIndex:2,alignItems:'flex-start'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(234,88,12,.12)',color:'#EA580C',padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:700,marginBottom:16}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#EA580C" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> {filtered.length} cachuelos disponibles en Lima
          </div>
          <h1 style={{fontSize:'clamp(26px,3vw,44px)',fontWeight:800,lineHeight:1.1,letterSpacing:'-1.5px',marginBottom:12,color:'#111827',textAlign:'left'}}>
            Encuentra <span style={{color:'#EA580C'}}>cachuelos</span><br/>cerca de ti
          </h1>
          <p style={{color:'#6B7280',fontSize:15,lineHeight:1.65,marginBottom:24,textAlign:'left',maxWidth:380}}>Conectamos estudiantes con personas que necesitan ayuda en Lima Moderna.</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:24}}>
            {[{icon:<Zap size={15} color="#EA580C"/>,title:'Rápido',sub:'Empieza hoy'},{icon:<ShieldCheck size={15} color="#16A34A"/>,title:'Confiable',sub:'Verificados'},{icon:<Sparkles size={15} color="#5B21B6"/>,title:'Simple',sub:'10% comisión'}].map(f=>(
              <div key={f.title} style={{display:'flex',alignItems:'center',gap:8,background:'#fff',border:'1.5px solid #E5E7EB',borderRadius:14,padding:'8px 14px',boxShadow:'0 1px 4px rgba(0,0,0,.05)'}}>
                <div style={{background:'#F9FAFB',borderRadius:8,padding:5}}>{f.icon}</div>
                <div><div style={{fontWeight:700,fontSize:12,color:'#111827'}}>{f.title}</div><div style={{color:'#9CA3AF',fontSize:11}}>{f.sub}</div></div>
              </div>
            ))}
          </div>
          {!userPos&&<button className="btn-orange" onClick={getGeo} disabled={geoL} style={{width:'fit-content',display:'flex',alignItems:'center',gap:8,padding:'11px 22px',fontSize:14}}>
            <MapPin size={16}/>{geoL?'Buscando...':'Ver trabajos cerca de mí'}
          </button>}
          {userPos&&<span style={{display:'inline-flex',alignItems:'center',gap:8,color:'#16A34A',fontWeight:700,fontSize:13,background:'#F0FDF4',border:'1.5px solid #86EFAC',padding:'8px 16px',borderRadius:20,width:'fit-content'}}>
            <CheckCircle size={15}/> Mostrando por cercanía
          </span>}
        </div>
        {/* Imagen derecha — sin background propio, overlay suaviza la unión */}
        <div style={{position:'relative',zIndex:1}}>
          <img src="/Hero.png" alt="Cachuelos" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}/>
          {/* Overlay lineal que va del crema al transparente — suaviza la unión izquierda */}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right, #FFF3DF 0%, rgba(255,243,223,0.45) 8%, rgba(255,243,223,0) 22%)',pointerEvents:'none',zIndex:2}}/>
        </div>
      </div>
      <div className="fade-up-2" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
        {[{icon:<Briefcase size={20} color="#EA580C"/>,value:jobs.length,label:'Trabajos activos',sub:'ahora'},{icon:<CheckCircle size={20} color="#16A34A"/>,value:allJobs.filter(j=>j.status==='completed').length,label:'Completados',sub:'en total'},{icon:<LayoutGrid size={20} color="#5B21B6"/>,value:Object.keys(CAT).length,label:'Categorías',sub:'disponibles'},{icon:<Users size={20} color="#0369A1"/>,value:'38+',label:'Trabajadores',sub:'activos 🔥'}].map(s=>(
          <div key={s.label} className="card" style={{padding:'18px 16px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
            <div style={{background:'#F9FAFB',borderRadius:10,padding:8,marginBottom:2}}>{s.icon}</div>
            <div style={{fontSize:22,fontWeight:800,color:'#EA580C',lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:12,color:'#374151',fontWeight:600,lineHeight:1.3}}>{s.label}</div>
            <div style={{fontSize:11,color:'#9CA3AF'}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <RecommendedSection jobs={jobs} prefs={prefs} nav={nav}/>
      <MercadoSection jobs={allJobs}/>
      <RankingSection/>
      <div className="fade-up-2 card" style={{padding:'12px 16px',marginBottom:14,display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{flex:1,minWidth:180,position:'relative'}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:16,pointerEvents:'none'}}>🔍</span>
          <input className="inp" style={{paddingLeft:38}} placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="inp" style={{width:180}} value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="all">Todas las categorías</option>
          {Object.entries(CAT).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.label}</option>)}
        </select>
        {leafOk&&<button className={`${mapView?'btn-orange':'btn-outline'}`} onClick={()=>setMapView(v=>!v)}>{mapView?'📋 Lista':'🗺 Mapa'}</button>}
        {leafErr&&<span style={{fontSize:12,color:'#DC2626',fontWeight:600}}>⚠ No se pudo cargar el mapa</span>}
        <button className="btn-ghost" onClick={fetchJobs} style={{border:'1.5px solid #E5E7EB',borderRadius:12}}>🔄</button>
      </div>
      <div className="pill-nav fade-up-2" style={{marginBottom:18}}>
        <button className="pill" onClick={()=>setCat('all')} style={{background:cat==='all'?'#EA580C':'#F3F4F6',color:cat==='all'?'#fff':'#374151',display:'inline-flex',alignItems:'center',gap:5}}>
          <LayoutGrid size={13}/>Todos
        </button>
        {Object.entries(CAT).map(([k,v])=>{
          const Icon=CAT_ICONS[v.icon]||Tag;
          return <button key={k} className="pill" onClick={()=>setCat(k)} style={{background:cat===k?'#EA580C':'#F3F4F6',color:cat===k?'#fff':'#374151',display:'inline-flex',alignItems:'center',gap:5}}>
            <Icon size={13}/>{v.label}
          </button>;
        })}
      </div>
      {mapView&&leafOk&&<div className="card fade-up" style={{overflow:'hidden',marginBottom:20,padding:0}}><LeafletMap jobs={filtered} userPos={userPos} onJobClick={id=>{setSelId(id);nav('job',{jid:id})}} selectedId={selId} height={420}/></div>}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <h2 style={{fontWeight:700,fontSize:18}}>Cachuelos disponibles <span style={{color:'#EA580C'}}>({filtered.length})</span></h2>
        {userPos&&<span style={{fontSize:13,color:'#16A34A',fontWeight:600}}>📍 Por cercanía</span>}
      </div>
      {loading?<Spin/>:filtered.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'#9CA3AF'}}>
          <div style={{fontSize:48,marginBottom:12}}>🔍</div>
          <p style={{fontWeight:600}}>No se encontraron trabajos</p>
          <button className="btn-ghost" style={{marginTop:12}} onClick={fetchJobs}>Actualizar</button>
        </div>
      ):(
        <div className="grid-jobs" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:18}}>
          {filtered.map((job,i)=>{
            const score = !isEmp ? scoreJobForWorker(job,prefs) : 0;
            return <JobCard key={job.id} job={job} nav={nav} delay={i} dist={job.dist} recommended={score>0} recReason={prefs.favCats.has(job.category)?'★ Favorita':'Para ti'}/>;
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAP PAGE ─────────────────────────────────────────────────────────────────
function MapPage({nav}){
  const[jobs,setJobs]=useState([]);
  const[leafOk,setLeafOk]=useState(!!window.L);
  const[leafErr,setLeafErr]=useState(false);
  const[pos,setPos]=useState(null);
  const[radius,setRadius]=useState(10);
  const[sel,setSel]=useState(null);
  useEffect(()=>{
    sb.from('jobs').select('*').eq('status','open').then(({data})=>setJobs(data||[]));
    loadLeaflet(()=>setLeafOk(true),()=>setLeafErr(true));
    navigator.geolocation?.getCurrentPosition(p=>setPos({lat:p.coords.latitude,lng:p.coords.longitude}),()=>setPos({lat:-12.1219,lng:-77.0234}));
  },[]);
  const listed=jobs.filter(j=>j.latitude&&j.longitude).map(j=>({...j,dist:pos?distKm(pos,{lat:j.latitude,lng:j.longitude}):null})).filter(j=>!j.dist||j.dist<=radius).sort((a,b)=>(a.dist||99)-(b.dist||99));
  return(
    <div className="fade-up">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div><h1 style={{fontWeight:700,fontSize:22}}>🗺 Mapa de Lima Moderna</h1><p style={{color:'#6B7280',fontSize:14}}>{listed.length} trabajos en {radius}km</p></div>
        <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:13,color:'#6B7280',fontWeight:600}}>Radio:</span><select className="inp" style={{width:100}} value={radius} onChange={e=>setRadius(Number(e.target.value))}>{[1,2,5,10,20].map(r=><option key={r} value={r}>{r} km</option>)}</select></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 290px',gap:16}}>
        <div className="card" style={{overflow:'hidden',height:520,padding:0}}>{leafOk?<LeafletMap jobs={listed} userPos={pos} onJobClick={id=>{setSel(id);nav('job',{jid:id})}} selectedId={sel} height={520}/>:<div style={{height:520,display:'flex',alignItems:'center',justifyContent:'center',color:leafErr?'#DC2626':'#9CA3AF',flexDirection:'column',gap:8}}>{leafErr?<><span style={{fontSize:32}}>⚠️</span><span style={{fontWeight:600}}>No se pudo cargar el mapa</span><span style={{fontSize:12}}>Verifica tu conexión a internet</span></>:'Cargando mapa...'}</div>}</div>
        <div style={{display:'flex',flexDirection:'column',gap:10,overflowY:'auto',maxHeight:520}}>
          {listed.length===0&&<div style={{padding:32,color:'#9CA3AF',fontSize:14}}>Sin trabajos en este radio</div>}
          {listed.map(job=>(
            <div key={job.id} className="card card-hover" style={{padding:14,flexShrink:0,border:sel===job.id?'1.5px solid #EA580C':'1.5px solid #EBEBEB'}} onClick={()=>{setSel(job.id);nav('job',{jid:job.id})}}>
              <CatTag cat={job.category}/>
              <p style={{fontWeight:600,fontSize:13,marginTop:8,marginBottom:4}}>{job.title}</p>
              <p style={{fontSize:18,fontWeight:700,color:'#EA580C'}}>S/{job.price}</p>
              {job.dist&&<p style={{fontSize:12,color:'#6B7280',marginTop:4}}>📏 {fmtDist(job.dist)}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── JOB DETAIL — FLUJO COMPLETO CON POLLING + REALTIME ─────────────────────
function JobDetailPage({profile,jid,nav,back,toast}){
  const[job,setJob]=useState(null);
  const[reviews,setReviews]=useState([]);
  const[loading,setLoading]=useState(true);
  const[acting,setActing]=useState(false);
  const[rating,setRating]=useState(0);
  const[comment,setComment]=useState('');
  const[modal,setModal]=useState(null);
  const[leafOk,setLeafOk]=useState(!!window.L);
  const[leafErr,setLeafErr]=useState(false);
  const pollRef=useRef(null);

  const fetchJobSilent=async()=>{
    const[{data:j},{data:r}]=await Promise.all([
      sb.from('jobs').select('*').eq('id',jid).single(),
      sb.from('reviews').select('*').eq('job_id',jid).order('created_at',{ascending:false}),
    ]);
    if(j) setJob(j);
    if(r) setReviews(r);
  };

  const fetchJob=async()=>{
    setLoading(true);
    await fetchJobSilent();
    setLoading(false);
  };

  useEffect(()=>{
    fetchJob();
    loadLeaflet(()=>setLeafOk(true),()=>setLeafErr(true));

    // Polling cada 4 segundos — garantiza sincronía aunque el realtime falle
    pollRef.current=setInterval(()=>fetchJobSilent(),4000);

    // Realtime como capa adicional
    const channel=sb.channel(`job-${jid}`)
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'jobs',filter:`id=eq.${jid}`},
        payload=>{ setJob(payload.new); })
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'reviews',filter:`job_id=eq.${jid}`},
        ()=>{ sb.from('reviews').select('*').eq('job_id',jid).order('created_at',{ascending:false}).then(({data})=>{ if(data) setReviews(data); }); })
      .subscribe();

    return()=>{
      clearInterval(pollRef.current);
      sb.removeChannel(channel);
    };
  },[jid]);

  // Guarda en Supabase + actualiza local inmediatamente
  const updateJob=async(patch)=>{
    setActing(true);
    setJob(prev=>({...prev,...patch})); // optimistic update
    setModal(null);
    const{error}=await sb.from('jobs').update(patch).eq('id',jid);
    if(error){ toast('Error: '+error.message,'error'); fetchJob(); }
    setActing(false);
  };

  if(loading)return<Spin/>;
  if(!job)return<div style={{textAlign:'center',padding:80}}><button className="btn-ghost" onClick={back}>← Volver</button></div>;

  const cat=CAT[job.category]||CAT.other;
  const st=STATUS[job.status]||STATUS.open;
  const isPoster=profile?.id===job.poster_id;
  const isWorker=profile?.id===job.worker_id;

  // Permisos por estado y rol — se recalculan cada vez que job cambia
  const canAccept  = job.status==='open'        && !isPoster && !isWorker && profile?.role==='trabajador';
  const canStart   = job.status==='accepted'    && isWorker;
  const canFinish  = job.status==='in_progress' && isWorker  && !job.worker_finished;
  const canConfirm = job.status==='in_progress' && isPoster  && job.worker_finished;
  const canCancel = ['open','accepted','in_progress'].includes(job.status) && isPoster;
  const canRate    = job.status==='completed'   && ((isPoster&&!job.poster_rated)||(isWorker&&!job.worker_rated));
  // Estados informativos
  const workerWaiting = isWorker && job.worker_finished && job.status==='in_progress';
  const posterNotified = isPoster && job.worker_finished && job.status==='in_progress';

  const handleReview=async()=>{
    if(!rating){toast('Selecciona una calificación','error');return}
    setActing(true);
    const reviewedId=isPoster?job.worker_id:job.poster_id;
    const ratedField=isPoster?'poster_rated':'worker_rated';
    await sb.from('reviews').insert({job_id:jid,reviewer_id:profile.id,reviewer_name:profile.full_name,reviewed_id:reviewedId,rating,comment});
    await sb.from('jobs').update({[ratedField]:true}).eq('id',jid);
    setJob(prev=>({...prev,[ratedField]:true}));
    setReviews(prev=>[{id:Date.now(),reviewer_name:profile.full_name,rating,comment},...prev]);
    toast('⭐ ¡Calificación enviada!');
    setRating(0);setComment('');setActing(false);
  };

  return(
    <div className="fade-up" style={{maxWidth:740,margin:'0 auto'}}>
      <button className="btn-ghost" style={{marginBottom:20,paddingLeft:0}} onClick={back}>← Volver</button>

      <ConfirmModal data={modal} onClose={()=>setModal(null)} loading={acting}/>

      <div className="card" style={{overflow:'hidden',marginBottom:16}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${cat.color}18,${cat.color}06)`,padding:'26px 28px 20px',borderBottom:'1.5px solid #F0F1F3'}}>
          <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
            <CatTag cat={job.category}/>
            <StatusTag status={job.status}/>
            {job.worker_finished&&job.status==='in_progress'&&(
              <span className="tag" style={{background:'#FFFBEB',color:'#D97706'}}>⏳ Esperando confirmación del empleador</span>
            )}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
            <h1 style={{fontWeight:700,fontSize:22,lineHeight:1.3,color:'#111827'}}>{job.title}</h1>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontSize:32,fontWeight:800,color:'#EA580C'}}>S/{job.price}</div>
              <div style={{fontSize:13,color:'#9CA3AF'}}>{job.estimated_hours}h est.</div>
            </div>
          </div>
        </div>

        <div style={{padding:28}}>
          {/* Barra de progreso con estado worker_finished */}
          <JobProgressBar status={job.status} workerFinished={job.worker_finished}/>

          {/* Badge de rol */}
          {(isPoster||isWorker)&&(
            <div style={{background:isPoster?'#EFF6FF':'#F0FDF4',border:`1.5px solid ${isPoster?'#93C5FD':'#86EFAC'}`,borderRadius:12,padding:'10px 16px',marginBottom:16,fontSize:13,fontWeight:600,color:isPoster?'#1D4ED8':'#16A34A'}}>
              {isPoster?'🏢 Eres el empleador de este trabajo':'👷 Eres el trabajador asignado'}
            </div>
          )}

          <p style={{color:'#374151',lineHeight:1.7,fontSize:14,marginBottom:20}}>{job.description}</p>
          <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:20,fontSize:13,color:'#6B7280'}}>
            <span>📍 {job.location}</span><span>🕐 {fmtDate(job.created_at)}</span><span>⏱ {job.estimated_hours}h</span>
            {job.schedule_start&&<span style={{color:'#EA580C',fontWeight:700,display:'flex',alignItems:'center',gap:4}}>🕐 {job.schedule_start.slice(0,5)}{job.schedule_end?` — ${job.schedule_end.slice(0,5)}`:''}</span>}
          </div>

          <div className="divider"/>

          {/* Personas */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
            <PersonBox label="Publicado por" name={job.poster_name} color="#EA580C"/>
            {job.worker_id&&<PersonBox label="Trabajador" name={job.worker_name} color="#16A34A"/>}
          </div>

          {/* Desglose de pago */}
          <div style={{background:'#F9FAFB',borderRadius:16,padding:18,marginBottom:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:13,color:'#374151'}}>💰 Desglose de pago</div>
              {job.payment_status&&(
                <span style={{
                  display:'inline-flex',alignItems:'center',gap:4,borderRadius:20,padding:'3px 10px',fontSize:11,fontWeight:700,
                  background:job.payment_status==='released'?'#F0FDF4':job.payment_status==='held'?'#FFFBEB':'#F3F4F6',
                  color:job.payment_status==='released'?'#16A34A':job.payment_status==='held'?'#D97706':'#6B7280',
                }}>
                  {job.payment_status==='released'?'✅ Pago liberado':job.payment_status==='held'?'🔒 Pago retenido':'⏳ Pendiente'}
                </span>
              )}
            </div>
            {[['Precio total',`S/${job.price?.toFixed(2)}`,'#111827'],['Comisión (10%)',`-S/${(job.commission_amount||job.price*.1).toFixed(2)}`,'#DC2626'],['Ganancia del trabajador',`S/${(job.worker_earnings||job.price*.9).toFixed(2)}`,'#16A34A']].map(([l,v,c])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #F3F4F6'}}>
                <span style={{fontSize:13,color:'#6B7280'}}>{l}</span>
                <span style={{fontSize:13,fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </div>

          {job.latitude&&job.longitude&&(leafOk?(
            <div style={{borderRadius:16,overflow:'hidden',marginBottom:20,border:'1.5px solid #E5E7EB'}}>
              <LeafletMap jobs={[job]} userPos={null} onJobClick={()=>{}} selectedId={job.id} height={190}/>
            </div>
          ):leafErr?(
            <div style={{borderRadius:16,marginBottom:20,border:'1.5px solid #FCA5A5',background:'#FEF2F2',padding:'12px 16px',fontSize:13,color:'#DC2626',fontWeight:600}}>
              ⚠️ No se pudo cargar el mapa — verifica tu conexión
            </div>
          ):null)}

          {/* ══ ACCIONES ══════════════════════════════════════════════════════ */}

          {/* TRABAJADOR: Aceptar */}
          {canAccept&&(
            <div style={{background:'#F0FDF4',border:'1.5px solid #86EFAC',borderRadius:16,padding:20,marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>🤝 ¿Te interesa este cachuelo?</div>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:14,lineHeight:1.6}}>Al aceptar te comprometes a realizarlo. Ganarás <strong style={{color:'#16A34A'}}>S/{(job.price*.9).toFixed(2)}</strong> netos.</p>
              <button className="btn-orange" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15}}
              onClick={()=>{
              if(profile?.verification_status!=='verified'){
            toast('Debes verificar tu identidad para aceptar trabajos','error');
            return;
                 }
               setModal({icon:'🤝',title:'¿Aceptar este trabajo?',desc:`Te comprometes a realizar "${job.title}" por S/${job.price}. Coordina con el empleador para los detalles.`,confirmLabel:'Sí, aceptar',btnClass:'btn-orange',onConfirm:()=>updateJob({status:'accepted',worker_id:profile.id,worker_name:profile.full_name,worker_email:profile.email}).then(()=>toast('🤝 ¡Trabajo aceptado! Coordina con el empleador.'))});
                }}                disabled={acting}>
                ✅ Aceptar trabajo — S/{job.price}
              </button>
            </div>
          )}

          {/* TRABAJADOR: Iniciar */}
          {canStart&&(
            <div style={{background:'#EFF6FF',border:'1.5px solid #93C5FD',borderRadius:16,padding:20,marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>⚡ ¿Listo para empezar?</div>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:14}}>Haz clic cuando estés en el lugar y hayas comenzado.</p>
              <button className="btn-blue" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15}}
                onClick={()=>setModal({icon:'⚡',title:'¿Iniciar el trabajo?',desc:'Confirma que comenzaste el cachuelo. El empleador verá que estás en progreso.',confirmLabel:'Sí, iniciar',btnClass:'btn-blue',onConfirm:()=>updateJob({status:'in_progress',worker_finished:false}).then(()=>toast('⚡ ¡Trabajo iniciado! Avisa cuando termines.'))})}
                disabled={acting}>
                ⚡ Iniciar trabajo ahora
              </button>
            </div>
          )}

          {/* TRABAJADOR: Terminé */}
          {canFinish&&(
            <div style={{background:'#F0FDF4',border:'1.5px solid #86EFAC',borderRadius:16,padding:20,marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>🏁 ¿Terminaste el trabajo?</div>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:14,lineHeight:1.6}}>Notifica al empleador. Él debe confirmar para liberar tu pago de <strong style={{color:'#16A34A'}}>S/{(job.price*.9).toFixed(2)}</strong>.</p>
              <button className="btn-green" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15}}
                onClick={()=>setModal({icon:'🏁',title:'¿Marcar como terminado?',desc:'El empleador recibirá una notificación para confirmar y liberar tu pago.',confirmLabel:'Sí, terminé',btnClass:'btn-green',onConfirm:()=>updateJob({worker_finished:true}).then(()=>toast('🏁 ¡Notificaste al empleador! Espera su confirmación.'))})}
                disabled={acting}>
                🏁 Terminé el trabajo
              </button>
            </div>
          )}

          {/* TRABAJADOR: Esperando confirmación */}
          {isWorker&&job.worker_finished&&job.status==='in_progress'&&(
            <div style={{background:'#FFFBEB',border:'1.5px solid #FDE68A',borderRadius:16,padding:20,marginBottom:12,textAlign:'center'}}>
              <div style={{fontSize:28,marginBottom:8}}>⏳</div>
              <div style={{fontWeight:700,fontSize:15,color:'#D97706',marginBottom:4}}>Esperando confirmación del empleador</div>
              <p style={{fontSize:13,color:'#6B7280'}}>Una vez que confirme, recibirás <strong style={{color:'#16A34A'}}>S/{(job.price*.9).toFixed(2)}</strong> y podrán calificarse.</p>
            </div>
          )}

          {/* EMPLEADOR: Confirmación destacada */}
          {canConfirm&&(
            <div style={{background:'linear-gradient(135deg,#FFFBEB,#FEF9C3)',border:'2px solid #D97706',borderRadius:16,padding:20,marginBottom:12}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <div style={{fontSize:28,animation:'pulse 1.5s infinite'}}>🔔</div>
                <div style={{fontWeight:800,fontSize:16,color:'#92400E'}}>¡{job.worker_name} terminó el trabajo!</div>
              </div>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:16,lineHeight:1.65}}>
                Revisa que todo esté correcto y confirma para liberar el pago de <strong style={{color:'#16A34A'}}>S/{(job.price*.9).toFixed(2)}</strong> al trabajador.
              </p>
              <button className="btn-green" style={{width:'100%',justifyContent:'center',padding:14,fontSize:15}}
                onClick={()=>setModal({icon:'✅',title:'Confirmar trabajo completado',desc:`¿Confirmas que "${job.title}" fue realizado correctamente? Esto liberará el pago al trabajador.`,confirmLabel:'✅ Confirmar y liberar pago',btnClass:'btn-green',onConfirm:()=>updateJob({status:'completed',payment_status:'released'}).then(()=>toast('✅ ¡Pago liberado! Trabajo completado. Ahora pueden calificarse.'))})}
                disabled={acting}>
                ✅ Confirmar y liberar pago — S/{(job.price*.9).toFixed(2)}
              </button>
            </div>
          )}

          {/* EMPLEADOR: Cancelar */}
{canCancel&&job.status==='open'&&(
  <button className="btn-ghost" style={{color:'#DC2626',border:'1.5px solid #FECACA',marginBottom:16}}
    onClick={()=>setModal({icon:'❌',title:'¿Cancelar el trabajo?',desc:'Esta acción no se puede deshacer.',confirmLabel:'Sí, cancelar',btnClass:'btn-red',onConfirm:()=>updateJob({status:'cancelled'}).then(()=>toast('❌ Trabajo cancelado.'))})}>
    ❌ Cancelar publicación
  </button>
)}
{canCancel&&['accepted','in_progress'].includes(job.status)&&(
  <div style={{background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:16,padding:20,marginBottom:12}}>
    <div style={{fontWeight:700,fontSize:15,marginBottom:6,color:'#DC2626'}}>⚠ ¿Problemas con este trabajo?</div>
    <p style={{fontSize:13,color:'#6B7280',marginBottom:14}}>Puedes reabrir el trabajo para otro trabajador o cancelarlo definitivamente.</p>
    <div style={{display:'flex',gap:10}}>
      <button className="btn-outline" style={{flex:1,justifyContent:'center',borderColor:'#EA580C',color:'#EA580C'}}
        onClick={()=>setModal({icon:'🔄',title:'¿Reabrir el trabajo?',desc:'El trabajador actual será removido y el trabajo quedará disponible para otros.',confirmLabel:'Sí, reabrir',btnClass:'btn-orange',onConfirm:()=>updateJob({status:'open',worker_id:null,worker_name:null,worker_email:null,worker_finished:false}).then(()=>toast('🔄 Trabajo reabierto para otros trabajadores.'))})}>
        🔄 Reabrir para otro
      </button>
      <button className="btn-ghost" style={{flex:1,justifyContent:'center',color:'#DC2626',border:'1.5px solid #FECACA'}}
        onClick={()=>setModal({icon:'❌',title:'¿Cancelar definitivamente?',desc:'Esta acción no se puede deshacer. El trabajo quedará cancelado.',confirmLabel:'Sí, cancelar',btnClass:'btn-red',onConfirm:()=>updateJob({status:'cancelled'}).then(()=>toast('❌ Trabajo cancelado definitivamente.'))})}>
        ❌ Cancelar definitivo
      </button>
    </div>
  </div>
)}
          {/* Calificación */}
          {canRate&&(
            <div style={{background:'#FFFBEB',border:'1.5px solid #FDE68A',borderRadius:16,padding:20,marginTop:16,animation:'fadeUp .3s ease-out'}}>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:4}}>⭐ ¡Califica a {isPoster?job.worker_name:job.poster_name}!</h3>
              <p style={{fontSize:13,color:'#6B7280',marginBottom:14}}>Tu opinión ayuda a construir una comunidad de confianza.</p>
              <div style={{marginBottom:12}}><Stars value={rating} onRate={setRating} size={28}/></div>
              <textarea className="inp" placeholder="Comentario (opcional)..." value={comment} onChange={e=>setComment(e.target.value)} rows={3} style={{marginBottom:12,resize:'none'}}/>
              <button className="btn-orange" onClick={handleReview} disabled={acting}>{acting?'⏳ Enviando...':'Enviar calificación ★'}</button>
            </div>
          )}

          {/* Chat */}
          {['accepted','in_progress','completed'].includes(job.status)&&(
          <ChatBox job={job} profile={profile} toast={toast}/>          )}

          {/* Reseñas */}
          {reviews.length>0&&(
            <div style={{marginTop:24}}>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:12}}>⭐ Calificaciones del trabajo</h3>
              {reviews.map(r=>(
                <div key={r.id} style={{background:'#F9FAFB',borderRadius:14,padding:14,marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><Avatar name={r.reviewer_name} size={28} color='#6B7280'/><span style={{fontWeight:600,fontSize:13}}>{r.reviewer_name}</span></div>
                    <Stars value={r.rating} size={13}/>
                  </div>
                  {r.comment&&<p style={{fontSize:13,color:'#6B7280',marginLeft:36}}>{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CHAT BOX ─────────────────────────────────────────────────────────────────
  function ChatBox({job,profile,toast}){
  const[msgs,setMsgs]=useState([]);
  const[text,setText]=useState('');
  const[sending,setSending]=useState(false);
  const[open,setOpen]=useState(false);
  const[showDispute,setShowDispute]=useState(false);
  const bottomRef=useRef(null);
  const pendingRef=useRef(new Set());

  const allowed=['accepted','in_progress','completed'];
  if(!allowed.includes(job.status)||!job.worker_id)return null;

  useEffect(()=>{
    sb.from('messages').select('*').eq('job_id',job.id).order('created_at',{ascending:true})
      .then(({data})=>setMsgs(data||[]));

    const channel=sb.channel(`chat-${job.id}`)
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:`job_id=eq.${job.id}`},
        payload=>{
          const m=payload.new;
          // Si es un echo de mi propio mensaje (optimistic), reemplazar el temp por el real
          if(m.sender_id===profile.id&&pendingRef.current.has(m.content)){
            pendingRef.current.delete(m.content);
            setMsgs(prev=>prev.map(p=>p.id===`temp-${m.content}`?{...m}:p));
            return;
          }
          setMsgs(prev=>[...prev,m]);
        })
      .subscribe();

    return()=>sb.removeChannel(channel);
  },[job.id]);

  useEffect(()=>{
    if(open)bottomRef.current?.scrollIntoView({behavior:'smooth'});
  },[msgs,open]);

  const send=async()=>{
    if(!text.trim()||sending)return;
    const content=text.trim();
    setText('');
    pendingRef.current.add(content);
    setMsgs(prev=>[...prev,{
      id:`temp-${content}`,
      job_id:job.id,
      sender_id:profile.id,
      sender_name:profile.full_name,
      content,
      created_at:new Date().toISOString(),
    }]);
    setSending(true);
    await sb.from('messages').insert({
      job_id:job.id,
      sender_id:profile.id,
      sender_name:profile.full_name,
      content,
    });
    setSending(false);
  };

  const otherName=profile.id===job.poster_id?job.worker_name:job.poster_name;

  return(
    <div style={{marginTop:24}}>
      {/* Botón para abrir/cerrar */}
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',background:open?'#EA580C':'#FFF7ED',border:'1.5px solid #EA580C',borderRadius:open?'16px 16px 0 0':16,padding:'12px 18px',cursor:'pointer',transition:'all .2s'}}
      >
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:open?'rgba(255,255,255,.2)':'#EA580C',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={open?'#EA580C':'#fff'} strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style={{textAlign:'left'}}>
            <div style={{fontWeight:700,fontSize:14,color:open?'#fff':'#EA580C'}}>Chat con {otherName}</div>
            <div style={{fontSize:11,color:open?'rgba(255,255,255,.8)':'#9CA3AF'}}>Coordina los detalles del trabajo</div>
          </div>
        </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
      <span style={{color:open?'#fff':'#EA580C',fontSize:18,fontWeight:700,transform:open?'rotate(180deg)':'none',transition:'transform .2s'}}>⌄</span>
       {open&&<button onClick={e=>{e.stopPropagation();setShowDispute(true)}} style={{color:'#DC2626',fontSize:11,fontWeight:700,background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'3px 8px'}}>⚠ Reportar</button>}
         </div>
      </button>
{showDispute&&<DisputeModal job={job} profile={profile} onClose={()=>setShowDispute(false)} toast={toast}/>}
      {/* Panel del chat */}
      {open&&(
        <div style={{border:'1.5px solid #EA580C',borderTop:'none',borderRadius:'0 0 16px 16px',overflow:'hidden'}}>
          {/* Mensajes */}
          <div style={{height:280,overflowY:'auto',padding:16,background:'#FAFAFA',display:'flex',flexDirection:'column',gap:8}}>
            {msgs.length===0&&(
              <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',color:'#9CA3AF',fontSize:13,flexDirection:'column',gap:6}}>
                <span style={{fontSize:28}}>💬</span>
                <span>Aún no hay mensajes — ¡saluda!</span>
              </div>
            )}
            {msgs.map(m=>{
              const isMe=m.sender_id===profile.id;
              return(
                <div key={m.id} style={{display:'flex',flexDirection:'column',alignItems:isMe?'flex-end':'flex-start'}}>
                  {!isMe&&<span style={{fontSize:11,color:'#9CA3AF',marginBottom:2,marginLeft:4}}>{m.sender_name}</span>}
                  <div style={{
                    maxWidth:'75%',padding:'9px 14px',borderRadius:isMe?'16px 16px 4px 16px':'16px 16px 16px 4px',
                    background:isMe?'#EA580C':'#fff',
                    color:isMe?'#fff':'#111827',
                    fontSize:13,lineHeight:1.5,
                    border:isMe?'none':'1.5px solid #E5E7EB',
                    boxShadow:'0 1px 4px rgba(0,0,0,.06)',
                    wordBreak:'break-word',
                  }}>
                    {m.content}
                  </div>
                  <span style={{fontSize:10,color:'#9CA3AF',marginTop:2,marginLeft:isMe?0:4,marginRight:isMe?4:0}}>
                    {new Date(m.created_at).toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'})}
                  </span>
                </div>
              );
            })}
            <div ref={bottomRef}/>
          </div>
          {/* Input */}
          <div style={{padding:'10px 12px',background:'#fff',borderTop:'1.5px solid #F0F1F3',display:'flex',gap:8}}>
            <input
              className="inp"
              style={{flex:1,borderRadius:20,padding:'9px 16px',fontSize:13}}
              placeholder="Escribe un mensaje..."
              value={text}
              onChange={e=>setText(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
            />
            <button
              onClick={send}
              disabled={!text.trim()||sending}
              style={{width:38,height:38,borderRadius:'50%',background:'#EA580C',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:!text.trim()||sending?.5:1,transition:'opacity .15s'}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PersonBox({label,name,color='#EA580C'}){
  return(
    <div style={{background:'#F9FAFB',border:'1.5px solid #E5E7EB',borderRadius:14,padding:14}}>
      <div style={{fontSize:11,color:'#9CA3AF',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>{label}</div>
      <div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={name} size={32} color={color}/><span style={{fontWeight:600,fontSize:13,color:'#111827'}}>{name||'—'}</span></div>
    </div>
  );
}

// ─── PAYMENT MODAL ────────────────────────────────────────────────────────────
const CULQI_PK = 'pk_test_k8iNPxk22QhtVQqG';
const CULQI_RSA_ID = 'be69e8b4-72f5-4c8c-8617-c8cef4384051';
const CULQI_RSA_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnApkqT78ipzam5A7APANv8EWw
HchIa5nRRvQPCLCrjJKecpYKS1e5nZMnWLv3WYlh3VGt7qeeU04rBLquOPlNF9mH
0ch0m7v2ZcKlr2ph16XYs3/X4FQIbcKD8bPuMrjIGbIntavoFp8Fjpbi/gBQYyw6
CAOFF8uN7RHoH9otvQIDAQAB
-----END PUBLIC KEY-----`;
const SUPABASE_EDGE_URL = `${SUPA_URL}/functions/v1/process-payment`;

function PaymentModal({amount, title, email, onSuccess, onClose}){
  const[card,setCard]=useState({number:'',month:'',year:'',cvv:''});
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState('');
  const set=(k,v)=>setCard(p=>({...p,[k]:v}));

  // Cargar Culqi.js al montar
  useEffect(()=>{
    if(window.Culqi)return;
    const s=document.createElement('script');
    s.src='https://checkout.culqi.com/js/v4';
    s.onload=()=>{
      window.Culqi.publicKey=CULQI_PK;
      window.Culqi.settings({
        title:'Cachuelos',
        currency:'PEN',
        description:title,
        amount:Math.round(amount*100),
        rsaPublicKey:CULQI_RSA_KEY,
        rsaId:CULQI_RSA_ID,
      });
    };
    document.head.appendChild(s);
  },[]);

  const handlePay=async()=>{
    setError('');
    if(!card.number||!card.month||!card.year||!card.cvv){setError('Completa todos los campos');return}
    if(card.number.replace(/\s/g,'').length<16){setError('Número de tarjeta inválido');return}
    setLoading(true);
    // MODO DEMO: simular procesamiento de pago
    await new Promise(r=>setTimeout(r,2000));
    const fakeChargeId='demo_'+Date.now();
    onSuccess(fakeChargeId);
    setLoading(false);
  };

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const fmtCard=(v)=>v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();

  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="card fade-up" style={{maxWidth:420,width:'100%',padding:0,overflow:'hidden'}}>
        {/* Header */}
        <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',padding:'24px 28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <h2 style={{color:'#fff',fontWeight:800,fontSize:20,marginBottom:4}}>💳 Pago seguro</h2>
              <p style={{color:'rgba(255,255,255,.85)',fontSize:13}}>{title}</p>
            </div>
            <button onClick={onClose} style={{color:'rgba(255,255,255,.8)',fontSize:22,lineHeight:1,padding:4}}>×</button>
          </div>
          <div style={{marginTop:16,background:'rgba(255,255,255,.15)',borderRadius:12,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{color:'rgba(255,255,255,.9)',fontSize:13}}>Total a pagar</span>
            <span style={{color:'#fff',fontWeight:800,fontSize:24}}>S/{amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulario */}
        <div style={{padding:28}}>
          <Field label="Número de tarjeta">
            <input className="inp" placeholder="1234 5678 9012 3456" value={card.number}
              onChange={e=>set('number',fmtCard(e.target.value))} maxLength={19}/>
          </Field>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <Field label="Mes"><input className="inp" placeholder="MM" value={card.month}
              onChange={e=>set('month',e.target.value.replace(/\D/g,'').slice(0,2))} maxLength={2}/></Field>
            <Field label="Año"><input className="inp" placeholder="AA" value={card.year}
              onChange={e=>set('year',e.target.value.replace(/\D/g,'').slice(0,2))} maxLength={2}/></Field>
            <Field label="CVV"><input className="inp" placeholder="123" value={card.cvv} type="password"
              onChange={e=>set('cvv',e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4}/></Field>
          </div>

          {error&&<div style={{background:'#FEF2F2',border:'1.5px solid #FCA5A5',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#DC2626',fontWeight:600}}>⚠ {error}</div>}

          <div style={{background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:12,color:'#166534'}}>
            🔒 Pago procesado de forma segura por Culqi. Cachuelos nunca almacena datos de tu tarjeta.
          </div>

          <div style={{background:'#EFF6FF',border:'1.5px solid #93C5FD',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:12,color:'#1D4ED8'}}>
            🧪 <strong>Modo demo</strong> — ingresa cualquier dato de tarjeta para simular el pago. No se realizará ningún cobro real.
          </div>

          <button className="btn-orange" onClick={handlePay} disabled={loading}
            style={{width:'100%',justifyContent:'center',fontSize:15,padding:14}}>
            {loading?'⏳ Procesando pago...':'💳 Pagar S/'+amount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── POST JOB ─────────────────────────────────────────────────────────────────
function PostJobPage({profile,nav,back,toast}){
  const[form,setForm]=useState({title:'',description:'',category:'',price:'80',estimated_hours:'3',location:'',schedule_start:'',schedule_end:''});
  const[loc,setLoc]=useState(null);
  const[loading,setLoading]=useState(false);
  const[userPos,setUserPos]=useState(null);
  const[showPayment,setShowPayment]=useState(false);
  const[pendingData,setPendingData]=useState(null);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const price=parseFloat(form.price)||0;

  useEffect(()=>{
    navigator.geolocation?.getCurrentPosition(
      p=>setUserPos({lat:p.coords.latitude,lng:p.coords.longitude}),
      ()=>{}
    );
  },[]);

  const initialCenter=(userPos&&isInLimaModerna(userPos.lat,userPos.lng))
    ?userPos
    :(form.location&&LIMA_COORDS[form.location])?LIMA_COORDS[form.location]:{lat:-12.0964,lng:-77.0428};

  // Paso 1: validar formulario y abrir modal de pago
  const handleSubmit=async(e)=>{
    e.preventDefault();if(profile?.verification_status!=='verified'){
  toast('Debes verificar tu identidad antes de publicar','error');
  return;
}
    if(!form.category){toast('Selecciona una categoría','error');return}
    if(!loc){toast('Selecciona la ubicación exacta en el mapa','error');return}
    if(!isInLimaModerna(loc.lat,loc.lng)){toast('La ubicación debe estar dentro de Lima Moderna','error');return}
    if(!form.title.trim()){toast('Escribe un título','error');return}
    setPendingData({...form,loc});
    setShowPayment(true);
  };

  // Paso 2: pago exitoso → publicar trabajo
  const handlePaymentSuccess=async(chargeId)=>{
    setShowPayment(false);
    setLoading(true);
    const p=parseFloat(form.price);
    const{error}=await sb.from('jobs').insert({
      title:form.title,description:form.description,category:form.category,
      price:p,estimated_hours:parseFloat(form.estimated_hours),
      location:loc.address||form.location,
      district:form.location||null,
      latitude:loc.lat,longitude:loc.lng,status:'open',
      poster_id:profile.id,poster_name:profile.full_name,poster_email:profile.email,
      commission_amount:p*.1,worker_earnings:p*.9,
      worker_finished:false,
      schedule_start:form.schedule_start||null,
      schedule_end:form.schedule_end||null,
      payment_status:'held',
      charge_id:chargeId,
    });
    if(error){toast('Error al publicar: '+error.message,'error');setLoading(false);return}
    toast('🎉 ¡Pago exitoso y trabajo publicado!');
    nav('home');
    setLoading(false);
  };

  return(
    <div className="fade-up" style={{maxWidth:640,margin:'0 auto'}}>
      {showPayment&&<PaymentModal
        amount={price}
        title={form.title||'Trabajo en Cachuelos'}
        email={profile.email}
        onSuccess={handlePaymentSuccess}
        onClose={()=>setShowPayment(false)}
      />}
      <button className="btn-ghost" style={{marginBottom:20,paddingLeft:0,display:'flex',alignItems:'center',gap:6}} onClick={back}>← Volver</button>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',padding:'28px 32px'}}>
          <h1 style={{color:'#fff',fontWeight:600,fontSize:22,marginBottom:4,letterSpacing:'-0.3px'}}>🚀 Publicar trabajo</h1>
          <p style={{color:'rgba(255,255,255,.8)',fontSize:14,fontWeight:400}}>Describe qué necesitas y encuentra al trabajador ideal</p>
        </div>
        <form onSubmit={handleSubmit} style={{padding:28}}>
          <Field label="Título *"><input className="inp" placeholder="Ej: Limpiar departamento de 2 habitaciones" value={form.title} onChange={e=>set('title',e.target.value)} required/></Field>
          <Field label="Descripción *"><textarea className="inp" placeholder="Describe los detalles..." value={form.description} onChange={e=>set('description',e.target.value)} rows={4} required style={{resize:'none'}}/></Field>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <Field label="Categoría *"><select className="inp" value={form.category} onChange={e=>set('category',e.target.value)} required><option value="">Seleccionar...</option>{Object.entries(CAT).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.label}</option>)}</select></Field>
            <Field label="Distrito *"><select className="inp" value={form.location} onChange={e=>{set('location',e.target.value);setLoc(null);}} required><option value="">Seleccionar...</option>{LIMA.map(d=><option key={d} value={d}>{d}</option>)}</select></Field>
          </div>
          <Field label="Ubicación exacta *">
            <LocationPicker initialCenter={initialCenter} value={loc} onChange={setLoc}/>
          </Field>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <Field label="Precio (S/.) *"><input className="inp" type="number" min="1" step="0.50" value={form.price} onChange={e=>set('price',e.target.value)} required/></Field>
            <Field label="Horas estimadas *"><input className="inp" type="number" min="0.5" step="0.5" value={form.estimated_hours} onChange={e=>set('estimated_hours',e.target.value)} required/></Field>
          </div>
          <Field label="Horario del trabajo">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div>
                <label style={{fontSize:12,color:'#6B7280',fontWeight:600,display:'block',marginBottom:4}}>Hora inicio</label>
                <input className="inp" type="time" value={form.schedule_start} onChange={e=>set('schedule_start',e.target.value)}/>
              </div>
              <div>
                <label style={{fontSize:12,color:'#6B7280',fontWeight:600,display:'block',marginBottom:4}}>Hora fin</label>
                <input className="inp" type="time" value={form.schedule_end} onChange={e=>set('schedule_end',e.target.value)}/>
              </div>
            </div>
            <p style={{fontSize:11,color:'#9CA3AF',marginTop:4}}>Opcional — ayuda al trabajador a saber cuándo presentarse</p>
          </Field>
          {price>0&&(
            <div style={{background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:16,padding:16,marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:13,color:'#166534',marginBottom:8}}>💚 Desglose</div>
              {[['Precio total',`S/${price.toFixed(2)}`],['Comisión (10%)',`-S/${(price*.1).toFixed(2)}`],['Ganancia del trabajador',`S/${(price*.9).toFixed(2)}`]].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}><span style={{color:'#374151'}}>{l}</span><span style={{fontWeight:700}}>{v}</span></div>))}
            </div>
          )}
          <button className="btn-orange" type="submit" disabled={loading||(loc&&!isInLimaModerna(loc.lat,loc.lng))}
            style={{width:'100%',justifyContent:'center',fontSize:15,padding:14}}>
            {loading?'⏳ Publicando...':'💳 Continuar con el pago'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MY JOBS ──────────────────────────────────────────────────────────────────
function MyJobsPage({profile,nav}){
  const[jobs,setJobs]=useState([]);
  const[loading,setLoading]=useState(true);
  const isWorker=profile?.role==='trabajador';
  const[tab,setTab]=useState(isWorker?'working':'posted');
  useEffect(()=>{(async()=>{setLoading(true);const{data}=await sb.from('jobs').select('*').or(`poster_id.eq.${profile.id},worker_id.eq.${profile.id}`).order('created_at',{ascending:false});setJobs(data||[]);setLoading(false);})();},[]);
  const posted=jobs.filter(j=>j.poster_id===profile.id);
  const working=jobs.filter(j=>j.worker_id===profile.id);
  const list=(!isWorker||tab==='posted')?posted:working;
  return(
    <div className="fade-up">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:12}}>
        <h1 style={{fontWeight:600,fontSize:24,letterSpacing:'-0.3px'}}>💼 Mis Trabajos</h1>
        {!isWorker&&<button className="btn-orange" onClick={()=>nav('post-job')}>+ Publicar nuevo</button>}
      </div>
      {isWorker&&(
      <div style={{display:'flex',background:'#F3F4F6',borderRadius:16,padding:4,width:'fit-content',marginBottom:24}}>
        {[['posted',`📋 Publicados (${posted.length})`],['working',`🔨 Tomados (${working.length})`]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:'8px 20px',borderRadius:12,fontWeight:700,fontSize:13,background:tab===k?'#fff':'transparent',color:tab===k?'#EA580C':'#6B7280',boxShadow:tab===k?'0 1px 4px rgba(0,0,0,.08)':'none',border:'none',cursor:'pointer'}}>{l}</button>
        ))}
      </div>
      )}
      {loading?<Spin/>:list.length===0?(
        <div style={{textAlign:'center',padding:'60px 0'}}>
          <div style={{fontSize:48,marginBottom:12}}>📭</div>
          <p style={{color:'#9CA3AF',fontWeight:600}}>{tab==='posted'?'No has publicado trabajos aún':'No has tomado trabajos aún'}</p>
          {tab==='posted'&&!isWorker&&<button className="btn-orange" style={{marginTop:16}} onClick={()=>nav('post-job')}>+ Publicar trabajo</button>}
        </div>
      ):(
        <div className="grid-jobs" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:18}}>
          {list.map((job,i)=><JobCard key={job.id} job={job} nav={nav} delay={i}/>)}
        </div>
      )}
    </div>
  );
}
// ─── PROFILE ──────────────────────────────────────────────────────────────────
// ─── EDITAR PERFIL — foto, bio, LinkedIn y categorías favoritas ──────────────
function EditProfileModal({profile,onClose,onSaved,toast}){
  const[form,setForm]=useState({
    bio:profile.bio||'',
    linkedin_url:profile.linkedin_url||'',
    photo_url:profile.photo_url||'',
    skills:profile.skills||[],
  });
  const[saving,setSaving]=useState(false);
  const[uploading,setUploading]=useState(false);
  const[err,setErr]=useState('');
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const isWorker=profile.role==='trabajador';

  const handleFileChange=async(e)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    if(!file.type.startsWith('image/')){setErr('El archivo debe ser una imagen');return}
    if(file.size>3*1024*1024){setErr('La imagen no puede pesar más de 3MB');return}
    setErr('');
    setUploading(true);
    const ext=file.name.split('.').pop();
    const path=`${profile.id}/avatar.${ext}`;
    const{error}=await sb.storage.from('avatars').upload(path,file,{upsert:true,cacheControl:'3600'});
    if(error){setErr('Error al subir imagen: '+error.message);setUploading(false);return}
    const{data}=sb.storage.from('avatars').getPublicUrl(path);
    set('photo_url',data.publicUrl+'?t='+Date.now());    setUploading(false);
  };
  const toggleSkill=(catKey)=>{
    setForm(p=>{
      const has=p.skills.includes(catKey);
      return{...p,skills:has?p.skills.filter(s=>s!==catKey):[...p.skills,catKey]};
    });
  };

  const validateLinkedIn=(url)=>{
    if(!url)return true;
    return /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(url.trim());
  };

  const handleSave=async()=>{
    setErr('');
    if(form.linkedin_url&&!validateLinkedIn(form.linkedin_url)){
      setErr('El link de LinkedIn debe ser una URL válida (ej: https://linkedin.com/in/tu-nombre)');
      return;
    }
    if(form.bio.length>280){
      setErr('La bio no puede tener más de 280 caracteres');
      return;
    }
    setSaving(true);
    const{error}=await sb.from('profiles').update({
      bio:form.bio.trim()||null,
      linkedin_url:form.linkedin_url.trim()||null,
      photo_url:form.photo_url.trim()||null,
      skills:form.skills,
    }).eq('id',profile.id);
    setSaving(false);
    if(error){toast?.('Error al guardar: '+error.message,'error');return}
    toast?.('✅ Perfil actualizado');
    onSaved({...profile,...form});
  };
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="card fade-up" style={{maxWidth:480,width:'100%',maxHeight:'88vh',overflowY:'auto',padding:0}}>
        <div style={{background:'linear-gradient(135deg,#EA580C,#F97316)',padding:'22px 28px',position:'sticky',top:0}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{color:'#fff',fontWeight:800,fontSize:19}}>✏️ Editar perfil</h2>
            <button onClick={onClose} style={{color:'rgba(255,255,255,.85)',fontSize:22,lineHeight:1,padding:4}}>×</button>
          </div>
          <p style={{color:'rgba(255,255,255,.85)',fontSize:13,marginTop:4}}>Mejora tu credibilidad ante otros usuarios</p>
        </div>

        <div style={{padding:28}}>
          <Field label="Foto de perfil">
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              {form.photo_url
                ? <img src={form.photo_url} alt="preview" style={{width:56,height:56,borderRadius:'50%',objectFit:'cover',border:'2px solid #E5E7EB'}}/>
                : <div style={{width:56,height:56,borderRadius:'50%',background:'#F3F4F6',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Camera size={22} color="#9CA3AF"/></div>
              }
              <label className="btn-outline" style={{cursor:uploading?'wait':'pointer',fontSize:13}}>
                {uploading?'⏳ Subiendo...':'📷 Subir foto'}
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} style={{display:'none'}}/>
              </label>
            </div>
            <p style={{fontSize:11,color:'#9CA3AF',marginTop:6}}>JPG o PNG, máximo 3MB</p>
          </Field>

          <Field label={`Bio corta (${form.bio.length}/280)`}>
            <textarea className="inp" placeholder="Cuéntales a los demás un poco sobre ti..." value={form.bio} onChange={e=>set('bio',e.target.value.slice(0,280))} rows={3} style={{resize:'none'}}/>
          </Field>

          <Field label="LinkedIn (opcional)" error={err.includes('LinkedIn')?err:''}>
            <div style={{position:'relative'}}>
              <Link2 size={16} color="#0A66C2" style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)'}}/>
              <input className={`inp ${err.includes('LinkedIn')?'inp-err':''}`} style={{paddingLeft:38}} placeholder="https://linkedin.com/in/tu-nombre" value={form.linkedin_url} onChange={e=>set('linkedin_url',e.target.value)}/>
            </div>
          </Field>

          {isWorker&&(
            <Field label="Categorías favoritas">
              <p style={{fontSize:12,color:'#9CA3AF',marginBottom:10,marginTop:-4}}>Elige en qué te gustaría trabajar más seguido. Te mostraremos primero esos cachuelos.</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {Object.entries(CAT).map(([k,v])=>{
                  const Icon=CAT_ICONS[v.icon]||Tag;
                  const active=form.skills.includes(k);
                  return(
                    <button key={k} type="button" onClick={()=>toggleSkill(k)}
                      style={{display:'inline-flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:20,fontSize:13,fontWeight:700,border:`1.5px solid ${active?'#EA580C':'#E5E7EB'}`,background:active?'#FFF7ED':'#fff',color:active?'#EA580C':'#6B7280',cursor:'pointer'}}>
                      <Icon size={13}/>{v.label}{active&&<CheckCircle size={13}/>}
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          {err&&!err.includes('LinkedIn')&&<div style={{background:'#FEF2F2',border:'1.5px solid #FCA5A5',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#DC2626',fontWeight:600}}>⚠ {err}</div>}

          <div style={{display:'flex',gap:10,marginTop:8}}>
            <button className="btn-ghost" style={{flex:1,justifyContent:'center',border:'1.5px solid #E5E7EB',borderRadius:14}} onClick={onClose}>Cancelar</button>
            <button className="btn-orange" style={{flex:1,justifyContent:'center'}} onClick={handleSave} disabled={saving}>
              {saving?'⏳ Guardando...':(<><Save size={15}/> Guardar</>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfilePage({currentProfile,pid,nav,back,toast}){
  const[profile,setProfile]=useState(null);
  const[jobs,setJobs]=useState([]);
  const[reviews,setReviews]=useState([]);
  const[loading,setLoading]=useState(true);
  const[showEdit,setShowEdit]=useState(false);
  const targetId=pid||currentProfile?.id;
  const isOwn=targetId===currentProfile?.id;

  const fetchAll=async()=>{
    setLoading(true);
    const[{data:p},{data:j},{data:r}]=await Promise.all([
      sb.from('profiles').select('*').eq('id',targetId).single(),
      sb.from('jobs').select('*').or(`poster_id.eq.${targetId},worker_id.eq.${targetId}`).order('created_at',{ascending:false}),
      sb.from('reviews').select('*').eq('reviewed_id',targetId).order('created_at',{ascending:false}),
    ]);
    setProfile(p);setJobs(j||[]);setReviews(r||[]);setLoading(false);
  };

  useEffect(()=>{fetchAll();},[targetId]);

  if(loading)return<Spin/>;
  if(!profile)return<div style={{textAlign:'center',padding:80}}><p style={{color:'#9CA3AF'}}>Perfil no encontrado</p><button className="btn-ghost" onClick={back}>← Volver</button></div>;

  const posted=jobs.filter(j=>j.poster_id===targetId);
  const worked=jobs.filter(j=>j.worker_id===targetId&&j.status==='completed');
  const avg=reviews.length?reviews.reduce((s,r)=>s+r.rating,0)/reviews.length:0;
  const earn=worked.reduce((s,j)=>s+(j.worker_earnings||0),0);
  const catCnt=worked.reduce((a,j)=>{if(j.category)a[j.category]=(a[j.category]||0)+1;return a},{});
  const topCats=Object.entries(catCnt).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([c])=>c);

  return(
    <div className="fade-up" style={{maxWidth:700,margin:'0 auto'}}>
      <button className="btn-ghost" style={{marginBottom:20,paddingLeft:0,display:'flex',alignItems:'center',gap:6}} onClick={back}>← Volver</button>

      {showEdit&&<EditProfileModal
        profile={profile}
        onClose={()=>setShowEdit(false)}
        onSaved={()=>{setShowEdit(false);fetchAll();}}
        toast={toast}
      />}

      <div className="card" style={{overflow:'hidden',marginBottom:16}}>
        <div style={{height:90,background:'linear-gradient(135deg,#EA580C,#F97316,#FCD34D)'}}/>
        <div style={{padding:'0 28px 24px',textAlign:'left'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginTop:-34,marginBottom:20,flexWrap:'wrap',gap:12}}>
            {profile.photo_url
              ? <img src={profile.photo_url} alt={profile.full_name} style={{width:68,height:68,borderRadius:18,objectFit:'cover',border:'4px solid #fff',boxShadow:'0 4px 16px rgba(234,88,12,.3)'}}/>
              : <div style={{width:68,height:68,borderRadius:18,background:'#EA580C',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:26,border:'4px solid #fff',boxShadow:'0 4px 16px rgba(234,88,12,.3)'}}>{(profile.full_name||'?').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div>
            }
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              <VerifiedBadge status={profile.verification_status}/>
              {isOwn&&<span style={{background:'#FFF7ED',color:'#EA580C',border:'1.5px solid #FDBA74',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:600}}>Tu perfil</span>}
            </div>
          </div>
          <h1 style={{fontWeight:700,fontSize:22,marginBottom:2,color:'#111827',letterSpacing:'-0.5px'}}>{profile.full_name||'Usuario'}</h1>
          <p style={{color:'#9CA3AF',fontSize:13,marginBottom:4}}>{profile.email}</p>
          {profile.role&&<p style={{fontSize:12,color:'#6B7280',marginBottom:8,display:'flex',alignItems:'center',gap:4}}><User size={12}/>{profile.role==='trabajador'?'Trabajador':'Empleador'}</p>}

          {profile.bio&&<p style={{fontSize:13,color:'#374151',lineHeight:1.6,marginTop:10,marginBottom:4,maxWidth:520}}>{profile.bio}</p>}

          {profile.linkedin_url&&(
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:10,color:'#0A66C2',fontSize:13,fontWeight:700,textDecoration:'none',background:'#EFF6FF',border:'1.5px solid #BFDBFE',borderRadius:20,padding:'5px 14px'}}>
              <Link2 size={14}/> Ver LinkedIn
            </a>
          )}

          {topCats.length>0&&<div style={{display:'flex',gap:6,marginTop:12,flexWrap:'wrap'}}>{topCats.map(c=><CatTag key={c} cat={c}/>)}</div>}

          {profile.role==='trabajador'&&profile.skills?.length>0&&(
            <div style={{marginTop:14}}>
              <div style={{fontSize:11,color:'#9CA3AF',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>Categorías favoritas</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{profile.skills.map(c=><CatTag key={c} cat={c}/>)}</div>
            </div>
          )}

          {isOwn&&(
            <button className="btn-outline" style={{marginTop:16,fontSize:13}} onClick={()=>setShowEdit(true)}>
              <Edit3 size={14}/> Editar perfil
            </button>
          )}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1.5px solid #F0F1F3'}}>
          {[
            {Icon:Star,val:avg>0?avg.toFixed(1):'—',sub:`${reviews.length} reseñas`,color:'#F59E0B',bg:'#FFFBEB'},
            {Icon:CheckCircle,val:worked.length,sub:'completados',color:'#16A34A',bg:'#F0FDF4'},
            {Icon:FileText,val:posted.length,sub:'publicados',color:'#3B82F6',bg:'#EFF6FF'},
            {Icon:DollarSign,val:earn>0?`S/${earn.toFixed(0)}`:'—',sub:'ganado',color:'#EA580C',bg:'#FFF7ED'},
          ].map(s=>(
            <div key={s.sub} style={{padding:'16px 10px',textAlign:'center',borderRight:'1.5px solid #F0F1F3'}}>
              <div style={{background:s.bg,width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px'}}><s.Icon size={16} color={s.color}/></div>
              <div style={{fontWeight:800,fontSize:17,color:s.color}}>{s.val}</div>
              <div style={{fontSize:11,color:'#9CA3AF',fontWeight:500}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      {reviews.length>0&&(
        <div className="card" style={{padding:24,marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <h2 style={{fontWeight:700,fontSize:16,display:'flex',alignItems:'center',gap:8}}><Star size={16} color="#F59E0B" fill="#F59E0B"/>Calificaciones recibidas</h2>
            <Stars value={Math.round(avg)} size={14}/>
          </div>
          {reviews.map(r=>(<div key={r.id} style={{background:'#F9FAFB',borderRadius:14,padding:14,marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><div style={{display:'flex',alignItems:'center',gap:8}}><Avatar name={r.reviewer_name} size={26} color='#6B7280'/><span style={{fontWeight:700,fontSize:13}}>{r.reviewer_name}</span></div><Stars value={r.rating} size={13}/></div>{r.comment&&<p style={{fontSize:13,color:'#6B7280',marginLeft:34}}>{r.comment}</p>}</div>))}
        </div>
      )}
      {worked.length>0&&(
        <div className="card" style={{padding:24}}>
          <h2 style={{fontWeight:700,fontSize:16,marginBottom:14,display:'flex',alignItems:'center',gap:8}}><Trophy size={16} color="#F59E0B"/>Trabajos completados</h2>
          {worked.map(job=>(<button key={job.id} onClick={()=>nav('job',{jid:job.id})} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #F3F4F6',background:'none',cursor:'pointer',textAlign:'left',border:'none'}}><div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}><CatTag cat={job.category}/><span style={{fontWeight:600,fontSize:13,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{job.title}</span></div><span style={{fontWeight:800,color:'#EA580C',fontSize:14,flexShrink:0,marginLeft:10}}>S/{job.price}</span></button>))}
        </div>
      )}
      {reviews.length===0&&worked.length===0&&posted.length===0&&(
        <div style={{textAlign:'center',padding:'60px 0',color:'#9CA3AF'}}>
          <User size={48} color="#E5E7EB" style={{margin:'0 auto 12px'}}/>
          <p style={{fontWeight:600}}>Sin actividad todavía</p>
        </div>
      )}
    </div>
  );
}
function DisputeModal({job, profile, onClose, toast}){
  const[cat,setCat]=useState('');
  const[desc,setDesc]=useState('');
  const[sending,setSending]=useState(false);

  const accusedId = profile.id===job.poster_id ? job.worker_id : job.poster_id;
  const accusedName = profile.id===job.poster_id ? job.worker_name : job.poster_name;

  const submit=async()=>{
    if(!cat){toast('Selecciona una categoría','error');return}
    if(!desc.trim()){toast('Describe el problema','error');return}
    setSending(true);
    const{error}=await sb.from('disputes').insert({
      job_id:job.id,
      reporter_id:profile.id,
      reporter_name:profile.full_name,
      accused_id:accusedId,
      accused_name:accusedName,
      category:cat,
      description:desc.trim(),
      status:'pending',
    });
    setSending(false);
    if(error){toast('Error al enviar: '+error.message,'error');return}
    toast('⚠ Reporte enviado, lo revisaremos pronto');
    onClose();
  };

  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="card fade-up" style={{maxWidth:440,width:'100%',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#DC2626,#EF4444)',padding:'22px 28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{color:'#fff',fontWeight:800,fontSize:19}}>⚠ Reportar problema</h2>
            <button onClick={onClose} style={{color:'rgba(255,255,255,.8)',fontSize:22}}>×</button>
          </div>
          <p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginTop:4}}>Contra: {accusedName||'—'}</p>
        </div>
        <div style={{padding:28}}>
          <Field label="Categoría *">
            <select className="inp" value={cat} onChange={e=>setCat(e.target.value)}>
              <option value="">Seleccionar...</option>
              <option value="pago">💰 Problema de pago</option>
              <option value="comportamiento">😤 Mal comportamiento</option>
              <option value="calidad">⭐ Calidad del trabajo</option>
              <option value="cancelacion_injusta">🚫 Cancelación injusta</option>
              <option value="otro">✨ Otro</option>
            </select>
          </Field>
          <Field label="Descripción *">
            <textarea className="inp" placeholder="Describe qué pasó con detalle..." value={desc} onChange={e=>setDesc(e.target.value)} rows={4} style={{resize:'none'}}/>
          </Field>
          <div style={{display:'flex',gap:10}}>
            <button className="btn-ghost" style={{flex:1,justifyContent:'center',border:'1.5px solid #E5E7EB',borderRadius:14}} onClick={onClose}>Cancelar</button>
            <button className="btn-red" style={{flex:1,justifyContent:'center'}} onClick={submit} disabled={sending}>
              {sending?'⏳ Enviando...':'⚠ Enviar reporte'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ─── ROOT ─────────────────────────────────────────────────────────────────────
  function AdminPage({profile, back, toast}){
  const[pending,setPending]=useState([]);
  const[loading,setLoading]=useState(true);
  const[disputes,setDisputes]=useState([]);
  const[tab,setTab]=useState('verif');

  useEffect(()=>{
    sb.from('disputes').select('*').eq('status','pending').order('created_at',{ascending:false}).then(({data})=>setDisputes(data||[]));
    sb.from('profiles').select('*').eq('verification_status','reviewing').then(({data})=>{
      setPending(data||[]);setLoading(false);
    });
  },[]);

  const decide=async(uid, status)=>{
  const{error}=await sb.from('profiles').update({verification_status:status}).eq('id',uid);
  if(error){toast('Error: '+error.message,'error');return;}
  setPending(p=>p.filter(u=>u.id!==uid));
  toast(status==='verified'?'✅ Aprobado':'❌ Rechazado');
};

  if(profile?.id!==ADMIN_ID) return(
    <div style={{textAlign:'center',padding:80}}>
      <p style={{color:'#9CA3AF',fontWeight:600}}>Acceso denegado</p>
      <button className="btn-ghost" onClick={back}>← Volver</button>
    </div>
  );

return(
    <div className="fade-up" style={{maxWidth:800,margin:'0 auto'}}>
      <button className="btn-ghost" style={{marginBottom:20,paddingLeft:0}} onClick={back}>← Volver</button>
      <h1 style={{fontWeight:700,fontSize:28,marginBottom:4,letterSpacing:'-0.5px'}}>🛡 Panel de verificación</h1>
      <p style={{color:'#6B7280',fontSize:15,marginBottom:16}}>{pending.length} perfil{pending.length!==1?'es':''} en revisión</p>
      <div style={{display:'flex',background:'#F3F4F6',borderRadius:16,padding:4,width:'fit-content',marginBottom:24}}>
        {[['verif',`🛡 Verificaciones (${pending.length})`],['disputes',`⚠ Disputas (${disputes.length})`]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:'8px 20px',borderRadius:12,fontWeight:700,fontSize:13,background:tab===k?'#fff':'transparent',color:tab===k?'#EA580C':'#6B7280',boxShadow:tab===k?'0 1px 4px rgba(0,0,0,.08)':'none',border:'none',cursor:'pointer'}}>{l}</button>
        ))}
      </div>
      {tab==='verif'&&(loading?<Spin/>:pending.length===0?(
        <div style={{textAlign:'center',padding:60,color:'#9CA3AF'}}>
          <div style={{fontSize:48,marginBottom:12}}>✅</div>
          <p style={{fontWeight:600}}>No hay perfiles pendientes</p>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {pending.map(u=>(
            <div key={u.id} className="card" style={{padding:24}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                {u.photo_url?<img src={u.photo_url} alt="" style={{width:48,height:48,borderRadius:'50%',objectFit:'cover'}}/>:<Avatar name={u.full_name} size={48}/>}
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{u.full_name}</div>
                  <div style={{fontSize:13,color:'#6B7280'}}>{u.email} · {u.role}</div>
                  <div style={{fontSize:12,color:'#9CA3AF'}}>DNI: {u.dni}</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                {u.dni_photo_url?(
                  <div style={{borderRadius:12,overflow:'hidden',border:'1.5px solid #E5E7EB'}}>
                    <img src={u.dni_photo_url} alt="DNI" style={{width:'100%',height:140,objectFit:'cover'}}/>
                    <p style={{fontSize:11,color:'#6B7280',textAlign:'center',padding:6,background:'#F9FAFB'}}>📄 DNI</p>
                  </div>
                ):<div style={{borderRadius:12,border:'1.5px dashed #E5E7EB',height:160,display:'flex',alignItems:'center',justifyContent:'center',color:'#9CA3AF',fontSize:13}}>Sin DNI</div>}
                {u.selfie_photo_url?(
                  <div style={{borderRadius:12,overflow:'hidden',border:'1.5px solid #E5E7EB'}}>
                    <img src={u.selfie_photo_url} alt="Selfie" style={{width:'100%',height:140,objectFit:'cover'}}/>
                    <p style={{fontSize:11,color:'#6B7280',textAlign:'center',padding:6,background:'#F9FAFB'}}>🤳 Selfie</p>
                  </div>
                ):<div style={{borderRadius:12,border:'1.5px dashed #E5E7EB',height:160,display:'flex',alignItems:'center',justifyContent:'center',color:'#9CA3AF',fontSize:13}}>Sin selfie</div>}
              </div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn-green" style={{flex:1,justifyContent:'center'}} onClick={()=>decide(u.id,'verified')}>✅ Aprobar</button>
                <button className="btn-red" style={{flex:1,justifyContent:'center'}} onClick={()=>decide(u.id,'rejected')}>❌ Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      {tab==='disputes'&&(disputes.length===0?(
        <div style={{textAlign:'center',padding:60,color:'#9CA3AF'}}>
          <div style={{fontSize:48,marginBottom:12}}>✅</div>
          <p style={{fontWeight:600}}>No hay disputas pendientes</p>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {disputes.map(d=>(
            <div key={d.id} className="card" style={{padding:24}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div>
                  <div style={{fontWeight:700,fontSize:15,color:'#DC2626'}}>⚠ {d.category?.replace('_',' ')}</div>
                  <div style={{fontSize:13,color:'#6B7280',marginTop:2}}>Reportado por: <strong>{d.reporter_name}</strong> contra <strong>{d.accused_name}</strong></div>
                </div>
                <span style={{fontSize:11,color:'#9CA3AF'}}>{fmtDate(d.created_at)}</span>
              </div>
              <p style={{fontSize:13,color:'#374151',lineHeight:1.6,marginBottom:16,background:'#F9FAFB',borderRadius:12,padding:12}}>{d.description}</p>
              <div style={{display:'flex',gap:10}}>
                <button className="btn-green" style={{flex:1,justifyContent:'center'}} onClick={async()=>{await sb.from('disputes').update({status:'resolved'}).eq('id',d.id);setDisputes(p=>p.filter(x=>x.id!==d.id));toast('✅ Disputa resuelta');}}>✅ Resolver</button>
                <button className="btn-ghost" style={{flex:1,justifyContent:'center',border:'1.5px solid #E5E7EB'}} onClick={async()=>{await sb.from('disputes').update({status:'dismissed'}).eq('id',d.id);setDisputes(p=>p.filter(x=>x.id!==d.id));toast('🚫 Disputa desestimada');}}>🚫 Desestimar</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default function App(){
  const[authUser,setAuthUser]=useState(null);
  const[profile,setProfile]=useState(null);
  const[authLoading,setAuthLoading]=useState(true);
  const[page,setPage]=useState('home');
  const[history,setHistory]=useState([]);
  const[jid,setJid]=useState(null);
  const[pid,setPid]=useState(null);
  const[showVerif,setShowVerif]=useState(false);
  const[toastData,setToastData]=useState(null);

  const toast=useCallback((msg,type='success')=>{setToastData({msg,type});setTimeout(()=>setToastData(null),3000);},[]);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{if(session?.user){setAuthUser(session.user);fetchProfile(session.user.id)}else setAuthLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,session)=>{if(session?.user){setAuthUser(session.user);fetchProfile(session.user.id)}else{setAuthUser(null);setProfile(null);setAuthLoading(false)}});
    return()=>subscription.unsubscribe();
  },[]);

  const fetchProfile=async(uid)=>{const{data}=await sb.from('profiles').select('*').eq('id',uid).single();setProfile(data);setAuthLoading(false);};
  const signOut=async()=>{await sb.auth.signOut();setAuthUser(null);setProfile(null);setPage('home');setHistory([]);};

  const nav=(p,data={})=>{
    setHistory(h=>[...h,{page,jid,pid}]);
    setPage(p);
    if(data.jid)setJid(data.jid);
    if(data.pid!==undefined)setPid(data.pid);
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const back=()=>{
    if(history.length===0){setPage('home');return}
    const prev=history[history.length-1];
    setHistory(h=>h.slice(0,-1));
    setPage(prev.page);setJid(prev.jid);setPid(prev.pid);
    window.scrollTo({top:0,behavior:'smooth'});
  };
  if(authLoading)return<><style dangerouslySetInnerHTML={{__html:G}}/><Spin/></>;
  if(!authUser)return<><style dangerouslySetInnerHTML={{__html:G}}/><AuthScreen onAuth={u=>{setAuthUser(u);fetchProfile(u.id)}}/></>;

  return(
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      <div style={{minHeight:'100vh',background:'#F7F8FA',width:'100%'}}>
        <Navbar page={page} nav={nav} profile={profile} onSignOut={signOut}/>
        <main style={{padding:'28px 32px'}}>
{page==='home'&&<HomePage profile={profile} nav={nav} toast={toast} onStartVerification={()=>setShowVerif(true)}/>}          {page==='map'      &&<MapPage      nav={nav}/>}
          {page==='job'      &&<JobDetailPage profile={profile} jid={jid} nav={nav} back={back} toast={toast}/>}
          {page==='post-job' &&<PostJobPage  profile={profile} nav={nav} back={back} toast={toast}/>}
          {page==='my-jobs'  &&<MyJobsPage   profile={profile} nav={nav}/>}
          {page==='profile' && <ProfilePage currentProfile={profile} pid={pid} nav={nav} back={back} toast={toast}/>}
          {page==='admin'&&<AdminPage profile={profile} back={back} toast={toast}/>}
          {showVerif&&<VerificationModal profile={profile} onClose={()=>setShowVerif(false)} onDone={()=>{setShowVerif(false);fetchProfile(authUser.id);}} toast={toast}/>}
        </main>
      </div>
      <SocialProofNotif/>
      {toastData&&<Toast msg={toastData.msg} type={toastData.type}/>}
    </>
  );
}