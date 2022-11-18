<template>
  <q-layout view="lhh lpR fFf"> 
    <q-header reveal class="bg-background text-white">
      <q-toolbar>       
        <q-btn flat to="/">
          <q-toolbar-title>
            <q-icon name="mdi-shield-half-full" />
            School
          </q-toolbar-title>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style>
  .bg-background{ background-color: #1A2E60;}
</style>