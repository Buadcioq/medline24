import { useState, useEffect } from 'react'

export default function Admin(){
  const [cities, setCities] = useState([])
  const [form, setForm] = useState({name:'',arrival:'',inCity:'',address:'',map:''})
  
  useEffect(()=>{ load() },[])
  
  function load(){
    fetch('/api/cities').then(r=>r.json()).then(setCities)
  }
  
  async function add(e){
    e.preventDefault()
    await fetch('/api/cities',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    setForm({name:'',arrival:'',inCity:'',address:'',map:''})
    load()
    alert('Город добавлен! Теперь он появится в меню на сайте.')
  }
  
  return (
    <div style={{maxWidth:900,margin:'40px auto',padding:'0 20px',fontFamily:'system-ui'}}>
      <h1>medline24 — Админка</h1>
      <p>Добавьте город — он автоматически появится в бургер-меню на всех страницах.</p>
      
      <form onSubmit={add} style={{background:'#fff',padding:24,borderRadius:16,boxShadow:'0 4px 12px rgba(0,0,0,.05)',margin:'20px 0',display:'grid',gap:12}}>
        <input placeholder="Название (Караганда)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input placeholder="по Караганде" value={form.arrival} onChange={e=>setForm({...form,arrival:e.target.value})} required/>
        <input placeholder="в Караганде" value={form.inCity} onChange={e=>setForm({...form,inCity:e.target.value})} required/>
        <input placeholder="Адрес" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} required/>
        <input placeholder="долгота,широта" value={form.map} onChange={e=>setForm({...form,map:e.target.value})} required/>
        <button style={{background:'#1a73e8',color:'#fff',padding:'12px',border:'none',borderRadius:8,fontWeight:600}}>Добавить город</button>
      </form>
      
      <h2>Текущие города</h2>
      <ul>
        {cities.map(c=> <li key={c.id}>{c.name} — /{c.id}</li>)}
      </ul>
      
      <p style={{marginTop:30,color:'#64748b'}}>WhatsApp: +7 747 447 2693 — встроен везде. Для продакшена подключите базу данных (Vercel KV).</p>
    </div>
  )
}
