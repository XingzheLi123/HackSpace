<template>
  <div style="margin: 3em">
    <h1>
      <span class="index">#{{ $route.params.id }}</span>
      {{ event.name }}
    </h1>
    <p>Organizer: <span class="address">{{ event.organizer }}</span></p>

    <div @click="join" v-if="!isParticipant" style="cursor: pointer;" class="card card-hover">+ Join as Team Captain, Enter Team Name
      <input v-model="teamName" type="text" id="team-name" required autocomplete="off" autofocus></div>
    <div @click="addMember" v-if="isCaptain" style="cursor: pointer;" class="card card-hover">+ Add a Team Member</div>
    <div @click="sponsor" style="cursor: pointer;" class="card card-hover">+ Sponsor an Award, enter Award Name
      <input v-model="awardName" type="text" id="award-name" required autocomplete="off" autofocus>
      <label for = 'awardName'>Prize Amount</label>
      <input v-model="prizeAmount" type='number' id="award-name" required autocomplete="off" autofocus>
      <label for = 'awardName'>NFT URL</label>
      <input v-model="nftURL" type='text' id="award-name" required autocomplete="off" autofocus>
    </div>

    <h2>Teams</h2>
    <div v-for="team in teams" class="card">
      <span class="index">#{{ team.id }}</span>
      <span></span>
    </div>

    <div v-if="loading" class="loading"></div>
  </div>
</template>

<script>
import { view_event, view_team_num, view_team, view_award_num, view_award, view_members_num, view_member } from '@/SCinteraction.js';
import { joinEvent, sponsor, selectWinner, addMember, claimAward, userAddress } from '@/SCinteraction.js';

export default {
  name: 'Event',
  data() {
    return {
      id: 0,
      event: {},
      awards: [],
      teams: [],
      loading: true,

      // TODO
      isParticipant: false,
      isCaptain: false
    };
  },
  async created() {
    console.log(await userAddress(), 'ikj')
    this.id = this.$route.params.id;
    this.event = await view_event(this.id);
    console.log(this.event);

    const numTeams = (await view_team_num(this.id)).toNumber();
    this.teams = [];
    for (let i = 0; i < numTeams; i++) {
      const team = { ...await view_team(this.id, i) };
      team.members = [];
      const numMembers = (await view_members_num(this.id, i)).toNumber();
      for (let j = 0; j < numMembers; j++) {
        const member = await view_member(this.id, i, j);
        if(member == await userAddress()){
          this.isParticipant = true;
          if(j == 0){
            this.isCaptain = true;
          }
        }
        team.members.push(member);
      }
      console.log('team', team);
      this.teams.push(team);
    }

    const numAwards = (await view_award_num(this.id)).toNumber();
    this.awards = [];
    for (let i = 0; i < numAwards; i++) {
      const award = await view_award(this.id, i);
      console.log('award', award);
      this.awards.push(award);
    }
    
    this.loading = false;
  },
  methods: {
    async join() {
      //dropdown box
      await joinEvent(this.id, this.teamName);
    },
    async sponsor() {
      //dropdown box
      await sponsor(this.id, this.awardName, this.prizeAmount, this.nftURL)
    },
    async addMember(teamId, address) {
      // dropdown box
      await addMember(this.id, teamId, address)
      
    }
  }
}
</script>
  