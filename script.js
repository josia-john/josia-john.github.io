function showElement(id) {
    document.getElementById(id).style.visibility="visible";
}

function hideElement(id) {
    document.getElementById(id).style.visibility="hidden";
}

function goToPage() {}


// Click on MenuBars should toggle Menu
$("#menuButton").click(function(){
    states.navigationPath = ""
    if ($("#navigationMenu").css("visibility") === "hidden") { hideElement("navigationMenu"); showElement("navigationMenu"); createNavigation(navigation) }
    else {hideElement("navigationMenu");}
})

function createNavigation(jsonArray) {
    var jqueryElement = $("#navigationMenu");
    jqueryElement.empty();
    for(var i in jsonArray) {
        path = createNavigationItem(jsonArray[i], jqueryElement);
    }
}


function createNavigationItem(jsonItem, jqueryElement) {
    if("items" in jsonItem) {
        jqueryElement.append(
            $(`<p id="navigation${jsonItem.id}">${jsonItem.label}</p>`).click( function() { createNavigation(jsonItem.items); states.navigationPath = states.navigationPath + "/" + jsonItem.id} )
        )
    } else {
        jqueryElement.append(
            $(`<p id="navigation${jsonItem.id}">${jsonItem.label}</p>`).click( function() { hideElement("navigationMenu"); window.location.assign(states.navigationPath + "/" + jsonItem.id + ".html"); states.navigationPath = "" } )
        )
    }
}

$("#title").click(function(){window.location.assign("../../../../../index.html")})


var navigation = [
    { id: "Deutsch", label: "Deutsch", items: 
        [ { id: "Grammatik", label: "Grammatik", items: 
            [ { id: "Wortarten", label: "Wortarten", items: 
                [ { id: "Verben", label: "Verben", items: 
                    [ { id: "Modus", label: "Modus (Indikativ, Imperativ, Konjunktiv)", items: 
                        [ { id: "Indikativ", label: "Indikativ" }, { id: "Imperativ", label: "Imperativ" }, { id: "Konjunktiv1", label: "Konjunktiv 1" }, { id: "Konjunktiv2", label: "Konjunktiv 2" } ] 
    } ] } ] } ] } ] }, 

    { id: "Mathematik", label: "Mathematik", items: 
        [ { id: "Geometrie", label: "Geometrie", items: 
            [ { id: "Aenlichkeit", label: "Ähnlichkeit", items: 
                [ { id: "VermessungMondberge", label: "Vermessung von Mondbergen"} ] 
            } ] } ] } 
]


var states = {navigationPath: ""}

createNavigation(navigation)
