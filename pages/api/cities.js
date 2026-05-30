import fs from 'fs'
import path from 'path'

let citiesCache = null
const dataPath = path.join(process.cwd(), 'data', 'cities.json')

function load(){
  if(!citiesCache){
    citiesCache = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  }
  return citiesCache
}

export default function handler(req, res){
  if(req.method==='GET'){
    res.status(200).json(load())
  } else if(req.method==='POST'){
    const city = req.body
    const cities = load()
    city.id = city.name.toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,'')
    cities.push(city)
    citiesCache = cities
    // On Vercel filesystem is read-only, so we store in memory only
    // For persistence, connect to database
    res.status(200).json({ok:true, city})
  } else {
    res.status(405).end()
  }
}
