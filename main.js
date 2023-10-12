status = "";
objects = [];
input_text = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input_id").value;
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }

  function draw() {
    image(video, 0, 0, 480, 380);
        if(status != "")
        {   
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
   
            fill("#20345");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
              video.stop();
              object_detector.detect(gotResults);
              document.getElementById("number_of_objects").innerHTML = input_text+" Found";
              var synth = window.speechSynthesis;
              var utterThis = new SpeechSynthesisUtterance(input_text+"found");
              synth.speak(utterThis);
            }
            else{
              document.getElementById("number_of_objects").innerHTML = input_text+" Not Found";
            }
          }
        }
  }