const resources = {

food:[

    {name:"Potatoes", amount:42},
    {name:"Canned Food", amount:31},
    {name:"Water", amount:68}

],

medicine:[

    {name:"Bandages", amount:24},
    {name:"Antibiotics", amount:15},
    {name:"Painkillers", amount:40}

],

machinery:[

    {name:"Generators", amount:8},
    {name:"Engines", amount:12},
    {name:"Machine Parts", amount:35}

],

weapons:[

    {name:"Pistols", amount:18},
    {name:"Rifles", amount:11},
    {name:"Shotguns", amount:6}

],

materials:[

    {name:"Wood", amount:75},
    {name:"Steel", amount:43},
    {name:"Concrete", amount:27}

]

};

let currentCategory = "food";

function saveResources(){

    localStorage.setItem(
        "sector42_resources",
        JSON.stringify(resources)
    );
}

const saved =
localStorage.getItem(
    "sector42_resources"
);

if(saved){

    Object.assign(
        resources,
        JSON.parse(saved)
    );
}

function showCategory(category){

    currentCategory = category;

    document
    .querySelectorAll(".resource-tab")
    .forEach(btn =>
        btn.classList.remove("active")
    );

    event.target.classList.add(
        "active"
    );

    renderResources();
}

function renderResources(){

    const container =
    document.getElementById(
        "resourceList"
    );

    container.innerHTML = "";

    resources[currentCategory]
    .forEach((item,index)=>{

        let color;

        if(item.amount < 20){

            color = "#ff4f4f";
        }
        else if(item.amount < 50){

            color = "#ffd54d";
        }
        else{

            color = "#00ff9d";
        }

        container.innerHTML += `

        <div class="resource-item">

            <div class="resource-header">

                <span class="resource-name">

                    ${item.name}

                </span>

                <span class="resource-amount">

                    ${item.amount}

                </span>

            </div>

            <div class="resource-bar">

                <div class="resource-fill"

                     style="
                        width:${Math.min(item.amount,100)}%;
                        background:${color};
                     ">

                </div>

            </div>

            <div class="resource-controls">

                <button
                    onclick="changeAmount(${index},1)">

                    +

                </button>

                <button
                    onclick="changeAmount(${index},-1)">

                    -

                </button>

            </div>

        </div>

        `;
    });
}

function changeAmount(index,value){

    resources[currentCategory][index]
    .amount += value;

    if(
        resources[currentCategory][index]
        .amount < 0
    ){

        resources[currentCategory][index]
        .amount = 0;
    }

    saveResources();

    renderResources();
}

renderResources();