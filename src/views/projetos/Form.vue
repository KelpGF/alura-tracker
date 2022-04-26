<template>
	<section>
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
					class="button is-success"
					type="submit"
				>
					<span class="icon is-small">
						<i class="fas fa-check"></i>
					</span>
					<span>Salvar</span>
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { useStore } from '@/store';
	import { ADD_PROJETO, EDITAR_PROJETO } from '@/store/tipos-mutacaoes';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { notificacaoMixin } from '@/mixins/notificar';

	export default defineComponent({
		name: 'ProjetosForm',

		mixins: [notificacaoMixin],

		props: {
			id: {
				type: String,
			},
		},

		data() {
			return {
				nomeProjeto: '',
			};
		},

		methods: {
			salvar() {
				if (this.id) {
					this.store.commit(EDITAR_PROJETO, { id: this.id, nome: this.nomeProjeto });
					this.notificar({
						titulo: 'Alterações salvas',
						texto: 'O projeto foi atualizado com sucesso',
						tipo: TipoNotificacao.SUCESSO,
					});
				} else {
					this.store.commit(ADD_PROJETO, this.nomeProjeto);
					this.notificar({
						titulo: 'Excelente',
						texto: 'O projeto foi cadastrado com sucesso',
						tipo: TipoNotificacao.SUCESSO,
					});
				}
				this.nomeProjeto = '';

				this.$router.push('/projetos');
			},
		},

		setup() {
			const store = useStore();

			return {
				store,
			};
		},

		mounted() {
			if (this.id) {
				const projeto = this.store.state.projetos.find((p) => p.id == this.id);

				this.nomeProjeto = projeto?.nome || '';
			}
		},
	});
</script>
