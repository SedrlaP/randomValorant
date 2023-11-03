import { useEffect, useState } from 'react'

function App() {
  const [allAgents, setAllAgents] = useState([])
  const [randomAgents, setRandomAgents] = useState([])

  useEffect(() => {
    fetch("./src/data/agents.JSON")
    .then(res => res.json()
    .then(data => setAllAgents(data.agents)))
  },[])
  
  function getAgentsByRole(role) {
    return allAgents.filter((agent => agent.role === role))
  }

  function getAllAgentsByRole() {
    const sentinels = getAgentsByRole("sentinel")
    const controllers = getAgentsByRole("controller")
    const duelists = getAgentsByRole("duelist")
    const initiators = getAgentsByRole("initiator")
    
  }

  function pickRandomAgent(role) {
    const rNum = Math.floor(Math.random() * role.length);
    return role.splice(rNum, 1)[0]
}
  
  /*function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}




function pickLastRandomAgent(arrayOfRoles) {

    const [sentinels, initiators, duelists, contr] = arrayOfRoles

    const random = (Math.floor(Math.random()*4))

    let randomLastAgent = ""

    switch(random) {
        case 0: 
            randomLastAgent = pickRandomAgent(sentinels);
            break;
        case 1: 
            randomLastAgent = pickRandomAgent(initiators); 
            break;
        case 2: 
            randomLastAgent = pickRandomAgent(duelists);
            break;
        case 3: 
            randomLastAgent = pickRandomAgent(contr);
            break;
    }

    return randomLastAgent
}

function getRandomAgents() {

    const sentinels = ["sage","cypher","killjoy","chamber","deadlock"]
    const initiators = ["sova","breach","skye","kayo","fade", "gekko"]
    const duelists = ["phoenix","reyna","jett","raze","yoru","neon","iso"]
    const contr = ["brimstone","viper","omen","astra","harbor"] 


    const randomS = pickRandomAgent(sentinels)
    const randomI = pickRandomAgent(initiators)
    const randomD = pickRandomAgent(duelists)
    const randomC = pickRandomAgent(contr)

    const arr = [randomS, randomI, randomD, randomC, pickLastRandomAgent([sentinels, initiators, duelists, contr])]
    
    shuffle(arr)

    setAgents(arr)
    }    
    */

    const agentElement = randomAgents.map((agent) => <li>{agent}</li>)

  return (
    <>
      <ul>{agentElement}</ul>
      <button onClick={() => getAllAgentsByRole()}>Click</button>
    </>
  )

}

export default App
