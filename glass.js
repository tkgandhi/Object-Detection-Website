img="";
status="";

function preload()
{
    img=loadImage("glass.jpg");
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
}

function draw()
{
    image(img, 0, 0, 640, 420); 
}