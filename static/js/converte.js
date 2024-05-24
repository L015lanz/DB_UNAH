
// declaracion de variables
const c1= document.getElementById("currency-one")
const c2 = document.getElementById("currency-two")
const amount1 = document.getElementById("quantity-one")
const amount2 = document.getElementById("quantity-two")
const swap = document.getElementById("conversor-button")
const theRate = document.getElementById("result")
const title = document.getElementById("nombre")


function getHref() {
    botonToken = document.getElementById('boton-token');

    resultado1 = amount1.value;
    resultado2 = amount2.value/resultado1;

    //botonToken.href = `/analizador?input_text=${resultado1}*${resultado2}`;
    window.location.href = `/conversor/analizador?input_text=${resultado1}*${resultado2}`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setTitle(){
    title.innerHTML="Grafico valor de la divisa " + c2.value;
}



function calculate(){
    const currency1= c1.value;
    const currency2= c2.value;
    fetch(`https://v6.exchangerate-api.com/v6/73a43881665719d06052d8f8/latest/${currency1}`)
    .then((res) => res.json())
    .then((data)=>   {
        const rate=data.conversion_rates[currency2]*amount1.value;
      
        amount2.value=rate;
        theRate.innerHTML=`${amount1.value} ${currency1}=${rate} ${currency2}`
    } )
}



   
function calculardolares() {
        fetch('https://v6.exchangerate-api.com/v6/73a43881665719d06052d8f8/latest/USD')
        .then((res) => res.json())
        .then((data) => {
    

    // Obtener el token CSRF de la cookie
    const csrftoken = getCookie('csrftoken');

    // Opciones para la solicitud fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data.conversion_rates)
    };

    const url = `${window.location.origin}/conversor/divisa`;
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


 
 
 
        })
}
    

//setInterval(calculardolares, 10000);






c1.addEventListener("change", calculate);
amount1.addEventListener("input", calculate);
c2.addEventListener("change", calculate);
c2.addEventListener("change", setTitle);
c2.addEventListener("change", calculardolares);


amount2.addEventListener("input", calculate);
swap.addEventListener("click",() => {
    const via = c1.value;
    c1.value=c2.value;
    c2.value=via;
    calculate()
});

const getOptionChart = async()=>{
    try{
        const url = `${window.location.origin}/conversor/chart/divisas/`;

        const response=await fetch(`${url}${c2.value}`)
        return await response.json()
    }catch(ex){
        alert(ex);
    }
}
 
const initChart=async()=>{
    const myChart = echarts.init(document.getElementById("chart"))


  

    myChart.setOption(await getOptionChart());
    myChart.resize()
}

window.addEventListener("load", async () =>{
    await initChart();
    setInterval(initChart,5000);
})
