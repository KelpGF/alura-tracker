<template>
	<formulario-tarefa @enviarForm="salvarTarefa" />
	<div class="lista">
		<unica-tarefa
			:key="`tarefa-${idx}`"
			v-for="(tarefa, idx) in tarefas"
			:tarefa="tarefa"
			@excluir="excluirTarefa"
		/>
		<box-amarelo v-if="listaVazia"> Bora colocar a mão na massa, meu fi! </box-amarelo>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from 'vue';
	import UnicaTarefa from '@/components/UnicaTarefa.vue';
	import BoxAmarelo from '@/components/BoxAmarelo.vue';
	import FormularioTarefa from '@/components/FormularioTarefa.vue';
	import ITarefa from '@/interfaces/ITarefa';
	import { useStore } from '@/store';
	import { ADD_TAREFA, EXCLUIR_TAREFA } from '@/store/tipos-mutacaoes';

	export default defineComponent({
		name: 'TarefasView',

		components: {
			UnicaTarefa,
			BoxAmarelo,
			FormularioTarefa,
		},

		computed: {
			listaVazia(): boolean {
				return this.tarefas.length === 0;
			},
		},

		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.store.commit(ADD_TAREFA, tarefa);
			},
			excluirTarefa(tarefa: ITarefa) {
				this.store.commit(EXCLUIR_TAREFA, tarefa.descricao);
			},
		},

		setup() {
			const store = useStore();

			return {
				store,
				tarefas: computed(() => store.state.tarefas),
			};
		},
	});
</script>
