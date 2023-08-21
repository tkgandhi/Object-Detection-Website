img="";
status="";
objects=[];
go = "";

function preload()
{
    img=loadImage("glasses.jpeg");
}

function setup()
{
    canvas=createCanvas(640,420);
    canvas.position(400,200);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects" 
}

function modelLoaded() 
{
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    objects= results;
}

function draw()
{
    image(img, 0, 0, 640, 420);
    
    if(status != "")
    {
        for(i=0; i<objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object/s Detected";

            fill("#FF0000");    
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " - " + percent + "% accuracy", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);     
            go=true;       
        }
    }    

    if(go=true)
    {
        document.getElementById("number_of_objects").innerHTML = "The COCOSSD model detected " + objects.length + " out of 1 object";
    }

    else
    {
        document.getElementById("number_of_objects").innerHTML = "The COCOSSD model has failed to detect any objects";
    }
}