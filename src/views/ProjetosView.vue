<template>
	<section class="projetos">
		<h1 class="title">Projetos</h1>
		<form @submit.prevent="salvar">
			<div class="field">
				<label
					for="nomeProjeto"
					class="label"
				>
					Nome do Projeto
				</label>
				<input
					type="text"
					class="input"
					v-model="nomeProjeto"
				/>
			</div>
			<div class="field">
				<button
					class="button"
					type="submit"
				>
					Salvar
				</button>
			</div>
		</form>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome</th>
				</tr>
			</thead>
			<tbody>
				<tr
					:key="projeto.id"
					v-for="projeto in projetos"
				>
					<th>{{ projeto.id }}</th>
					<th>{{ projeto.nome }}</th>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import IProjeto from '@/interfaces/IProjeto';

	export default defineComponent({
		name: 'ProjetosView',

		data() {
			return {
				nomeProjeto: '',
				projetos: [] as IProjeto[],
			};
		},

		methods: {
			salvar() {
				const projeto: IProjeto = {
					id: new Date().toISOString(),
					nome: this.nomeProjeto,
				};

				this.projetos.push(projeto);
				this.nomeProjeto = '';
			},
		},
	});
</script>

<style scoped>
	.projetos {
		padding: 1.25rem;
	}
</style>
