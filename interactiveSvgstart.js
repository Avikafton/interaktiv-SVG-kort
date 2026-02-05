document.addEventListener("DOMContentLoaded", function () {
    runProgram();
});

async function runProgram() {
    let selected;
    let selectedId;
    let fillcolor;
    let active;
    

const info = [
    {
      "id": "enghaveplads",
      "titel": "Enghave Plads",
      "tekst": "Enghave Plads er et af mine favoritsteder i byen. Her er der liv, caféer og en god stemning, og det er et sted jeg ofte kommer forbi i hverdagen. Det er også et sted, jeg er vokset op som barn og senere selv har boet, hvilket gør området helt særligt for mig.",
      "billede": "enghaveplads"
    },
    {
      "id": "enghavebrygge",
      "titel": "Enghave Brygge",
      "tekst": "Enghave Brygge er et roligt og hyggeligt område tæt på vandet, hvor jeg selv bor. Jeg nyder at gå ture langs havnen og slappe af i de rolige omgivelser, især når vejret er godt og stemningen ved vandet er ekstra hyggelig.",
      "billede": "enghavebrygge"
    },
    {
      "id": "christianshavn",
      "titel": "Christianshavn",
      "tekst": "Christianshavn er et smukt område fyldt med små, hyggelige kanaler. Her blandt kanalerne har min familie og jeg haft mange gode minder, da vi både har haft liggeplads til vores speedbåd og boet på husbåd. Området har en helt særlig stemning med vandet, de farverige huse og det rolige liv langs kajerne.",
      "billede": "christianshavn"
    },
    {
      "id": "lufthavn",
      "titel": "Københavns Lufthavn",
      "tekst": "Københavns Lufthavn forbinder mig med resten af verden og markerer starten på nye oplevelser og rejser.",
      "billede": "lufthavn"
    }
  ];
  
    // 1. Load svg map
    //------------------------------------------------------------------------------------	
let rawSvg = await fetch("kort.svg")
let svg = await rawSvg.text();
document.querySelector("#map").innerHTML = svg;

    info.forEach(place => {
        const el = document.getElementById(place.id);
        if (el) {
            el.classList.add("place-circle");
        }
    });


    // 2. Skift farve ved klik, og vis tekst
    //-----------------------------------------------------------------------
document.querySelector("#map").addEventListener("click", (evt) => clicked(evt));

const infoBox = document.querySelector("#infoBox");

const closeBtn = document.querySelector("#closeInfo");

closeBtn.addEventListener("click", () => {
    infoBox.classList.add("hidden");

    if (active) {
        active.setAttribute("fill", "#b62300");
        active = null;
    }
});


    //function clicked
    //--------------------------------------------------------------------
function clicked(evt) {  
   
    const circle = evt.target.closest("circle");
    if (!circle) return;

    selected = circle;
   

// b. find det klikkede elementets ID
    //---------------------------------------------
selectedId = selected.id;
   

    if (active && active.id === selectedId) {
        selected.setAttribute("fill", "#b62300");
        document.querySelector("#infoBox").classList.add("hidden");
        active = null;
        return;
    }

// c. find  det klikkede elements fillfarve
    //---------------------------------------------
fillcolor = selected.getAttribute("fill");
console.log(fillcolor);


// d. vis info
//--------------------------------------------
const place = info.find(item => item.id === selectedId);

if (place) {
    document.querySelector("#placeImg").src =
        `billeder/${place.billede}.jpeg`;

    document.querySelector("#placeTitle").textContent =
        place.titel;

    document.querySelector("#placeText").innerHTML =
        place.tekst;

    document.querySelector("#infoBox").classList.remove("hidden");
}

    

// 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
if(active){
    document.querySelector("#" + active.id).setAttribute("fill", "#b62300");
}
   

//gør det klikkede til det aktive
    //-------------------------------------------------------------------------
active = selected;

   

//skift farve på det valgte
    //-------------------------------------------------------------------------
if (fillcolor == "#b62300"){
    document.querySelector("#" + selectedId).setAttribute("fill", "#123456");
}
  

//reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
else {
    document.querySelector("#" + selectedId).setAttribute("fill", "#b62300");
}
}
};