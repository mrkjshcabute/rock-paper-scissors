<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import rockImg from '@/assets/images/rock.png';
import paperImg from '@/assets/images/paper.png';
import scissorsImg from '@/assets/images/scissors.png';

const options = [
  { name: 'Rock', img: rockImg },
  { name: 'Paper', img: paperImg },
  { name: 'Scissors', img: scissorsImg }
];

const route = useRoute();
const router = useRouter();

const name = ref('');
const userChoice = ref('');
const computerChoice = ref('');
const result = ref('');
const showResult = ref(false);
const userScore = ref(0);
const computerScore = ref(0);

onMounted(() => {
  if (route.query.name) {
    name.value = route.query.name;
  }
});

function play(user) {
  userChoice.value = user.name;
  computerChoice.value = options[Math.floor(Math.random() * options.length)].name;
  result.value = getResult(userChoice.value, computerChoice.value);
  updateScore(result.value);
  showResult.value = true;

  setTimeout(() => {
    showResult.value = false;
  }, 2500);
}

function getResult(user, computer) {
  if (user === computer) return 'draw';
  if (
    (user === 'Rock' && computer === 'Scissors') ||
    (user === 'Paper' && computer === 'Rock') ||
    (user === 'Scissors' && computer === 'Paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function updateScore(res) {
  if (res === 'win') userScore.value++;
  else if (res === 'lose') computerScore.value++;
}

function getOptionImage(choice) {
  const option = options.find(o => o.name === choice);
  return option ? option.img : '';
}

const resultText = computed(() => {
  if (result.value === 'win') return 'YOU WIN!';
  if (result.value === 'lose') return 'YOU LOSE!';
  return "IT'S A DRAW!";
});

const resultColor = computed(() => {
  if (result.value === 'win') return 'text-green-600';
  if (result.value === 'lose') return 'text-red-600';
  return 'text-gray-600';
});

function resetScore() {
  userScore.value = 0;
  computerScore.value = 0;
}

function goHome() {
    router.push({ name: 'Home'})
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center p-4">
    <div class="w-[20rem] md:w-[25rem]">
      <transition name="fade" mode="out-in">
        <div v-if="showResult" key="result" class="text-center text-xl space-y-4 flex flex-col items-center justify-around h-screen">
          <div>
            <p class="mb-8 capitalize bg-[#8DBCC7] rounded-full p-1 font-semibold text-white">{{ name }}</p>
            <p class="mb-2"><strong>{{ userChoice }}</strong></p>
            <img :src="getOptionImage(userChoice)" alt="" class="w-30 md:w-32 mx-auto rotate-180" />
          </div>

          <h1 :class="['text-[40px] font-bold mb-4', resultColor]">{{ resultText }}</h1>

          <div>
            <img :src="getOptionImage(computerChoice)" alt="" class="w-30 md:w-32 mx-auto" />
            <p class="mt-2"><strong>{{ computerChoice }}</strong></p>
            <p class="mt-8 bg-[#8DBCC7] rounded-full p-2 font-semibold text-white">Computer</p>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-between h-screen pt-4">
          <div class="flex gap-8 text-lg mb-6 w-full">
            <div class="bg-[#A4CCD9] rounded-xl flex flex-col items-center p-4 w-[50%]">
              <p class="text-6xl font-bold text-gray-800 mb-4">{{ userScore }}</p>
              <p class="capitalize">{{ name }}</p>
            </div>
            <div class="bg-white/50 rounded-xl flex flex-col items-center p-4 w-[50%]">
              <p class="text-6xl font-bold text-gray-800 mb-4">{{ computerScore }}</p>
              <p>Computer</p>
            </div>
          </div>

          <div class="flex flex-col items-center mb-8 cursor-pointer" @click="goHome()">
            <h1 class="text-[76px] font-bold text-gray-800 leading-[0.8] ">ROCK</h1>
            <h1 class="text-[64px] font-bold text-gray-800 p-0 leading-[1] ">PAPER</h1>
            <h1 class="text-[44px] font-bold text-gray-800 leading-[0.8] ">SCISSORS</h1>
          </div>

          <div>
            <div class="flex space-x-8">
              <button
                v-for="(option, index) in options"
                :key="option.name"
                @click="play(option)"
                :class="[
                  'px-4 py-2 rounded-full bg-white/50 text-white hover:bg-[#A4CCD9]/50 transition transform hover:scale-105 flex flex-col items-center justify-center cursor-pointer active:bg-[#A4CCD9]/50 active:scale-105 active:outline-2 active:outline-[#8DBCC7] hover:outline-2 hover:outline-[#8DBCC7]',
                  index === 1 ? '-translate-y-12' : ''
                ]"
              >
                <img :src="option.img" :alt="option.name" class="w-12" />
              </button>
            </div>
            <div class="flex justify-center items-center">
              <button
                class="p-6 rounded-full bg-white/50 text-white hover:bg-[#A4CCD9]/50 active:bg-[#A4CCD9]/50 transition transform hover:scale-105 active:scale-105 flex flex-col items-center justify-center cursor-pointer hover:outline-2 hover:outline-[#8DBCC7] active:outline-2 active:outline-[#8DBCC7] -translate-y-4"
                @click="resetScore"
              >
                <i class="pi pi-sync text-black" style="font-size: 1.5rem"></i>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
