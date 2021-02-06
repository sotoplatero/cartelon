<script>
  // import { dark, theme } from "./store"; // dark mode
  import { fonts } from "./store"; // dark mode
  import { toClipboard } from "copee";
  import InputText from "./components/input.svelte"; 
  // import SelectOptions from "./components/select-options.svelte";
  import SelectColor from "./components/select-color.svelte";

  let text = 'Escribe las palabras mágicas';
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
    const cartel = await response.json();
    carteles = [ ...carteles, cartel ]
  }

</script>

<!-- Note: "class:dark" is equivalent (and short for) "class:dark={dark}" or "class:dark={dark === true}" -->
<div class="max-w-3xl mx-auto py-4">
  
  <header class="">
    <div class="">
      
      <!-- <h1 class="text-4xl md:text-5xl text-dark-blue-800 font-bold" >
          <span class="text-red-600">Cartelón</span>
      </h1> -->
      <div class="flex items-center space-x-1">
        <div class="mr-4">
          <svg class="h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>          
        </div>
  
        <div class="flex-grow">
          <InputText bind:value={text} />
        </div>
  
        <div>
          <SelectColor bind:value={bg} name="bgcolor"/>
        </div>
  
        <div>
          <SelectColor bind:value={color} name="color" />
        </div>

        <button class="px-2 py-2 bg-red-600 border-red-600 text-white border-2 rounded" on:click="{send}">
          <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>               
        </button>

      </div>
    </div>
  </header>
  
  <main id="builder" class="space-y-2 ">
    {#each carteles as cartel}
      <img src="data:image/png;base64, {cartel.src}" alt="{cartel.text}">
    {/each} 
  </main>
  
  <div class=" py-8 px-4">
  
  
    <footer class="my-8 text-center">
        Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
    </footer>
  
  </div>
</div>
