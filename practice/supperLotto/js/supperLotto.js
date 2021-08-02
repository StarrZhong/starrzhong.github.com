


const superLottoRun = new Vue({
  el: '#superLottoRun',
  data:{
    isLoading: false,
    count: '',
    results:[],
    loadResult:{
      area_a: ['...','...','...','...','...','...'],
      area_b: ['...']
    }
  },
  methods:{
    startSupperLotto(){
      
      if(!isNaN(parseInt(this.count))){
        this.isLoading = true
        const countBoard = {
          count: parseInt(this.count),
          numbers:{
            area_a: {},
            area_b: {}
          },
          final:{
            area_a: [],
            area_b: []
          },
          getNumbersCount:{
            area_a: 6,
            area_b: 1,
          }
        }
        let pmsAry = []
        for(let i = 0 ; i<countBoard.count ; i++){
          let myPms = new Promise((resolve,reject)=>{
            setTimeout(() => {
              const getNumbers = this.runSupperLotto();
              Object.keys(countBoard.numbers).forEach((area)=>{
                getNumbers[area].forEach((number)=>{
                  if(countBoard.numbers[area][number] === undefined || countBoard.numbers[area][number] === null){
                    countBoard.numbers[area][number] = {
                      percent : '',
                      count : 1
                    }
                  } 
                  countBoard.numbers[area][number].count++
                })
                Object.keys(countBoard.numbers[area]).forEach((number)=>{
                  countBoard.numbers[area][number].percent = Math.round(countBoard.numbers[area][number].count / countBoard.count * 10000) / 100.00
                })
              })
              resolve("done")
            }, i*0.2);
          })
          pmsAry.push(myPms)
        }
        Promise.all(pmsAry).then(() => {
          Object.keys(countBoard.numbers).forEach((area)=>{
            Object.keys(countBoard.numbers[area]).forEach((number)=>{
              countBoard.final[area].push({
                number: parseInt(number),
                count: countBoard.numbers[area][number].count,
                percent: countBoard.numbers[area][number].percent,
              })
            })
            countBoard.final[area].sort((a,b)=>b.count - a.count )
            countBoard.final[area] = countBoard.final[area].slice(0,countBoard.getNumbersCount[area])
            countBoard.final[area].sort((a,b)=>a.number - b.number )
          })
          this.sendResult(countBoard)
        });
      } else{
        alert("請輸入數字")
      }
    },
    runSupperLotto(){
      let ticket = {
        ranges:{
          area_a: 38,
          area_b: 8,
        },
        length:{
          area_a: 6,
          area_b: 1,
        },
        numbers: {
          area_a: [],
          area_b: []
        }
      }
      Object.keys(ticket.numbers).forEach((area)=>{
        for(let i=0; i < ticket.length[area]; i++){
          let number = Math.ceil(Math.random()*ticket.ranges[area])
          if(ticket.numbers[area].indexOf(number) === -1){
            ticket.numbers[area].push(number)
          } else{
            i--
          }
        }
        ticket.numbers[area].sort((a,b) => a - b)
      })
      return ticket.numbers
    },
    sendResult(result){
      this.isLoading = false
      let tempResult = {}
      Object.keys(result.final).forEach((area)=>{
        tempResult[area] = [...result.final[area]]
      })
      this.results.push(tempResult)
    }
  }
})