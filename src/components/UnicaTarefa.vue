<template>
	<box-amarelo>
		<div class="columns">
			<div class="column is-4">
				{{ tarefa.descricao || 'Tarefa sem descrição' }}
			</div>
			<div class="column is-3">
				{{ tarefa.projeto?.nome || 'N/D' }}
			</div>
			<div class="column">
				<tempo-cronometrado :tempoEmSegundos="tarefa.duracaoEmSegundos" />
			</div>
			<div class="column">
				<button
					title="Exluir"
					class="button is-danger is-small"
				>
					<span
						@click="excluir(tarefa)"
						class="icone"
					>
						<i class="fas fa-trash"></i>
					</span>
				</button>
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

		components: {
			BoxAmarelo,
			TempoCronometrado,
		},

		emits: ['excluir'],

		props: {
			tarefa: {
				type: Object as PropType<ITarefa>,
				required: true,
			},
		},

		methods: {
			excluir(tarefa: ITarefa) {
				this.$emit('excluir', tarefa);
			},
		},
	});
</script>
