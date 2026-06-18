let missions =
JSON.parse(
    localStorage.getItem(
        "sector42_missions"
    )
) || [];

const missionModal =
document.getElementById(
    "missionModal"
);

const missionList =
document.getElementById(
    "missionList"
);

function saveMissions(){

    localStorage.setItem(
        "sector42_missions",
        JSON.stringify(
            missions
        )
    );
}

function openMissionModal(){

    missionModal.style.display =
    "flex";
}

function closeMissionModal(){

    missionModal.style.display =
    "none";
}

function addMission(){

    const name =
    document.getElementById(
        "missionName"
    ).value.trim();

    const location =
    document.getElementById(
        "missionLocation"
    ).value.trim();

    const threat =
    document.getElementById(
        "missionThreat"
    ).value;

    const requirements =
    document.getElementById(
        "missionRequirements"
    ).value.trim();

    const reward =
    document.getElementById(
        "missionReward"
    ).value.trim();

    if(
        !name ||
        !location ||
        !requirements
    ){
        alert(
            "Fill all fields."
        );
        return;
    }

    missions.push({

        name,

        location,

        threat,

        requirements,

        reward,

        status:"Queued"
    });

    saveMissions();

    renderMissions();

    closeMissionModal();

    document.getElementById(
        "missionName"
    ).value = "";

    document.getElementById(
        "missionLocation"
    ).value = "";

    document.getElementById(
        "missionRequirements"
    ).value = "";

    document.getElementById(
        "missionReward"
    ).value = "";
}

function deleteMission(index){

    missions.splice(
        index,
        1
    );

    saveMissions();

    renderMissions();
}

function completeMission(index){

    missions.splice(
        index,
        1
    );

    saveMissions();

    renderMissions();
}

function setMissionStatus(
    index,
    status
){

    missions[index].status =
    status;

    saveMissions();

    renderMissions();
}

function getThreatClass(
    threat
){

    switch(
        threat
    ){

        case "Low":
            return "green";

        case "Medium":
            return "yellow";

        case "High":
            return "orange";

        case "Extreme":
            return "red";

        default:
            return "orange";
    }
}

function renderMissions(){

    missionList.innerHTML =
    "";

    if(
        missions.length === 0
    ){

        missionList.innerHTML =

        `
        <div class="empty">

            NO MISSIONS FOUND

        </div>
        `;

        return;
    }

    missions.forEach(
        (
            mission,
            index
        ) => {

        missionList.innerHTML +=

        `
        <div class="mission-card">

            <div class="mission-top">

                <h3>

                    ${mission.name}

                </h3>

                <span class="
                    badge
                    ${getThreatClass(
                        mission.threat
                    )}
                ">

                    ${mission.threat.toUpperCase()}

                </span>

            </div>

            <p>

                <strong>
                    Location:
                </strong>

                ${mission.location}

            </p>

            <p>

                <strong>
                    Requirements:
                </strong>

                ${mission.requirements}

            </p>

            <p>

                <strong>
                    Reward:
                </strong>

                ${mission.reward}

            </p>

            <p>

                <strong>
                    Status:
                </strong>

                ${mission.status}

            </p>

            <div class="mission-buttons">

                <button
                    onclick="
                    setMissionStatus(
                        ${index},
                        'Queued'
                    )
                ">

                    QUEUE

                </button>

                <button
                    onclick="
                    setMissionStatus(
                        ${index},
                        'Active'
                    )
                ">

                    ACTIVATE

                </button>

                <button
                    onclick="
                    completeMission(
                        ${index}
                    )
                ">

                    COMPLETE

                </button>

                <button
                    onclick="
                    deleteMission(
                        ${index}
                    )
                "
                class="danger">

                    DELETE

                </button>

            </div>

        </div>
        `;
    });
}

renderMissions();