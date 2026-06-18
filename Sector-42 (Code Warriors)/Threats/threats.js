const threats = [

{
    x:15,
    y:25,

    color:"red",

    sector:"D7",

    threat:"12 Hostiles",

    level:"HIGH"
},

{
    x:40,
    y:50,

    color:"orange",

    sector:"A4",

    threat:"Movement Detected",

    level:"MEDIUM"
},

{
    x:70,
    y:20,

    color:"yellow",

    sector:"B2",

    threat:"Unknown Signals",

    level:"LOW"
},

{
    x:30,
    y:80,

    color:"green",

    sector:"Safe Zone Alpha",

    threat:"No Activity",

    level:"SAFE"
},

{
    x:85,
    y:60,

    color:"blue",

    sector:"Patrol Team 3",

    threat:"Friendly Unit",

    level:"FRIENDLY"
}

];

const map =
document.getElementById(
    "map"
);

threats.forEach(data=>{

    const marker =
    document.createElement("div");

    marker.className =
    `marker ${data.color}`;

    marker.style.left =
    data.x + "%";

    marker.style.top =
    data.y + "%";

    marker.addEventListener(
        "click",
        ()=>{

            document
            .getElementById(
                "threatInfo"
            )
            .innerHTML =

            `
            <h2>${data.sector}</h2>

            <br>

            <p>
            Status:
            ${data.threat}
            </p>

            <br>

            <p>
            Threat Level:
            ${data.level}
            </p>
            `;
        }
    );

    map.appendChild(marker);
});