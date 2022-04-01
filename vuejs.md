# Vuejs

## End-Goal: Be able to quickly prototype web-apps (like within-a-few-hours quick).

## Milestones

- Apr 30

## Notes

### From official Docs

- Mounting Vue App:

```html
<div id="app"></div>
```

```js
Vue.createApp({ ... }).mount("#app")
```

- Directives:

  - v-bind:

    - Dynamically bind javascript variables to html attributes

    ```html
    <div v-bind:title="some_var"></div>
    ```

    ```js
    data() {
        return {
            some_var: "some_val"
          }
      }
    ```

    - Shorthand `v-bind:<attr>` => `:<attr>`

    - Dynamic Attribute `:[expr]="some_var"`

    - Can be used to pass props to child `:[prop_name]="prop_val"`

    - v-bind:class TODO
    - v-bind:style TODO

  - v-on:

    - Attach event listeners

    ```html
    <div v-on:click="some_fn"></div>
    ```

    ```js
    methods: {
        some_fn() { ... }
      }
    ```

    - Shorthand `v-on:<event>` => `@<event>`

  - v-model:

    - 2-way data binding (between html form and javascript object)

    ```html
    <input v-model="some_var"></input>
    ```

    ```js
    data() {
        return {
            some_var: "some_val"
          }
      }
    ```

  - v-if, v-elseif, v-else:

    - Conditionally render html

    ```html
    <div v-if="some_var"></div>
    <div v-elseif="some_var"></div>
    <div v-else></div>
    ```

    - v-show is similar but uses css display to modify visibility

  - v-once: TODO

  - v-html: TODO

- Component Properties (inside createApp({ ... })):

  - data() { ... } = Data (object) passed to instance

  - mounted() { ... } = Functions passed to instance

  - computed() { ... } = Functions that return calculated strings when data() changes (cached!)

  - watch() { ... } = Functions that run when data changes (async ops or data dependencies)

  - Hooks:
    - Types: created, mounted, updated, unmounted
    - Usage: [before]<hook>() { ... }

- Events:
