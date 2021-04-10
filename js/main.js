//Current time and date
function showtime(){
  var today = new Date();
  $weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  $month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let unko=$('#datetime').html($month[today.getMonth() + 1 ]+ " "+today.getDate() + " " +$weekday[today.getDay()] + " " +today.getHours() + ":" + ('0'+today.getMinutes()).slice(-2) + ":" + ('0' +today.getSeconds()).slice(-2));
}
setInterval(showtime,1000);
//Finish Current time and date

//Choose country
const text = document.getElementById('text');
text.addEventListener('input',covid);
async function covid() {
    try{
//get value of country
    let country= text.value;
    console.log(country);
//get value of data case
    const dataCase = document.getElementById('dataCase').value;
//get value of data type
     const dataType = document.getElementById('dataType').value;
//Some 2 values(dataCase & dataType)
    let dataSum =dataType+dataCase;
    console.log("dataSum is:"+dataSum);
 //fetch data 
    let response= await fetch('https://disease.sh/v3/covid-19/countries/'+country+'?yesterday=true&twoDaysAgo=true&allowNull=true');
    console.log(response);
    if(!response.ok) {
            console.log('HTTP Error! status: ' + response.status);
        }
      let data = await response.json();
      console.log(data);
// //Define result value
let result='';
    if(dataSum == 'Totalrecovered'){
        result=data.recovered;
    }else if(dataSum == 'Todayrecovered'){
        result=data.todayRecovered;
    }else if(dataSum=='Totaldeaths'){
        result=data.deaths;
    }else if(dataSum=='Todaydeaths'){
        result=data.todayDeaths;
    }else{
        result="Something error";
    }
    
    console.log(result);


      document.getElementById('output').innerHTML=`
    <div class="container">
     
            <h1 class="country text-center mt-3 font-weight-bold">${data.country}</h1>
            <img class="country_img offset-lg-4 col-lg-4" src="${data.countryInfo.flag}">
      <h4 id="datetime" class="text-center m-5"></h4>
        <div class="row">
            <div class="col-md-4 text-center">
                <h2>Total cases<h2><h1 class="display-3 font-weight-bold">${data.cases}</h1>
            </div>
            <div class="col-md-4 text-center">
                <h2>Confirmed cases today<h2><h1 class="display-3 font-weight-bold">${data.todayCases}</h1>
            </div>
            <div class="col-md-4 text-center">
                <h2>${dataType} ${dataCase}</h2>
                <h1 class="display-3 font-weight-bold">${result}</h1>
            </div>
        </div>
    </div>
      `;console.log(result);
    }
    catch(error){
        console.log(error);
    }
}


