<template>
  <div class="text-white p-2">
    <div class="max-w-sm h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
      <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png">
      <div class="w-full px-4 absolute top-8">
        <div class="flex justify-between">
          <div class="">
            <p class="font-medium tracking-widest">
              {{props.cuenta.type}}
            </p>
            <p class="font-light">
              {{props.cuenta.name}}
            </p>
          </div>
          <!-- <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/> -->
          <img v-if="banco" class="w-14 h-14" :src="img[banco.split('_')[0]]"/>
        </div>
          <div class="pt-1">
            <p class="font-light">
              Cuenta
            </p>
            <p class="font-medium tracking-more-wider">
              {{props.cuenta.number}}
            </p>
          </div>
          <div class="pt-6 pr-6">
            <div class="flex justify-between">
              <div class="">
                <p class="font-light text-xs">
                Divisa
                </p>
                <p class="font-medium tracking-wider text-sm">
                  {{props.cuenta.currency}}
                </p>
              </div>
              <div class="">
                <p class="font-light text-xs">
                  Balance
                </p>
                <p class="font-bold tracking-more-wider text-sm">
                  {{props.cuenta.balance.available}}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['cuenta','banco']);
const img = ref(
  {
    "erebor" : "https://statics.sandbox.belvo.io/institutions/icon_logos/erebor.svg",
    "gotham" : "https://statics.sandbox.belvo.io/institutions/icon_logos/gotham.svg",
    "gringotts" : "https://statics.sandbox.belvo.io/institutions/icon_logos/gringotts.svg",
    "heimdall" : "https://statics.sandbox.belvo.io/institutions/icon_logos/heimdall.svg",
    "ironbank" : "https://statics.sandbox.belvo.io/institutions/icon_logos/ironbank.svg",
    "planet " : "https://statics.sandbox.belvo.io/institutions/icon_logos/planet_express_icon.svg",
    "tatooine" : "https://statics.sandbox.belvo.io/institutions/icon_logos/tatooine.svg"
  }
);
</script>

<style>

</style>