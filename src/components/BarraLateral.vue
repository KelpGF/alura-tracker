<template>
	<header>
		<h1>
			<img
				alt=""
				src="../assets/logo.png"
			/>
		</h1>
		<button
			class="button"
			@click="alterarTema"
		>
			{{ textoBotaoTema }} modo escuro
		</button>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'BarraLateral',

		emit: ['temaAlterado'],

		data() {
			return {
				temaEscuro: false,
			};
		},

		computed: {
			textoBotaoTema(): string {
				return this.temaEscuro ? 'Desativar' : 'Ativar';
			},
		},

		methods: {
			alterarTema() {
				this.temaEscuro = !this.temaEscuro;
				this.$emit('temaAlterado', this.temaEscuro);
			},
		},
	});
</script>

<style scoped>
	header {
		padding: 1rem;
		background: #0d3b66;
		width: 100%;
		height: 100vh;
		text-align: center;
	}

	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
			text-align: center;
		}
	}
</style>
