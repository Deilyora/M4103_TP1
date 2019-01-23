var moreInfos = false;


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
        city = document.getElementById('ville').innerHTML;
    }

    /*
    <div onClick="ajaxRequest(true)" id='result'>
    <h2>Météo du jour</h2>
    <p>Nom de la ville : <span id='ville'></span><span id='pays'></span><br>
    Temps :   <img src="" id="tmps" width="20" height="20"><br>
    Température : <span id='temp'></span><br>
    <span id='pressure'></span><br>
    <span id='humidity'></span><br>
    <span id='visibility'></span><br>
    </p>
    <input type="button" id="more" value="Plus d'infos">
    </div>
    */

    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=ee07e2bf337034f905cde0bdedae3db8");
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                doc=JSON.parse(xhr.responseText);
                console.log(doc);

                //Vérifier si la grille est crée
                if(document.getElementById('box').style.display == 'none') {
                    document.getElementById('box').style.display = 'block';
                }

                document.getElementById('ville').innerHTML = doc.name;
                document.getElementById('pays').innerHTML =  ", "+ doc.sys.country;

                temp=Math.round(doc.main.temp-273);
                document.getElementById('temp').innerHTML = temp+" °C <br>";

                if(more == true) {
                    if(moreInfos == false) {
                        moreInfos = !moreInfos;
                        document.getElementById('more').value = "Moins d'infos";

                        var sens;
                        console.log(doc.wind.deg);
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
                }

                document.getElementById('tmps').src= "http://openweathermap.org/img/w/"+doc.weather[0].icon+".png"
                return doc;
            }
            else{
                document.getElementById('box').style.display = 'none';
                document.getElementById('error').innerHTML = 'Erreur, nom de ville incorrect. <br><br>'
            }
        }
    }
}
