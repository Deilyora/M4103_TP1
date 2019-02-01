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
                temp = Math.round((doc.main.temp-273) * 10) / 10;
                document.getElementById('temp').innerHTML = temp+" °C <br>";

                document.getElementById('tmps').src= "http://openweathermap.org/img/w/"+doc.weather[0].icon+".png";
                document.getElementById('dehors').innerHTML = doc.weather[0].description;

                document.getElementById('pressure').innerHTML = "Pression : " + doc.main.pressure+" hPa <br>";

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

                        document.getElementById('visibility').innerHTML = "Nébulosité : " + doc.clouds.all+" % <br>";
                        document.getElementById('visibility').style.display == 'block';


                        var dateRise = new Date(doc.sys.sunrise*1000);
                        var hoursR = dateRise.getHours();
                        var minutesR = "0" + dateRise.getMinutes();

                        var tempsRise = hoursR + ':' + minutesR.substr(-2);

                        document.getElementById('sunrise').innerHTML = "Lever du soleil : " + tempsRise +" <br>";
                        document.getElementById('sunrise').style.display == 'block';

                        var dateSet = new Date(doc.sys.sunset*1000);
                        var hoursS = dateSet.getHours();
                        var minutesS = "0" + dateSet.getMinutes();

                        var tempsSet = hoursS + ':' + minutesS.substr(-2);

                        document.getElementById('sunset').innerHTML = "Coucher du soleil : " + tempsSet +" <br>";
                        document.getElementById('sunset').style.display == 'block';

                        document.getElementById('coords').innerHTML = "Coordonnées : <a href='https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat="+doc.coord.lat+"&lon="+doc.coord.lon+"&zoom=13' target='_blank'>["+doc.coord.lat+", "+doc.coord.lon+"] </a>  <br>";
                        document.getElementById('coords').style.display == 'block';
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

                        document.getElementById('visibility').innerHTML = null;
                        document.getElementById('visibility').style.display == 'none';

                        document.getElementById('sunrise').innerHTML = null;
                        document.getElementById('sunrise').style.display == 'none';

                        document.getElementById('sunset').innerHTML = null;
                        document.getElementById('sunset').style.display == 'none';

                        document.getElementById('coords').innerHTML = null;
                        document.getElementById('coords').style.display == 'none';
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

                    document.getElementById('visibility').innerHTML = null;
                    document.getElementById('visibility').style.display == 'none';

                    document.getElementById('sunrise').innerHTML = null;
                    document.getElementById('sunrise').style.display == 'none';

                    document.getElementById('sunset').innerHTML = null;
                    document.getElementById('sunset').style.display == 'none';

                    document.getElementById('coords').innerHTML = null;
                    document.getElementById('coords').style.display == 'none';
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
