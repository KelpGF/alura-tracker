<template>
	<section>
		<router-link
			to="/projetos/novo"
			class="button is-info"
		>
			<span class="icon is-small">
				<i class="fas fa-plus"></i>
			</span>
			<span>Novo projeto</span>
		</router-link>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr
					:key="projeto.id"
					v-for="projeto in projetos"
				>
					<td>{{ projeto.id }}</td>
					<td>{{ projeto.nome }}</td>
					<td>
						<router-link
							:to="`/projetos/${projeto.id}/editar`"
							class="button is-warning"
						>
							<span class="icon is-small">
								<i class="fas fa-pencil-alt"></i>
							</span>
						</router-link>
						<button
							class="button ml-2 is-danger"
							@click="excluir(projeto.id)"
						>
							<span class="cin is-small">
								<i class="fas fa-trash"></i>
							</span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts">
	import { useStore } from '@/store';
	import { EXCLUIR_PROJETO } from '@/store/tipos-mutacaoes';
	import { computed, defineComponent } from 'vue';

	export default defineComponent({
		name: 'ProjetosLista',

		data() {
			return {
				nomeProjeto: '',
			};
		},

		setup() {
			const store = useStore();

			return {
				store,
				projetos: computed(() => store.state.projetos),
			};
		},

		methods: {
			excluir(id: string) {
				this.store.commit(EXCLUIR_PROJETO, id);
			},
		},
	});
</script>
