document.getElementById("search-btn").addEventListener('click',()=>{
    const search = document.getElementById("search-input").value 
    if (search) {
        loadAllPlayers(search);
    } else {
        displayNoResults();
    }
})

const loadAllPlayers = (search = '') =>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data && data.player){
                    displayPlayerData(data.player)
                }
                else
                {
                    displayNoResults()
                } 
            }); 
};

const displayPlayerData=(playerData)=>{
    const container = document.getElementById("player-container")
    container.innerHTML=""

    playerData.forEach((player) => {
        const div = document.createElement("div")
        div.classList.add("playerCard")
        div.dataset.id=player.idPlayer

        console.log(player)
        div.innerHTML=`
                <img class="player-img" src=${player.strThumb} alt="Image not Found" />
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Name: </strong> ${player.strPlayer}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Sport: </strong> ${player.strSport}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Team: </strong> ${player.strTeam}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Instagram <i class="fa-brands fa-instagram"></i> : </strong> ${player.strInstagram}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Facebook <i class="fa-brands fa-facebook"></i> : </strong> ${player.strFacebook}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">City: </strong> ${player.strBirthLocation}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Country: </strong> ${player.strNationality}</p>
                <p class="fw-bold m-0 p-0" ><strong class="text-dark">Gender: </strong> ${player.strGender}</p>
                <div class="d-flex gap-3 pt-1 m-2">
                    <button class=" btn btn-danger" onclick="document.getElementById('id01').style.display='block'">Details</button>
                    <button class=" btn btn-warning" onclick="handleAddToTeam('${player.strPlayer}','${player.idPlayer}','${player.strGender}')">Add Team</button>
                </div>
                
        `
        container.appendChild(div)

        div.addEventListener('click',()=>{
            loadPlayerDetail(player.idPlayer)
        })
    });
}
const loadPlayerDetail = (playerID)=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerID}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data && data.players && data.players.length > 0){
                displayPlayerDetails(data.players[0])
            }
        })
        .catch((error)=>{
            console.error("Error fetching meal details:",error);
        })
}

const displayPlayerDetails = (player)=>{
    const container = document.getElementById("player-details")
    container.innerHTML=""

    const div = document.createElement("div")
    div.classList.add("details")

    div.innerHTML = `
            <div>
                <img class="details-img player-img " src="${player.strThumb}">
                <h4 class="fw-bold text-center mt-3">${player.strPlayer}</h4>
            </div>
            <div>
                <h4 class="fw-bolder text-danger text-center "><strong>Details</strong></h4>
                <p><strong>Sport:</strong> ${player.strSport}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p class="lh-base"><strong>Description:</strong> <br/> ${player.strDescriptionEN.slice(0,30)}</p>
                <p class="fw-bold  m-0 p-0" ><strong class="text-dark">City: </strong> ${player.strBirthLocation}</p>
                <p class="fw-bold  m-0 p-0" ><strong class="text-dark">Country: </strong> ${player.strNationality}</p>
                <p class="fw-bold  m-0 p-0" ><strong class="text-dark">Gender: </strong> ${player.strGender}</p>
                <p class="fw-bolder fw-italic"><strong>Social Media:</strong> </p>
                <p class="fw-bold text-start m-0 p-0" ><strong class="text-dark">Facebook <i class="fa-brands fa-facebook"></i> : </strong> ${player.strFacebook}</p>
                <p class="fw-bold text-start m-0 p-0" ><strong class="text-dark">Website <i class="fa-brands fa-weebly"></i> : </strong> ${player.strWebsite}</p>
                <p class="fw-bold text-start m-0 p-0" ><strong class="text-dark">Twitter <i class="fa-brands fa-twitter"></i> : </strong> ${player.strTwitter}</p>
                <p class="fw-bold text-start m-0 p-0" ><strong class="text-dark">Instagram <i class="fa-brands fa-instagram"></i> : </strong> ${player.strInstagram}</p>
                <p class="fw-bold text-start m-0 p-0" ><strong class="text-dark">Youtube <i class="fa-brands fa-youtube"></i> : </strong> ${player.strYoutube}</p>
            </div>
            
            
    `
    container.appendChild(div)

    const playerDetasilModal = new boostrap.Modal(document.getElementById("player-detailes"))
    playerDetasilModal.show()
}

const displayNoResults=()=>{
    const container = document.getElementById("player-container")
    container.innerHTML = "<h4 class='text-center text-danger'>No result found.</h4>"
}

const handleAddToTeam=(name,id,gender)=>{
    const teamCount =document.getElementById("count").innerText
    const mailCount =document.getElementById("total-male").innerText
    const femailCount =document.getElementById("total-female").innerText
    let convertedCount = parseInt(teamCount)
    let convertedMaleCount = parseInt(mailCount)
    let convertedFemaleCount = parseInt(femailCount)

    if(convertedCount==11)
        return 
    convertedCount += 1
   
    if(gender == 'Male')
    {
        convertedMaleCount+=1
        document.getElementById("total-male").innerText = convertedMaleCount
    }
    else if(gender == "Female")
    {
        convertedFemaleCount+=1
        document.getElementById("total-female").innerText = convertedFemaleCount
    }

    document.getElementById("count").innerText = convertedCount

    const container = document.getElementById("team-main-container")

    const div = document.createElement("div")
    div.classList.add("team-info")

    div.innerHTML=`
        <p class="text-dark">${name}</p>
        <p class="id text-light">${id}</p>
    `
    container.appendChild(div)


}

const loadInitialPlayers = ()=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=`)
    .then((res) => res.json())
        .then((data) => {
            if (data && data.player) {
                displayPlayerData(data.player.slice(0,10));
            } else {
                displayNoResults();
            }
        })
        .catch((error) => {
            console.error("Error fetching initial players:", error);
            displayNoResults();
        });
}


loadInitialPlayers()

