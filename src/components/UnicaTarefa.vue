<template>
	<box-amarelo>
		<div class="columns">
			<div class="column is-7">
				{{ tarefa.descricao || 'Tarefa sem descrição' }}
			</div>
			<div class="column">
				<tempo-cronometrado :tempoEmSegundos="tarefa.duracaoEmSegundos" />
			</div>
		</div>
	</box-amarelo>
</template>

<script lang="ts">
	import ITarefa from '@/interfaces/ITarefa';
	import { defineComponent, PropType } from 'vue';
	import BoxAmarelo from './BoxAmarelo.vue';
	import TempoCronometrado from './TempoCronometrado.vue';

	export default defineComponent({
		name: 'UnicaTarefa',

		props: {
			tarefa: {
				type: Object as PropType<ITarefa>,
				required: true,
			},
		},

		components: {
			BoxAmarelo,
			TempoCronometrado,
		},
	});
</script>
