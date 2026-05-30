import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header(){
  const [cities, setCities] = useState([])
  const [open, setOpen] = useState(false)
  
  useEffect(()=>{
    fetch('/api/cities').then(r=>r.json()).then(setCities)
  },[])
  
  return (
    <header style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,.9)',backdropFilter:'blur(10px)',borderBottom:'1px solid #e2e8f0'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,fontWeight:800,fontSize:'1.4rem'}}><span style={{color:'#1a73e8'}}>♥</span> medline24</Link>
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <nav style={{display: open ? 'flex':'none',gap:20}} className="nav-links">
            {cities.map(c=> <Link key={c.id} href={`/${c.id}`} style={{color:'#475569'}}>{c.name}</Link>)}
            <Link href="/#services">Услуги</Link>
            <Link href="/#doctors">Врачи</Link>
          </nav>
          <button onClick={()=>setOpen(!open)} style={{display:'none'}} className="hamburger">☰</button>
        </div>
      </div>
      <style jsx>{`@media(max-width:768px){.nav-links{position:fixed;top:60px;left:0;right:0;background:#fff;flex-direction:column;padding:20px;display:${open?'flex':'none'}!important} .hamburger{display:block!important;background:none;border:none;font-size:1.5rem}}`}</style>
    </header>
  )
}
