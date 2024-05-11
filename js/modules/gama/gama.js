const port = 5003
const endpoint = `http://localhost:${port}/gama`

export const getGamaByName=async(name)=>{
    let res =await fetch(`${endpoint}?gama=${name}`)
    let gama=await res.json()
    return gama
}