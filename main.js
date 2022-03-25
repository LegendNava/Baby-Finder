img = "";
status1 = "";
object = [];
confidence = 0;

function preload() {
    alarm = loadSound("alarm.mp3")
}

function setup() {
    canvas = createCanvas(500,400);
    canvas.position(500, 200);
    video = createCapture(VIDEO);
    video.size(500,400)
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Models";
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        fill(r, g, b);
        noFill();
        stroke(r, g, b);
        for(i = 0; i < object.length; i++) {
            confidence = Math.floor(object[i].confidence*100);
            text(object[i].label+' '+confidence+'%',object[i].x+5,object[i].y+13);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (status1 != "" && object[i].label == "person") {
                alarm.stop();
                document.getElementById("statusofbaby").innerHTML = "Baby/Person Found!";
            }
            else {
                alarm.play();
            }
        }
    }
}

function modelLoaded() {
    console.log("The Model is Loaded");
    status1 = "true";
}

function gotResult(error,result) {
    if(error){
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}