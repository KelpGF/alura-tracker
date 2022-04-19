<template>
	<main
		class="columns is-gapless is-multiline"
		:class="{ 'modo-escuro': modoEscuroAtivo }"
	>
		<div class="column is-one-quarter">
			<barra-lateral @temaAlterado="alterarTema" />
		</div>
		<div class="column is-three-quarter estilo-modo">
			<formulario-tarefa @enviarForm="salvarTarefa" />
			<div class="lista">
				<unica-tarefa
					:key="`tarefa-${idx}`"
					v-for="(tarefa, idx) in tarefas"
					:tarefa="tarefa"
				/>
				<box-amarelo v-if="listaVazia"> Bora colocar a mão na massa, meu fi! </box-amarelo>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import UnicaTarefa from './components/UnicaTarefa.vue';
	import BarraLateral from './components/BarraLateral.vue';
	import BoxAmarelo from './components/BoxAmarelo.vue';
	import FormularioTarefa from './components/FormularioTarefa.vue';
	import ITarefa from './interfaces/ITarefa';

	export default defineComponent({
		name: 'App',

		components: {
			UnicaTarefa,
			BarraLateral,
			BoxAmarelo,
			FormularioTarefa,
		},

		data() {
			return {
				tarefas: [] as ITarefa[],
				modoEscuroAtivo: false,
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

			alterarTema(modoEscuroAtivo: boolean) {
				this.modoEscuroAtivo = modoEscuroAtivo;
			},
		},
	});
</script>

<style scoped>
	.lista {
		padding: 1.25rem;
	}

	main {
		--bg-primario: #fff;
		--texto-primario: #000;
	}

	main.modo-escuro {
		--bg-primario: #2b2d42;
		--texto-primario: #ddd;
	}

	.estilo-modo {
		background-color: var(--bg-primario) !important;
		color: var(--texto-primario) !important;
	}
</style>
