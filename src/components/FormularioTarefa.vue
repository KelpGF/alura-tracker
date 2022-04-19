<template>
	<div class="box estilo-modo">
		<div class="columns">
			<div
				role="form"
				class="column is-8"
				aria-label="Formulário para criação de uma nova tarefa"
			>
				<input
					type="text"
					class="input"
					v-model="descricao"
					placeholder="Qual tarefa você deseja iniciar?"
				/>
			</div>
			<div class="column estilo-modo">
				<temporizador-segundos @temporizadorFinalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import ITarefa from '@/interfaces/ITarefa';
	import { defineComponent } from 'vue';
	import TemporizadorSegundos from './TemporizadorSegundos.vue';

	export default defineComponent({
		name: 'FormularioTarefa',

		emits: ['enviarForm'],

		components: {
			TemporizadorSegundos,
		},

		data() {
			return {
				descricao: '',
			};
		},

		methods: {
			finalizarTarefa(tempoDecorrido: number): void {
				if (tempoDecorrido === 0) return;

				const tarefa: ITarefa = {
					descricao: this.descricao,
					duracaoEmSegundos: tempoDecorrido,
				};

				this.$emit('enviarForm', tarefa);

				this.descricao = '';
			},
		},
	});
</script>
