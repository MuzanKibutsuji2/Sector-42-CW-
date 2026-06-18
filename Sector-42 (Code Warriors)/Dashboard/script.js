const clock = document.getElementById("clock");
const dayCount = document.getElementById("dayCount");
const advanceDay = document.getElementById("advanceDay");

let day = 142;

advanceDay.addEventListener("click", () => {
    day++;
    dayCount.textContent = day;

    addCommMessage(
        `Day ${day} begins. All units report status.`
    );
});

function updateClock() {

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("en-US", {
            hour12:false
        });
}

setInterval(updateClock,1000);
updateClock();

function addCommMessage(message){

    const feed =
        document.getElementById("commsFeed");

    const p =
        document.createElement("p");

    p.textContent = message;

    feed.prepend(p);
}

document.querySelectorAll(".nav-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".nav-btn")
            .forEach(b => b.classList.remove("active"));

        button.classList.add("active");
    });

});

const radioMessages = [

    "SCOUT-12: Area clear.",
    "ENG-03: Generator fuel stable.",
    "MEDIC-07: Treating minor injuries.",
    "WATCH-01: Movement spotted beyond the wall.",
    "SCOUT-05: Returning from scavenging run.",
    "GUARD-21: North gate secured.",
    "RADIO-02: Signal interference detected.",
    "FARM-01: Crop growth looking healthy.",
    "ENG-03: Water purifier functioning normally.",
    "WATCH-01: False alarm. Stand down.",
    "SCOUT-12: Found abandoned supplies.",
    "MEDIC-07: Inventory updated.",
    "GUARD-21: Patrol complete."
];

function randomRadioMessage(){

    const randomMessage =
        radioMessages[
            Math.floor(
                Math.random() *
                radioMessages.length
            )
        ];

    addCommMessage(randomMessage);

    const nextInterval =
        Math.floor(
            Math.random() * 12000
        ) + 3000;

    setTimeout(
        randomRadioMessage,
        nextInterval
    );
}

setTimeout(
    randomRadioMessage,
    5000
);

const sendBtn =
    document.getElementById(
        "sendMessage"
    );

const playerInput =
    document.getElementById(
        "playerMessage"
    );

sendBtn.addEventListener(
    "click",
    sendPlayerMessage
);

playerInput.addEventListener(
    "keydown",
    (e)=>{
        if(e.key==="Enter"){
            sendPlayerMessage();
        }
    }
);

function sendPlayerMessage(){

    const message =
        playerInput.value.trim();

    if(message==="") return;

    addCommMessage(
        `USER: ${message}`
    );

    playerInput.value="";
}

function loadDashboardMissions() {

    const missionList =
        document.getElementById(
            "missionList"
        );

    if (!missionList) return;

    const missions =
        JSON.parse(
            localStorage.getItem(
                "sector42_missions"
            )
        ) || [];

    missionList.innerHTML = "";

    const visibleMissions =
        missions.filter(
            mission =>
                mission.status === "Active" ||
                mission.status === "Queued"
        );

    if (visibleMissions.length === 0) {

        missionList.innerHTML = `

            <div class="mission">

                No Active Missions

            </div>

        `;

        return;
    }

    visibleMissions.forEach(
        mission => {

            let badgeColor = "orange";

            if (
                mission.status ===
                "Active"
            ) {

                badgeColor = "red";
            }

            if (
                mission.status ===
                "Queued"
            ) {

                badgeColor = "orange";
            }

            missionList.innerHTML += `

                <div class="mission">

                    ${mission.name}

                    <span class="badge ${badgeColor}">

                        ${mission.status.toUpperCase()}

                    </span>

                </div>

            `;
        }
    );
}

loadDashboardMissions();

function updateDashboardSurvivors(){

    const count =
        document.getElementById(
            "survivorCountDashboard"
        );

    const status =
        document.getElementById(
            "survivorStatus"
        );

    if(!count) return;

    const survivors =
        JSON.parse(
            localStorage.getItem(
                "sector42_survivors"
            )
        ) || [];

    let healthy = 0;
    let injured = 0;
    let infected = 0;

    survivors.forEach(
        survivor => {

            if(
                survivor.health ===
                "Healthy"
            ){
                healthy++;
            }

            else if(
                survivor.health ===
                "Injured"
            ){
                injured++;
            }

            else if(
                survivor.health ===
                "Infected"
            ){
                infected++;
            }

        }
    );

    count.textContent =
        String(
            survivors.length
        ).padStart(
            3,
            "0"
        );

    if(status){

        status.textContent =

            `${healthy} healthy // ` +

            `${injured} injured // ` +

            `${infected} infected`;
    }
}

updateDashboardSurvivors();

