import { useEffect, useState } from 'react'

const NUMBER_OF_ROLES = 4;


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
    const arrayOfRoles = [sentinels, controllers, duelists, initiators]
    return arrayOfRoles
  }

  function getFullRandomTeam() {
    // get one of each role
    const allAgentsByRole = getAllAgentsByRole();
    const team = allAgentsByRole.map((role) => pickRandomAgent(role))
    const rNum = Math.floor(Math.random() * NUMBER_OF_ROLES)
    team.push(pickRandomAgent(allAgentsByRole[rNum]))
    shuffle(team)
    setRandomAgents(team)
  }

  function pickRandomAgent(role) {
    const rNum = Math.floor(Math.random() * role.length);
    return role.splice(rNum, 1)[0]
  }
  
  function shuffle(array) {
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

  const agentElement = randomAgents.map((agent) => <li key={agent.id}>{agent.name}</li>)

  return (
    <>
      <ul>{agentElement}</ul>
      <button onClick={() => getFullRandomTeam()}>Click</button>
    </>
  )

}

export default App
