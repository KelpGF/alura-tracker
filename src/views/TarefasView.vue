<template>
	<formulario-tarefa @enviarForm="salvarTarefa" />
	<div class="lista">
		<div class="field">
			<p class="control has-icons-left has-icons-right">
				<input
					v-model="filtro"
					type="email"
					class="input"
					placeholder="Digite para filtrar"
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-search"></i>
				</span>
			</p>
		</div>
		<box-amarelo v-if="listaVazia">Ops! Nenhuma tarefa encontrada</box-amarelo>
		<unica-tarefa
			:key="`tarefa-${idx}`"
			v-for="(tarefa, idx) in tarefas"
			:tarefa="tarefa"
			@excluir="excluirTarefa"
			@tarefaClicada="selecionarTarefa"
		/>

		<ModalTarefa :exibir="!!tarefaSelecionada">
			<template v-slot:cabecalho>
				<p class="modal-card-title">Editar Tarefa</p>
				<button
					class="delete"
					aria-label="close"
					@click="fecharModal"
				></button>
			</template>
			<template v-slot:corpo>
				<div class="field">
					<label
						for="descTarefa"
						class="label"
					>
						Descrição da tarefa
					</label>
					<input
						type="text"
						class="input"
						id="descTarefa"
						v-model="tarefaSelecionada.descricao"
					/>
				</div>
			</template>
			<template v-slot:rodape>
				<button
					class="button is-success"
					@click="alterarTarefa"
				>
					<span class="icon is-small">
						<i class="fas fa-check-double"></i>
					</span>
					<span>Registrar Alterações</span>
				</button>
				<button
					class="button is-dark is-outlined"
					@click="fecharModal"
				>
					<span class="icon is-small">
						<i class="fas fa-times"></i>
					</span>
					<span>Cancelar</span>
				</button>
			</template>
		</ModalTarefa>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, ref, watchEffect } from 'vue';
	import UnicaTarefa from '@/components/UnicaTarefa.vue';
	import BoxAmarelo from '@/components/BoxAmarelo.vue';
	import ModalTarefa from '@/components/ModalTarefa.vue';
	import FormularioTarefa from '@/components/FormularioTarefa.vue';
	import ITarefa from '@/interfaces/ITarefa';
	import { useStore } from '@/store';
	import { ADD_TAREFA, EDITAR_TAREFA, EXCLUIR_TAREFA } from '@/store/tipos-mutacaoes';
	import { ATUALIZAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_TAREFA } from '@/store/tipos-acoes';

	export default defineComponent({
		name: 'TarefasView',

		components: {
			UnicaTarefa,
			BoxAmarelo,
			FormularioTarefa,
			ModalTarefa,
		},

		data() {
			return {
				tarefaSelecionada: null as null | ITarefa,
			};
		},

		computed: {
			listaVazia(): boolean {
				return this.tarefas.length === 0;
			},
		},

		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.store.dispatch(CADASTRAR_TAREFA, tarefa).then(({ data }) => {
					this.store.commit(ADD_TAREFA, data);
				});
			},
			alterarTarefa(tarefa: ITarefa) {
				this.store.dispatch(ATUALIZAR_TAREFA, tarefa).then(({ data }) => {
					this.store.commit(EDITAR_TAREFA, data);
				});
				this.fecharModal();
			},
			excluirTarefa(id: string) {
				this.store.dispatch(REMOVER_TAREFA, id).then(() => {
					this.store.commit(EXCLUIR_TAREFA, id);
				});
			},
			selecionarTarefa(tarefa: ITarefa) {
				this.tarefaSelecionada = tarefa;
			},
			fecharModal() {
				this.tarefaSelecionada = null;
			},
		},

		setup() {
			const store = useStore();
			store.dispatch(OBTER_TAREFAS);
			store.dispatch(OBTER_PROJETOS);

			const filtro = ref('');

			watchEffect(() => {
				store.dispatch(OBTER_TAREFAS, filtro.value);
			});

			return {
				filtro,
				store,
				tarefas: computed(() => store.state.tarefa.tarefas),
			};
		},
	});
</script>
