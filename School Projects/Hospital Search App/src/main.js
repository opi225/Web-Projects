import * as map from "./map.js";
import * as classes from "./classes.js";

let hospitals = [];
let status = "";

//adds all of the hospitals in the list to the map
function mapAddition(){
    for(let i = 0; i < hospitals.length; i++)
    {
        let newCoordinates = [hospitals[i].long, hospitals[i].lat];
        map.addMarker(newCoordinates, hospitals[i].name, hospitals[i].add, hospitals[i].web, "hospital")
    }
}

// sets up the search and view reset buttons
function setupUI(){

    sBtn.onclick = () => {
        app.search();
    };

    rBtn.onclick = () => {
        map.setZoomLevel(4);
        map.setPitchAndBearing(0,0);
        map.flyTo();
        map.removeAllMarkers();

        document.querySelector('input[type=text]').value = "";
        document.querySelector('#all').checked = true;
        document.querySelector('input[type=checkbox]').checked = false;
        document.querySelector('#loading').innerHTML = ""

        window.localStorage.clear();
    };
}


function init(){
    let statusPicker = document.querySelectorAll("input[type=radio][name=status]");

    document.querySelector('input[type=text]').value = window.localStorage.getItem('search');

    for(let r of statusPicker){
        if(r.value == window.localStorage.getItem('radio')){
            r.checked = true;
            status = window.localStorage.getItem('radio');
        }
    }

    document.querySelector('input[type=checkbox]').checked = window.localStorage.getItem('checkbox');

    map.initMap();
    setupUI();

    document.querySelector('input[type=text]').onchange = function(e){
        window.localStorage.setItem('search', document.querySelector('input[type=text]').value);
    }

    for (let r of statusPicker){
        r.onchange = function(e){
            status = e.target.value;
            window.localStorage.setItem('radio', r.value);
        }
    }

    document.querySelector('input[type=checkbox]').onchange = function(e){
        window.localStorage.setItem('checkbox', document.querySelector('input[type=checkbox]').checked);
    }
}

//vue
const app = new Vue({
	el: '#controls',
	methods:{
        //search method
	    search(){
            //all previous markers are removed from the map to start and hospitals list is cleared
            map.removeAllMarkers();
            hospitals = [];
            loading.innerHTML = "Loading..."

            //the start of the hospital api query is put into the url variable
            let url="https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Hospitals_1/FeatureServer/0/query?where=";


            //the variables for the state and helipad are set to whatever the controls are set to
            //also, the localStorage is set for all 3 controls
            let state = document.querySelector('input[type=text]').value;

            let heli =  "";
            if(document.querySelector('input[type=checkbox]').checked == true){
                heli = document.querySelector('input[type=checkbox]').value;
            }

            //if there are no search criteria, adds information to the url to return all hospitals in the api
            if(state == "" && status == "" && heli == "")
            {
                url+="1%3D1";
            }
            //if there are serach criteria, the information is added to the url
            else{
                if(state != ""){
                    let stateSearch = `STATE%20%3D%20'${state}'`;
                    url += stateSearch;
                }
                if(status != ""){
                    if(state != ""){
                        url += "%20AND%20";
                    }
                    let statusSearch = `STATUS%20%3D%20'${status}'`;
                    url += statusSearch;
                }
                if(heli != ""){
                    if(state != "" || status != ""){
                        url += "%20AND%20";
                    }
                    let heliSearch = "HELIPAD%20%3D%20'Y'";
                    url += heliSearch;
                }
            }

            //this part of the url decides which information is returned about each hospital
            url+="&outFields=NAME,ADDRESS,LATITUDE,LONGITUDE,WEBSITE,STATE,STATUS,HELIPAD&outSR=4326&f=json";

		    //fetch is called
		    fetch(url)
		    .then(response => {
			    if(!response.ok){
				    throw Error(`ERROR: ${response.statusText}`);
			    }
			    return response.json();
		    })
		    .then(json => {	
                //the list of hospitals is returned and added to the list
                for(let hospital of json["features"]){
                    hospitals.push(new classes.Hospital(hospital.attributes.NAME, hospital.attributes.LATITUDE, hospital.attributes.LONGITUDE, hospital.attributes.ADDRESS, hospital.attributes.STATE, hospital.attributes.WEBSITE, hospital.attributes.STATUS, hospital.attributes.HELIPAD));
                }
                if(hospitals.length != 0){
                    loading.innerHTML = (hospitals.length + " hospitals found!");
                }
                else{
                    loading.innerHTML = "Sorry, no hospitals found...";
                }
                //the hospitals are added to the map
                mapAddition();
		    });
        },
	} // end methods
});

export {init};