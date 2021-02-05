<div class="w-full">
	<select 
		bind:value={value} 
		class="w-full text-center" 
		style="background-color: {bgColor};" 
		name={name}
	>
		<option></option>
		{#each colors as color}
			<option 
				value={color[0].replace(/#/,'%23')} 
				style="background-color: {color[0]};"
				class="text-center"
			>
				&nbsp;
			</option>
		{/each}
	</select>
</div>

<script>
	export let value, name ;

	let colors = [
		['#FFFFFF','white'],
		['#000000','black'],
		['#F9FAFB','gray-50'],
		['#F3F4F6','gray-100'],
		['#E5E7EB','gray-200'],
		['#D1D5DB','gray-300'],
		['#9CA3AF','gray-400'],
		['#6B7280','gray-500'],
		['#4B5563','gray-600'],
		['#374151','gray-700'],
		['#1F2937','gray-800'],
		['#111827','gray-900'],
		['#FEF2F2','red-50'],
		['#FEE2E2','red-100'],
		['#FECACA','red-200'],
		['#FCA5A5','red-300'],
		['#F87171','red-400'],
		['#EF4444','red-500'],
		['#DC2626','red-600'],
		['#B91C1C','red-700'],
		['#991B1B','red-800'],
		['#7F1D1D','red-900'],
		['#FFFBEB','yellow-50'],
		['#FEF3C7','yellow-100'],
		['#FDE68A','yellow-200'],
		['#FCD34D','yellow-300'],
		['#FBBF24','yellow-400'],
		['#F59E0B','yellow-500'],
		['#D97706','yellow-600'],
		['#B45309','yellow-700'],
		['#92400E','yellow-800'],
		['#78350F','yellow-900'],		
		['#ECFDF5','green-50'],
		['#D1FAE5','green-100'],
		['#A7F3D0','green-200'],
		['#6EE7B7','green-300'],
		['#34D399','green-400'],
		['#10B981','green-500'],
		['#059669','green-600'],
		['#047857','green-700'],
		['#065F46','green-800'],
		['#064E3B','green-900'],		
		['#EFF6FF','blue-50'],
		['#DBEAFE','blue-100'],
		['#BFDBFE','blue-200'],
		['#93C5FD','blue-300'],
		['#60A5FA','blue-400'],
		['#3B82F6','blue-500'],
		['#2563EB','blue-600'],
		['#1D4ED8','blue-700'],
		['#1E40AF','blue-800'],
		['#1E3A8A','blue-900'],		
		['#EEF2FF','indigo-50'],
		['#E0E7FF','indigo-100'],
		['#C7D2FE','indigo-200'],
		['#A5B4FC','indigo-300'],
		['#818CF8','indigo-400'],
		['#6366F1','indigo-500'],
		['#4F46E5','indigo-600'],
		['#4338CA','indigo-700'],
		['#3730A3','indigo-800'],
		['#312E81','indigo-900'],		
		['#F5F3FF','purple-50'],
		['#EDE9FE','purple-100'],
		['#DDD6FE','purple-200'],
		['#C4B5FD','purple-300'],
		['#A78BFA','purple-400'],
		['#8B5CF6','purple-500'],
		['#7C3AED','purple-600'],
		['#6D28D9','purple-700'],
		['#5B21B6','purple-800'],
		['#4C1D95','purple-900'],		
		['#FDF2F8','pink-50'],
		['#FCE7F3','pink-100'],
		['#FBCFE8','pink-200'],
		['#F9A8D4','pink-300'],
		['#F472B6','pink-400'],
		['#EC4899','pink-500'],
		['#DB2777','pink-600'],
		['#BE185D','pink-700'],
		['#9D174D','pink-800'],
		['#831843','pink-900'],		
	];

	$: bgColor = colors.some(el => el[1]==value) ?  colors.find(el => el[1]==value)[0] : '#fff';

</script>