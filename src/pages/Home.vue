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
        router.push({ name: 'Main', query: { name: name.value } });
    }
</script>

<template>
    <div class="flex justify-around items-center h-screen">
        <div class="w-full flex justify-around items-center gap-8 mx-[20px]">
            <div>
                <div class="flex flex-col mb-4">
                    <h1 class="text-[100px] md:text-9xl font-bold text-gray-800 leading-[0.8]">ROCK</h1>
                    <h1 class="text-[86px] md:text-[112px] font-bold text-gray-800 p-0 leading-[1]">PAPER</h1>
                    <h1 class="text-[59px] md:text-[77px] font-bold text-gray-800 leading-[0.8]">SCISSORS</h1>
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

            <img src="../assets/pic.png" alt="" class="hidden md:block w-[40%]">
        </div>
    </div>
</template>