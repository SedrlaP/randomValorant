import { useEffect, useState } from "react"

const NUMBER_OF_ROLES = 4

function App() {
  const [allAgents, setAllAgents] = useState([])
  const [randomTeam, setRandomTeam] = useState([])

  useEffect(() => {
    fetch("./src/data/agents.JSON").then((res) =>
      res.json().then((data) => setAllAgents(data.agents))
    )
  }, [])

  function getNewRandomAgent() {}

  function getAgentsByRole(role) {
    return allAgents.filter((agent) => agent.role === role)
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
    const allAgentsByRole = getAllAgentsByRole()
    const team = allAgentsByRole.map((role) => pickRandomAgent(role))

    // get random role number
    const rNum = Math.floor(Math.random() * NUMBER_OF_ROLES)

    // push 5th random agent from random role to the team
    team.push(pickRandomAgent(allAgentsByRole[rNum]))

    // shuffle team array to random order
    shuffle(team)

    //set the result to state
    setRandomTeam(team)
  }

  function pickRandomAgent(role) {
    // return random agent
    const rNum = Math.floor(Math.random() * role.length)
    return role.splice(rNum, 1)[0]
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  function handleRollClick(agentId, idx, agentRole) {
    const numOfAgentsWithSameRole = randomTeam.filter(
      (agent) => agent.role === agentRole
    )
    let idInTeam = "0"
    let role = ""

    if (numOfAgentsWithSameRole.length > 1) {
      idInTeam = numOfAgentsWithSameRole
        .map((agent) => agent.id)
        .filter((id) => id !== agentId)
        .join()
      role = getAgentsByRole(agentRole)
        .filter((agent) => agent.id !== idInTeam)
        .filter((agent) => agent.id !== agentId)
    } else {
      role = getAgentsByRole(agentRole).filter((agent) => agent.id !== agentId)
    }

    console.log(numOfAgentsWithSameRole, role)

    let newRandomAgent = pickRandomAgent(role)

    const newRandomTeam = randomTeam.map((agent) =>
      agent.id === agentId ? (agent = newRandomAgent) : agent
    )
    setRandomTeam(newRandomTeam)
  }

  const agentElement = randomTeam.map((agent, idx) => (
    <li className="agent" key={agent.id}>
      <img className="agent__image" src={`./src/assets/${agent.name}.png`} />
      <button onClick={() => handleRollClick(agent.id, idx, agent.role)}>
        ROLL
      </button>
    </li>
  ))

  return (
    <main>
      <ul>{agentElement}</ul>

      <button onClick={() => getFullRandomTeam()}>Random</button>
    </main>
  )
}

export default App
