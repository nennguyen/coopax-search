# coopax-search

## Install web component
```
npm install --save coopax-search
```

### In your main.js, or a similar entry point for your app:
```
import SearchComponent from 'coopax-search';
import Vue from 'vue';
Vue.component(SearchComponent);
```

### Now it's able to use anywhere in your app like this
```
<coopax-search
    src="your source" // only use for testing
    path="your path" // only user for testing
    venue-name-label="name input label"
    purpose-label="purpose input label"
    attendees-label="attendee input label"
    search-text="search button text"
></coopax-search>
```

### You can change css by part name like this
```
coopax-search::part(web-comp-container) {
    background-color: red;
}

We have these parts:
    web-comp-container
    venue-name-container
    venue-name-label
    venue-name-input
    purposes-container
    purpose-label
    purposes-select
    purposes-select-option
    attendees-container
    attendees-label
    attendees-input
    search-button-container
    search-button
```

### You can import directly to html file by add
```

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
