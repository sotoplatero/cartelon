<textarea 
	name="url" 
	id="url" 
	bind:value={value}
	class="w-full text-xl font-semibold rounded-lg py-2 px-4 focus:outline-none h-full"
	style="color: #{color}; background-color: #{bg}"
></textarea>

<script>
	export let value, bg = 'fff', color = '000';
</script>