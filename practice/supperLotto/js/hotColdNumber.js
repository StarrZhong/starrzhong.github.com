let numbersInfo = {
  totalCount:0,
  area_a: [],
  area_b: []
}
let levels = {
  area_a: 0,
  area_b: 0,
}

let allTr = Array.apply(null,document.querySelectorAll(".tableD tbody tr:not(.thA)"));
allTr.forEach((item,index)=>{
  let thisTr = Array.apply(null,item.children)
  thisTr.forEach((sIem,sIndex)=>{
      if(sIndex%2!==0) return
      
      let area = 'area_a'
        
      let thisNumber = (thisTr[sIndex].childNodes[0].childNodes.length) ? parseInt(thisTr[sIndex].childNodes[0].innerText) : parseInt(thisTr[sIndex].innerText)
      let thisCount = parseInt(thisTr[sIndex+1].innerText)
      let numberData = {
          number: thisNumber,
          count:thisCount,
          level: 0

      }
      
      if(sIndex / 6 >= 1){
          area = 'area_b'
          numbersInfo.totalCount += numberData.count
      }
      levels[area]+=thisCount
      numberData.level = levels[area]
      numbersInfo[area].push(numberData)
      
  })
})
numbersInfo.area_a.sort((a,b)=> a.level - b.level)
numbersInfo.area_b.sort((a,b)=> a.level - b.level)

numbersInfo.area_a.forEach((item,index)=>{

})
console.log(numbersInfo)

let statistics = {
  area_a:[],
  area_b:[]
}
let result = {
  area_a:[],
  area_b:[]
}
let countMax = {
  area_a:6,
  area_b:1
}
let pms = []
Object.keys(statistics).forEach((area)=>{
  numbersInfo[area].forEach((item,index)=>{
      for(let i = 0; i<item.count; i++){
          statistics[area].push(item.number)
      }    
  })
  statistics[area].forEach((item,index)=>{
      let tempItem = statistics[area][index]
      let random = Math.ceil(Math.random()*statistics[area].length)
      statistics[area][index] = statistics[area][random]
      statistics[area][random] = tempItem
      
  })
 
})

Object.keys(countMax).forEach((area)=>{
  for(let i = 0;i < countMax[area]; i++){
    pms.push(
      new Promise((resolve,reject)=>{
        let timer = null
        timer = setInterval(() => {
          
          let random = Math.ceil(Math.random()*statistics[area].length);
          
          if(result[area].indexOf(statistics[area][random]) === -1 ) {
            if(result[area].length < countMax[area]){
                result[area].push(statistics[area][random])
                clearInterval(timer)
                resolve(true)
              }
          }
        }, 300* i);
      })
    )
  }
})


console.log(pms)
Promise.all(pms).then((value)=>{
  
  console.log(result)
})




