const radioFeed =
document.getElementById(
    "radioFeed"
);

let messages =
JSON.parse(
    localStorage.getItem(
        "sector42_radio"
    )
) || [];

const normalMessages = [

"[RANGER-4] Area clear near Sector B2.",
"[SCOUT-2] Moving supplies to Outpost Delta.",
"[PATROL-7] Beginning perimeter sweep.",
"[WATCHTOWER] Visibility reduced due to fog.",
"[TRADER] Convoy expected by dawn.",
"[SCOUT-1] No hostiles detected."
];

const distressMessages = [

"DISTRESS SIGNAL: Survivors trapped in Sector D7!",
"DISTRESS SIGNAL: Immediate medical assistance required!",
"DISTRESS SIGNAL: Large infected horde approaching!",
"DISTRESS SIGNAL: Defenses breached!",
"DISTRESS SIGNAL: Outpost Echo requesting evacuation!"
];

const systemMessages = [

"SYSTEM: Radio relay synchronized.",
"SYSTEM: Long-range transmitter online.",
"SYSTEM: Signal strength stable.",
"SYSTEM: Emergency channel active."
];

function saveMessages(){

    localStorage.setItem(
        "sector42_radio",
        JSON.stringify(messages)
    );
}

function addMessage(
    text,
    type
){

    messages.push({

        text,
        type
    });

    saveMessages();

    renderMessages();
}

function renderMessages(){

    radioFeed.innerHTML = "";

    messages.forEach(msg => {

        const div =
        document.createElement(
            "div"
        );

        div.className =
        `message ${msg.type}`;

        div.textContent =
        msg.text;

        radioFeed.appendChild(
            div
        );
    });

    radioFeed.scrollTop =
    radioFeed.scrollHeight;
}

function sendMessage(){

    const input =
    document.getElementById(
        "messageInput"
    );

    const text =
    input.value.trim();

    if(!text) return;

    addMessage(
        `[YOU] ${text}`,
        "normal"
    );

    input.value = "";
}

function randomTransmission(){

    const roll =
    Math.random();

    if(roll < 0.15){

        addMessage(

            distressMessages[
                Math.floor(
                    Math.random()
                    *
                    distressMessages.length
                )
            ],

            "distress"
        );
    }

    else if(
        roll < 0.35
    ){

        addMessage(

            systemMessages[
                Math.floor(
                    Math.random()
                    *
                    systemMessages.length
                )
            ],

            "system"
        );
    }

    else{

        addMessage(

            normalMessages[
                Math.floor(
                    Math.random()
                    *
                    normalMessages.length
                )
            ],

            "normal"
        );
    }

    const nextTime =

        4000 +

        Math.random() * 8000;

    setTimeout(
        randomTransmission,
        nextTime
    );
}

document
.getElementById(
    "messageInput"
)
.addEventListener(
    "keypress",
    e => {

        if(
            e.key === "Enter"
        ){

            sendMessage();
        }
    }
);

renderMessages();

setTimeout(
    randomTransmission,
    3000
);