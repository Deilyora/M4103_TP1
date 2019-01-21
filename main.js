function ajaxRequest(){
  var xhr;
  var city=document.getElementById('textField').value;
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

  xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+",fr&APPID=ee07e2bf337034f905cde0bdedae3db8");
  xhr.send();
  console.log("http://api.openweathermap.org/data/2.5/weather?q="+city+",fr&APPID=ee07e2bf337034f905cde0bdedae3db8");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        doc=JSON.parse(xhr.responseText);
        document.getElementById('ville').innerHTML = city;
        console.log(doc);
        temp=Math.round(doc.main.temp-273);
        document.getElementById('temp').innerHTML = temp+" °C";
        return doc;
      }
    }
  }
}
