import http from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import { ATUALIZAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS, REMOVER_TAREFA } from '@/store/tipos-acoes';
import { ADD_TAREFA, DEFINIR_TAREFAS, EDITAR_TAREFA, EXCLUIR_TAREFA } from '@/store/tipos-mutacaoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
	tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
	mutations: {
		[DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
			state.tarefas = tarefas;
		},
		[ADD_TAREFA](state, tarefa: ITarefa) {
			state.tarefas.push(tarefa);
		},
		[EDITAR_TAREFA](state, tarefa: ITarefa) {
			const idx = state.tarefas.findIndex((p) => p.id == tarefa.id);

			state.tarefas[idx] = tarefa;
		},
		[EXCLUIR_TAREFA](state, id: string) {
			state.tarefas = state.tarefas.filter((t) => t.id !== id);
		},
	},

	actions: {
		[OBTER_TAREFAS]({ commit }, filtro: string) {
			let url = 'tarefas';

			if (filtro) url += `?descricao=${filtro}`;

			http.get(url).then(({ data }) => {
				commit(DEFINIR_TAREFAS, data);
			});
		},
		[CADASTRAR_TAREFA](contexto, tarefa: ITarefa) {
			return http.post('/tarefas', tarefa);
		},
		[ATUALIZAR_TAREFA](contexto, tarefa: ITarefa) {
			return http.put(`/tarefas/${tarefa.id}`, tarefa);
		},
		[REMOVER_TAREFA](contexto, id: string) {
			return http.delete(`/tarefas/${id}`);
		},
	},
};
