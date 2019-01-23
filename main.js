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
                document.getElementById('temp').innerHTML = temp+" °C";

                if(more == true) {
                    if(moreInfos == false) {
                        moreInfos = !moreInfos;
                        document.getElementById('more').value = "Moins d'infos";
                        //document.getElementById('result').parentNode.removeChild(document.getElementById('result'));
                        document.getElementById('humidity').innerHTML = "Humidité : " + doc.main.humidity+" mm";
                        document.getElementById('humidity').style.display == 'block';

                        document.getElementById('visibility').innerHTML = "Visibilité : " + doc.visibility+" m";
                        document.getElementById('visibility').style.display == 'block';

                        document.getElementById('pressure').innerHTML = "Pression : " + doc.main.pressure+" hPa";
                        document.getElementById('pressure').style.display == 'block';
                    }
                    else {
                        moreInfos = !moreInfos;
                        document.getElementById('more').value = "Plus d'infos";
                        document.getElementById('humidity').innerHTML = null;
                        document.getElementById('humidity').style.display == 'none';

                        document.getElementById('visibility').innerHTML = null;
                        document.getElementById('visibility').style.display == 'none';

                        document.getElementById('pressure').innerHTML = null;
                        document.getElementById('pressure').style.display == 'none';
                    }
                }
                else {
                    console.log("Oui");
                    document.getElementById('humidity').style.display == 'none';
                    document.getElementById('visibility').style.display == 'none';
                    document.getElementById('pressure').style.display == 'none';
                }

                document.getElementById('tmps').src= "http://openweathermap.org/img/w/"+doc.weather[0].icon+".png"
                return doc;
            }
            else{
                document.getElementById('box').style.display = 'none';
                document.getElementById('error').innerHTML = 'Erreur, nom de ville incorrect.'
            }
        }
    }
}
