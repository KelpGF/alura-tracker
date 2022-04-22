<template>
	<formulario-tarefa @enviarForm="salvarTarefa" />
	<div class="lista">
		<unica-tarefa
			:key="`tarefa-${idx}`"
			v-for="(tarefa, idx) in tarefas"
			:tarefa="tarefa"
		/>
		<box-amarelo v-if="listaVazia"> Bora colocar a mão na massa, meu fi! </box-amarelo>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import UnicaTarefa from '@/components/UnicaTarefa.vue';
	import BoxAmarelo from '@/components/BoxAmarelo.vue';
	import FormularioTarefa from '@/components/FormularioTarefa.vue';
	import ITarefa from '@/interfaces/ITarefa';

	export default defineComponent({
		name: 'TarefasView',

		components: {
			UnicaTarefa,
			BoxAmarelo,
			FormularioTarefa,
		},

		data() {
			return {
				tarefas: [] as ITarefa[],
			};
		},

		computed: {
			listaVazia(): boolean {
				return this.tarefas.length === 0;
			},
		},

		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.tarefas.push(tarefa);
			},
		},
	});
</script>
