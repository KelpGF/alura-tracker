import { INotificacao } from '@/interfaces/INotificacao';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';
import { EstadoProjeto, projeto } from './modulos/projetos';
import { EstadoTarefa, tarefa } from './modulos/tarefas';
import { NOTIFICAR } from './tipos-mutacaoes';

export interface Estado {
	projeto: EstadoProjeto;
	tarefa: EstadoTarefa;
	notificacoes: INotificacao[];
}

export const keyStore: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
	state: {
		notificacoes: [],
		tarefa: {
			tarefas: [],
		},
		projeto: {
			projetos: [],
		},
	},
	mutations: {
		[NOTIFICAR](state, notificacao: INotificacao) {
			notificacao.id = new Date().getTime();
			state.notificacoes.push(notificacao);

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter((n) => n.id != notificacao.id);
			}, 3000);
		},
	},
	modules: {
		projeto,
		tarefa,
	},
});

export function useStore(): Store<Estado> {
	return useStoreVuex(keyStore);
}
