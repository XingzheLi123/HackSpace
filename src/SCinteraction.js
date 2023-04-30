const ethers = require('ethers');
let address = '0x7c461161da9855FA3037C9D556788bB1580736C6';
import abi from "../artifacts/contracts/HackSpace.sol/HackSpace.json" 
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

//------------------------------view functions----------------------------------

export async function view_num_of_events(){
    return await contract.numEvents();
}
export async function view_event(eventId){
    const event = await contract.events(eventId);
    return event;
}
export async function view_team(eventId, teamId){
    return await contract.viewTeam(eventId, teamId)
}
export async function view_award(eventId, awardId){
    return await contract.viewAward(eventId, awardId)
}
export async function view_member(eventId, teamId, member_index){
    return await contract.viewMember(eventId, teamId, member_index)
}
export async function view_team_num(eventId){
    return await contract.viewTeamsNum(eventId)
}
export async function view_award_num(eventId){
    return await contract.viewAwardsNum(eventId)
}
export async function view_members_num(eventId, teamId){
    return await contract.viewMembersNum(eventId, teamId)
}

