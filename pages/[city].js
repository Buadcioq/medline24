import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function CityPage(){
  const router = useRouter()
  const { city: cityId } = router.query
  const [city, setCity] = useState(null)
  
  useEffect(()=>{
    if(!cityId) return
    fetch('/api/cities').then(r=>r.json()).then(cities=>{
      setCity(cities.find(c=>c.id===cityId))
    })
  },[cityId])
  
  if(!city) return <div>Загрузка...</div>
  
  return (
    <>
      <Header/>
      <div style={{background:'#f8fafc',padding:'10px 0',borderBottom:'1px solid #e2e8f0',fontSize:'.9rem'}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between'}}>
          <div>📞 Диспетчер 24/7</div>
          <div>⭐ 1000+ отзывов</div>
          <a href="tel:87003263535" className="btn" style={{padding:'6px 14px',fontSize:'.85rem'}}>8 (700) 326-35-35</a>
        </div>
      </div>
      
      <section style={{padding:'56px 0'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:48,alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',gap:8,background:'#fff1f0',color:'#d93025',padding:'8px 16px',borderRadius:999,fontWeight:700,marginBottom:18}}>⚡ Приезд за 30 минут {city.arrival}</div>
            <h1 style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:800,marginBottom:16}}>Врач на дом круглосуточно</h1>
            <p style={{fontSize:'1.15rem',color:'#475569',marginBottom:24}}>Приезжаем ночью и в выходные {city.inCity}. Кардиолог, невролог, терапевт, педиатр, хирург — с оборудованием.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',margin:'24px 0'}}>
              <a href="tel:87003263535" className="btn">🚑 Вызвать врача</a>
              <a href={`https://wa.me/77474472693?text=Здравствуйте, нужен врач на дом ${encodeURIComponent(city.inCity)}`} className="btn" style={{background:'transparent',color:'#1a73e8',border:'2px solid #1a73e8'}}>WhatsApp</a>
            </div>
            <div style={{fontSize:'1.8rem',fontWeight:800,color:'#1a73e8'}}>8 (700) 326-35-35</div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1200" style={{width:'100%',height:480,objectFit:'cover',borderRadius:32}} alt="Врач"/>
          </div>
        </div>
      </section>
      
      <section id="services" style={{padding:'72px 0',background:'#f8fafc'}}>
        <div className="container">
          <h2 style={{textAlign:'center',fontSize:'2.2rem',fontWeight:800,marginBottom:40}}>Когда вызвать врача {city.inCity}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
            {['Высокая температура','Сильная боль','Сердце и давление','Травмы','Неврология'].map((t,i)=>(
              <div key={i} style={{background:'#fff',padding:26,borderRadius:24,border:'1px solid #e2e8f0'}}>
                <div style={{fontSize:'2.8rem',fontWeight:800,color:'#1a73e8',opacity:.2}}>{String(i+1).padStart(2,'0')}</div>
                <h3>{t}</h3>
                <p style={{color:'#475569',fontSize:'.95rem'}}>Приедем {city.arrival} за 30 минут</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer style={{background:'#0f172a',color:'#cbd5e1',padding:'56px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <div style={{fontSize:'2rem',fontWeight:800,color:'#fff'}}>8 (700) 326-35-35</div>
          <p>Приедем ночью {city.arrival}</p>
          <a href={`https://wa.me/77474472693?text=Здравствуйте`} className="btn" style={{background:'#25D366',marginTop:16}}>WhatsApp</a>
          <div style={{marginTop:40,opacity:.7}}>© medline24, 2026 · {city.address}</div>
        </div>
      </footer>
      
      <a href={`https://wa.me/77474472693?text=Здравствуйте`} style={{position:'fixed',bottom:20,right:20,background:'#25D366',color:'#fff',padding:'14px 20px',borderRadius:999,fontWeight:600,boxShadow:'0 8px 24px rgba(0,0,0,.25)',zIndex:90}}>WhatsApp</a>
    </>
  )
}
