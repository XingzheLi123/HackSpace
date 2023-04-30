<template>
  <div style="margin: 3em">
    <h1>
      <span class="index">#{{ $route.params.id }}</span>
      {{ event.name }}
    </h1>
    <p>Organizer: <span class="address">{{ event.organizer }}</span></p>

    <div @click="joinModalActive = true;" v-if="!isParticipant" style="cursor: pointer;" class="card card-hover">+ Join as Team Captain</div>
    <Modal title="Join as Team Captain" :fields="['Team name']" :action="join"
    v-model:active="joinModalActive"></Modal>

    <div @click="addMemberModalActive = true;" v-if="isCaptain" style="cursor: pointer;" class="card card-hover">+ Add a Team Member</div>
    <Modal title="Add a Team Member" :fields="['Team ID', 'Member address']" :action="addMember"
      v-model:active="addMemberModalActive"></Modal>

    <div @click="sponsorModalActive = true;" style="cursor: pointer;" class="card card-hover">+ Sponsor an Award</div>
    <Modal title="Sponsor an Award" :fields="['Award name', 'Award amount (BIT)', 'NFT URI']" :action="sponsor"
      v-model:active="sponsorModalActive "></Modal>

    <h2>Teams</h2>
    <div v-for="team in teams" class="card">
      <span class="index">#{{ team.id }}</span>
      <b style="flex-grow: 1">{{ team.name }}</b>
      <span v-if="team.isMine">(My team)</span>
      <span>{{ team.members.length }} members</span>
    </div>

    <h2>Awards</h2>
    <div v-for="award in awards" class="card">
      <span class="index">#{{ award.id }}</span>
      <b style="flex-grow: 1">{{ award.name }}</b>
      <span>Prize: {{ formatEther(award.prize) }}</span>
      <span>Sponsor: <span class="address">{{ award.sponsor }}</span></span>
      <a class="link" v-if="award.sponsor == userAddress || event.organizer == userAddress"
        @click="chooseWinModalActive = true;">Choose Winner</a>
      <Modal title="Choose a Winning Team" :fields="['Team ID']" :action="teamId => chooseW(award.id, teamId)"
        v-model:active="chooseWinModalActive"></Modal>
      <a class="link" v-if="teamId == award.sponsorDesignation && teamId == award.organizerDesignation"
        @click="claim(award.id, teamId)">Claim Awards</a>
      <span></span>
    </div>
    <div v-if="loading" class="loading"></div>
  </div>
</template>

<script>
import { view_event, view_team_num, view_team, view_award_num, view_award, view_members_num, view_member } from '@/SCinteraction.js';
import { joinEvent, sponsor, selectWinner, addMember, claimAward, userAddress } from '@/SCinteraction.js';
import Modal from '@/components/Modal.vue'
const ethers = require('ethers');

export default {
  name: 'Event',
  components: {
    Modal
  },
  data() {
    return {
      id: 0,
      event: {},
      awards: [],
      teams: [],
      loading: true,

      userAddress: '',

      joinModalActive: false,
      addMemberModalActive: false,
      sponsorModalActive: false,
      chooseWinModalActive: false,

      // TODO

      isParticipant: false,
      isCaptain: false,
      teamId: -1

    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.userAddress = await userAddress();
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
        team.isMine = false;
        if (member === this.userAddress) {
          team.isMine = true;
          this.isParticipant = true;
          this.teamId = i;
          if (j == 0) {
            this.isCaptain = true;
          }
        }
        team.members.push(member);
      }
      console.log('team', team);
      this.teams.push(team);
    }

    const numAwards = (await view_award_num(this.id)).toNumber();
    console.log(numAwards)
    this.awards = [];
    for (let i = 0; i < numAwards; i++) {
      const award = await view_award(this.id, i);
      console.log('award', award);
      this.awards.push(award);
    }

    this.loading = false;
  },
  methods: {
    async join(teamName) {
      //dropdown box
      await joinEvent(this.id, teamName);
    },
    async sponsor(awardName, prizeAmount, nftURL) {
      //dropdown box
      await sponsor(this.id, awardName, prizeAmount, nftURL);
    },
    async addMember(teamId, address) {
      // dropdown box
      await addMember(this.id, teamId, address)

    },
    async chooseW(awardId, teamId) {
      await selectWinner(this.id, awardId, teamId)
    },
    async claim(awardId, teamId) {
      await claimAward(this.id, awardId, teamId)
    },
    formatEther(amount) {
      return ethers.utils.formatEther(amount) + ' BIT';
    }
  }
}
</script>
  