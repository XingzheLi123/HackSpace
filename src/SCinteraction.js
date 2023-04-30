const ethers = require('ethers');
let address = '0x4E195586002b8FB6B21C56D9d46B0022d549F59C';
import abi from "../artifacts/contracts/HackSpace.sol/HackSpace.json"

let signer;
let contract;

export async function connect() {
    if (!window.ethereum) alert('no ethereum provider detected')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner(0)
    contract = new ethers.Contract(address, abi.abi, signer)
}

export async function isConnected() {
    if (!window.ethereum) {
        return false;
    } else {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) return true;
        else return false;
    }
}

export async function userAddress(){
    return await signer.getAddress()
}

export async function addEvent(name) {
    const event = await contract.addEvent(name);
}

export async function sponsor(eventId, name, amount, url) { //amount in ethers
    const addAward = await contract.addAward(eventId, name, url, { value: ethers.utils.parseEther(amount.toString()) })
}
export async function selectWinner(eventId, awardId, teamId) {
    const winner = await contract.designateAward(eventId, awardId, teamId)
}
export async function claimAward(eventId, awardId, teamId) {
    const claim = await contract.claimAward(eventId, awardId, teamId)
}
export async function joinEvent(eventId, name) {
    const join = await contract.joinEvent(eventId, name)
}
export async function addMember(eventId, teamId, newMember_address) {
    const add = await contract.addMember(eventId, teamId, newMember_address)
}

//------------------------------view functions----------------------------------

export async function view_num_of_events() {
    return await contract.numEvents();
}
export async function view_event(eventId) {
    const event = await contract.events(eventId);
    return event;
}
export async function view_team(eventId, teamId) {
    return await contract.viewTeam(eventId, teamId)
}
export async function view_award(eventId, awardId) {
    return await contract.viewAward(eventId, awardId)
}
export async function view_member(eventId, teamId, member_index) {
    return await contract.viewMember(eventId, teamId, member_index)
}
export async function view_team_num(eventId) {
    return await contract.viewTeamsNum(eventId)
}
export async function view_award_num(eventId) {
    return await contract.viewAwardsNum(eventId)
}
export async function view_members_num(eventId, teamId) {
    return await contract.viewMembersNum(eventId, teamId)
}


