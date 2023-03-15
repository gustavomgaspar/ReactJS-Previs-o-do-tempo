import {useState} from 'react';
function Search (){
    const [cidade,setCidade] = useState("");
    function SearchInput(e){
        e.preventDefault();
        let currentValue =  document.querySelector('input[name=SearchInput]').value;
        

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=21ce3ffdd48f1fad264e4c82997ba0db&units=metric`;
        fetch(url)
        .then(response=> response.json())
        .then(data=> {
            const {main, name, sys, weather} = data ; 
            if(sys != undefined){

            if(weather != undefined){
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                setCidade(`
                <div class="result">
                <img src="${icon}" />
                <p>${weather[0]['description']}</p>
                <p>${main.temp}°C</p>
                </div>
                `);
            }}else{
                setCidade("");
            }});
        
    
    }
    return(
       
        <div className='searchWraper'>
            <div className="search">
            <form onSubmit={(e)=>SearchInput(e)}>
            <input placeholder="  Digite a cidade" type="text" name="SearchInput"/>    
            <input type="submit" value="☁️Pesquisar"/>
            </form>
            </div>
        {
            (cidade!= "")?
            <div dangerouslySetInnerHTML={{__html: cidade}}/>:
            <div></div>
        }
        </div>
        

    )
}
export default Search;