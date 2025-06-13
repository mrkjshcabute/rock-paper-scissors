<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router'

    const name = ref('');
    const router = useRouter();
    const invalid = ref(false);

    function goToMain() {
        if (!name.value.trim()) {
            invalid.value = true;
            return;
        }
        invalid.value = false;
        router.push({ name: 'Main', query: { search: name.value } });
    }
</script>

<template>
    <div class="flex justify-around items-center h-screen bg-blue-100">
        <div class="w-full flex justify-around items-center gap-8">
            <div>
                <div class="flex flex-col mb-4">
                    <h1 class="text-8xl text-center md:text-9xl font-bold text-gray-800 leading-[0.8]">ROCK</h1>
                    <h1 class="text-[84px] text-center md:text-[112px] font-bold text-gray-800 p-0 leading-[1]">PAPER</h1>
                    <h1 class="text-[56px] text-center md:text-[76px] font-bold text-gray-800 leading-[0.8]">SCISSORS</h1>
                </div>

                <input
                    v-model="name"
                    @keyup.enter="goToMain"
                    @input="invalid = false"
                    placeholder="Input your name"
                    :class="[
                        'w-full pr-4 py-3 px-4 bg-white rounded-xl text-black mt-4 outline-none',
                        invalid ? 'border-2 border-red-500' : 'outline-[#8DBCC7] hover:outline-[#8DBCC7] focus:outline-2 focus:outline-[#8DBCC7]'
                    ]"
                />
            </div>

            <img src="../assets/pic.png" alt="" class="hidden md:block">
        </div>
    </div>
</template>