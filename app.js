var mymap;

const form=document.querySelector('.search__section__form');
const input=document.querySelector('.search__section__form__input');
const ip=document.querySelector('.ip__address');
const locat=document.querySelector('.location');
const timezone=document.querySelector('.timezone');
const isp=document.querySelector('.isp');
const details=document.querySelector('.ip-address-tracking__details');
const error=document.querySelector('.search__section__form__error');
form.addEventListener('submit',getIP);

const state={
    ipAddress:'',
    location:'',
    timeZone:'',
    isp:''
};

function getIP(e){
    e.preventDefault();
    let ip;
   // console.log(input.value);
    if(input.value){
        ip=input.value;
        input.value='';
        getIPDetails(ip);
    }
}

async function getIPDetails(ip){
    //console.log(ip);
    try{
        let url=`https://geo.ipify.org/api/v1?apiKey=at_MO8TTBx3zQZeBVFHPK5n5p1BWBVIW&ipAddress=${ip}`;
        //console.log(url);
        const res= await fetch(`https://geo.ipify.org/api/v1?apiKey=at_MO8TTBx3zQZeBVFHPK5n5p1BWBVIW&ipAddress=${ip}`);
        const data=await res.json();
        console.log(data);
        if(data.code===422)
            throw new Error(`${data.messages}`);
        state.ipAddress=data.ip;
        state.location=`${data.location.city},${data.location.country},${data.location.postalCode}`
        state.timeZone=data.location.timezone;
        state.isp=data.isp;
        ip.textContent=state.ipAddress;
        locat.textContent=state.location;
        timezone.textContent=state.timeZone;
        isp.textContent=state.isp;
        details.classList.add('ip-address-tracking__details--show');
        mymap = L.map('mapid').setView([data.location.lat, data.location.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);
        //console.log(state);
    }
    catch(err){
        error.textContent=err;
        console.error(`${err}`);

    }
}
