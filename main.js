var moreInfos = true;


function ajaxRequest(more){
    document.getElementById('error').innerHTML = '';
    var xhr;

    if(window.XMLHttpRequest){
        xhr= new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        alert("Navigateur non supporté");
        return;
    }

    var city = document.getElementById('textField').value;
    if(more == true) {
        city = document.getElementById('ville').innerHTML + document.getElementById('pays').innerHTML;
    }

    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=ee07e2bf337034f905cde0bdedae3db8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                doc=JSON.parse(xhr.responseText);
                console.log(doc);

                //Vérifier si la grille est crée
                document.getElementById('errorContainer').style.display = 'none';

                if(document.getElementById('box').style.display == 'none') {
                    document.getElementById('box').style.display = 'block';
                }

                document.getElementById('ville').innerHTML = doc.name;
                document.getElementById('pays').innerHTML =  ", "+ doc.sys.country;
                temp=Math.round(doc.main.temp-273);
                document.getElementById('temp').innerHTML = temp+" °C <br>";

                document.getElementById('tmps').src= "http://openweathermap.org/img/w/"+doc.weather[0].icon+".png";

                var dehors;
                switch(true) {
                    case (doc.weather[0].id == 200):
                        dehors = "Orage avec légère pluie";
                        break;
                    case (doc.weather[0].id == 201):
                        dehors = "Orage avec pluie";
                        break;
                    case (doc.weather[0].id == 202):
                        dehors = "Orage avec forte pluie";
                        break;
                    case (doc.weather[0].id == 210):
                        dehors = "Orage léger";
                        break;
                    case (doc.weather[0].id == 211):
                        dehors = "Orage";
                        break;
                    case (doc.weather[0].id == 212):
                        dehors = "Orage fort";
                        break;
                    case (doc.weather[0].id == 221):
                        dehors = "Orage déchainé";
                        break;
                    default:
                        dehors = doc.weather[0].description;
                        break;
                    /*
                    230	thunderstorm with light drizzle	 11d
                    231	thunderstorm with drizzle	 11d
                    232	thunderstorm with heavy drizzle	 11d
                    300	light intensity drizzle	 09d
                    301	drizzle	 09d
                    302	heavy intensity drizzle	 09d
                    310	light intensity drizzle rain	 09d
                    311	drizzle rain	 09d
                    312	heavy intensity drizzle rain	 09d
                    313	shower rain and drizzle	 09d
                    314	heavy shower rain and drizzle	 09d
                    321	shower drizzle	 09d
                    500	light rain	 10d
                    501	moderate rain	 10d
                    502	heavy intensity rain	 10d
                    503	very heavy rain	 10d
                    504	extreme rain	 10d
                    511	freezing rain	 13d
                    520	light intensity shower rain	 09d
                    521	shower rain	 09d
                    522	heavy intensity shower rain	 09d
                    531	ragged shower rain	 09d
                    600	light snow	 13d
                    601	snow	 13d
                    602	heavy snow	 13d
                    611	sleet	 13d
                    612	shower sleet	 13d
                    615	light rain and snow	 13d
                    616	rain and snow	 13d
                    620	light shower snow	 13d
                    621	shower snow	 13d
                    622	heavy shower snow	 13d
                    701	mist	 50d
                    711	smoke	 50d
                    721	haze	 50d
                    731	sand, dust whirls	 50d
                    741	fog	 50d
                    751	sand	 50d
                    761	dust	 50d
                    762	volcanic ash	 50d
                    771	squalls	 50d
                    781	tornado	 50d
                    800	clear sky	 01d  01n
                    801	few clouds	 02d  02n
                    802	scattered clouds	 03d  03n
                    803	broken clouds	 04d  04n
                    804	overcast clouds
                    */
                }

                document.getElementById('dehors').innerHTML = dehors;

                //Plus d'infos
                if(more == true) {
                    if(moreInfos == false) {
                        moreInfos = !moreInfos;
                        document.getElementById('more').value = "Moins d'infos";

                        var sens;
                        switch(true) {
                            case (doc.wind.deg >= 22.5 && doc.wind.deg <= 67.5):
                                sens = "N-E";
                                break;
                            case (doc.wind.deg >= 67.5 && doc.wind.deg <= 112.5):
                                sens = "E";
                                break;
                            case (doc.wind.deg >= 112.5 && doc.wind.deg <= 157.5):
                                sens = "S-E";
                                break;
                            case (doc.wind.deg >= 157.5 && doc.wind.deg <= 202.5):
                                sens = "S";
                                break;
                            case (doc.wind.deg >= 202.5 && doc.wind.deg <= 247.5):
                                sens = "S-O";
                                break;
                            case (doc.wind.deg >= 247.5 && doc.wind.deg <= 292.5):
                                sens = "O";
                                break;
                            case (doc.wind.deg >= 292.5 && doc.wind.deg <= 337):
                                sens = "N-O";
                                break;
                            default:
                                sens = 'N';
                                break;
                        }

                        document.getElementById('wind').innerHTML = "Vent : " + doc.wind.speed+" m/s "+sens +" ("+doc.wind.deg+"°) <br>";
                        document.getElementById('wind').style.display == 'block';

                        document.getElementById('humidity').innerHTML = "Humidité : " + doc.main.humidity+" mm <br>";
                        document.getElementById('humidity').style.display == 'block';

                        document.getElementById('visibility').innerHTML = "Visibilité : " + doc.visibility+" m <br>";
                        document.getElementById('visibility').style.display == 'block';

                        document.getElementById('pressure').innerHTML = "Pression : " + doc.main.pressure+" hPa <br>";
                        document.getElementById('pressure').style.display == 'block';

                        $('collapseInfos').collapse('show');
                    }
                    else {
                        moreInfos = !moreInfos;
                        document.getElementById('more').value = "Plus d'infos";

                        document.getElementById('wind').innerHTML = null;
                        document.getElementById('wind').style.display == 'none';

                        document.getElementById('humidity').innerHTML = null;
                        document.getElementById('humidity').style.display == 'none';

                        document.getElementById('visibility').innerHTML = null;
                        document.getElementById('visibility').style.display == 'none';

                        document.getElementById('pressure').innerHTML = null;
                        document.getElementById('pressure').style.display == 'none';


                        $('collapseInfos').collapse('hide');
                    }
                }
                else {
                    moreInfos = !moreInfos;
                    document.getElementById('more').value = "Plus d'infos";

                    document.getElementById('wind').innerHTML = null;
                    document.getElementById('wind').style.display == 'none';

                    document.getElementById('humidity').innerHTML = null;
                    document.getElementById('humidity').style.display == 'none';

                    document.getElementById('visibility').innerHTML = null;
                    document.getElementById('visibility').style.display == 'none';

                    document.getElementById('pressure').innerHTML = null;
                    document.getElementById('pressure').style.display == 'none';


                    $('collapseInfos').collapse('hide');
                }

                return doc;
            }
            else{
                document.getElementById('box').style.display = 'none';

                document.getElementById('errorContainer').style.display = 'block';
                document.getElementById('error').innerHTML = 'Erreur, nom de ville incorrect.'
            }
        }
    }
}
