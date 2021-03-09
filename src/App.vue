<template>
  <div class="web-comp-container" part="web-comp-container">
    <div part="venue-name-container" class="venue-name">
      <label part="venue-name-label" for="venue-name">{{ venueNameLabel }}</label>

      <textarea
        id="venue-name"
        part="venue-name-input"
        v-model="venueName"
      ></textarea>
    </div>

    <div part="purposes-container" class="purpose">
      <label part="purpose-label" for="purpose">{{ purposeLabel }}</label>

      <select v-model="purposeId" part="purposes-select">
        <option
          id="purpose"
          v-for="(purpose, index) in purposes"
          :key="index"
          part='purposes-select-option'
          :value="purpose.id"
        >
          {{ purpose.purposeName }}
        </option>
      </select>
    </div>

    <div part="attendees-container" class="attendees">
      <label part="attendees-label" for="attendees">{{ attendeesLabel }}</label>

      <textarea
        id="attendees"
        part="attendees-input"
        v-model="attendees"
      ></textarea>
    </div>

    <div part="search-button-container">
      <button part="search-button" @click="goToCoopaxSearchPage()">{{ searchText }}</button>
    </div>
  </div>
</template>

<script>
import '@/./config/axios';

export default {

  data() {
    return {
      purposes: [],
      venueName: '',
      purposeId: '',
      attendees: '',
    };
  },

  props: {
    src: { type: String, default: 'https://events-api.coopax.com' },
    venueNameLabel: { type: String, default: 'Onde será o evento' },
    purposeLabel: { type: String, default: 'Que tipo de evento' },
    attendeesLabel: { type: String, default: 'Quantas pessoas' },
    searchText: { type: String, default: 'Zoek' },
  },

  async mounted() {
    await this.$_fetchPurposesFromCoopax();
  },

  computed: {
    path() {
      return this.src.replace('-api', '');
    },
  },

  methods: {
    async $_fetchPurposesFromCoopax() {
      const apis = `${this.src}/v1/mastertable/purpose/list-active`

      const [resp] = await this.$to(this.$http.get(apis));

      this.purposes = resp.data.content;

      this.purposes = this.purposes.map(purpose => {
        purpose.purposeName = purpose.name.find(nameModel => nameModel.languageCode === 'en').data;
        return purpose;
      });
    },

    goToCoopaxSearchPage() {
      let linkToPush = `${this.path}/search?`;

      linkToPush += this.venueName ? `locationName=${this.venueName}` : '';

      linkToPush += this.purposeId ? `&purposeId=${this.purposeId}` : '';

      linkToPush += this.attendees ? `&attendees=${this.attendees}` : '';

      window.location.replace(linkToPush);
    },
  },
};
</script>

<style>
.web-comp-container {
  display: flex;
  justify-content: center;
  max-width: 500px;
  flex-direction: column;
  margin-left: 20px;
}

.venue-name {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.purpose {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.attendees {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

</style>
