const ethers = require('ethers');
let address = 0x5962c03D09F3AEC67052e40Dde03692DC968358f;
import hackspace_abi from "../artifacts/contracts/HackSpace.json" 
if (!window.ethereum) alert('no ethereum provider detected')
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner(0)
const contract = new ethers.Contract(address, abi.abi, signer)

export async function addEvent(name){
    const event = await contract.addEvent(name);
}

export async function sponsor(eventId, name, amount){ //amount in ethers
    const addAward = await contract.addAward(eventId, name, {value: ethers.utils.parseEther(amount.toString())})
}
export async function selectWinner(eventId, awardId, teamId){
    const winner = await contract.designateWinner(eventId, awardId, teamId)
}
export async function claimAward(eventId, awardId, teamId){
    const claim = await contract.claimAward(eventId, awardId, teamId)
}
export async function joinEvent(eventId, name){
    const join = await contract.joinEvent(eventId, name)
}
export async function addMember(eventId, teamId, newMember_address){
    const add = await contract.addMember(eventId, teamId, newMember_address)
}
export async function view_num_of_events(){
    return await contract.numEvents();
}
export async function view_event(eventId){
    const event = await contract.events(eventId);
}