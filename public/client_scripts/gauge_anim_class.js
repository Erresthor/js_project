import perlin from "./perlin.js";

const MEAN_CHANGE_FRAMES_N = 100;

// Clamp number between two values with the following line:
const clamp = (num, mini, maxi) => Math.min(Math.max(num, mini), maxi)
const clamp01 = (num) => clamp(num, 0, 1)

var gauge_animator = {
    static_gauge_level : 0.0,
    gauge_max_height : 0.0,
    gauge_hider_element : null, 
    gauge_body_element : null,
    gauge_max_height : null,
    existing_interval_id : null,
    button_new_mean : null,
    backend_element : null,

    gauge_finished_animation_event : new Event("gauge_finished_animation"),
    linked_backend_element : null,

    perlin_int : 0.3,
    perlin_freq : 1000,



    loadElements:function(){
        console.log("REINITIALIZING GAUGE ANIMATOR");

        console.log("Seeding perlin noise...")
        perlin.seed();

        console.log("Starting animation script !")
        var button_new_mean = document.getElementById("new_mean_text")
        var animator = this;
        button_new_mean.onclick = function fun()
        {
            let new_mean = Math.random();
            //animator.updateGaugeLevel(Math.random(),function fun(){alert("Hello! I am an alert box!!");});
            animator.updateGaugeLevel(new_mean,function fun(){});
            console.log("New mean value : " + new_mean);
            //validation code to see State field is mandatory.  
        }   

        const svg_obj = document.getElementById("svg1");
        
        console.log("Found the object containing the SVG : ")
        console.log(svg_obj)

        var content_doc = svg_obj.contentDocument;

        console.log("With the following content document : ")
        console.log(content_doc)

        
        this.gauge_hider_element = content_doc.getElementById("bar_hider");
        this.gauge_body_element = content_doc.getElementById("gauge_body");
        this.gauge_max_height = this.gauge_body_element.width.baseVal.value;
        
        console.log("And the following gauge elements : ")
        console.log(this.gauge_hider_element)
        console.log(this.gauge_body_element)
        console.log("Totaling the following max height : ")
        console.log(this.gauge_max_height)

        var int_slider = document.getElementById("int_range");
        var freq_slider = document.getElementById("freq_range");
        var int_display = document.getElementById("int_displayer");
        var freq_display = document.getElementById("freq_displayer");
        console.log(int_slider)

        int_slider.value = 0.2;
        int_display.innerHTML = 0.2;
        this.perlin_int = 0.2 ;

        freq_slider.value = 15;;
        freq_display.innerHTML = 15;
        this.perlin_freq = 15;

        int_slider.oninput = function(){
            var slider_value = int_slider.value;
            int_display.innerHTML = slider_value;
            animator.perlin_int = slider_value;
        }
        freq_slider.oninput = function(){
            var slider_value = freq_slider.value;
            freq_display.innerHTML = slider_value;
            animator.perlin_freq = slider_value;
        }
    },

    changeGaugeLevel:function(value) {
        // Value between 0 and 1
        this.gauge_hider_element.height.baseVal.value = (1-value) * this.gauge_max_height;
    },

    oscillateAroundMean:function(mean){
        var animator = this;
        var frameCounter = 0;

        if (this.existing_interval_id !==  null){
            clearInterval(animator.existing_interval_id);
        }

        if (mean !== undefined){
            console.log("New mean value : " + mean);
            animator.static_gauge_level = mean;
        }

        function frame() {
            var int_value = clamp01(animator.static_gauge_level + animator.perlin_int*perlin.get(0,frameCounter*animator.perlin_freq/1000));
            animator.changeGaugeLevel(int_value);
            frameCounter++;
        }
        this.existing_interval_id = setInterval(frame, 10);
    },

    resetOscillatorOnScreenSizeChange:function(){
        this.oscillateAroundMean(this.static_gauge_level);
    },


    updateGaugeLevel:function(new_gauge_level,callback){
        var old_gauge_level = this.static_gauge_level;
        var new_gauge_level = new_gauge_level
        var update_interval_id = null;

        var updateFrameCounter = 0;
        var animator = this;

        function frame_update_mean() {
            updateFrameCounter++;
            animator.static_gauge_level = (updateFrameCounter/MEAN_CHANGE_FRAMES_N) * (new_gauge_level - old_gauge_level) + old_gauge_level;
            if (updateFrameCounter >= MEAN_CHANGE_FRAMES_N){
                window.clearInterval(update_interval_id);
                dispatchEvent(animator.gauge_finished_animation_event);
                callback();
            }
        }
        update_interval_id = setInterval(frame_update_mean, 10);
    },

    updateBackendDist:function(){
        console.log("Updating gauge level to " + (1-this.linked_backend_element.linearDistanceToGoal()) + " ...");
        this.updateGaugeLevel(1-this.linked_backend_element.linearDistanceToGoal(),function fun(){});
    },    
}



window.addEventListener("load",function(event){
    console.log("BRRRUUUUUUUUUUUUUUUH");
    window.gauge_anim = gauge_animator;
    window.gauge_anim.loadElements(); 
    window.gauge_anim.oscillateAroundMean(0.0);
},false);

window.addEventListener("grid_ready", gaugeOnGridReady);
function gaugeOnGridReady(){
    window.gauge_anim.linked_backend_element = window.myBackend;
    window.gauge_anim.updateBackendDist();
};

window.addEventListener("character_moved",function(event){
    window.gauge_anim.updateBackendDist();
},false);