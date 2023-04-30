// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract HackSpace {
    address public owner;

    struct Team {
        string name;
        // teams[i] has id i
        uint256 id;
        address payable[] members;
    }

    struct Award {
        string name;
        // awards[i] has id i
        uint256 id;
        // prize that the sponsor paid to this contract
        uint256 prize;
        address sponsor;

        // team that the sponsor designates as winner
        uint256 sponsorDesignation;
        // team that the organizer designates as winner
        uint256 organizerDesignation;
        bool hasSponsorDesignated;
        bool hasOrganizerDesignated;
        // if the award has been released yet
        bool awarded;
    }

    struct Event {
        string name;
        // events[i] has id i
        uint256 id;
        Team[] teams;
        address organizer;
        Award[] awards;
        bool allowSignup;
    }

    mapping (uint256 => Event) public events;
    uint256 public numEvents;

    constructor() {
        owner = payable(msg.sender);
        numEvents = 0;
    }

    function addEvent(string memory name) external {
        uint256 eventId = numEvents + 1;
        address organizer = msg.sender;

        Event storage e = events[eventId];
        e.name = name;
        e.id = eventId;
        e.organizer = organizer;
        e.allowSignup = false;
        events[eventId] = e;
        numEvents++;

    }

    function addAward(uint256 eventId, string memory name) external payable {
        require(eventId < numEvents, "not a valid eventId");
        Event storage e = events[eventId];
        uint256 awardId = e.awards.length;
        address sponsor = msg.sender;
        uint256 prize = msg.value;
        Award memory a = Award(name, awardId, prize, sponsor, 0, 0, false, false, false);
        e.awards.push(a);
    }

    function designateAward(uint256 eventId, uint256 awardId, uint256 teamId) external {
        require(eventId < numEvents, "not a valid eventId");
        Event storage e = events[eventId];
        require(awardId < e.awards.length, "not a valid awardId");
        Award storage award = e.awards[awardId];
        require(teamId < e.teams.length, "not a valid teamId");
        require(msg.sender == e.organizer || msg.sender == award.sponsor, "not organizer or sponsor");
        if (msg.sender == e.organizer) {
            award.organizerDesignation = teamId;
            award.hasOrganizerDesignated = true;
        } else {
            award.sponsorDesignation = teamId;
            award.hasSponsorDesignated = true;
        }
    }

    function claimAward(uint256 eventId, uint256 awardId, uint256 teamId) external {
        require(eventId < numEvents, "not a valid eventId");
        Event storage e = events[eventId];
        require(awardId < e.awards.length, "not a valid awardId");
        Award storage award = e.awards[awardId];
        require(teamId < e.teams.length, "not a valid teamId");
        Team storage team = e.teams[teamId];
        require(msg.sender == team.members[0], "you are not team leader");
        require(award.hasOrganizerDesignated && award.hasOrganizerDesignated, "award not designated yet");
        require(award.organizerDesignation == teamId, "you were not chosen by the organizer");
        require(award.sponsorDesignation == teamId, "you were not chosen by the sponsor");
        require(!award.awarded, "award was already released");

        // release award
        // note this flag has to be set before any transfers
        award.awarded = true;

        uint256 teamSize = team.members.length;
        uint256 prize = award.prize;
        for (uint256 i = 0; i < teamSize; i++)
            team.members[i].transfer(prize / teamSize);
    }

    function joinEvent(uint256 eventId, string memory name) external {
        require(eventId < numEvents, "not a valid eventId");
        Event storage e = events[eventId];
        uint256 teamId = e.teams.length;
        Team memory team;
        team.name = name;
        team.id = eventId;
        e.teams.push(team);
        e.teams[teamId].members.push(payable(msg.sender));
    }

    function addMember(uint256 eventId, uint256 teamId, address payable member) external {
        require(eventId < numEvents, "not a valid eventId");
        Event storage e = events[eventId];
        require(teamId < e.teams.length, "not a valid teamId");
        Team storage team = e.teams[teamId];
        require(msg.sender == team.members[0], "you are not team leader");
        team.members.push(member);
    }
}
