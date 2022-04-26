<template>
	<header>
		<h1>
			<img
				alt=""
				src="../assets/logo.png"
			/>
		</h1>
		<div class="has-text-centered">
			<button
				class="button is-light"
				@click="alterarTema"
			>
				{{ textoBotaoTema }} modo escuro
			</button>
		</div>
		<nav class="panel mt-5">
			<ul>
				<li
					:key="`${rota.texto}-${idx}`"
					v-for="(rota, idx) in listaRotas"
				>
					<router-link
						class="link"
						:to="rota.url"
						:class="[$route.path === rota.url && 'router-link-active']"
					>
						<i :class="rota.icone"></i>
						{{ rota.texto }}
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { rotas } from '@/routes/index';
	import { IRotaNav } from '@/interfaces/IRotaNav';

	export default defineComponent({
		name: 'BarraLateral',

		emit: ['temaAlterado'],

		data() {
			return {
				temaEscuro: false,
				iconesRotas: ['fas fa-tasks', 'fas fa-project-diagram'],
			};
		},

		computed: {
			textoBotaoTema(): string {
				return this.temaEscuro ? 'Desativar' : 'Ativar';
			},

			listaRotas(): IRotaNav[] {
				return rotas.slice(0, 2).map(({ path, name }, idx) => {
					return {
						url: path,
						texto: name as string,
						icone: this.iconesRotas[idx],
					};
				});
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
	}

	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
			text-align: center;
		}
	}

	.panel li {
		margin: 8px 0;
	}
	.link {
		color: #fff;
	}
	.link:hover {
		color: #faf0ca;
	}
	.link.router-link-active {
		color: #faf0ca;
	}
</style>
