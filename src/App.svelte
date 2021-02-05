<script>
  // import { dark, theme } from "./store"; // dark mode
  import { fonts } from "./store"; // dark mode
  import { toClipboard } from "copee";
  import InputText from "./components/input.svelte"; 
  // import SelectOptions from "./components/select-options.svelte";
  import SelectColor from "./components/select-color.svelte";

  let text = 'Escribe las palabtas mágicas';
  let loading = false;
  let bg = '';
  let color = '';
  let font = '';
  let url;
  let carteles = [];

  $: {
    url = `/api/cartel?text=${text}&bg=${bg}&color=${color}&font=${font}`;
    encodeURI(url);
  }

  $: url && (loading = true);

  async function send() {
    const response = await fetch(url);
    const img = await response.json();
    carteles = [ ...carteles, img ]
  }

</script>

<!-- Note: "class:dark" is equivalent (and short for) "class:dark={dark}" or "class:dark={dark === true}" -->
<header class="max-w-3xl mx-auto py-4">
  <div class="">
    
    <!-- <h1 class="text-4xl md:text-5xl text-dark-blue-800 font-bold" >
        <span class="text-red-600">Cartelón</span>
    </h1> -->
    <div class="flex items-center">
      <div class="mr-4">
        <svg class="h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>        
      </div>

      <div class="flex-grow">
        <InputText 
          bind:value={text} 
        />
      </div>

      <div>
        <SelectColor bind:value={bg} name="bgcolor"/>
      </div>

      <div>
        <SelectColor bind:value={color} name="color" />
      </div>
      <button class="px-2 py-2 bg-indigo-600 border-indigo-600 text-white border" on:click="{send}">
        <svg class="h-6 w-6"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>        
      </button>
    </div>
  </div>
</header>
<main id="builder" class="max-w-4xl mx-auto space-y-2 ">
  {#each carteles as src}
    <img src="data:image/png;base64, {src}" alt="">
  {/each} 
</main>

<div class=" py-8 px-4">


  <footer class="my-8 text-center">
      Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
      <a href="https://unavatar.now.sh/" target="_black" rel="noreferer noopnener" class="text-sm text-gray-500">Thank to unavatar by @Kikobeats</a> 
  </footer>

</div>
