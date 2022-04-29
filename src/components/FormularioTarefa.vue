<template>
	<div class="box estilo-modo">
		<div class="columns">
			<div
				role="form"
				class="column is-5"
				aria-label="Formulário para criação de uma nova tarefa"
			>
				<input
					type="text"
					class="input"
					v-model="descricao"
					placeholder="Qual tarefa você deseja iniciar?"
				/>
			</div>
			<div class="column is-3">
				<div class="select">
					<select v-model="idProjeto">
						<option value="">Nenhum projeto</option>
						<option
							:key="projeto.id"
							:value="projeto.id"
							v-for="projeto in projetos"
						>
							{{ projeto.nome }}
						</option>
					</select>
				</div>
			</div>
			<div class="column estilo-modo">
				<temporizador-segundos @temporizadorFinalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { useStore } from 'vuex';
	import { keyStore } from '@/store';

	import ITarefa from '@/interfaces/ITarefa';
	import { computed, defineComponent, ref } from 'vue';
	import TemporizadorSegundos from './TemporizadorSegundos.vue';

	export default defineComponent({
		name: 'FormularioTarefa',

		emits: ['enviarForm'],

		components: {
			TemporizadorSegundos,
		},

		// data() {
		// 	return {
		// 		idProjeto: '',
		// 		descricao: '',
		// 	};
		// },

		// methods: {
		// 	finalizarTarefa(tempoDecorrido: number): void {
		// 		if (tempoDecorrido === 0) return;

		// 		const tarefa: ITarefa = {
		// 			descricao: this.descricao,
		// 			duracaoEmSegundos: tempoDecorrido,
		// 			projeto: this.projetos.find((p) => p.id == this.idProjeto) || null,
		// 		};

		// 		this.$emit('enviarForm', tarefa);

		// 		this.descricao = '';
		// 	},
		// },

		setup(props, { emit }) {
			const store = useStore(keyStore);

			const descricao = ref('');
			const idProjeto = ref('');
			const projetos = computed(() => store.state.projeto.projetos);

			const finalizarTarefa = (tempoDecorrido: number): void => {
				if (tempoDecorrido === 0) return;

				const tarefa: ITarefa = {
					descricao: descricao.value,
					duracaoEmSegundos: tempoDecorrido,
					projeto: projetos.value.find((p) => p.id == idProjeto.value) || null,
				};

				emit('enviarForm', tarefa);

				descricao.value = '';
			};

			return {
				descricao,
				idProjeto,
				projetos,
				finalizarTarefa,
			};
		},
	});
</script>

<style scoped>
	.estilo-modo {
		background-color: var(--bg-primario) !important;
		color: var(--texto-primario) !important;
	}
</style>
