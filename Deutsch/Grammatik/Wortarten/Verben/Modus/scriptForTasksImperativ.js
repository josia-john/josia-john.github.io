function sendRandomQuestion() {
    displayTask(getRandomInt(tasks.length-1))
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function displayTask(Element) {
    $("#frage").html(tasks[Element][0])
    $("#eingabe").focus()
    $("#eingabe").keyup(function(event) {if (event.keyCode === 13) {$("#check").click()}})
    $("#check").click(function(){ 
        var Solution = tasks[Element][1]; 
        var Answer = $("#eingabe").val(); 
        if(Answer.replace(/\s+/g, "").toLowerCase() == Solution.replace(/\s+/g, "").toLowerCase()) { $("#StateIcon").attr("class", "far fa-check-circle"); $("#StateIcon").css("color", "green")} 
        else { $("#StateIcon").attr("class", "far fa-times-circle"); $("#StateIcon").css("color", "red")} 
    } )
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                lines = [""]
                for (var i = 0; i < allText.length; i++) {
                    if (allText[i] === "\n") {
                        lines.push("")
                    }

                    else {
                        lines[lines.length-1] = lines[lines.length-1] + allText[i];
                    }
                }
                for (var i = 0; i<lines.length; i+=2) {
                    tasks.push([])
                    tasks[tasks.length-1].push(lines[i])
                    tasks[tasks.length-1].push(lines[i+1])
                }
            }
        }
    }
    rawFile.send(null);
}

tasks = []
readTextFile("ImperativUebungen.txt")



$("#ZuUebungen").click(function(){document.getElementById("uebung").style.visibility="visible"; document.getElementById("background").style.visibility="visible"; sendRandomQuestion(); $("#StateIcon").attr("class", "far fa-question-circle"); $("#StateIcon").css("color", "yellow")});

$("#background").click(function(){document.getElementById("uebung").style.visibility="hidden"; document.getElementById("background").style.visibility="hidden"})

$("#next").click(function(){sendRandomQuestion(); $("#StateIcon").attr("class", "far fa-question-circle"); $("#StateIcon").css("color", "yellow"); $("#eingabe").val(""); })
