<script>
	import { createEventDispatcher } from 'svelte';    
    import { colors } from "../store"; // dark mode   
    
    const dispatch = createEventDispatcher();
    export let color = 'fff';
    export let title = 'Select color';

    let isOpen = false
    const open = () => isOpen = true;
    const close = () => isOpen = false;

    function keydown(e) {
        if (e.key === 'Escape') {
            close()
        }
    }    

    function select(selectedColor){
        color = selectedColor;
        close();
    }
  </script>
<!-- This example requires Tailwind CSS v2.0+ -->

<button 
    on:click="{open}" 
    {title}
    class="
        p-2 
        bg-white 
        text-gray-600 
        hover:bg-gray-100
        rounded ">
    <slot></slot>
</button>

{#if isOpen}    
<div class="fixed z-10 inset-0 overflow-y-auto" on:keydown|stopPropagation={keydown} tabindex={0} autofocus>
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div on:click="{close}" class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <!--
        Modal panel, show/hide based on modal state.
        
        Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-1">

                {#each $colors as variants}
                        <div class="min-w-0 flex-1 grid grid-cols-10 2xl:grid-cols-10 gap-x-1 2xl:gap-x-2">
                        {#each variants as color}
                            <button 
                                on:click="{select(color[0])}" 
                                class="
                                    h-8 w-full 
                                    rounded 
                                    border
                                    border-
                                    hover:
                                    ring-inset ring-black
                                    hover:ring- " 
                                style="background-color: #{color[0]};"
                            >
                            </button>
                        {/each}
                    </div>
                {/each}
                
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button on:click="{close}" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
{/if}    
