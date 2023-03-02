import perlin from "./perlin.js";

var id = null;
var gauge_hider_element = null;
var gauge_body_element = null;
var gauge_max_height = null;
const MEAN_CHANGE_FRAMES_N = 100;

const min = 0.0;
const max = 1.0;
// Clamp number between two values with the following line:
const clamp01 = (num, mini, maxi) => Math.min(Math.max(num, mini), maxi)

function loadElements(){
    console.log("Seeding perlin noise...")
    perlin.seed();

    console.log("Starting animation script !")
    const svg_obj = document.getElementById("svg1");
    console.log(svg_obj)

    var content_doc = svg_obj.contentDocument;
    console.log(content_doc)


    gauge_hider_element = content_doc.getElementById("bar_hider");
    console.log(gauge_hider_element)
    gauge_body_element = content_doc.getElementById("gauge_body");
    console.log(gauge_body_element)
    gauge_max_height = gauge_body_element.width.baseVal.value;
}
 
function changeGaugeLevel(value) {
    // Value between 0 and 1
    gauge_hider_element.height.baseVal.value = (1-value) * gauge_max_height;
}

function oscillateAroundNewMean(intervalID,mean,frameCounter){
    if (intervalID !==  null){
        intervalID.clearInterval();
    }
    function frame() {
        console.log(frameCounter);
        console.log(mean + perlin.get(0,frameCounter/100));
        var int_value = clamp01(mean + perlin.get(0,frameCounter/100),min,max);
        changeGaugeLevel(int_value);
        //console.log(perlin.get(0,cnt/100));
        frameCounter++;
    }
    intervalID = setInterval(frame, 10);
}

window.onload = function() {
    loadElements();    
    var frame=0;
    oscillateAroundNewMean(id,0.0,frame);
}










