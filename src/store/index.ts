import { INotificacao } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';
import { ADD_PROJETO, ADD_TAREFA, EDITAR_PROJETO, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from './tipos-mutacaoes';

interface Estado {
	projetos: IProjeto[];
	tarefas: ITarefa[];
	notificacoes: INotificacao[];
}

export const keyStore: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
	state: {
		projetos: [],
		tarefas: [],
		notificacoes: [],
	},
	mutations: {
		[ADD_PROJETO](state, nome: string) {
			const projeto: IProjeto = {
				nome,
				id: new Date().toISOString(),
			};

			state.projetos.push(projeto);
		},
		[EDITAR_PROJETO](state, projeto: IProjeto) {
			const idx = state.projetos.findIndex((p) => p.id == projeto.id);

			state.projetos[idx] = projeto;
		},
		[EXCLUIR_PROJETO](state, id: string) {
			state.projetos = state.projetos.filter((p) => p.id !== id);
		},

		[ADD_TAREFA](state, tarefa: ITarefa) {
			state.tarefas.push(tarefa);
		},
		[EXCLUIR_TAREFA](state, descricao: string) {
			state.tarefas = state.tarefas.filter((t) => t.descricao !== descricao);
		},

		[NOTIFICAR](state, notificacao: INotificacao) {
			notificacao.id = new Date().getTime();
			state.notificacoes.push(notificacao);

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter((n) => n.id != notificacao.id);
			}, 3000);
		},
	},
});

export function useStore(): Store<Estado> {
	return useStoreVuex(keyStore);
}
