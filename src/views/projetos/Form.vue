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
					id="nomeProjeto"
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
	import { defineComponent, ref } from 'vue';
	import { useStore } from '@/store';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { ATUALIZAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipos-acoes';
	import { useRouter } from 'vue-router';

	import useNotificador from '@/hooks/notificador';

	export default defineComponent({
		name: 'ProjetosForm',

		props: {
			id: {
				type: String,
			},
		},

		// data() {
		// 	return {
		// 		nomeProjeto: '',
		// 	};
		// },

		// methods: {
		// 	async salvar() {
		// 		let titulo = 'Ops!';
		// 		let texto = 'Ocorreu um erro ao enviar os dados';
		// 		let tipo = TipoNotificacao.FALHA;

		// 		if (this.id) {
		// 			await this.store
		// 				.dispatch(ATUALIZAR_PROJETO, { id: this.id, nome: this.nomeProjeto })
		// 				.then(() => {
		// 					titulo = 'Alterações salvas';
		// 					texto = 'O projeto foi atualizado com sucesso';
		// 					tipo = TipoNotificacao.SUCESSO;
		// 				})
		// 				.catch((err) => {
		// 					console.error(err);
		// 				});
		// 		} else {
		// 			await this.store
		// 				.dispatch(CADASTRAR_PROJETO, this.nomeProjeto)
		// 				.then(() => {
		// 					titulo = 'Excelente';
		// 					texto = 'O projeto foi cadastrado com sucesso';
		// 					tipo = TipoNotificacao.SUCESSO;
		// 				})
		// 				.catch((err) => {
		// 					console.error(err);
		// 				});
		// 		}

		// 		this.nomeProjeto = '';
		// 		this.$router.push('/projetos');
		// 		this.notificar({ titulo, texto, tipo });
		// 	},
		// },

		setup(props) {
			const store = useStore();
			const router = useRouter();

			const { notificar } = useNotificador();
			const nomeProjeto = ref('');

			if (props.id) {
				const projeto = store.state.projeto.projetos.find((p) => p.id == props.id);

				nomeProjeto.value = projeto?.nome || '';
			}

			const salvar = async () => {
				let titulo = 'Ops!';
				let texto = 'Ocorreu um erro ao enviar os dados';
				let tipo = TipoNotificacao.FALHA;

				if (props.id) {
					await store
						.dispatch(ATUALIZAR_PROJETO, { id: props.id, nome: nomeProjeto.value })
						.then(() => {
							titulo = 'Alterações salvas';
							texto = 'O projeto foi atualizado com sucesso';
							tipo = TipoNotificacao.SUCESSO;
						})
						.catch((err) => {
							console.error(err);
						});
				} else {
					await store
						.dispatch(CADASTRAR_PROJETO, nomeProjeto.value)
						.then(() => {
							titulo = 'Excelente';
							texto = 'O projeto foi cadastrado com sucesso';
							tipo = TipoNotificacao.SUCESSO;
						})
						.catch((err) => {
							console.error(err);
						});
				}

				nomeProjeto.value = '';
				router.push('/projetos');
				notificar({ titulo, texto, tipo });
			};

			return {
				store,
				nomeProjeto,
				salvar,
			};
		},

		// mounted() {
		// 	if (this.id) {
		// 		const projeto = this.store.state.projeto.projetos.find((p) => p.id == this.id);

		// 		this.nomeProjeto = projeto?.nome || '';
		// 	}
		// },
	});
</script>
