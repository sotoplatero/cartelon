<div>
	{#if label}
		<label for="email_address" class="block text-gray-700 font-semibold">{label}</label>
	{/if}
	<select bind:value={value} class="w-full">
		{#each options as option}
			<option value={option} class="">
				{ option }
			</option>
		{/each}
	</select>
</div>

<script>
	export let 
		options = [],
		label = '', 
		value;
</script>