<template>
	<div class="is-flex is-align-items-center is-justify-content-space-between">
		<tempo-cronometrado :tempoEmSegundos="tempoEmSegundos" />
		<botao-icone
			@clicado="iniciar"
			:icone="'fas fa-play'"
			:texto="'Play'"
			:desabilitado="cronometroRodando"
		/>
		<botao-icone
			@clicado="finalizar"
			:icone="'fas fa-stop'"
			:texto="'Stop'"
			:desabilitado="!cronometroRodando"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import TempoCronometrado from './TempoCronometrado.vue';
	import BotaoIcone from './BotaoIcone.vue';

	export default defineComponent({
		name: 'TemporizadorSegundos',

		emits: ['temporizadorFinalizado'],

		components: {
			TempoCronometrado,
			BotaoIcone,
		},

		data() {
			return {
				tempoEmSegundos: 0,
				cronometro: 0,
				cronometroRodando: false,
			};
		},

		methods: {
			iniciar() {
				this.cronometro = setInterval(() => {
					this.tempoEmSegundos++;
				}, 1000);
				this.cronometroRodando = true;
			},

			finalizar() {
				clearInterval(this.cronometro);
				this.cronometroRodando = false;

				this.$emit('temporizadorFinalizado', this.tempoEmSegundos);
				this.tempoEmSegundos = 0;
			},
		},
	});
</script>
