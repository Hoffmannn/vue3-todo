<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router' 
</script>

<template>
  <main>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />


      <nav>
        <RouterLink to="/">All Todos</RouterLink>
        <RouterLink to="/completed">Completed Todos</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  flex-direction: row;
  line-height: 1.5;
  max-height: 100vh;
  align-items: center;
}


nav a.router-link-exact-active {
  text-decoration: underline;
}

nav :not(a.router-link-exact-active) {
  color: var(--color-text)
}


nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
