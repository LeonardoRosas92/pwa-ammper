<template>
  <header class="w-full overflow-x-hidden ">
    <NavigationComponent/>
  </header>
  <section class="flex-1 bg-[url('../assets/banco.jpg')] bg-cover">
    <router-view/>
  </section>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
export default{
  components: { NavigationComponent }
}
</script>