<script>
  // import { dark, theme } from "./store"; // dark mode
	import { onMount } from 'svelte';  
  import { fonts } from "./store"; // dark mode
  import { toClipboard } from "copee";
  import InputText from "./components/input.svelte"; 
  import ModalColor from "./components/modal-color.svelte"; 

	onMount(async () => {
		const res = await fetch(`/api/carteles`);
		carteles = (await res.json()).reverse();
	});  

  let text = 'Type your awesome words';
  let loading = false;
  let bg = 'fff';
  let color = '000';
  let carteles = [];
  
  async function send() {
    let url = `/api/cartel?text=${encodeURIComponent(text)}&bg=${bg}&color=${color}`;
    loading = true;
    const response = await fetch(url);
    const cartel = await response.json();
    loading = false;
    carteles = [ cartel, ...carteles ]
  }

</script>

<!-- Note: "class:dark" is equivalent (and short for) "class:dark={dark}" or "class:dark={dark === true}" -->
<div class="w-11/12 mx-auto ">
  
  <header class="py-3">
    <div class="flex items-center space-x-1">
      <div class="mr-2">
        <svg class="h-12 w-12 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>          
      </div>
      <div class="font-bold text-2xl uppercase">Cartelon</div>
    </div>
  </header>
  
</div>

<main id="builder" class="w-11/12 mx-auto ">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg: gap-2">
    <div class="flex flex-col justify-between bg-white p-3 rounded-lg border-4 border-red-700">
      <InputText 
        bind:value={text} 
        {color} {bg}
      />
      <div class="flex justify-between mt-2">
        <div >

          <ModalColor 
            title="Select Text Color"
            bind:color="{color}"
            >
            <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>                       
          </ModalColor> 
          
          <ModalColor 
            title="Select Background Color"
            bind:color="{bg}" 
          >
            <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>                      
          </ModalColor>     

        </div>

    
        <button 
          on:click="{send}"
          type="button"
          disabled={loading}
          class="
            inline-flex 
            items-center
            px-4 py-2 
            font-bold
            bg-red-500 
            border-red-800 
            text-white 
            border-2 
            rounded-lg 
            disabled:opacity-50
            hover:border-red-900
            hover:bg-red-600" 
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>        
          {/if}
          Write
        </button>        
      </div>
    </div>
    <div><img class="rounded-lg" src="/img/create_posters.png" alt="Create cards with your favorite phrases"></div>
    <div><img class="rounded-lg" src="/img/easy_and_fun.png" alt="Easy and fun"></div>

    {#each carteles as cartel}
      <div class="relative">

        <img 
          loading="lazy"
          class="lazyload rounded-lg"
          src="data:image/png;base64, {cartel.src}" 
          alt="{cartel.text}">

        <div class="absolute bottom-0 right-0 ">
          <a href="data:image/png;base64, {cartel.src}" download="{cartel.text}.png">
            <svg class="h-5 w-5 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>            
          </a>
        </div>

      </div>
    {:else}
      <p>loading...</p>
    {/each} 
  </div>
</main>

<div class=" py-8 px-4">


  <footer class="my-8 text-center">
      Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
  </footer>

</div>
