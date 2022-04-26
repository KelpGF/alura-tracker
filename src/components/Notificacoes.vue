<template>
	<div class="notificacoes">
		<article
			class="message"
			:class="contexto[notificacao.tipo].classes"
			:key="notificacao.id"
			v-for="notificacao in notificacoes"
		>
			<div class="message-header">
				<p>
					<span class="icon">
						<i :class="contexto[notificacao.tipo].icone"></i>
					</span>
					{{ notificacao.titulo }}
				</p>
			</div>
			<div class="message-body">{{ notificacao.texto }}</div>
		</article>
	</div>
</template>

<script>
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { useStore } from '@/store';
	import { computed, defineComponent } from 'vue';

	export default defineComponent({
		name: 'NotificacoesGlobais',

		data() {
			return {
				contexto: {
					[TipoNotificacao.FALHA]: {
						classes: 'is-danger',
						icone: 'fas fa-times',
					},
					[TipoNotificacao.SUCESSO]: {
						classes: 'is-success',
						icone: 'fas fa-check',
					},
					[TipoNotificacao.ATENCAO]: {
						classes: 'is-warning',
						icone: 'fas fa-exclamation-triangle',
					},
				},
			};
		},

		setup() {
			const store = useStore();

			return {
				notificacoes: computed(() => store.state.notificacoes),
			};
		},
	});
</script>

<style scoped>
	.notificacoes {
		position: absolute;
		right: 0;
		width: 300px;
		padding: 8px;
		z-index: 105;
	}
</style>
