function saveSurvivors(){

    localStorage.setItem(

        "sector42_survivors",

        JSON.stringify(
            survivors
        )

    );

}

let survivors =
    JSON.parse(
        localStorage.getItem(
            "sector42_survivors"
        )
    ) || [

{
    callsign:"RAVEN-01",
    name:"William",
    role:"Leader",
    health:"Healthy",
    location:"Command",
    skills:"Tactics, Command"
},

{
    callsign:"MEDIC-07",
    name:"Henry",
    role:"Medic",
    health:"Healthy",
    location:"Infirmary",
    skills:"Surgery, Triage"
},

{
    callsign:"SCOUT-12",
    name:"Michael",
    role:"Scout",
    health:"Injured",
    location:"Field",
    skills:"Recon, Stealth"
},

{
    callsign:"ENG-03",
    name:"Elizabeth",
    role:"Engineer",
    health:"Healthy",
    location:"Workshop",
    skills:"Electrical, Mech"
},

{
    callsign:"GUARD-21",
    name:"Emily",
    role:"Guard",
    health:"Healthy",
    location:"Wall-North",
    skills:"Marksman"
},

{
    callsign:"MURDER-02",
    name:"Afton",
    role:"Engineer",
    health:"Infected",
    location:"Quarantine",
    skills:"Absolute Roboticist"
}

];

function renderRoster(){

    const roster =
        document.getElementById(
            "rosterBody"
        );

    roster.innerHTML = "";

    survivors.forEach(
        (survivor,index)=>{

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td class="callsign">
                ${survivor.callsign}
            </td>

            <td>
                ${survivor.name}
            </td>

            <td>
                ${survivor.role}
            </td>

            <td>

                <span
                    class="status ${survivor.health.toLowerCase()}">

                    ${survivor.health}

                </span>

            </td>

            <td>
                ${survivor.location}
            </td>

            <td>
                ${survivor.skills}
            </td>

           <td>

    <div class="action-buttons">

        <button
            class="icon-btn"
            onclick="viewSurvivor(${index})">

            👁

        </button>

        <button
            class="icon-btn"
            onclick="editSurvivor(${index})">

            ✎

        </button>

        <button
            class="icon-btn danger"
            onclick="deleteSurvivor(${index})">

            ✖

        </button>

    </div>

</td>

        `;

        roster.appendChild(row);

});

updateSurvivorCount();

}

function viewSurvivor(index){

    alert(
        survivors[index].callsign
    );

}

document
.getElementById(
    "saveSurvivor"
)
.addEventListener(
    "click",
    ()=>{

        const callsign =
            document
            .getElementById(
                "newCallsign"
            )
            .value.trim();

        const name =
            document
            .getElementById(
                "newName"
            )
            .value.trim();

        const role =
            document
            .getElementById(
                "newRole"
            )
            .value.trim();

        const location =
            document
            .getElementById(
                "newLocation"
            )
            .value.trim();

        const skills =
            document
            .getElementById(
                "newSkills"
            )
            .value.trim();

        const health =
            document
            .getElementById(
                "newHealth"
            )
            .value;

        if(
            !callsign ||
            !name ||
            !role
        ){

            alert(
                "Please fill in Callsign, Name and Role."
            );

            return;
        }

        survivors.push({

            callsign,
            name,
            role,
            health,

            location:
                location || "Base",

            skills:
                skills || "Unknown"

        });

        saveSurvivors();

        renderRoster();

        closeRegister();

        document
            .getElementById(
                "newCallsign"
            ).value = "";

        document
            .getElementById(
                "newName"
            ).value = "";

        document
            .getElementById(
                "newRole"
            ).value = "";

        document
            .getElementById(
                "newLocation"
            ).value = "";

        document
            .getElementById(
                "newSkills"
            ).value = "";

        document
            .getElementById(
                "newHealth"
            ).value = "Healthy";

    }
);


renderRoster();
function viewSurvivor(index){

    const survivor =
        survivors[index];

    document
        .getElementById(
            "modalTitle"
        )
        .textContent =
            survivor.callsign;

    document
        .getElementById(
            "modalContent"
        )
        .innerHTML = `

        <p>Name: ${survivor.name}</p>

        <p>Role: ${survivor.role}</p>

        <p>Health: ${survivor.health}</p>

        <p>Location: ${survivor.location}</p>

        <p>Skills: ${survivor.skills}</p>

        `;

    document
        .getElementById(
            "modalOverlay"
        )
        .style.display =
            "flex";
}

function closeModal(){

    document
        .getElementById(
            "modalOverlay"
        )
        .style.display =
            "none";
}
function editSurvivor(index){

    const survivor =
        survivors[index];

    const newName =
        prompt(
            "Name:",
            survivor.name
        );

    if(!newName)
        return;

    survivor.name =
        newName;

    saveSurvivors();
    renderRoster();
}
function deleteSurvivor(index){

    if(
        !confirm(
            "Delete survivor?"
        )
    )
        return;

    survivors.splice(
        index,
        1
    );

    saveSurvivors();
    renderRoster();

}
document
.getElementById(
    "registerBtn"
)
.addEventListener(
    "click",
    ()=>{

        document
            .getElementById(
                "registerModal"
            )
            .style.display =
                "flex";
    }
);

function closeRegister(){

    document
        .getElementById(
            "registerModal"
        )
        .style.display =
            "none";
}

document
.getElementById(
    "saveSurvivor"
)
.addEventListener(
    "click",
    ()=>{

        const name =
            document
            .getElementById(
                "newName"
            )
            .value;

        const role =
            document
            .getElementById(
                "newRole"
            )
            .value;

        if(!name || !role)
            return;

        survivors.push({

            callsign:
                "NEW-" +
                Math.floor(
                    Math.random()*999
                ),

            name,

            role,

            health:
                "Healthy",

            location:
                "Base",

            skills:
                "Unknown"

        });

        saveSurvivors();

        closeRegister();

        renderRoster();
    }
);

function updateClock(){

    const clock =
        document.getElementById(
            "clock"
        );

    if(!clock)
        return;

    clock.textContent =
        new Date()
        .toLocaleTimeString();
}

setInterval(
    updateClock,
    1000
);

updateClock();

function updateSurvivorCount(){

    const countElement =
        document.getElementById(
            "survivorCount"
        );

    if(!countElement) return;

    countElement.textContent =
        `${survivors.length} colonists on record`;
}