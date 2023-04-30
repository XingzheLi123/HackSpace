<template>
  <div style="margin: 3em">
    <h1>
      <span class="index">#{{ $route.params.id }}</span>
      {{ event.name }}
    </h1>
    <span>Organizer: <span class="address">{{ event.organizer }}</span></span>

    <h2>Teams</h2>
    <div v-for="team in teams" class="card">
      <span class="index">#{{ team.id }}</span>
      <span></span>
    </div>

    <div v-if="loading" class="loading"></div>
  </div>
</template>

<script>
import { view_event, view_team_num, view_team, view_award_num, view_award } from '@/SCinteraction.js';

export default {
  name: 'Event',
  data() {
    return {
      event: {},
      awards: [],
      teams: [],
      loading: true
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.event = await view_event(id);
    console.log(this.event);

    const numTeams = (await view_team_num(id)).toNumber();
    this.teams = [];
    for (let i = 0; i < numTeams; i++) {
      const team = await view_team(id, i);
      console.log('team', team);
      this.teams.push(team);
    }

    const numAwards = (await view_award_num(id)).toNumber();
    this.awards = [];
    for (let i = 0; i < numAwards; i++) {
      const award = await view_award(id, i);
      console.log('award', award);
      this.awards.push(award);
    }
    
    this.loading = false;
  }
}
</script>
  