const threats = [

{
    name:"WALKER",

    danger:"LOW",

    class:"low",

    identification:
    "Standard infected. Slow movement and poor awareness. Usually found in groups.",

    combat:
    "Keep distance. Single headshot is sufficient. Avoid being surrounded by them.",

    stats:{
        Strength:30,
        Speed:15,
        Intelligence:5,
        Endurance:35
    }
},

{
    name:"RUNNER",

    danger:"MEDIUM",

    class:"medium",

    identification:
    "Fast-moving infected. Typically hunts isolated survivors.",

    combat:
    "Stay near cover. Prioritize elimination before engaging other threats.",

    stats:{
        Strength:40,
        Speed:95,
        Intelligence:15,
        Endurance:45
    }
},

{
    name:"BRUTE",

    danger:"HIGH",

    class:"high",

    identification:
    "Massive infected with abnormal muscle growth.",

    combat:
    "Avoid close combat. Concentrate fire on weak points.",

    stats:{
        Strength:95,
        Speed:20,
        Intelligence:10,
        Endurance:90
    }
},

{
    name:"SPITTER",

    danger:"HIGH",

    class:"high",

    identification:
    "Capable of launching corrosive bio-acid.",

    combat:
    "Use cover. Eliminate immediately.",

    stats:{
        Strength:35,
        Speed:45,
        Intelligence:35,
        Endurance:55
    }
},

{
    name:"NECROMORPH",

    danger:"EXTREME",

    class:"extreme",

    identification:
    "Rare apex infected displaying adaptive behaviour.",

    combat:
    "Requires alot of fire and manpower to eliminate. If encountered while alone, pray.",

    stats:{
        Strength:100,
        Speed:85,
        Intelligence:80,
        Endurance:100
    }
}

];

function loadZombie(index){

    const z = threats[index];

    document.getElementById("name").textContent =
    z.name;

    document.getElementById("identify").textContent =
    z.identification;

    document.getElementById("combat").textContent =
    z.combat;

    document.getElementById("danger").innerHTML =
    `<div class="danger ${z.class}">
        DANGER LEVEL: ${z.danger}
    </div>`;

    const stats =
    document.getElementById("stats");

    stats.innerHTML = "";

    Object.entries(z.stats).forEach(([name,value])=>{

        let color =
        value >= 80
        ? "#ff4f4f"
        : value >= 50
        ? "#ffd54d"
        : "#00ff9d";

        stats.innerHTML += `

        <div class="stat">

            <div class="stat-name">

                ${name} (${value})

            </div>

            <div class="bar">

                <div class="fill"
                     style="
                        width:${value}%;
                        background:${color};
                     ">
                </div>

            </div>

        </div>

        `;
    });

    document
    .querySelectorAll(".threat-btn")
    .forEach(btn=>
        btn.classList.remove("active")
    );

    document
    .querySelectorAll(".threat-btn")[index]
    .classList.add("active");
}

loadZombie(0);